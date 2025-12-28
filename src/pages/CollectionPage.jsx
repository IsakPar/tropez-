import { useParams, Link } from 'react-router-dom'
import { getCollectionById, getProductsByCollection, collections } from '../data/products'
import WishlistButton from '../components/WishlistButton'

export default function CollectionPage() {
    const { collectionId } = useParams()
    const collection = getCollectionById(collectionId)
    const products = getProductsByCollection(collectionId)

    if (!collection) {
        return (
            <div className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-[var(--color-navy)] text-3xl mb-4">Collection Not Found</h1>
                    <Link to="/collections" className="font-body text-[var(--color-terracotta)] underline">
                        View All Collections
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Hero Banner */}
            <section className="relative h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/collections-hero.jpg')` }}
                />
                <div className="absolute inset-0 bg-[var(--color-navy)]/25" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <Link
                        to="/collections"
                        className="font-body text-white/80 text-xs tracking-wide-luxury uppercase mb-4 hover:text-white transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        All Collections
                    </Link>
                    <h1 className="font-heading text-white text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                        {collection.name}
                    </h1>
                    <p className="font-body text-white/90 text-lg max-w-2xl leading-relaxed">
                        {collection.description}
                    </p>
                </div>
            </section>

            {/* Collection Navigation */}
            <section className="py-8 px-6 md:px-12 lg:px-20 border-b border-[var(--color-sand)]">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex items-center justify-center gap-8 md:gap-12 overflow-x-auto">
                        {collections.map((col) => (
                            <Link
                                key={col.id}
                                to={`/collection/${col.id}`}
                                className={`font-body text-sm tracking-luxury uppercase whitespace-nowrap pb-2 border-b-2 transition-all duration-300 ${col.id === collectionId
                                        ? 'text-[var(--color-navy)] border-[var(--color-navy)]'
                                        : 'text-[var(--color-gray)] border-transparent hover:text-[var(--color-navy)]'
                                    }`}
                            >
                                {col.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <p className="font-body text-[var(--color-gray)] text-sm">
                            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="group cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden mb-3 bg-[var(--color-sand-light)]">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="bg-[var(--color-terracotta)] text-white text-xs px-3 py-1 font-body tracking-wide uppercase">
                                                New
                                            </span>
                                        )}
                                    </div>

                                    {/* Wishlist Button */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <WishlistButton
                                            productId={product.id}
                                            size="md"
                                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-[var(--color-navy)] hover:text-[var(--color-terracotta)]"
                                        />
                                    </div>

                                    {/* Quick View */}
                                    <div className="absolute inset-0 bg-[var(--color-navy)]/0 group-hover:bg-[var(--color-navy)]/10 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-6 py-2 text-sm font-body tracking-wide text-[var(--color-navy)]">
                                            View Product
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div>
                                    <h3 className="font-heading text-[var(--color-navy)] text-lg md:text-xl font-normal mb-1 group-hover:text-[var(--color-terracotta)] transition-colors duration-300">
                                        {product.name}
                                    </h3>
                                    <p className="font-body text-[var(--color-gray)] text-sm">
                                        €{product.price}
                                    </p>

                                    {/* Color Swatches */}
                                    <div className="flex gap-1.5 mt-3">
                                        {product.colors.slice(0, 4).map((color) => (
                                            <div
                                                key={color.name}
                                                className="w-4 h-4 rounded-full border border-black/10"
                                                style={{ backgroundColor: color.hex }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="font-body text-[var(--color-gray)] text-lg mb-4">
                                No products in this collection yet.
                            </p>
                            <Link to="/shop" className="font-body text-[var(--color-terracotta)] underline">
                                Browse All Products
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
