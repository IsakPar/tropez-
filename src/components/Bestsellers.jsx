import { Link } from 'react-router-dom'
import { getBestsellers } from '../data/products'

export default function Bestsellers() {
    const products = getBestsellers()

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-sand-light)]">
            {/* Section Header */}
            <div className="max-w-[1800px] mx-auto mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                    <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                        Most Loved
                    </p>
                    <h2 className="font-heading text-[var(--color-navy)] text-4xl md:text-5xl lg:text-6xl font-light">
                        Bestsellers
                    </h2>
                </div>
                <Link
                    to="/shop"
                    className="group inline-flex items-center gap-2 font-body text-[var(--color-navy)] text-sm tracking-luxury uppercase"
                >
                    View All
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div>

            {/* Product Grid */}
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {products.slice(0, 4).map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden mb-4">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="text-center md:text-left">
                                <h3 className="font-heading text-[var(--color-navy)] text-lg md:text-xl font-normal mb-1">
                                    {product.name}
                                </h3>
                                <p className="font-body text-[var(--color-gray)] text-sm">
                                    €{product.price}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
