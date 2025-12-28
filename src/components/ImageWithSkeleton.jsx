/**
 * ImageWithSkeleton Component
 * 
 * Renders an image with a skeleton loading state.
 * Shows a shimmering placeholder while the image loads.
 */
import { useState } from 'react'

export default function ImageWithSkeleton({
    src,
    alt,
    className = '',
    containerClassName = '',
    aspectRatio = 'square'
}) {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    const aspectClasses = {
        square: 'aspect-square',
        video: 'aspect-video',
        portrait: 'aspect-[3/4]',
        landscape: 'aspect-[4/3]',
    }

    return (
        <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${containerClassName}`}>
            {/* Skeleton Loader */}
            {!loaded && !error && (
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-sand-light)] via-[var(--color-sand)] to-[var(--color-sand-light)] animate-shimmer bg-[length:200%_100%]" />
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 bg-[var(--color-sand-light)] flex items-center justify-center">
                    <svg className="w-8 h-8 text-[var(--color-gray)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}

            {/* Actual Image */}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
            />
        </div>
    )
}
