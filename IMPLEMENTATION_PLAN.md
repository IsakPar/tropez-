# 🌴 St. Tropez Swimwear — Implementation Plan

> **Project Vision**: A luxury swimwear e-commerce platform with an innovative interactive size guide, built on Cloudflare's edge infrastructure.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Phase 1: Foundation & Design System](#phase-1-foundation--design-system)
3. [Phase 2: Core Storefront](#phase-2-core-storefront)
4. [Phase 3: Interactive Size Guide (Hero Feature)](#phase-3-interactive-size-guide-hero-feature)
5. [Phase 4: Cart & Checkout](#phase-4-cart--checkout)
6. [Phase 5: Admin Portal](#phase-5-admin-portal)
7. [Phase 6: Polish & Launch](#phase-6-polish--launch)
8. [Technical Architecture](#technical-architecture)
9. [Database Schema](#database-schema)
10. [Timeline Estimate](#timeline-estimate)

---

## Project Overview

### Brand Identity
- **Name**: St. Tropez Swimwear (or sister's brand name)
- **Aesthetic**: Understated luxury, Mediterranean elegance
- **Target**: Fashion-conscious women seeking premium swimwear
- **USP**: Interactive fit visualization tool

### Tech Stack
| Component | Technology |
|-----------|------------|
| Frontend | HTML/CSS/JS (Vanilla or Astro for static generation) |
| Hosting | Cloudflare Pages |
| API/Backend | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite-compatible) |
| Asset Storage | Cloudflare R2 |
| Payments | Stripe |
| Size Guide | Canvas/WebGL + JavaScript animation |
| CLI | Wrangler |

---

## Phase 1: Foundation & Design System
**Duration: 1 week**

### 1.1 Project Setup
- [ ] Initialize Wrangler project
- [ ] Create D1 database instance
- [ ] Create R2 bucket for assets
- [ ] Set up local development environment
- [ ] Configure deployment pipeline (Cloudflare Pages)

### 1.2 Design System Implementation
- [ ] Define CSS custom properties (colors, typography, spacing)
- [ ] Create base component styles
- [ ] Build reusable UI components:
  - [ ] Navigation bar (transparent + solid variants)
  - [ ] Buttons (primary, secondary, ghost)
  - [ ] Product cards
  - [ ] Image containers with hover effects
  - [ ] Form inputs
  - [ ] Modal/drawer system
  - [ ] Loading states & skeletons

### 1.3 Design Tokens
```css
/* Color Palette */
--color-sand: #F5F0E8;
--color-sand-light: #FAF8F5;
--color-navy: #1A2B4A;
--color-navy-light: #2D4A6E;
--color-terracotta: #C4836A;
--color-terracotta-light: #D9A08A;
--color-white: #FFFFFF;
--color-charcoal: #2C2C2C;

/* Typography */
--font-heading: 'Cormorant Garamond', serif;
--font-body: 'Inter', sans-serif;

/* Spacing (8px grid) */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 8rem;
```

---

## Phase 2: Core Storefront
**Duration: 2 weeks**

### 2.1 Homepage
- [ ] Hero section with full-bleed image/video
- [ ] Featured collections grid (2-column, large images)
- [ ] Editorial strip (full-width lifestyle image)
- [ ] Bestsellers carousel
- [ ] Brand story teaser section
- [ ] Newsletter signup
- [ ] Footer with navigation

### 2.2 Shop Page
- [ ] Category filter bar (horizontal pills)
- [ ] Product grid (responsive: 2-4 columns)
- [ ] Product cards with:
  - [ ] Primary image
  - [ ] Hover state showing alternate angle
  - [ ] Product name & price
  - [ ] Quick "Add to bag" on hover (optional)
- [ ] Sorting dropdown (Price, Newest, Bestselling)
- [ ] Load more / infinite scroll

### 2.3 Product Detail Page
- [ ] Main image gallery with thumbnails
- [ ] Image zoom on hover
- [ ] Product info panel:
  - [ ] Name, price
  - [ ] Color swatches
  - [ ] Size selector
  - [ ] "Find Your Fit" button → triggers size guide
  - [ ] Add to bag button
  - [ ] Wishlist button
- [ ] Accordion sections (Description, Care, Shipping)
- [ ] "Complete the Look" recommendations
- [ ] Social sharing

### 2.4 Lookbook / Editorial Page
- [ ] Full-screen image gallery
- [ ] Masonry or grid layout
- [ ] Hover to reveal product links
- [ ] Smooth scroll navigation

### 2.5 About Page
- [ ] Brand story with large imagery
- [ ] Founder section
- [ ] Values/sustainability messaging
- [ ] Behind-the-scenes gallery

---

## Phase 3: Interactive Size Guide (Hero Feature)
**Duration: 3-4 weeks** ⭐ CRITICAL PATH

### 3.1 Concept Overview
An animated 2D/3D mannequin that users can adjust in real-time by inputting their measurements. The mannequin morphs to match their body shape, and the selected swimwear item is overlaid to show realistic fit.

### 3.2 Technical Approach

#### Option A: 2D SVG/Canvas Animation (Recommended for V1)
- **Pros**: Lighter weight, easier to implement, works everywhere
- **Cons**: Less realistic than 3D
- **Tech**: SVG paths with morphing animations (anime.js, GSAP, or custom)

#### Option B: 3D WebGL (Future Enhancement)
- **Pros**: More realistic, wow factor
- **Cons**: Heavy, requires 3D modeling, complex
- **Tech**: Three.js with parametric body mesh

### 3.3 Size Guide Features

#### User Input Panel
```
┌─────────────────────────────────────┐
│       FIND YOUR PERFECT FIT         │
├─────────────────────────────────────┤
│                                     │
│  Height:    [────●────] 165 cm      │
│  Bust:      [──────●──] 88 cm       │
│  Waist:     [────●────] 68 cm       │
│  Hips:      [──────●──] 96 cm       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Suggested Size: [ M ]              │
│                                     │
│  [ VIEW ON MY BODY ]                │
│                                     │
└─────────────────────────────────────┘
```

#### Animated Mannequin Display
```
┌─────────────────────────────────────┐
│                                     │
│           ┌───────────┐             │
│           │   Head    │             │
│           └─────┬─────┘             │
│              ┌──┴──┐                │
│         ╭────┤     ├────╮           │
│        ╱     │ Top │     ╲          │
│       ╱      │     │      ╲         │
│      ╱       └──┬──┘       ╲        │
│     │           │           │       │
│     │        ┌──┴──┐        │       │
│              │Bottom│               │
│              │     │                │
│              └──┬──┘                │
│             ╱       ╲               │
│            ╱         ╲              │
│           │           │             │
│           │           │             │
│                                     │
│  [Rotate]  [Front/Back]  [Zoom]     │
└─────────────────────────────────────┘
```

### 3.4 Implementation Steps

#### Step 1: Body Morphing System
- [ ] Create base SVG mannequin with control points
- [ ] Define body measurement → SVG transformation mapping
- [ ] Implement smooth morphing animations between states
- [ ] Test edge cases (extreme measurements)

#### Step 2: Product Overlay System
- [ ] Create product silhouette SVGs for each item
- [ ] Map product sizing to body dimensions
- [ ] Implement product stretch/fit visualization
- [ ] Show stress points (too tight) and loose areas

#### Step 3: Interactive Controls
- [ ] Slider inputs for each measurement
- [ ] Real-time update as sliders move
- [ ] Preset body types (optional quick-select)
- [ ] Unit toggle (cm/inches)

#### Step 4: Size Recommendation Engine
- [ ] Algorithm to map measurements → size
- [ ] Handle between-sizes scenarios
- [ ] Product-specific fit adjustments (some run small, etc.)
- [ ] Confidence indicator

#### Step 5: Polish & UX
- [ ] Smooth 60fps animations
- [ ] Mobile-friendly touch controls
- [ ] Loading states
- [ ] Tooltips and guidance
- [ ] Save measurements to local storage / account

### 3.5 Data Model for Size Guide

```javascript
// Product fit data (stored per product)
{
  productId: "bikini-top-001",
  fitType: "tight" | "regular" | "relaxed",
  sizeChart: {
    XS: { bustMin: 80, bustMax: 84, ... },
    S:  { bustMin: 84, bustMax: 88, ... },
    M:  { bustMin: 88, bustMax: 92, ... },
    L:  { bustMin: 92, bustMax: 96, ... },
    XL: { bustMin: 96, bustMax: 100, ... }
  },
  stretchFactor: 0.05, // 5% stretch allowance
  adjustmentNotes: "Runs small, size up if between sizes"
}
```

---

## Phase 4: Cart & Checkout
**Duration: 1.5 weeks**

### 4.1 Cart
- [ ] Slide-out cart drawer
- [ ] Product thumbnails with size/color
- [ ] Quantity adjusters
- [ ] Remove item
- [ ] Subtotal calculation
- [ ] Promo code input
- [ ] Proceed to checkout CTA

### 4.2 Checkout Flow
- [ ] Guest checkout option
- [ ] Account creation (optional)
- [ ] Shipping address form
- [ ] Shipping method selection
- [ ] Payment (Stripe Elements)
- [ ] Order review
- [ ] Order confirmation page
- [ ] Confirmation email trigger

### 4.3 Payment Integration
- [ ] Stripe setup
- [ ] Webhook handlers for payment events
- [ ] Failed payment handling
- [ ] Receipt generation

---

## Phase 5: Admin Portal
**Duration: 2 weeks**

### 5.1 Authentication
- [ ] Admin login (email/password or magic link)
- [ ] Session management
- [ ] Role-based access (future: multiple admins)

### 5.2 Dashboard
- [ ] Sales overview (today, week, month)
- [ ] Recent orders list
- [ ] Low stock alerts
- [ ] Quick actions

### 5.3 Product Management
- [ ] Product list with search/filter
- [ ] Add new product form:
  - [ ] Name, description, price
  - [ ] Category/collection assignment
  - [ ] Image upload → R2
  - [ ] Size chart configuration
  - [ ] Fit type for size guide
  - [ ] Inventory per size
- [ ] Edit existing products
- [ ] Archive/delete products
- [ ] Bulk actions

### 5.4 Homepage Placement Editor
- [ ] Drag-and-drop section ordering
- [ ] Select featured collections
- [ ] Set hero image/video
- [ ] Preview before publish

### 5.5 Media Library
- [ ] Browse all R2 assets
- [ ] Upload new images
- [ ] Image optimization on upload
- [ ] Organize by folder/tags
- [ ] Delete unused assets

### 5.6 Order Management
- [ ] Order list with status filters
- [ ] Order detail view
- [ ] Update order status
- [ ] Trigger shipping notification
- [ ] Refund processing

### 5.7 Collections Management
- [ ] Create/edit collections
- [ ] Assign products to collections
- [ ] Set collection cover image
- [ ] Order products within collection

---

## Phase 6: Polish & Launch
**Duration: 1 week**

### 6.1 Performance Optimization
- [ ] Image lazy loading
- [ ] Critical CSS inlining
- [ ] Bundle optimization
- [ ] CDN caching rules
- [ ] Lighthouse audit & fixes

### 6.2 SEO
- [ ] Meta tags on all pages
- [ ] Open Graph / social cards
- [ ] Structured data (Product schema)
- [ ] Sitemap generation
- [ ] robots.txt

### 6.3 Analytics & Tracking
- [ ] Google Analytics 4 setup
- [ ] E-commerce tracking events
- [ ] Conversion tracking
- [ ] Heatmaps (optional: Hotjar/Clarity)

### 6.4 Testing
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Checkout flow end-to-end
- [ ] Size guide edge cases
- [ ] Load testing

### 6.5 Launch Checklist
- [ ] Custom domain setup
- [ ] SSL verification
- [ ] Email deliverability test
- [ ] Payment test transactions
- [ ] Backup & recovery plan
- [ ] Monitoring & alerts

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUDFLARE EDGE                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐         ┌─────────────────┐               │
│   │                 │         │                 │               │
│   │  Cloudflare     │◄───────►│  Cloudflare     │               │
│   │  Pages          │         │  Workers        │               │
│   │  (Frontend)     │         │  (API)          │               │
│   │                 │         │                 │               │
│   └─────────────────┘         └────────┬────────┘               │
│                                        │                        │
│                            ┌───────────┼───────────┐            │
│                            │           │           │            │
│                            ▼           ▼           ▼            │
│                     ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│                     │          │ │          │ │          │      │
│                     │   D1     │ │   R2     │ │  Stripe  │      │
│                     │ Database │ │  Bucket  │ │ Payments │      │
│                     │          │ │          │ │          │      │
│                     └──────────┘ └──────────┘ └──────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### API Endpoints (Workers)

```
GET    /api/products              # List products
GET    /api/products/:id          # Get single product
GET    /api/collections           # List collections
GET    /api/collections/:id       # Get collection with products

POST   /api/cart                  # Create cart
GET    /api/cart/:id              # Get cart
PUT    /api/cart/:id              # Update cart
DELETE /api/cart/:id/items/:itemId # Remove item

POST   /api/checkout              # Create checkout session
POST   /api/webhooks/stripe       # Stripe webhook handler

GET    /api/orders/:id            # Get order (authenticated)

# Admin endpoints (protected)
POST   /api/admin/products        # Create product
PUT    /api/admin/products/:id    # Update product
DELETE /api/admin/products/:id    # Archive product
POST   /api/admin/upload          # Upload to R2
GET    /api/admin/orders          # List all orders
PUT    /api/admin/orders/:id      # Update order status
```

---

## Database Schema

### D1 Tables

```sql
-- Products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- cents
  compare_at_price INTEGER,
  category TEXT,
  fit_type TEXT DEFAULT 'regular', -- tight, regular, relaxed
  size_chart TEXT, -- JSON
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Product Variants (size/color combinations)
CREATE TABLE product_variants (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  size TEXT NOT NULL,
  color TEXT NOT NULL,
  color_hex TEXT,
  sku TEXT UNIQUE,
  inventory INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

-- Product Images
CREATE TABLE product_images (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  url TEXT NOT NULL, -- R2 URL
  alt_text TEXT,
  position INTEGER DEFAULT 0,
  is_primary INTEGER DEFAULT 0
);

-- Collections
CREATE TABLE collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  is_featured INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Product Collections (many-to-many)
CREATE TABLE product_collections (
  product_id TEXT REFERENCES products(id),
  collection_id TEXT REFERENCES collections(id),
  position INTEGER DEFAULT 0,
  PRIMARY KEY (product_id, collection_id)
);

-- Orders
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
  subtotal INTEGER NOT NULL,
  shipping_cost INTEGER DEFAULT 0,
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  shipping_address TEXT, -- JSON
  billing_address TEXT, -- JSON
  stripe_payment_intent TEXT,
  notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id),
  product_id TEXT REFERENCES products(id),
  variant_id TEXT REFERENCES product_variants(id),
  product_name TEXT NOT NULL,
  variant_info TEXT, -- "Size M, Coral"
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL
);

-- Customers (optional, for accounts)
CREATE TABLE customers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  saved_measurements TEXT, -- JSON for size guide
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Homepage Sections (for admin customization)
CREATE TABLE homepage_sections (
  id TEXT PRIMARY KEY,
  section_type TEXT NOT NULL, -- hero, featured_collection, editorial, bestsellers
  content TEXT, -- JSON with section-specific data
  position INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1
);
```

---

## Timeline Estimate

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 1: Foundation | 1 week | Week 1 |
| Phase 2: Core Storefront | 2 weeks | Week 3 |
| Phase 3: Size Guide | 3-4 weeks | Week 7 |
| Phase 4: Cart & Checkout | 1.5 weeks | Week 8.5 |
| Phase 5: Admin Portal | 2 weeks | Week 10.5 |
| Phase 6: Polish & Launch | 1 week | Week 11.5 |

**Total Estimated Duration: ~12 weeks** (with buffer)

---

## Mockup Checklist

The following visual mockups will be created:

### Customer-Facing Pages
- [ ] Homepage (Desktop)
- [ ] Homepage (Mobile)
- [ ] Shop Page
- [ ] Product Detail Page (with Size Guide closed)
- [ ] Product Detail Page (with Size Guide open)
- [ ] Size Guide Interactive Modal
- [ ] Cart Drawer
- [ ] Checkout Page
- [ ] Lookbook Page
- [ ] About Page

### Admin Portal
- [ ] Admin Dashboard
- [ ] Product Management List
- [ ] Add/Edit Product Form
- [ ] Homepage Editor
- [ ] Order Management

---

## Next Steps

1. ✅ Implementation plan created
2. 🎨 Generate visual mockups for all pages
3. 📁 Set up project structure
4. 🛠️ Begin Phase 1 development

---

*Document created: December 28, 2025*
*Last updated: December 28, 2025*
