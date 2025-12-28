/**
 * CurrencySelector Component
 * 
 * Dropdown for selecting display currency.
 */
import { useState, useRef, useEffect } from 'react'
import { useCurrency } from '../context/CurrencyContext'

export default function CurrencySelector({ className = '' }) {
    const { currency, currencies, setCurrency } = useCurrency()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 font-body text-sm transition-colors hover:opacity-70"
                aria-label="Select currency"
            >
                <span>{currency.code}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-[var(--color-sand)] overflow-hidden min-w-[120px] z-50">
                    {currencies.map((c) => (
                        <button
                            key={c.code}
                            onClick={() => {
                                setCurrency(c.code)
                                setIsOpen(false)
                            }}
                            className={`w-full px-4 py-2 text-left font-body text-sm transition-colors ${c.code === currency.code
                                    ? 'bg-[var(--color-sand-light)] text-[var(--color-navy)]'
                                    : 'text-[var(--color-gray)] hover:bg-[var(--color-sand-light)]'
                                }`}
                        >
                            <span className="mr-2">{c.symbol}</span>
                            {c.code}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
