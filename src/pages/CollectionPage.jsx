import { useParams, Link } from 'react-router-dom'
import { getCollectionById, getProductsByCollection } from '../data/products'

export default function CollectionPage() {
    const { collectionId } = useParams()
    const collection = getCollectionById(collectionId)
    const products = getProductsByCollection(collectionId)

    if (!collection) {
        return (
            <div className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-[var(--color-navy)] text-3xl mb-4">Collection Not Found</h1>
                    <Link to="/shop" className="font-body text-[var(--color-terracotta)] underline">
                        Back to Shop
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Hero Banner */}
            <section className="relative h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${collection.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-[var(--color-navy)]/30" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="font-body text-white/80 text-xs tracking-wide-luxury uppercase mb-4">
                        Collection
                    </p>
                    <h1 className="font-heading text-white text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                        {collection.name}
                    </h1>
                    <p className="font-body text-white/90 text-lg max-w-2xl leading-relaxed">
                        {collection.description}
                    </p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
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
                                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[var(--color-sand-light)]">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {product.isNew && (
                                            <span className="bg-[var(--color-terracotta)] text-white text-xs px-3 py-1 font-body tracking-wide uppercase">
                                                New
                                            </span>
                                        )}
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
                </div>
            </section>
        </div>
    )
}
