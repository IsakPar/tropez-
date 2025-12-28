import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { CurrencyProvider } from './context/CurrencyContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ScrollToTop from './components/ScrollToTop'
import NewsletterPopup from './components/NewsletterPopup'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CollectionsPage from './pages/CollectionsPage'
import CollectionPage from './pages/CollectionPage'
import LookbookPage from './pages/LookbookPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen">
              <Navbar />
              <CartDrawer />
              <NewsletterPopup />
              <main className="page-transition">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/collections" element={<CollectionsPage />} />
                  <Route path="/collection/:collectionId" element={<CollectionPage />} />
                  <Route path="/lookbook" element={<LookbookPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </BrowserRouter>
  )
}

export default App
