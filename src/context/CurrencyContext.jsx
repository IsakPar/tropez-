/**
 * Currency Context
 * 
 * Manages selected currency across the site.
 * Provides conversion rates for display purposes.
 */
import { createContext, useContext, useState, useEffect } from 'react'

const CurrencyContext = createContext()

export const currencies = [
    { code: 'EUR', symbol: '€', name: 'Euro', rate: 1 },
    { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.08 },
    { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.86 },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc', rate: 0.94 },
]

export function useCurrency() {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider')
    }
    return context
}

export function CurrencyProvider({ children }) {
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        // Load from localStorage or default to EUR
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('st-tropez-currency')
            const found = currencies.find(c => c.code === saved)
            return found || currencies[0]
        }
        return currencies[0]
    })

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('st-tropez-currency', selectedCurrency.code)
    }, [selectedCurrency])

    // Convert price from EUR to selected currency
    const convertPrice = (priceInEur) => {
        return (priceInEur * selectedCurrency.rate).toFixed(2)
    }

    // Format price with currency symbol
    const formatPrice = (priceInEur) => {
        const converted = convertPrice(priceInEur)
        return `${selectedCurrency.symbol}${converted}`
    }

    const value = {
        currency: selectedCurrency,
        currencies,
        setCurrency: (currencyCode) => {
            const found = currencies.find(c => c.code === currencyCode)
            if (found) setSelectedCurrency(found)
        },
        convertPrice,
        formatPrice,
    }

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    )
}
