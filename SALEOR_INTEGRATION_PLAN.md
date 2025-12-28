# Saleor Backend Integration Plan

## Overview

**Saleor** is an open-source, headless e-commerce platform used by companies like Zalando. It provides a GraphQL API that our React frontend will consume.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        TROPEZ Frontend                          │
│                   (Current Vite + React App)                    │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  Products   │  │   Cart      │  │      Checkout           │ │
│  │  Catalog    │  │   Drawer    │  │   (Stripe/Payments)     │ │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘ │
│         │                │                     │               │
│         └────────────────┴─────────────────────┘               │
│                          │                                      │
│                   Apollo Client                                 │
│                   (GraphQL)                                     │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTPS / GraphQL
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SALEOR Backend                               │
│                  (Self-Hosted / Docker)                          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    GraphQL API                               ││
│  │              http://localhost:8000/graphql/                  ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │   Products   │  │    Orders    │  │     Payments          │ │
│  │   Channels   │  │    Cart      │  │  (Stripe, PayPal)     │ │
│  │  Categories  │  │   Checkout   │  │                       │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  PostgreSQL  │  │    Redis     │  │    Media Storage      │ │
│  │   Database   │  │    Cache     │  │   (S3/Local/CDN)      │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SALEOR Dashboard                               │
│              http://localhost:9000                               │
│                                                                 │
│  • Product Management (Add/Edit/Delete products)                │
│  • Order Management (View/Fulfill orders)                       │
│  • Customer Management                                          │
│  • Inventory & Shipping                                         │
│  • Discounts & Vouchers                                         │
│  • Multi-channel support                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Set Up Saleor Backend (Local Development)

### Prerequisites
- Docker Desktop installed
- At least 8GB RAM allocated to Docker
- Git

### Step 1.1: Clone & Start Saleor Platform

```bash
# Clone the official saleor-platform repo
git clone https://github.com/saleor/saleor-platform.git
cd saleor-platform

# Pull Docker images
docker compose pull

# Run database migrations
docker compose run --rm api python3 manage.py migrate

# Populate with sample data (optional but recommended for testing)
docker compose run --rm api python3 manage.py populatedb

# Create admin account
docker compose run --rm api python3 manage.py createsuperuser

# Start all services
docker compose up
```

### Step 1.2: Access Points

| Service | URL | Purpose |
|---------|-----|---------|
| **GraphQL API** | http://localhost:8000/graphql/ | Backend API |
| **Dashboard** | http://localhost:9000 | Admin panel |
| **GraphQL Playground** | http://localhost:8000/graphql/ | API testing |

---

## Phase 2: Install Frontend Dependencies

### Step 2.1: Add Required Packages

```bash
cd st_tropez

# Apollo Client for GraphQL
npm install @apollo/client graphql

# GraphQL Code Generator (for TypeScript types)
npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
```

### Step 2.2: Create Apollo Client Configuration

Create `src/lib/apollo.js`:

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SALEOR_API_URL || 'http://localhost:8000/graphql/',
  credentials: 'include',
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

### Step 2.3: Environment Variables

Create/update `.env`:

```env
VITE_SALEOR_API_URL=http://localhost:8000/graphql/
VITE_SALEOR_CHANNEL=default-channel
```

---

## Phase 3: Replace Mock Data with GraphQL Queries

### Step 3.1: Create GraphQL Queries

Create `src/graphql/queries/products.js`:

```javascript
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int!, $channel: String!) {
    products(first: $first, channel: $channel) {
      edges {
        node {
          id
          name
          slug
          description
          pricing {
            priceRange {
              start {
                gross {
                  amount
                  currency
                }
              }
            }
          }
          thumbnail {
            url
            alt
          }
          media {
            url
            alt
          }
          category {
            name
            slug
          }
          collections {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      id
      name
      slug
      description
      pricing {
        priceRange {
          start {
            gross {
              amount
              currency
            }
          }
        }
      }
      media {
        url
        alt
      }
      variants {
        id
        name
        pricing {
          price {
            gross {
              amount
              currency
            }
          }
        }
        attributes {
          attribute {
            name
          }
          values {
            name
          }
        }
      }
    }
  }
`;

