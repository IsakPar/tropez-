export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                {/* Placeholder gradient for now - will be replaced with real image */}
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(26, 43, 74, 0.3), rgba(26, 43, 74, 0.1)), 
                              url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')`,
                    }}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                {/* Tagline */}
                <p className="font-body text-white/90 text-xs md:text-sm tracking-wide-luxury uppercase mb-4">
                    Summer 2025 Collection
                </p>

                {/* Main Headline */}
                <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl font-light mb-8 max-w-4xl leading-tight">
                    Mediterranean <br className="hidden md:block" />
                    <em className="italic">Elegance</em>
                </h1>

                {/* CTA Button */}
                <a
                    href="#shop"
                    className="group inline-flex items-center gap-3 mt-4"
                >
                    <span className="font-body text-white text-sm tracking-luxury uppercase border-b border-white/50 pb-1 transition-all duration-300 group-hover:border-white">
                        Explore Collection
                    </span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className="flex flex-col items-center gap-2 text-white/70">
                    <span className="font-body text-xs tracking-wide uppercase">Scroll</span>
                    <div className="w-px h-12 bg-white/30 relative overflow-hidden">
                        <div className="w-full h-4 bg-white/70 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    )
}
