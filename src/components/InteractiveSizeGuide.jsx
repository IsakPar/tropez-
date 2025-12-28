import { useState, useMemo, useCallback } from 'react'

// Size chart data (in cm)
const SIZE_CHART = {
    XS: { bust: [80, 84], waist: [60, 64], hips: [86, 90] },
    S: { bust: [84, 88], waist: [64, 68], hips: [90, 94] },
    M: { bust: [88, 92], waist: [68, 72], hips: [94, 98] },
    L: { bust: [92, 96], waist: [72, 76], hips: [98, 102] },
    XL: { bust: [96, 100], waist: [76, 80], hips: [102, 106] },
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL']

// Default measurements (represents average "M" size)
const DEFAULT_MEASUREMENTS = {
    bust: 90,
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

    // Calculate recommended size based on measurements
    const recommendedSize = useMemo(() => {
        let bestMatch = null
        let bestScore = Infinity

        for (const size of SIZES) {
            const chart = SIZE_CHART[size]
            let score = 0

            // Calculate how far each measurement is from this size's range
            for (const key of ['bust', 'waist', 'hips']) {
                const [min, max] = chart[key]
                const value = measurements[key]

                if (value < min) {
                    score += (min - value) ** 2
                } else if (value > max) {
                    score += (value - max) ** 2
                }
                // If within range, score is 0 for this measurement
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
            const mid = (min + max) / 2
            const range = max - min

            if (value < min) {
                indicators[key] = { status: 'loose', offset: ((min - value) / range) * -1 }
            } else if (value > max) {
                indicators[key] = { status: 'snug', offset: ((value - max) / range) }
            } else {
                // Within range - calculate position (-1 to 1)
                indicators[key] = { status: 'perfect', offset: (value - mid) / (range / 2) }
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
            {/* Left: Mannequin Visualization */}
            <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-[280px] aspect-[1/2]">
                    <MannequinSVG
                        measurements={measurements}
                        activeSlider={activeSlider}
                        fitIndicators={fitIndicators}
                    />
                </div>

                {/* Fit Legend */}
                <div className="mt-6 flex items-center gap-6 font-body text-xs text-[var(--color-gray)]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-terracotta)]" />
                        <span>Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-navy)]/20" />
                        <span>Measurement Area</span>
                    </div>
                </div>
            </div>

            {/* Right: Controls */}
            <div className="flex-1 space-y-8">
                {/* Header */}
                <div>
                    <h3 className="font-heading text-[var(--color-navy)] text-2xl mb-2">
                        Find Your Perfect Fit
                    </h3>
                    <p className="font-body text-[var(--color-gray)] text-sm">
                        Adjust the sliders to match your measurements. Watch the mannequin transform to show how it fits your unique body shape.
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
                    How to measure yourself
                </button>

                {/* How to Measure Info */}
                {showHowToMeasure && (
                    <div className="p-4 bg-[var(--color-sand-light)] rounded-lg space-y-3 font-body text-sm text-[var(--color-gray)]">
                        <p><strong className="text-[var(--color-navy)]">Bust:</strong> Measure around the fullest part of your chest, keeping the tape level.</p>
                        <p><strong className="text-[var(--color-navy)]">Waist:</strong> Measure around your natural waistline, the narrowest part of your torso.</p>
                        <p><strong className="text-[var(--color-navy)]">Hips:</strong> Measure around the fullest part of your hips, about 20cm below your waist.</p>
                    </div>
                )}

                {/* Measurement Sliders */}
                <div className="space-y-6">
                    <MeasurementSlider
                        label="Bust"
                        value={measurements.bust}
                        min={MEASUREMENT_RANGES.bust.min}
                        max={MEASUREMENT_RANGES.bust.max}
                        onChange={(v) => handleMeasurementChange('bust', v)}
                        onFocus={() => setActiveSlider('bust')}
                        onBlur={() => setActiveSlider(null)}
                        isActive={activeSlider === 'bust'}
                        fitIndicator={fitIndicators.bust}
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
                        fitIndicator={fitIndicators.waist}
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
                        fitIndicator={fitIndicators.hips}
                    />
                </div>

                {/* Size Recommendation */}
                <div className="p-6 bg-[var(--color-sand)] rounded-lg">
                    <p className="font-body text-sm text-[var(--color-gray)] mb-2">
                        We recommend
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="font-heading text-[var(--color-navy)] text-4xl">
                            {recommendedSize}
                        </span>
                        <div className="flex-1">
                            <div className="flex gap-1">
                                {SIZES.map((size) => (
                                    <div
                                        key={size}
                                        className={`flex-1 h-2 rounded-full transition-colors duration-300 ${size === recommendedSize
                                                ? 'bg-[var(--color-terracotta)]'
                                                : 'bg-[var(--color-navy)]/10'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-1">
                                {SIZES.map((size) => (
                                    <span
                                        key={size}
                                        className={`font-body text-xs transition-colors duration-300 ${size === recommendedSize
                                                ? 'text-[var(--color-terracotta)] font-medium'
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
                <div className="space-y-2">
                    <p className="font-body text-sm text-[var(--color-navy)]">Fit Summary</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['bust', 'waist', 'hips'].map((key) => {
                            const indicator = fitIndicators[key]
                            if (!indicator) return null

                            return (
                                <div key={key} className="text-center p-3 bg-[var(--color-cream)] rounded-lg">
                                    <p className="font-body text-xs text-[var(--color-gray)] capitalize mb-1">{key}</p>
                                    <p className={`font-body text-sm font-medium capitalize ${indicator.status === 'perfect'
                                            ? 'text-green-600'
                                            : indicator.status === 'snug'
                                                ? 'text-[var(--color-terracotta)]'
                                                : 'text-blue-600'
                                        }`}>
                                        {indicator.status === 'perfect' ? 'Perfect' : indicator.status === 'snug' ? 'Snug' : 'Relaxed'}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Select Size Button */}
                <button
                    onClick={handleSelectSize}
                    className="w-full py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors"
                >
                    Select Size {recommendedSize}
                </button>
            </div>
        </div>
    )
}

// Measurement Slider Component
function MeasurementSlider({ label, value, min, max, onChange, onFocus, onBlur, isActive, fitIndicator }) {
    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={`transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <label className={`font-body text-sm transition-colors duration-300 ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                    }`}>
                    {label}
                </label>
                <div className="flex items-center gap-2">
                    <span className="font-body text-lg text-[var(--color-navy)] tabular-nums">
                        {value}
                    </span>
                    <span className="font-body text-sm text-[var(--color-gray)]">cm</span>
                </div>
            </div>

            <div className="relative h-2 bg-[var(--color-navy)]/10 rounded-full overflow-hidden">
                <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-150 ${isActive ? 'bg-[var(--color-terracotta)]' : 'bg-[var(--color-navy)]/30'
                        }`}
                    style={{ width: `${percentage}%` }}
                />
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

            {/* Fit indicator dot */}
            {fitIndicator && (
                <div className="flex justify-between mt-1">
                    <span className="font-body text-xs text-[var(--color-gray)]">{min}</span>
                    <span className="font-body text-xs text-[var(--color-gray)]">{max}</span>
                </div>
            )}
        </div>
    )
}

// SVG Mannequin Component
function MannequinSVG({ measurements, activeSlider, fitIndicators }) {
    // Normalize measurements to 0-1 range for SVG manipulation
    const bustNorm = (measurements.bust - 75) / 35 // 75-110 range
    const waistNorm = (measurements.waist - 55) / 35 // 55-90 range
    const hipsNorm = (measurements.hips - 80) / 35 // 80-115 range

    // Calculate body proportions
    const bustWidth = 45 + bustNorm * 25 // 45-70
    const waistWidth = 30 + waistNorm * 20 // 30-50
    const hipsWidth = 48 + hipsNorm * 25 // 48-73

    // Control points for the body curve
    const bodyPath = useMemo(() => {
        const centerX = 100
        const shoulderY = 80
        const bustY = 130
        const waistY = 180
        const hipsY = 230
        const legSplitY = 280

        // Right side of body (mirrored for left)
        const shoulderX = centerX + 35
        const bustOuterX = centerX + bustWidth
        const waistOuterX = centerX + waistWidth
        const hipsOuterX = centerX + hipsWidth
        const legOuterX = centerX + 25

        // Build path with smooth curves
        return `
      M ${centerX} ${shoulderY - 10}
      
      Q ${centerX + 15} ${shoulderY - 5}, ${shoulderX} ${shoulderY}
      
      C ${shoulderX + 5} ${shoulderY + 20}, 
        ${bustOuterX + 5} ${bustY - 20}, 
        ${bustOuterX} ${bustY}
      
      C ${bustOuterX - 5} ${bustY + 25}, 
        ${waistOuterX + 5} ${waistY - 15}, 
        ${waistOuterX} ${waistY}
      
      C ${waistOuterX + 5} ${waistY + 20}, 
        ${hipsOuterX + 5} ${hipsY - 25}, 
        ${hipsOuterX} ${hipsY}
      
      C ${hipsOuterX - 5} ${hipsY + 25}, 
        ${legOuterX + 15} ${legSplitY - 10}, 
        ${legOuterX + 10} ${legSplitY}
      
      L ${legOuterX + 5} ${legSplitY + 120}
      L ${centerX + 8} ${legSplitY + 120}
      L ${centerX + 5} ${legSplitY + 5}
      
      L ${centerX - 5} ${legSplitY + 5}
      L ${centerX - 8} ${legSplitY + 120}
      L ${centerX - legOuterX + centerX - 5} ${legSplitY + 120}
      
      L ${centerX - legOuterX + centerX - 10} ${legSplitY}
      
      C ${centerX - legOuterX + centerX - 15} ${legSplitY - 10},
        ${centerX - hipsOuterX + centerX + 5} ${hipsY + 25},
        ${centerX - hipsOuterX + centerX} ${hipsY}
      
      C ${centerX - hipsOuterX + centerX - 5} ${hipsY - 25},
        ${centerX - waistOuterX + centerX - 5} ${waistY + 20},
        ${centerX - waistOuterX + centerX} ${waistY}
      
      C ${centerX - waistOuterX + centerX + 5} ${waistY - 15},
        ${centerX - bustOuterX + centerX + 5} ${bustY + 25},
        ${centerX - bustOuterX + centerX} ${bustY}
      
      C ${centerX - bustOuterX + centerX - 5} ${bustY - 20},
        ${centerX - shoulderX - 5} ${shoulderY + 20},
        ${centerX - shoulderX + centerX} ${shoulderY}
      
      Q ${centerX - 15} ${shoulderY - 5}, ${centerX} ${shoulderY - 10}
      
      Z
    `
    }, [bustWidth, waistWidth, hipsWidth])

    // Measurement zone highlights
    const bustZone = {
        y: 115,
        height: 35,
        width: bustWidth * 2,
    }
    const waistZone = {
        y: 165,
        height: 30,
        width: waistWidth * 2,
    }
    const hipsZone = {
        y: 215,
        height: 35,
        width: hipsWidth * 2,
    }

    return (
        <svg
            viewBox="0 0 200 420"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.08))' }}
        >
            <defs>
                {/* Gradient for body */}
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-sand)" />
                    <stop offset="100%" stopColor="var(--color-cream)" />
                </linearGradient>

                {/* Gradient for active zone */}
                <linearGradient id="activeZoneGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--color-terracotta)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0.3" />
                </linearGradient>

                {/* Clip path for zones */}
                <clipPath id="bodyClip">
                    <path d={bodyPath} />
                </clipPath>
            </defs>

            {/* Head */}
            <ellipse
                cx="100"
                cy="35"
                rx="25"
                ry="30"
                fill="url(#bodyGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1"
                strokeOpacity="0.15"
            />

            {/* Neck */}
            <rect
                x="90"
                y="60"
                width="20"
                height="15"
                fill="url(#bodyGradient)"
            />

            {/* Body */}
            <path
                d={bodyPath}
                fill="url(#bodyGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                className="transition-all duration-300 ease-out"
            />

            {/* Measurement Zone Highlights (clipped to body) */}
            <g clipPath="url(#bodyClip)">
                {/* Bust Zone */}
                <rect
                    x={100 - bustZone.width / 2}
                    y={bustZone.y}
                    width={bustZone.width}
                    height={bustZone.height}
                    fill={activeSlider === 'bust' ? 'url(#activeZoneGradient)' : 'var(--color-navy)'}
                    fillOpacity={activeSlider === 'bust' ? 1 : 0.05}
                    className="transition-all duration-300"
                />

                {/* Waist Zone */}
                <rect
                    x={100 - waistZone.width / 2}
                    y={waistZone.y}
                    width={waistZone.width}
                    height={waistZone.height}
                    fill={activeSlider === 'waist' ? 'url(#activeZoneGradient)' : 'var(--color-navy)'}
                    fillOpacity={activeSlider === 'waist' ? 1 : 0.05}
                    className="transition-all duration-300"
                />

                {/* Hips Zone */}
                <rect
                    x={100 - hipsZone.width / 2}
                    y={hipsZone.y}
                    width={hipsZone.width}
                    height={hipsZone.height}
                    fill={activeSlider === 'hips' ? 'url(#activeZoneGradient)' : 'var(--color-navy)'}
                    fillOpacity={activeSlider === 'hips' ? 1 : 0.05}
                    className="transition-all duration-300"
                />
            </g>

            {/* Measurement Lines */}
            {activeSlider && (
                <g className="animate-pulse">
                    {activeSlider === 'bust' && (
                        <>
                            <line
                                x1={100 - bustWidth}
                                y1={bustZone.y + bustZone.height / 2}
                                x2={100 + bustWidth}
                                y2={bustZone.y + bustZone.height / 2}
                                stroke="var(--color-terracotta)"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                            />
                            <circle cx={100 - bustWidth} cy={bustZone.y + bustZone.height / 2} r="4" fill="var(--color-terracotta)" />
                            <circle cx={100 + bustWidth} cy={bustZone.y + bustZone.height / 2} r="4" fill="var(--color-terracotta)" />
                        </>
                    )}
                    {activeSlider === 'waist' && (
                        <>
                            <line
                                x1={100 - waistWidth}
                                y1={waistZone.y + waistZone.height / 2}
                                x2={100 + waistWidth}
                                y2={waistZone.y + waistZone.height / 2}
                                stroke="var(--color-terracotta)"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                            />
                            <circle cx={100 - waistWidth} cy={waistZone.y + waistZone.height / 2} r="4" fill="var(--color-terracotta)" />
                            <circle cx={100 + waistWidth} cy={waistZone.y + waistZone.height / 2} r="4" fill="var(--color-terracotta)" />
                        </>
                    )}
                    {activeSlider === 'hips' && (
                        <>
                            <line
                                x1={100 - hipsWidth}
                                y1={hipsZone.y + hipsZone.height / 2}
                                x2={100 + hipsWidth}
                                y2={hipsZone.y + hipsZone.height / 2}
                                stroke="var(--color-terracotta)"
                                strokeWidth="2"
                                strokeDasharray="4 2"
                            />
                            <circle cx={100 - hipsWidth} cy={hipsZone.y + hipsZone.height / 2} r="4" fill="var(--color-terracotta)" />
                            <circle cx={100 + hipsWidth} cy={hipsZone.y + hipsZone.height / 2} r="4" fill="var(--color-terracotta)" />
                        </>
                    )}
                </g>
            )}

            {/* Labels */}
            <text x="175" y={bustZone.y + bustZone.height / 2 + 4} className="font-body text-xs fill-[var(--color-gray)]">
                Bust
            </text>
            <text x="175" y={waistZone.y + waistZone.height / 2 + 4} className="font-body text-xs fill-[var(--color-gray)]">
                Waist
            </text>
            <text x="175" y={hipsZone.y + hipsZone.height / 2 + 4} className="font-body text-xs fill-[var(--color-gray)]">
                Hips
            </text>
        </svg>
    )
}
