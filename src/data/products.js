// Mock product data - will be replaced with D1 database later
export const products = [
    {
        id: 'riviera-bikini-top',
        name: 'Riviera Bikini Top',
        price: 95,
        description: 'A timeless triangle bikini top with adjustable ties and removable padding. Crafted from our signature quick-dry fabric with a buttery soft finish.',
        category: 'bikinis',
        collection: 'the-riviera',
        colors: [
            { name: 'Coral', hex: '#E8A090' },
            { name: 'Navy', hex: '#1A2B4A' },
            { name: 'Cream', hex: '#F5F0E8' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'regular',
        isBestseller: true,
        isNew: false,
    },
    {
        id: 'riviera-bikini-bottom',
        name: 'Riviera Bikini Bottom',
        price: 75,
        description: 'The perfect companion to our Riviera top. Mid-rise with moderate coverage and a flattering cut that stays in place.',
        category: 'bikinis',
        collection: 'the-riviera',
        colors: [
            { name: 'Coral', hex: '#E8A090' },
            { name: 'Navy', hex: '#1A2B4A' },
            { name: 'Cream', hex: '#F5F0E8' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'regular',
        isBestseller: true,
        isNew: false,
    },
    {
        id: 'monaco-one-piece',
        name: 'Monaco One-Piece',
        price: 165,
        description: 'An elegant one-piece with a plunging neckline and sophisticated cutouts. Designed to flatter every silhouette with its sculpting construction.',
        category: 'one-pieces',
        collection: 'cote-dazur',
        colors: [
            { name: 'Black', hex: '#1A1A1A' },
            { name: 'Terracotta', hex: '#C4836A' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'tight',
        isBestseller: true,
        isNew: true,
    },
    {
        id: 'cannes-wrap-bottom',
        name: 'Cannes Wrap Bottom',
        price: 75,
        description: 'A high-waisted bottom with an elegant wrap detail. Provides full coverage while accentuating your natural curves.',
        category: 'bikinis',
        collection: 'cote-dazur',
        colors: [
            { name: 'Olive', hex: '#6B7B5E' },
            { name: 'Sand', hex: '#D4C4B0' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'relaxed',
        isBestseller: false,
        isNew: true,
    },
    {
        id: 'saint-jean-coverup',
        name: 'Saint-Jean Cover-Up',
        price: 125,
        description: 'A lightweight linen cover-up that transitions effortlessly from beach to bar. Features a relaxed fit and side slits for ease of movement.',
        category: 'cover-ups',
        collection: 'the-riviera',
        colors: [
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Natural', hex: '#E8DFD4' },
        ],
        sizes: ['XS/S', 'M/L', 'XL/XXL'],
        images: ['/product-image.png'],
        fitType: 'relaxed',
        isBestseller: true,
        isNew: false,
    },
    {
        id: 'antibes-triangle-top',
        name: 'Antibes Triangle Top',
        price: 85,
        description: 'A classic triangle top with thin straps and a delicate gold-tone hardware detail. Perfect for sun-seekers who appreciate understated elegance.',
        category: 'bikinis',
        collection: 'cote-dazur',
        colors: [
            { name: 'Blush', hex: '#E8C4C4' },
            { name: 'Ocean', hex: '#4A7B8C' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'regular',
        isBestseller: false,
        isNew: true,
    },
    {
        id: 'nice-sarong',
        name: 'Nice Sarong',
        price: 65,
        description: 'A versatile sarong in our signature print. Wear it as a skirt, dress, or beach blanket — the possibilities are endless.',
        category: 'accessories',
        collection: 'the-riviera',
        colors: [
            { name: 'Mediterranean', hex: '#4A7B8C' },
        ],
        sizes: ['One Size'],
        images: ['/product-image.png'],
        fitType: 'relaxed',
        isBestseller: false,
        isNew: false,
    },
    {
        id: 'villefranche-bandeau',
        name: 'Villefranche Bandeau',
        price: 90,
        description: 'A sophisticated bandeau with removable straps and built-in support. Features our signature ruching for a flattering fit.',
        category: 'bikinis',
        collection: 'cote-dazur',
        colors: [
            { name: 'Cherry', hex: '#8B3A3A' },
            { name: 'Cream', hex: '#F5F0E8' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        images: ['/product-image.png'],
        fitType: 'tight',
        isBestseller: false,
        isNew: true,
    },
]

export const collections = [
    {
        id: 'the-riviera',
        name: 'The Riviera',
        slug: 'the-riviera',
        description: 'Timeless silhouettes inspired by the golden age of the French Riviera. Classic cuts, refined details, and colors that capture the essence of Mediterranean summers.',
        image: '/product-image.png',
        heroImage: '/collections-hero.jpg',
        season: 'Summer 2025',
    },
    {
        id: 'cote-dazur',
        name: "Côte d'Azur",
        slug: 'cote-dazur',
        description: 'Bold and refined pieces for the modern woman. Sophisticated cuts with unexpected details that make a statement without saying a word.',
        image: '/product-image.png',
        heroImage: '/collections-hero.jpg',
        season: 'Summer 2025',
    },
]

export const categories = [
    { id: 'all', name: 'All', slug: 'all' },
    { id: 'bikinis', name: 'Bikinis', slug: 'bikinis' },
    { id: 'one-pieces', name: 'One-Pieces', slug: 'one-pieces' },
    { id: 'cover-ups', name: 'Cover-Ups', slug: 'cover-ups' },
    { id: 'accessories', name: 'Accessories', slug: 'accessories' },
]

// Helper functions
export function getProductById(id) {
    return products.find(p => p.id === id)
}

export function getProductsByCollection(collectionId) {
    return products.filter(p => p.collection === collectionId)
}

export function getProductsByCategory(categorySlug) {
    if (categorySlug === 'all') return products
    return products.filter(p => p.category === categorySlug)
}

export function getCollectionById(id) {
    return collections.find(c => c.id === id)
}

export function getBestsellers() {
    return products.filter(p => p.isBestseller)
}

export function getNewArrivals() {
    return products.filter(p => p.isNew)
}
