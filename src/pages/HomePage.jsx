import Hero from '../components/Hero'
import FeaturedCollections from '../components/FeaturedCollections'
import EditorialStrip from '../components/EditorialStrip'
import Bestsellers from '../components/Bestsellers'
import BrandStory from '../components/BrandStory'

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedCollections />
            <EditorialStrip />
            <Bestsellers />
            <BrandStory />
        </>
    )
}
