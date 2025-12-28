/**
 * InstagramFeed Component
 * 
 * Displays a grid of "Instagram" style images.
 * Uses product images as placeholders for social proof.
 */
import { Link } from 'react-router-dom'

export default function InstagramFeed() {
    // Mock Instagram images using our product images
    const instagramImages = [
        { id: 1, src: '/Gemini_Generated_Image_6wis8i6wis8i6wis.png', likes: 847 },
        { id: 2, src: '/Gemini_Generated_Image_9qtkwb9qtkwb9qtk.png', likes: 1234 },
        { id: 3, src: '/Gemini_Generated_Image_npmwp1npmwp1npmw.png', likes: 956 },
        { id: 4, src: '/Gemini_Generated_Image_nvjrtenvjrtenvjr.png', likes: 1089 },
        { id: 5, src: '/Gemini_Generated_Image_w2g165w2g165w2g1.png', likes: 723 },
        { id: 6, src: '/Gemini_Generated_Image_6wis8i6wis8i6wis.png', likes: 1567 },
    ]

    return (
        <section className="py-16 md:py-24 bg-white">
            {/* Header */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mb-10 text-center">
                <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                    @sttropezswimwear
                </p>
                <h2 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light mb-4">
                    Join Our Community
                </h2>
                <p className="font-body text-[var(--color-gray)] text-sm max-w-md mx-auto">
                    Tag us in your summer moments for a chance to be featured
                </p>
            </div>

            {/* Instagram Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
                {instagramImages.map((image) => (
                    <a
                        key={image.id}
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative aspect-square overflow-hidden group"
                    >
                        <img
                            src={image.src}
                            alt="Instagram post"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[var(--color-navy)]/0 group-hover:bg-[var(--color-navy)]/60 transition-colors duration-300 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                                <span className="font-body text-sm">{image.likes.toLocaleString()}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* Follow Button */}
            <div className="text-center mt-10">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-3 border border-[var(--color-navy)] text-[var(--color-navy)] font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy)] hover:text-white transition-all btn-hover-lift"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Follow Us
                </a>
            </div>
        </section>
    )
}
