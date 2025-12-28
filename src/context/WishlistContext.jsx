/**
 * Wishlist Context
 * 
 * Manages a user's wishlist/favorites across the site.
 * Persists to localStorage for returning visitors.
 */
import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}

export function WishlistProvider({ children }) {
    const [items, setItems] = useState(() => {
        // Load wishlist from localStorage on init
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('st-tropez-wishlist')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('st-tropez-wishlist', JSON.stringify(items))
    }, [items])

    // Add item to wishlist
    const addToWishlist = (productId) => {
        setItems(currentItems => {
            if (currentItems.includes(productId)) return currentItems
            return [...currentItems, productId]
        })
    }

    // Remove item from wishlist
    const removeFromWishlist = (productId) => {
        setItems(currentItems => currentItems.filter(id => id !== productId))
    }

    // Toggle wishlist item
    const toggleWishlist = (productId) => {
        if (items.includes(productId)) {
            removeFromWishlist(productId)
        } else {
            addToWishlist(productId)
        }
    }

    // Check if item is in wishlist
    const isInWishlist = (productId) => {
        return items.includes(productId)
    }

    // Clear wishlist
    const clearWishlist = () => {
        setItems([])
    }

    const value = {
        items,
        itemCount: items.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}
