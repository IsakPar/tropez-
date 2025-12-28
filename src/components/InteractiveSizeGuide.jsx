import { useState, useMemo, useCallback, useEffect } from 'react'

// Size chart data (in cm)
const SIZE_CHART = {
    XS: { bust: [80, 84], waist: [60, 64], hips: [86, 90] },
    S: { bust: [84, 88], waist: [64, 68], hips: [90, 94] },
    M: { bust: [88, 92], waist: [68, 72], hips: [94, 98] },
    L: { bust: [92, 96], waist: [72, 76], hips: [98, 102] },
    XL: { bust: [96, 100], waist: [76, 80], hips: [102, 106] },
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL']
const CUP_SIZES = ['A', 'B', 'C', 'D', 'DD+']

// Body type definitions with measurement ranges
const BODY_TYPES = [
    {
        id: 'petite',
        name: 'Petite',
        image: '/mannequins/petite.png',
        bustRange: [75, 84],
        cupRange: ['A', 'B'],
        waistRange: [55, 66],
        hipsRange: [80, 92],
        description: 'Smaller frame, XS-S',
    },
    {
        id: 'slim',
        name: 'Slim',
        image: '/mannequins/slim.png',
        bustRange: [80, 88],
        cupRange: ['A', 'B', 'C'],
        waistRange: [60, 70],
        hipsRange: [85, 95],
        description: 'Athletic build, S',
    },
    {
        id: 'pear',
        name: 'Pear',
        image: '/mannequins/pear.png',
        bustRange: [80, 90],
        cupRange: ['B', 'C'],
        waistRange: [62, 72],
        hipsRange: [94, 108],
        description: 'Curvier hips, S-M',
    },
    {
        id: 'average',
        name: 'Average',
        image: '/mannequins/average.png',
        bustRange: [86, 96],
        cupRange: ['B', 'C', 'D'],
        waistRange: [66, 76],
        hipsRange: [92, 102],
        description: 'Balanced, M',
    },
    {
        id: 'busty',
        name: 'Busty',
        image: '/mannequins/busty.png',
        bustRange: [92, 110],
        cupRange: ['D', 'DD+'],
        waistRange: [68, 82],
        hipsRange: [94, 106],
        description: 'Fuller bust, M-L',
    },
]

// Default measurements
const DEFAULT_MEASUREMENTS = {
    bust: 90,
    cup: 'C',
    waist: 70,
    hips: 96,
}

// Measurement ranges for sliders
const MEASUREMENT_RANGES = {
    bust: { min: 75, max: 110 },
    waist: { min: 55, max: 90 },
    hips: { min: 80, max: 115 },
}

export default function InteractiveSizeGuide({ onSizeSelect, onClose }) {
    const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS)
    const [activeSlider, setActiveSlider] = useState(null)
    const [showHowToMeasure, setShowHowToMeasure] = useState(false)
    const [mannequinLoaded, setMannequinLoaded] = useState(false)

    // Find the best matching body type based on measurements
    const selectedBodyType = useMemo(() => {
        let bestMatch = BODY_TYPES[3] // Default to 'average'
        let bestScore = Infinity

        for (const bodyType of BODY_TYPES) {
            let score = 0

            // Bust score
            const bustMid = (bodyType.bustRange[0] + bodyType.bustRange[1]) / 2
            score += Math.abs(measurements.bust - bustMid)

            // Cup score - prioritize matching cup size
            if (!bodyType.cupRange.includes(measurements.cup)) {
                score += 20 // Heavy penalty for wrong cup category
            }

            // Waist score
            const waistMid = (bodyType.waistRange[0] + bodyType.waistRange[1]) / 2
            score += Math.abs(measurements.waist - waistMid)

            // Hips score
            const hipsMid = (bodyType.hipsRange[0] + bodyType.hipsRange[1]) / 2
            score += Math.abs(measurements.hips - hipsMid)

            if (score < bestScore) {
                bestScore = score
                bestMatch = bodyType
            }
        }

        return bestMatch
    }, [measurements])

    // Calculate recommended size based on measurements
    const recommendedSize = useMemo(() => {
        let bestMatch = null
        let bestScore = Infinity

        for (const size of SIZES) {
            const chart = SIZE_CHART[size]
            let score = 0

            for (const key of ['bust', 'waist', 'hips']) {
                const [min, max] = chart[key]
                const value = measurements[key]

                if (value < min) {
                    score += (min - value) ** 2
                } else if (value > max) {
                    score += (value - max) ** 2
                }
            }

            if (score < bestScore) {
                bestScore = score
                bestMatch = size
            }
        }

        return bestMatch
    }, [measurements])

    // Calculate fit indicator for each measurement
    const fitIndicators = useMemo(() => {
        if (!recommendedSize) return {}

        const chart = SIZE_CHART[recommendedSize]
        const indicators = {}

        for (const key of ['bust', 'waist', 'hips']) {
            const [min, max] = chart[key]
            const value = measurements[key]

            if (value < min) {
                indicators[key] = { status: 'loose', label: 'Relaxed' }
            } else if (value > max) {
                indicators[key] = { status: 'snug', label: 'Snug' }
            } else {
                indicators[key] = { status: 'perfect', label: 'Perfect' }
            }
        }

        return indicators
    }, [measurements, recommendedSize])

    const handleMeasurementChange = useCallback((key, value) => {
        setMeasurements(prev => ({
            ...prev,
            [key]: value,
        }))
    }, [])

    const handleCupChange = useCallback((cup) => {
        setMeasurements(prev => ({
            ...prev,
            cup,
        }))
    }, [])

    const handleSelectSize = () => {
        if (recommendedSize && onSizeSelect) {
            onSizeSelect(recommendedSize)
        }
        if (onClose) {
            onClose()
        }
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: Mannequin Display */}
            <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-[300px] aspect-[3/5] bg-gradient-to-b from-[var(--color-sand-light)] to-white rounded-2xl overflow-hidden">
                    {/* Loading state */}
                    {!mannequinLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-[var(--color-terracotta)] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Mannequin Image */}
                    <img
                        src={selectedBodyType.image}
                        alt={`${selectedBodyType.name} body type`}
                        className={`w-full h-full object-contain transition-opacity duration-500 ${mannequinLoaded ? 'opacity-100' : 'opacity-0'
                            }`}
                        onLoad={() => setMannequinLoaded(true)}
                    />

                    {/* Body Type Label */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                        <p className="font-body text-xs text-[var(--color-gray)] mb-1">Your body type</p>
                        <p className="font-heading text-[var(--color-navy)] text-lg">{selectedBodyType.name}</p>
                        <p className="font-body text-xs text-[var(--color-gray)]">{selectedBodyType.description}</p>
                    </div>

                    {/* Measurement Zone Indicators */}
                    {activeSlider && (
                        <div className="absolute inset-0 pointer-events-none">
                            {activeSlider === 'bust' && (
                                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[70%] h-[1px] bg-[var(--color-terracotta)]">
                                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 font-body text-xs text-[var(--color-terracotta)] bg-white px-2 py-1 rounded">
                                        Bust: {measurements.bust}cm
                                    </span>
                                </div>
                            )}
                            {activeSlider === 'waist' && (
                                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 w-[50%] h-[1px] bg-[var(--color-terracotta)]">
                                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 font-body text-xs text-[var(--color-terracotta)] bg-white px-2 py-1 rounded">
                                        Waist: {measurements.waist}cm
                                    </span>
                                </div>
                            )}
                            {activeSlider === 'hips' && (
                                <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-[65%] h-[1px] bg-[var(--color-terracotta)]">
                                    <div className="absolute -left-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <div className="absolute -right-1 -top-1 w-2 h-2 bg-[var(--color-terracotta)] rounded-full" />
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-6 font-body text-xs text-[var(--color-terracotta)] bg-white px-2 py-1 rounded">
                                        Hips: {measurements.hips}cm
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Body Type Selector (manual override) */}
                <div className="mt-6 w-full max-w-[300px]">
                    <p className="font-body text-xs text-[var(--color-gray)] mb-2 text-center">Or select your body type</p>
                    <div className="flex justify-center gap-2">
                        {BODY_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => {
                                    // Set measurements to match this body type
                                    setMeasurements({
                                        bust: Math.round((type.bustRange[0] + type.bustRange[1]) / 2),
                                        cup: type.cupRange[Math.floor(type.cupRange.length / 2)],
                                        waist: Math.round((type.waistRange[0] + type.waistRange[1]) / 2),
                                        hips: Math.round((type.hipsRange[0] + type.hipsRange[1]) / 2),
                                    })
                                }}
                                className={`px-3 py-1.5 font-body text-xs rounded-full transition-all ${selectedBodyType.id === type.id
                                        ? 'bg-[var(--color-terracotta)] text-white'
                                        : 'bg-[var(--color-sand)] text-[var(--color-navy)] hover:bg-[var(--color-sand-dark)]'
                                    }`}
                            >
                                {type.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex-1 space-y-6">
                {/* Header */}
                <div>
                    <h3 className="font-heading text-[var(--color-navy)] text-2xl mb-2">
                        Find Your Perfect Fit
                    </h3>
                    <p className="font-body text-[var(--color-gray)] text-sm leading-relaxed">
                        Enter your measurements to find your ideal size. The mannequin will update to show a body type similar to yours.
                    </p>
                </div>

                {/* How to Measure Link */}
                <button
                    onClick={() => setShowHowToMeasure(!showHowToMeasure)}
                    className="font-body text-sm text-[var(--color-terracotta)] flex items-center gap-2 hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    {showHowToMeasure ? 'Hide measuring guide' : 'How to measure yourself'}
                </button>

                {/* How to Measure Info */}
                {showHowToMeasure && (
                    <div className="p-5 bg-[var(--color-sand-light)] rounded-xl space-y-3 font-body text-sm text-[var(--color-gray)] border border-[var(--color-sand)]">
                        <p><strong className="text-[var(--color-navy)]">Bust:</strong> Measure around the fullest part of your chest, keeping the tape level.</p>
                        <p><strong className="text-[var(--color-navy)]">Cup Size:</strong> The difference between your bust and underbust measurements determines cup size.</p>
                        <p><strong className="text-[var(--color-navy)]">Waist:</strong> Measure around your natural waistline, the narrowest part of your torso.</p>
                        <p><strong className="text-[var(--color-navy)]">Hips:</strong> Measure around the fullest part of your hips, about 20cm below your waist.</p>
                    </div>
                )}

                {/* Cup Size Selector */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-body text-sm font-medium text-[var(--color-navy)]">
                            Cup Size
                        </label>
                        <span className="font-heading text-xl text-[var(--color-navy)]">{measurements.cup}</span>
                    </div>
                    <div className="flex gap-2">
                        {CUP_SIZES.map((cup) => (
                            <button
                                key={cup}
                                onClick={() => handleCupChange(cup)}
                                className={`flex-1 py-3 font-body text-sm rounded-lg transition-all ${measurements.cup === cup
                                        ? 'bg-[var(--color-navy)] text-white shadow-md'
                                        : 'bg-[var(--color-sand)] text-[var(--color-navy)] hover:bg-[var(--color-sand-dark)]'
                                    }`}
                            >
                                {cup}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Measurement Sliders */}
                <div className="space-y-5">
                    <MeasurementSlider
                        label="Bust"
                        value={measurements.bust}
                        min={MEASUREMENT_RANGES.bust.min}
                        max={MEASUREMENT_RANGES.bust.max}
                        onChange={(v) => handleMeasurementChange('bust', v)}
                        onFocus={() => setActiveSlider('bust')}
                        onBlur={() => setActiveSlider(null)}
                        isActive={activeSlider === 'bust'}
                    />
                    <MeasurementSlider
                        label="Waist"
                        value={measurements.waist}
                        min={MEASUREMENT_RANGES.waist.min}
                        max={MEASUREMENT_RANGES.waist.max}
                        onChange={(v) => handleMeasurementChange('waist', v)}
                        onFocus={() => setActiveSlider('waist')}
                        onBlur={() => setActiveSlider(null)}
                        isActive={activeSlider === 'waist'}
                    />
                    <MeasurementSlider
                        label="Hips"
                        value={measurements.hips}
                        min={MEASUREMENT_RANGES.hips.min}
                        max={MEASUREMENT_RANGES.hips.max}
                        onChange={(v) => handleMeasurementChange('hips', v)}
                        onFocus={() => setActiveSlider('hips')}
                        onBlur={() => setActiveSlider(null)}
                        isActive={activeSlider === 'hips'}
                    />
                </div>

                {/* Size Recommendation */}
                <div className="p-6 bg-gradient-to-br from-[var(--color-sand)] to-[var(--color-sand-light)] rounded-xl">
                    <p className="font-body text-sm text-[var(--color-gray)] mb-3">
                        We recommend
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="font-heading text-[var(--color-navy)] text-5xl">
                            {recommendedSize}
                        </span>
                        <div className="flex-1">
                            <div className="flex gap-1.5">
                                {SIZES.map((size) => (
                                    <div
                                        key={size}
                                        className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${size === recommendedSize
                                                ? 'bg-[var(--color-terracotta)] scale-y-125'
                                                : 'bg-[var(--color-navy)]/10'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-2">
                                {SIZES.map((size) => (
                                    <span
                                        key={size}
                                        className={`font-body text-xs transition-all duration-500 ${size === recommendedSize
                                                ? 'text-[var(--color-terracotta)] font-semibold'
                                                : 'text-[var(--color-gray)]'
                                            }`}
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fit Summary */}
                <div className="space-y-3">
                    <p className="font-body text-sm text-[var(--color-navy)] font-medium">Fit Summary</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['bust', 'waist', 'hips'].map((key) => {
                            const indicator = fitIndicators[key]
                            if (!indicator) return null

                            const config = {
                                perfect: { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '✓' },
                                snug: { color: 'text-amber-600', bg: 'bg-amber-50', icon: '→' },
                                loose: { color: 'text-sky-600', bg: 'bg-sky-50', icon: '←' },
                            }[indicator.status]

                            return (
                                <div key={key} className={`text-center p-3 ${config.bg} rounded-xl transition-all duration-300`}>
                                    <p className="font-body text-xs text-[var(--color-gray)] capitalize mb-1">{key}</p>
                                    <p className={`font-body text-sm font-semibold ${config.color} flex items-center justify-center gap-1`}>
                                        <span>{config.icon}</span>
                                        {indicator.label}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Select Size Button */}
                <button
                    onClick={handleSelectSize}
                    className="w-full py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all duration-300 rounded-lg hover:shadow-lg"
                >
                    Select Size {recommendedSize}
                </button>
            </div>
        </div>
    )
}

// Measurement Slider Component
function MeasurementSlider({ label, value, min, max, onChange, onFocus, onBlur, isActive }) {
    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={`transition-all duration-300 ${isActive ? 'scale-[1.01]' : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <label className={`font-body text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                    }`}>
                    {label}
                </label>
                <div className="flex items-baseline gap-1">
                    <span className={`font-heading text-xl tabular-nums transition-colors duration-300 ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                        }`}>
                        {value}
                    </span>
                    <span className="font-body text-sm text-[var(--color-gray)]">cm</span>
                </div>
            </div>

            <div className="relative h-3 bg-gradient-to-r from-[var(--color-sand)] to-[var(--color-sand-light)] rounded-full overflow-hidden shadow-inner">
                {/* Track fill */}
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-150 ${isActive ? 'bg-gradient-to-r from-[var(--color-terracotta)] to-[#d4705c]' : 'bg-[var(--color-navy)]/25'
                        }`}
                    style={{ width: `${percentage}%` }}
                />

                {/* Thumb indicator */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 transition-all duration-150 shadow-md ${isActive
                            ? 'bg-white border-[var(--color-terracotta)] scale-110'
                            : 'bg-white border-[var(--color-navy)]/30'
                        }`}
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />

                {/* Hidden range input */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onMouseDown={onFocus}
                    onMouseUp={onBlur}
                    onTouchStart={onFocus}
                    onTouchEnd={onBlur}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {/* Range labels */}
            <div className="flex justify-between mt-1">
                <span className="font-body text-[10px] text-[var(--color-gray)]">{min} cm</span>
                <span className="font-body text-[10px] text-[var(--color-gray)]">{max} cm</span>
            </div>
        </div>
    )
}
