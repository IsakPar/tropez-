import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        // Load cart from localStorage on init
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('st-tropez-cart')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })
    const [isOpen, setIsOpen] = useState(false)

    // Save to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('st-tropez-cart', JSON.stringify(items))
    }, [items])

    // Add item to cart
    const addItem = (product, selectedColor, selectedSize, quantity = 1) => {
        setItems(currentItems => {
            // Check if item already exists with same color and size
            const existingIndex = currentItems.findIndex(
                item =>
                    item.productId === product.id &&
                    item.color.name === selectedColor.name &&
                    item.size === selectedSize
            )

            if (existingIndex > -1) {
                // Update quantity
                const updated = [...currentItems]
                updated[existingIndex].quantity += quantity
                return updated
            }

            // Add new item
            return [...currentItems, {
                id: `${product.id}-${selectedColor.name}-${selectedSize}-${Date.now()}`,
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                color: selectedColor,
                size: selectedSize,
                quantity,
            }]
        })
    }

    // Remove item from cart
    const removeItem = (itemId) => {
        setItems(currentItems => currentItems.filter(item => item.id !== itemId))
    }

    // Update item quantity
    const updateQuantity = (itemId, quantity) => {
        if (quantity < 1) {
            removeItem(itemId)
            return
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        )
    }

    // Clear cart
    const clearCart = () => {
        setItems([])
    }

    // Open/close cart drawer
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    const toggleCart = () => setIsOpen(prev => !prev)

    // Computed values
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    const value = {
        items,
        isOpen,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
