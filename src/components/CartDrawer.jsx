import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
    const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart()

    // Free shipping threshold
    const freeShippingThreshold = 150
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeCart}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-cream)] z-50 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-navy)]/10">
                        <h2 className="font-heading text-[var(--color-navy)] text-2xl">
                            Your Bag
                            {itemCount > 0 && (
                                <span className="font-body text-sm text-[var(--color-gray)] ml-2">
                                    ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                                </span>
                            )}
                        </h2>
                        <button
                            onClick={closeCart}
                            className="text-[var(--color-navy)] hover:opacity-70 transition-opacity"
                            aria-label="Close cart"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Free Shipping Banner */}
                    {itemCount > 0 && remainingForFreeShipping > 0 && (
                        <div className="px-6 py-3 bg-[var(--color-sand)]">
                            <p className="font-body text-sm text-[var(--color-navy)]">
                                Add <span className="font-medium">€{remainingForFreeShipping.toFixed(0)}</span> more for free shipping
                            </p>
                            <div className="mt-2 h-1 bg-[var(--color-navy)]/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[var(--color-terracotta)] transition-all duration-500"
                                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {itemCount > 0 && remainingForFreeShipping <= 0 && (
                        <div className="px-6 py-3 bg-[var(--color-terracotta)]/10">
                            <p className="font-body text-sm text-[var(--color-terracotta)] flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                You've unlocked free shipping!
                            </p>
                        </div>
                    )}

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 text-[var(--color-gray-light)] mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <p className="font-heading text-[var(--color-navy)] text-xl mb-2">Your bag is empty</p>
                                <p className="font-body text-[var(--color-gray)] text-sm mb-6">
                                    Looks like you haven't added anything yet.
                                </p>
                                <Link
                                    to="/shop"
                                    onClick={closeCart}
                                    className="font-body text-sm text-[var(--color-navy)] border-b border-[var(--color-navy)] pb-0.5 hover:opacity-70 transition-opacity"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        {/* Product Image */}
                                        <Link
                                            to={`/product/${item.productId}`}
                                            onClick={closeCart}
                                            className="w-24 h-32 bg-[var(--color-sand-light)] flex-shrink-0 overflow-hidden"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <Link
                                                        to={`/product/${item.productId}`}
                                                        onClick={closeCart}
                                                        className="font-heading text-[var(--color-navy)] text-lg hover:text-[var(--color-terracotta)] transition-colors"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                    <p className="font-body text-[var(--color-gray)] text-sm mt-0.5">
                                                        {item.size} / {item.color.name}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[var(--color-gray)] hover:text-[var(--color-navy)] transition-colors"
                                                    aria-label="Remove item"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                {/* Quantity Selector */}
                                                <div className="flex items-center border border-[var(--color-navy)]/20">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-sand)] transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 h-8 flex items-center justify-center font-body text-sm text-[var(--color-navy)]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-[var(--color-navy)] hover:bg-[var(--color-sand)] transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <p className="font-body text-[var(--color-navy)]">
                                                    €{(item.price * item.quantity).toFixed(0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-[var(--color-navy)]/10 px-6 py-6 space-y-4">
                            {/* Subtotal */}
                            <div className="flex items-center justify-between">
                                <span className="font-body text-[var(--color-gray)]">Subtotal</span>
                                <span className="font-body text-[var(--color-navy)] text-lg">€{subtotal.toFixed(0)}</span>
                            </div>

                            <p className="font-body text-xs text-[var(--color-gray)]">
                                Shipping and taxes calculated at checkout.
                            </p>

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                onClick={closeCart}
                                className="block w-full py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors text-center"
                            >
                                Checkout
                            </Link>

                            {/* Continue Shopping */}
                            <button
                                onClick={closeCart}
                                className="w-full py-3 font-body text-sm text-[var(--color-navy)] text-center hover:opacity-70 transition-opacity"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
