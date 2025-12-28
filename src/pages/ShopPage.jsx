import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products'

export default function ShopPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const activeCategory = searchParams.get('category') || 'all'

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory)

    return (
        <div className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24">
            {/* Page Header */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
                <h1 className="font-heading text-[var(--color-navy)] text-4xl md:text-5xl lg:text-6xl font-light">
                    Shop
                </h1>
            </div>

            {/* Category Filters */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 mb-12">
                <div className="flex flex-wrap gap-3 md:gap-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSearchParams(category.slug === 'all' ? {} : { category: category.slug })}
                            className={`px-6 py-2.5 font-body text-sm tracking-wide transition-all duration-300 border ${activeCategory === category.slug
                                    ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]'
                                    : 'bg-transparent text-[var(--color-navy)] border-[var(--color-navy)]/20 hover:border-[var(--color-navy)]/50'
                                }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[var(--color-sand-light)]">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.isNew && (
                                        <span className="bg-[var(--color-terracotta)] text-white text-xs px-3 py-1 font-body tracking-wide uppercase">
                                            New
                                        </span>
                                    )}
                                    {product.isBestseller && (
                                        <span className="bg-[var(--color-navy)] text-white text-xs px-3 py-1 font-body tracking-wide uppercase">
                                            Bestseller
                                        </span>
                                    )}
                                </div>

                                {/* Quick View Overlay */}
                                <div className="absolute inset-0 bg-[var(--color-navy)]/0 group-hover:bg-[var(--color-navy)]/10 transition-colors duration-300 flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-6 py-2 text-sm font-body tracking-wide text-[var(--color-navy)]">
                                        View Product
                                    </span>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div>
                                <h3 className="font-heading text-[var(--color-navy)] text-lg md:text-xl font-normal mb-1 group-hover:text-[var(--color-terracotta)] transition-colors duration-300">
                                    {product.name}
                                </h3>
                                <p className="font-body text-[var(--color-gray)] text-sm">
                                    €{product.price}
                                </p>

                                {/* Color Swatches */}
                                <div className="flex gap-1.5 mt-3">
                                    {product.colors.slice(0, 4).map((color) => (
                                        <div
                                            key={color.name}
                                            className="w-4 h-4 rounded-full border border-black/10"
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 text-center py-20">
                    <p className="font-body text-[var(--color-gray)] text-lg">
                        No products found in this category.
                    </p>
                </div>
            )}
        </div>
    )
}
