const collections = [
    {
        id: 1,
        name: 'The Riviera',
        description: 'Timeless silhouettes',
        image: 'https://images.unsplash.com/photo-1570976447640-ac859083963a?w=800&q=80',
    },
    {
        id: 2,
        name: 'Côte d\'Azur',
        description: 'Bold & refined',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
    },
]

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

            {/* Collection Grid */}
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {collections.map((collection) => (
                        <a
                            key={collection.id}
                            href={`#collection-${collection.id}`}
                            className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                        >
                            {/* Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${collection.image}')` }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-[var(--color-navy)]/20 transition-opacity duration-500 group-hover:bg-[var(--color-navy)]/30" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                                <p className="font-body text-white/80 text-xs tracking-luxury uppercase mb-2">
                                    {collection.description}
                                </p>
                                <h3 className="font-heading text-white text-3xl md:text-4xl font-light">
                                    {collection.name}
                                </h3>

                                {/* Arrow */}
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="inline-flex items-center gap-2 text-white text-sm tracking-wide uppercase">
                                        View Collection
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
