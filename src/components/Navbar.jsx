import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()
    const { openCart, itemCount } = useCart()

    // Check if we're on a page with a dark hero (home, collection, lookbook)
    const hasDarkHero = location.pathname === '/' || location.pathname.startsWith('/collection') || location.pathname === '/lookbook'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Reset scroll state on route change
    useEffect(() => {
        setScrolled(window.scrollY > 50)
    }, [location.pathname])

    const navLinks = [
        { name: 'Shop', path: '/shop' },
        { name: 'Lookbook', path: '/lookbook' },
        { name: 'Collections', path: '/collection/the-riviera' },
        { name: 'About', path: '/#about' },
    ]

    // Determine text color based on scroll state and page type
    const textColorClass = scrolled || menuOpen || !hasDarkHero
        ? 'text-[var(--color-navy)]'
        : 'text-white'

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
                ? 'bg-white/60 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] border-b border-white/20'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="flex items-center justify-between h-20 md:h-24">
                    {/* Logo */}
                    <Link to="/" className="relative z-10">
                        <h1
                            className={`font-heading text-2xl md:text-3xl font-normal tracking-wide transition-colors duration-500 ${textColorClass}`}
                        >
                            ST. TROPEZ
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-body text-sm tracking-luxury uppercase transition-colors duration-300 hover:opacity-70 ${textColorClass}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side - Cart */}
                    <div className="flex items-center gap-4">
                        {/* Cart Icon */}
                        <button
                            onClick={openCart}
                            className={`relative transition-colors duration-300 ${textColorClass}`}
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

                            {/* Cart Badge */}
                            {itemCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[var(--color-terracotta)] text-white text-xs font-body flex items-center justify-center rounded-full">
                                    {itemCount > 9 ? '9+' : itemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`md:hidden relative z-10 transition-colors duration-300 ${scrolled || menuOpen ? 'text-[var(--color-navy)]' : textColorClass
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
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-[var(--color-cream)] transition-transform duration-500 z-30 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setMenuOpen(false)}
                            className="font-heading text-3xl text-[var(--color-navy)] tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}
