export default function BrandStory() {
    return (
        <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-[var(--color-cream)]">
            <div className="max-w-[1800px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url('/Gemini_Generated_Image_w2g165w2g165w2g1.png')`,
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="lg:py-12">
                        <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-6">
                            Our Story
                        </p>

                        <h2 className="font-heading text-[var(--color-navy)] text-4xl md:text-5xl font-light mb-8 leading-tight">
                            Crafted with Intention
                        </h2>

                        <div className="space-y-6 text-[var(--color-gray)] font-body leading-relaxed">
                            <p>
                                Born from a love of the Mediterranean lifestyle, St. Tropez Swimwear celebrates the art of
                                doing nothing beautifully. Each piece is designed to make you feel as radiant as the
                                sun-kissed shores that inspire our collections.
                            </p>
                            <p>
                                We believe luxury lies in the details—the perfect cut that flatters, the fabric that
                                embraces, the colors that capture the essence of endless summer days.
                            </p>
                        </div>

                        <a
                            href="#about"
                            className="inline-flex items-center gap-3 mt-10 group"
                        >
                            <span className="font-body text-[var(--color-navy)] text-sm tracking-luxury uppercase border-b border-[var(--color-navy)]/30 pb-1 transition-all duration-300 group-hover:border-[var(--color-navy)]">
                                Discover More
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
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
