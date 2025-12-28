/**
 * WishlistButton Component
 * 
 * Heart icon button for adding/removing items from wishlist.
 * Shows filled heart when item is in wishlist.
 */
import { useWishlist } from '../context/WishlistContext'

export default function WishlistButton({ productId, size = 'md', className = '' }) {
    const { toggleWishlist, isInWishlist } = useWishlist()
    const inWishlist = isInWishlist(productId)

    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
        lg: 'w-7 h-7',
    }

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleWishlist(productId)
            }}
            className={`transition-all duration-300 hover:scale-110 ${className}`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={inWishlist ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`${sizeClasses[size]} ${inWishlist ? 'text-[var(--color-terracotta)]' : 'text-current'} transition-colors duration-300`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
        </button>
    )
}
