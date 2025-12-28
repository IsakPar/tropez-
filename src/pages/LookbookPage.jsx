import { useState } from 'react'
import { Link } from 'react-router-dom'
import { lookbookImages } from '../data/lookbook'
import { getProductById } from '../data/products'

export default function LookbookPage() {
    const [hoveredImage, setHoveredImage] = useState(null)

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Hero Section */}
            <section className="relative h-screen overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/Gemini_Generated_Image_6wis8i6wis8i6wis.png')`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-navy)]/30 via-transparent to-[var(--color-navy)]/40" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="font-body text-white/80 text-xs tracking-wide-luxury uppercase mb-6">
                        Summer 2025
                    </p>
                    <h1 className="font-heading text-white text-6xl md:text-7xl lg:text-8xl font-light mb-6 italic">
                        Lookbook
                    </h1>
                    <p className="font-body text-white/90 text-lg max-w-xl leading-relaxed">
                        A visual journey through the Mediterranean. <br />
                        Where effortless elegance meets endless summer.
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex flex-col items-center gap-3 text-white/70">
                        <span className="font-body text-xs tracking-wide uppercase">Explore</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="w-6 h-6 animate-bounce"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Editorial Grid */}
            <section className="py-16 md:py-24">
                {/* Full-width image 1 */}
                <LookbookImage
                    image={lookbookImages[0]}
                    isHovered={hoveredImage === 0}
                    onHover={() => setHoveredImage(0)}
                    onLeave={() => setHoveredImage(null)}
                />

                {/* Two-column row */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <LookbookImage
                        image={lookbookImages[1]}
                        isHovered={hoveredImage === 1}
                        onHover={() => setHoveredImage(1)}
                        onLeave={() => setHoveredImage(null)}
                    />
                    <LookbookImage
                        image={lookbookImages[2]}
                        isHovered={hoveredImage === 2}
                        onHover={() => setHoveredImage(2)}
                        onLeave={() => setHoveredImage(null)}
                    />
                </div>

                {/* Quote Section */}
                <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed"
                        style={{ backgroundImage: `url('${lookbookImages[3].src}')` }}
                    />
                    <div className="absolute inset-0 bg-[var(--color-navy)]/20" />
                    <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                        <blockquote className="max-w-3xl">
                            <p className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-light italic leading-relaxed">
                                {lookbookImages[3].quote}
                            </p>
                        </blockquote>
                    </div>
                </div>

                {/* Three-column row */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <LookbookImage
                        image={lookbookImages[4]}
                        isHovered={hoveredImage === 4}
                        onHover={() => setHoveredImage(4)}
                        onLeave={() => setHoveredImage(null)}
                        aspectRatio="square"
                    />
                    <LookbookImage
                        image={lookbookImages[5]}
                        isHovered={hoveredImage === 5}
                        onHover={() => setHoveredImage(5)}
                        onLeave={() => setHoveredImage(null)}
                        aspectRatio="square"
                    />
                    <LookbookImage
                        image={lookbookImages[6]}
                        isHovered={hoveredImage === 6}
                        onHover={() => setHoveredImage(6)}
                        onLeave={() => setHoveredImage(null)}
                        aspectRatio="square"
                    />
                </div>

                {/* Full-width with campaign title */}
                <div className="relative">
                    <LookbookImage
                        image={lookbookImages[7]}
                        isHovered={hoveredImage === 7}
                        onHover={() => setHoveredImage(7)}
                        onLeave={() => setHoveredImage(null)}
                        showCampaign
                    />
                </div>

                {/* Two-thirds / One-third row */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <LookbookImage
                            image={lookbookImages[8]}
                            isHovered={hoveredImage === 8}
                            onHover={() => setHoveredImage(8)}
                            onLeave={() => setHoveredImage(null)}
                        />
                    </div>
                    <LookbookImage
                        image={lookbookImages[9]}
                        isHovered={hoveredImage === 9}
                        onHover={() => setHoveredImage(9)}
                        onLeave={() => setHoveredImage(null)}
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 bg-[var(--color-sand)] text-center px-6">
                <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                    Ready to dive in?
                </p>
                <h2 className="font-heading text-[var(--color-navy)] text-4xl md:text-5xl font-light mb-8">
                    Shop the Collection
                </h2>
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors"
                >
                    Shop Now
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </section>
        </div>
    )
}

// Individual Lookbook Image Component
function LookbookImage({ image, isHovered, onHover, onLeave, aspectRatio = 'video', showCampaign = false }) {
    const products = image.taggedProducts.map(id => getProductById(id)).filter(Boolean)

    const aspectClass = {
        video: 'aspect-video',
        square: 'aspect-square',
        portrait: 'aspect-[3/4]',
    }[aspectRatio]

    return (
        <div
            className={`relative ${aspectClass} overflow-hidden cursor-pointer group`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            {/* Image */}
            <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className={`absolute inset-0 transition-colors duration-300 ${isHovered ? 'bg-[var(--color-navy)]/30' : 'bg-transparent'
                }`} />

            {/* Campaign Name */}
            {showCampaign && image.campaign && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-light italic">
                        {image.campaign}
                    </h3>
                </div>
            )}

            {/* Shop This Look - Only show if products are tagged */}
            {products.length > 0 && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <p className="font-body text-white text-xs tracking-wide-luxury uppercase mb-4">
                        Shop This Look
                    </p>
                    <div className="flex gap-3">
                        {products.slice(0, 3).map(product => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                className="bg-white/95 backdrop-blur-sm px-6 py-3 font-body text-sm text-[var(--color-navy)] hover:bg-white transition-colors"
                            >
                                {product.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Corner indicator when not hovered */}
            {products.length > 0 && !isHovered && (
                <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2">
                    <span className="font-body text-xs text-[var(--color-navy)] tracking-wide uppercase">
                        Shop Look
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-[var(--color-navy)]"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
            )}
        </div>
    )
}
