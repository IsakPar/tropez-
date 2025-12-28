import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedCollections from './components/FeaturedCollections'
import EditorialStrip from './components/EditorialStrip'
import Bestsellers from './components/Bestsellers'
import BrandStory from './components/BrandStory'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <EditorialStrip />
        <Bestsellers />
        <BrandStory />
      </main>
      <Footer />
    </div>
  )
}

export default App
