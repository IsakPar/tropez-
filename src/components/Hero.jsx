import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image with Ken Burns effect */}
            <div className="absolute inset-0">
                <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(26, 43, 74, 0.25), rgba(26, 43, 74, 0.15)), 
                              url('/hero-beach.jpg')`,
                    }}
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                {/* Tagline */}
                <p
                    className={`font-body text-white/90 text-xs md:text-sm tracking-wide-luxury uppercase mb-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    Summer 2025 Collection
                </p>

                {/* Main Headline */}
                <h1 className="font-heading text-white text-5xl md:text-7xl lg:text-8xl font-light mb-8 max-w-4xl leading-tight overflow-hidden">
                    <span
                        className={`inline-block transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                            }`}
                    >
                        Mediterranean
                    </span>
                    <br className="hidden md:block" />
                    <em
                        className={`inline-block italic transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
                            }`}
                    >
                        Elegance
                    </em>
                </h1>

                {/* CTA Button */}
                <Link
                    to="/shop"
                    className={`group inline-flex items-center gap-3 mt-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
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
                </Link>
            </div>

            {/* Scroll Indicator */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
            >
                <div className="flex flex-col items-center gap-2 text-white/70">
                    <span className="font-body text-xs tracking-wide uppercase">Scroll</span>
                    <div className="w-px h-12 bg-white/30 relative overflow-hidden">
                        <div className="w-full h-4 bg-white/70 animate-[scrollDown_1.5s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>
        </section>
    )
}