export const GET_COLLECTIONS = gql`
  query GetCollections($first: Int!, $channel: String!) {
    collections(first: $first, channel: $channel) {
      edges {
        node {
          id
          name
          slug
          description
          backgroundImage {
            url
            alt
          }
        }
      }
    }
  }
`;
```

### Step 3.2: Create Cart/Checkout Mutations

Create `src/graphql/mutations/checkout.js`:

```javascript
import { gql } from '@apollo/client';

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        token
        email
        lines {
          id
          quantity
          variant {
            id
            name
            product {
              name
              thumbnail {
                url
              }
            }
            pricing {
              price {
                gross {
                  amount
                  currency
                }
              }
            }
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CHECKOUT = gql`
  mutation AddToCheckout($id: ID, $lines: [CheckoutLineInput!]!) {
    checkoutLinesAdd(id: $id, lines: $lines) {
      checkout {
        id
        lines {
          id
          quantity
          variant {
            id
            name
          }
        }
        totalPrice {
          gross {
            amount
            currency
          }
        }
      }
      errors {
        field
        message
      }
    }
  }
`;
```

---

## Phase 4: Update React Components

### Step 4.1: Wrap App with Apollo Provider

Update `src/App.jsx`:

```javascript
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './lib/apollo';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      {/* ... existing providers and routes */}
    </ApolloProvider>
  );
}
```

### Step 4.2: Replace Mock Data in Components

Example for ShopPage:

```javascript
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries/products';

export default function ShopPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { 
      first: 20, 
      channel: import.meta.env.VITE_SALEOR_CHANNEL 
    }
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const products = data.products.edges.map(({ node }) => ({
    id: node.slug,
    name: node.name,
    price: node.pricing.priceRange.start.gross.amount,
    image: node.thumbnail?.url,
    // ... map other fields
  }));

  return (
    // ... render products
  );
}
```

---

## Phase 5: Production Deployment

### Option A: Self-Hosted VPS (Recommended for Control)

1. **Server Requirements:**
   - 4GB+ RAM
   - 2+ CPU cores
   - 50GB+ SSD
   - Docker & Docker Compose

2. **Deployment Steps:**
   ```bash
   # On your VPS
   git clone https://github.com/saleor/saleor-platform.git
   cd saleor-platform
   
   # Configure environment variables for production
   cp .env.example .env
   # Edit .env with production values
   
   # Use production docker-compose
   docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
   ```

3. **Add reverse proxy (nginx/Caddy) for HTTPS**

### Option B: Railway/Render (Easier Setup)

- Railway has one-click Saleor deployment
- Managed PostgreSQL and Redis included

---

## Phase 6: Add Products via Dashboard

Once Saleor is running:

1. Go to http://localhost:9000
2. Login with your admin account
3. Go to **Catalog → Products → Create Product**
4. Add your swimwear products with:
   - Name, Description
   - Images (upload from your `/public` folder)
   - Variants (sizes, colors)
   - Pricing
   - Collections (The Riviera, Côte d'Azur)

---

## Timeline Estimate

| Phase | Duration | Description |
|-------|----------|-------------|
| Phase 1 | 1-2 hours | Set up Saleor locally |
| Phase 2 | 30 mins | Install frontend dependencies |
| Phase 3 | 2-3 hours | Create GraphQL queries |
| Phase 4 | 3-4 hours | Update React components |
| Phase 5 | 2-3 hours | Production deployment |
| Phase 6 | 1-2 hours | Add products to Dashboard |

**Total: ~10-15 hours**

---

## Key Benefits of Saleor

✅ **Complete E-commerce Features**
- Products, variants, collections
- Cart & checkout flow
- Order management
- Payment integrations (Stripe, PayPal, Adyen)
- Shipping & fulfillment
- Multi-currency & multi-language
- Discounts & vouchers

✅ **Modern Stack**
- GraphQL API (no REST endpoints to manage)
- Python/Django backend (battle-tested)
- PostgreSQL database
- Redis caching

✅ **Admin Dashboard Included**
- Beautiful React-based admin panel
- No need to build your own CMS

✅ **Open Source**
- No licensing fees
- Full control over data
- Active community

---

## Next Steps

1. **Install Docker Desktop** if you don't have it
2. **Clone saleor-platform** and run it locally
3. Let me know when Saleor is running, and I'll help integrate it with your frontend!
