import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, getProductsByCollection } from '../data/products'

export default function ProductPage() {
    const { productId } = useParams()
    const product = getProductById(productId)

    const [selectedColor, setSelectedColor] = useState(product?.colors[0])
    const [selectedSize, setSelectedSize] = useState(null)
    const [activeImage, setActiveImage] = useState(0)
    const [showSizeGuide, setShowSizeGuide] = useState(false)

    if (!product) {
        return (
            <div className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-heading text-[var(--color-navy)] text-3xl mb-4">Product Not Found</h1>
                    <Link to="/shop" className="font-body text-[var(--color-terracotta)] underline">
                        Back to Shop
                    </Link>
                </div>
            </div>
        )
    }

    const relatedProducts = getProductsByCollection(product.collection)
        .filter(p => p.id !== product.id)
        .slice(0, 4)

    return (
        <div className="min-h-screen bg-[var(--color-cream)]">
            {/* Breadcrumb */}
            <div className="pt-28 pb-8 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
                <nav className="flex items-center gap-2 font-body text-sm text-[var(--color-gray)]">
                    <Link to="/" className="hover:text-[var(--color-navy)] transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-[var(--color-navy)] transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-[var(--color-navy)]">{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-[3/4] bg-[var(--color-sand-light)] overflow-hidden">
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`w-20 h-24 overflow-hidden transition-all duration-300 ${activeImage === index
                                                ? 'ring-2 ring-[var(--color-navy)]'
                                                : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={image} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="lg:py-8">
                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
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

                        {/* Name & Price */}
                        <h1 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl lg:text-5xl font-light mb-4">
                            {product.name}
                        </h1>
                        <p className="font-body text-[var(--color-navy)] text-xl mb-8">
                            €{product.price}
                        </p>

                        {/* Description */}
                        <p className="font-body text-[var(--color-gray)] leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-body text-sm text-[var(--color-charcoal)]">
                                    Color: <span className="font-medium">{selectedColor?.name}</span>
                                </span>
                            </div>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-10 h-10 rounded-full transition-all duration-300 ${selectedColor?.name === color.name
                                                ? 'ring-2 ring-offset-2 ring-[var(--color-navy)]'
                                                : 'hover:scale-110'
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-3">
                                <span className="font-body text-sm text-[var(--color-charcoal)]">
                                    Size: <span className="font-medium">{selectedSize || 'Select a size'}</span>
                                </span>
                                <button
                                    onClick={() => setShowSizeGuide(true)}
                                    className="font-body text-sm text-[var(--color-terracotta)] underline hover:no-underline"
                                >
                                    Find Your Perfect Fit
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[3rem] px-4 py-3 font-body text-sm transition-all duration-300 border ${selectedSize === size
                                                ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)]'
                                                : 'bg-transparent text-[var(--color-navy)] border-[var(--color-navy)]/20 hover:border-[var(--color-navy)]'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Bag */}
                        <button
                            className={`w-full py-4 font-body text-sm tracking-luxury uppercase transition-all duration-300 mb-4 ${selectedSize
                                    ? 'bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)]'
                                    : 'bg-[var(--color-gray-light)] text-white cursor-not-allowed'
                                }`}
                            disabled={!selectedSize}
                        >
                            {selectedSize ? 'Add to Bag' : 'Select a Size'}
                        </button>

                        {/* Wishlist */}
                        <button className="w-full py-4 font-body text-sm tracking-luxury uppercase border border-[var(--color-navy)]/20 text-[var(--color-navy)] hover:border-[var(--color-navy)] transition-all duration-300 flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            Add to Wishlist
                        </button>

                        {/* Details Accordion */}
                        <div className="mt-12 border-t border-[var(--color-navy)]/10">
                            <details className="border-b border-[var(--color-navy)]/10">
                                <summary className="py-5 font-body text-sm text-[var(--color-navy)] cursor-pointer flex items-center justify-between">
                                    Details & Care
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </summary>
                                <div className="pb-5 font-body text-sm text-[var(--color-gray)] leading-relaxed">
                                    <p className="mb-3">• Made in Italy from premium recycled nylon</p>
                                    <p className="mb-3">• UPF 50+ sun protection</p>
                                    <p className="mb-3">• Chlorine and sunscreen resistant</p>
                                    <p>• Hand wash cold, lay flat to dry</p>
                                </div>
                            </details>

                            <details className="border-b border-[var(--color-navy)]/10">
                                <summary className="py-5 font-body text-sm text-[var(--color-navy)] cursor-pointer flex items-center justify-between">
                                    Shipping & Returns
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </summary>
                                <div className="pb-5 font-body text-sm text-[var(--color-gray)] leading-relaxed">
                                    <p className="mb-3">• Free shipping on orders over €150</p>
                                    <p className="mb-3">• Express delivery available</p>
                                    <p>• 30-day returns on unworn items</p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24 pt-16 border-t border-[var(--color-navy)]/10">
                        <h2 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light mb-12">
                            Complete the Look
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {relatedProducts.map((relatedProduct) => (
                                <Link
                                    key={relatedProduct.id}
                                    to={`/product/${relatedProduct.id}`}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-[var(--color-sand-light)]">
                                        <img
                                            src={relatedProduct.images[0]}
                                            alt={relatedProduct.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="font-heading text-[var(--color-navy)] text-lg font-normal mb-1">
                                        {relatedProduct.name}
                                    </h3>
                                    <p className="font-body text-[var(--color-gray)] text-sm">
                                        €{relatedProduct.price}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Size Guide Modal Placeholder */}
            {showSizeGuide && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6"
                    onClick={() => setShowSizeGuide(false)}
                >
                    <div
                        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto p-8 md:p-12"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-heading text-[var(--color-navy)] text-2xl md:text-3xl">
                                Find Your Perfect Fit
                            </h2>
                            <button
                                onClick={() => setShowSizeGuide(false)}
                                className="text-[var(--color-navy)] hover:opacity-70"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="text-center py-16 border-2 border-dashed border-[var(--color-navy)]/20 rounded-lg">
                            <div className="mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto text-[var(--color-terracotta)]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-[var(--color-navy)] text-xl mb-2">
                                Interactive Size Guide
                            </h3>
                            <p className="font-body text-[var(--color-gray)] max-w-md mx-auto">
                                The animated mannequin with adjustable measurements will be built here.
                                Drag the sliders to visualize how this piece fits your unique body shape.
                            </p>
                            <p className="font-body text-[var(--color-terracotta)] text-sm mt-4">
                                Coming Soon
                            </p>
                        </div>

                        {/* Traditional Size Chart */}
                        <div className="mt-8">
                            <h3 className="font-heading text-[var(--color-navy)] text-lg mb-4">Size Chart</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full font-body text-sm">
                                    <thead>
                                        <tr className="border-b border-[var(--color-navy)]/10">
                                            <th className="py-3 px-4 text-left text-[var(--color-navy)]">Size</th>
                                            <th className="py-3 px-4 text-left text-[var(--color-navy)]">Bust (cm)</th>
                                            <th className="py-3 px-4 text-left text-[var(--color-navy)]">Waist (cm)</th>
                                            <th className="py-3 px-4 text-left text-[var(--color-navy)]">Hips (cm)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[var(--color-gray)]">
                                        <tr className="border-b border-[var(--color-navy)]/5">
                                            <td className="py-3 px-4">XS</td>
                                            <td className="py-3 px-4">80-84</td>
                                            <td className="py-3 px-4">60-64</td>
                                            <td className="py-3 px-4">86-90</td>
                                        </tr>
                                        <tr className="border-b border-[var(--color-navy)]/5">
                                            <td className="py-3 px-4">S</td>
                                            <td className="py-3 px-4">84-88</td>
                                            <td className="py-3 px-4">64-68</td>
                                            <td className="py-3 px-4">90-94</td>
                                        </tr>
                                        <tr className="border-b border-[var(--color-navy)]/5">
                                            <td className="py-3 px-4">M</td>
                                            <td className="py-3 px-4">88-92</td>
                                            <td className="py-3 px-4">68-72</td>
                                            <td className="py-3 px-4">94-98</td>
                                        </tr>
                                        <tr className="border-b border-[var(--color-navy)]/5">
                                            <td className="py-3 px-4">L</td>
                                            <td className="py-3 px-4">92-96</td>
                                            <td className="py-3 px-4">72-76</td>
                                            <td className="py-3 px-4">98-102</td>
                                        </tr>
                                        <tr>
                                            <td className="py-3 px-4">XL</td>
                                            <td className="py-3 px-4">96-100</td>
                                            <td className="py-3 px-4">76-80</td>
                                            <td className="py-3 px-4">102-106</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
