import { useState, useMemo, useCallback } from 'react'
import MannequinRenderer from './SizeGuide/Mannequin/MannequinRenderer'

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

// Default measurements
const DEFAULT_MEASUREMENTS = {
    bust: 90,
    cup: 'C',
    waist: 70,
    hips: 96,
}

// Measurement ranges
const MEASUREMENT_RANGES = {
    bust: { min: 75, max: 110 },
    waist: { min: 55, max: 90 },
    hips: { min: 80, max: 115 },
}

export default function InteractiveSizeGuide({ onSizeSelect, onClose }) {
    const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS)
    const [activeSlider, setActiveSlider] = useState(null)
    const [showHowToMeasure, setShowHowToMeasure] = useState(false)

    // Calculate recommended size
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

    // Calculate fit indicators
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
        setMeasurements(prev => ({ ...prev, [key]: value }))
    }, [])

    const handleCupChange = useCallback((cup) => {
        setMeasurements(prev => ({ ...prev, cup }))
    }, [])

    const handleSelectSize = () => {
        if (recommendedSize && onSizeSelect) {
            onSizeSelect(recommendedSize)
        }
        if (onClose) onClose()
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left: SVG Mannequin */}
            <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-[380px] bg-gradient-to-b from-[var(--color-sand-light)] to-white rounded-2xl p-6 shadow-inner">
                    <MannequinRenderer
                        bust={measurements.bust}
                        waist={measurements.waist}
                        hips={measurements.hips}
                        activeZone={activeSlider}
                    />
                </div>

                {/* Legend */}
                <div className="mt-6 flex items-center gap-6 font-body text-xs text-[var(--color-gray)]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-terracotta)]" />
                        <span>Active Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border-2 border-[#c4b5a9]" />
                        <span>Body Outline</span>
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
                        Adjust the sliders and watch the mannequin transform in real-time to match your body shape.
                    </p>
                </div>

                {/* How to Measure */}
                <button
                    onClick={() => setShowHowToMeasure(!showHowToMeasure)}
                    className="font-body text-sm text-[var(--color-terracotta)] flex items-center gap-2 hover:underline"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    {showHowToMeasure ? 'Hide guide' : 'How to measure yourself'}
                </button>

                {showHowToMeasure && (
                    <div className="p-5 bg-[var(--color-sand-light)] rounded-xl space-y-3 font-body text-sm text-[var(--color-gray)] border border-[var(--color-sand)]">
                        <p><strong className="text-[var(--color-navy)]">Bust:</strong> Measure around the fullest part of your chest.</p>
                        <p><strong className="text-[var(--color-navy)]">Waist:</strong> Measure your natural waistline, the narrowest part.</p>
                        <p><strong className="text-[var(--color-navy)]">Hips:</strong> Measure the fullest part, about 20cm below waist.</p>
                    </div>
                )}

                {/* Cup Size Selector */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <label className="font-body text-sm font-medium text-[var(--color-navy)]">Cup Size</label>
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
                    <p className="font-body text-sm text-[var(--color-gray)] mb-3">We recommend</p>
                    <div className="flex items-center gap-6">
                        <span className="font-heading text-[var(--color-navy)] text-5xl">{recommendedSize}</span>
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
                                        className={`font-body text-xs transition-all ${size === recommendedSize
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
                                <div key={key} className={`text-center p-3 ${config.bg} rounded-xl`}>
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

                {/* Select Button */}
                <button
                    onClick={handleSelectSize}
                    className="w-full py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-all rounded-lg hover:shadow-lg"
                >
                    Select Size {recommendedSize}
                </button>
            </div>
        </div>
    )
}

// Slider Component
function MeasurementSlider({ label, value, min, max, onChange, onFocus, onBlur, isActive }) {
    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={`transition-all duration-200 ${isActive ? 'scale-[1.01]' : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <label className={`font-body text-sm font-medium transition-colors ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                    }`}>
                    {label}
                </label>
                <div className="flex items-baseline gap-1">
                    <span className={`font-heading text-xl tabular-nums transition-colors ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                        }`}>
                        {value}
                    </span>
                    <span className="font-body text-sm text-[var(--color-gray)]">cm</span>
                </div>
            </div>

            <div className="relative h-3 bg-gradient-to-r from-[var(--color-sand)] to-[var(--color-sand-light)] rounded-full shadow-inner">
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-100 ${isActive ? 'bg-gradient-to-r from-[var(--color-terracotta)] to-[#d4705c]' : 'bg-[var(--color-navy)]/25'
                        }`}
                    style={{ width: `${percentage}%` }}
                />

                <div
                    className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 shadow-md transition-all duration-100 ${isActive
                        ? 'bg-white border-[var(--color-terracotta)] scale-110'
                        : 'bg-white border-[var(--color-navy)]/30'
                        }`}
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                    onMouseDown={onFocus}
                    onMouseUp={onBlur}
                    onMouseLeave={onBlur}
                    onTouchStart={onFocus}
                    onTouchEnd={onBlur}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            <div className="flex justify-between mt-1">
                <span className="font-body text-[10px] text-[var(--color-gray)]">{min} cm</span>
                <span className="font-body text-[10px] text-[var(--color-gray)]">{max} cm</span>
            </div>
        </div>
    )
}
