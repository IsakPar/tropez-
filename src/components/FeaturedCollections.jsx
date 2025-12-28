import { Link } from 'react-router-dom'
import { collections } from '../data/products'

export default function FeaturedCollections() {
    return (
        <section id="shop" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
            {/* Section Header */}
            <div className="max-w-[1800px] mx-auto mb-16 md:mb-20">
                <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                    Collections
                </p>
                <h2 className="font-heading text-[var(--color-navy)] text-4xl md:text-5xl lg:text-6xl font-light">
                    Curated for You
                </h2>
            </div>

            {/* Collection Grid - Text Below */}
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            to={`/collection/${collection.id}`}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sand-light)] mb-6">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Subtle gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Text Content Below Image */}
                            <div className="space-y-3">
                                <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase">
                                    {collection.description.split('.')[0]}
                                </p>
                                <h3 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light group-hover:text-[var(--color-terracotta)] transition-colors duration-300">
                                    {collection.name}
                                </h3>

                                {/* Arrow Link */}
                                <div className="flex items-center gap-2 pt-2">
                                    <span className="font-body text-[var(--color-navy)] text-sm tracking-luxury uppercase border-b border-transparent group-hover:border-[var(--color-navy)] pb-0.5 transition-all duration-300">
                                        Explore Collection
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-4 h-4 text-[var(--color-navy)] transition-transform duration-300 group-hover:translate-x-1"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
