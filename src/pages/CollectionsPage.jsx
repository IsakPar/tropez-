/**
 * CollectionsPage - Shows all collections
 * This is the landing page for /collections
 */
import { Link } from 'react-router-dom'
import { collections } from '../data/products'

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Hero Section */}
            <section className="relative h-[70vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/collections-hero.jpg')` }}
                />
                <div className="absolute inset-0 bg-[var(--color-navy)]/20" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="font-body text-white/80 text-xs tracking-wide-luxury uppercase mb-4">
                        Explore Our World
                    </p>
                    <h1 className="font-heading text-white text-5xl md:text-6xl lg:text-7xl font-light mb-6">
                        Collections
                    </h1>
                    <p className="font-body text-white/90 text-lg max-w-2xl leading-relaxed">
                        Each collection tells a story of sun-soaked days and Mediterranean elegance
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
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

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                {/* Text Content */}
                                <div className="space-y-3">
                                    <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase">
                                        {collection.season || 'Summer 2025'}
                                    </p>
                                    <h2 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light group-hover:text-[var(--color-terracotta)] transition-colors duration-300">
                                        {collection.name}
                                    </h2>
                                    <p className="font-body text-[var(--color-gray)] text-sm leading-relaxed max-w-md">
                                        {collection.description}
                                    </p>

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

            {/* CTA Section */}
            <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-sand-light)]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                        Can't decide?
                    </p>
                    <h2 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl lg:text-5xl font-light mb-6">
                        Shop All Pieces
                    </h2>
                    <p className="font-body text-[var(--color-gray)] text-lg mb-10 max-w-xl mx-auto">
                        Browse our complete selection and find your perfect summer companion
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block px-12 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors btn-hover-lift"
                    >
                        View All Products
                    </Link>
                </div>
            </section>
        </div>
    )
}
