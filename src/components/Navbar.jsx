import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-[var(--color-cream)]/95 backdrop-blur-sm shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <a href="/" className="relative z-10">
                        <h1
                            className={`font-heading text-2xl md:text-3xl font-normal tracking-wide transition-colors duration-500 ${scrolled || menuOpen ? 'text-[var(--color-navy)]' : 'text-white'
                                }`}
                        >
                            ST. TROPEZ
                        </h1>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {['Shop', 'Lookbook', 'About'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className={`font-body text-sm tracking-luxury uppercase transition-colors duration-300 hover:opacity-70 ${scrolled ? 'text-[var(--color-navy)]' : 'text-white'
                                    }`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Cart Icon */}
                    <button
                        className={`hidden md:block transition-colors duration-300 ${scrolled ? 'text-[var(--color-navy)]' : 'text-white'
                            }`}
                        aria-label="Shopping bag"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                        </svg>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`md:hidden relative z-10 transition-colors duration-300 ${scrolled || menuOpen ? 'text-[var(--color-navy)]' : 'text-white'
                            }`}
                        aria-label="Menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-[var(--color-cream)] transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {['Shop', 'Lookbook', 'About'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setMenuOpen(false)}
                            className="font-heading text-3xl text-[var(--color-navy)] tracking-wide"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
