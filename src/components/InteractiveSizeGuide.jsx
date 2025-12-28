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

// Lerp function for smooth interpolation
const lerp = (a, b, t) => a + (b - a) * t

// Clamp function
const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export default function InteractiveSizeGuide({ onSizeSelect, onClose }) {
    const [measurements, setMeasurements] = useState(DEFAULT_MEASUREMENTS)
    const [activeSlider, setActiveSlider] = useState(null)
    const [showHowToMeasure, setShowHowToMeasure] = useState(false)
    const [animatedMeasurements, setAnimatedMeasurements] = useState(DEFAULT_MEASUREMENTS)

    // Smooth animation for measurements
    useEffect(() => {
        const animate = () => {
            setAnimatedMeasurements(prev => ({
                bust: lerp(prev.bust, measurements.bust, 0.15),
                waist: lerp(prev.waist, measurements.waist, 0.15),
                hips: lerp(prev.hips, measurements.hips, 0.15),
            }))
        }
        const id = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(id)
    }, [measurements, animatedMeasurements])

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
                indicators[key] = { status: 'loose', offset: ((min - value) / (max - min)) * -1 }
            } else if (value > max) {
                indicators[key] = { status: 'snug', offset: ((value - max) / (max - min)) }
            } else {
                indicators[key] = { status: 'perfect', offset: 0 }
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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Left: Mannequin Visualization */}
            <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full max-w-[320px] aspect-[3/5]">
                    <FashionMannequin
                        measurements={animatedMeasurements}
                        activeSlider={activeSlider}
                        fitIndicators={fitIndicators}
                    />
                </div>

                {/* Fit Legend */}
                <div className="mt-8 flex items-center gap-8 font-body text-xs text-[var(--color-gray)]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[var(--color-terracotta)]" />
                        <span>Active Zone</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border-2 border-[var(--color-navy)]/30 rounded-full" />
                        <span>Body Outline</span>
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
                    <p className="font-body text-[var(--color-gray)] text-sm leading-relaxed">
                        Adjust the sliders to match your measurements. Watch the mannequin transform to show how the bikini fits your unique body shape.
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
                                                ? 'text-[var(--color-terracotta)] font-semibold scale-110'
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
                                perfect: { color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Perfect', icon: '✓' },
                                snug: { color: 'text-amber-600', bg: 'bg-amber-50', label: 'Snug', icon: '→' },
                                loose: { color: 'text-sky-600', bg: 'bg-sky-50', label: 'Relaxed', icon: '←' },
                            }[indicator.status]

                            return (
                                <div key={key} className={`text-center p-4 ${config.bg} rounded-xl transition-all duration-300`}>
                                    <p className="font-body text-xs text-[var(--color-gray)] capitalize mb-1">{key}</p>
                                    <p className={`font-body text-sm font-semibold ${config.color} flex items-center justify-center gap-1`}>
                                        <span>{config.icon}</span>
                                        {config.label}
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
function MeasurementSlider({ label, value, min, max, onChange, onFocus, onBlur, isActive, fitIndicator }) {
    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div className={`transition-all duration-300 ${isActive ? 'scale-[1.02]' : ''}`}>
            <div className="flex items-center justify-between mb-3">
                <label className={`font-body text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
                    }`}>
                    {label}
                </label>
                <div className="flex items-baseline gap-1">
                    <span className={`font-heading text-2xl tabular-nums transition-colors duration-300 ${isActive ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-navy)]'
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
            <div className="flex justify-between mt-1.5">
                <span className="font-body text-[10px] text-[var(--color-gray)]">{min} cm</span>
                <span className="font-body text-[10px] text-[var(--color-gray)]">{max} cm</span>
            </div>
        </div>
    )
}

// Fashion Croquis Style Mannequin with Bikini
function FashionMannequin({ measurements, activeSlider, fitIndicators }) {
    // Normalize measurements to 0-1 range
    const bustT = clamp((measurements.bust - 75) / 35, 0, 1)
    const waistT = clamp((measurements.waist - 55) / 35, 0, 1)
    const hipsT = clamp((measurements.hips - 80) / 35, 0, 1)

    // Base dimensions
    const centerX = 150
    const viewWidth = 300
    const viewHeight = 500

    // Body proportion calculations - using lerp for smooth transitions
    const shoulderWidth = lerp(42, 52, bustT)
    const bustWidth = lerp(38, 58, bustT)
    const underBustWidth = lerp(32, 48, (bustT + waistT) / 2)
    const waistWidth = lerp(26, 42, waistT)
    const hipWidth = lerp(42, 62, hipsT)
    const thighWidth = lerp(22, 32, hipsT)

    // Vertical positions
    const headTop = 20
    const headBottom = 65
    const neckBottom = 80
    const shoulderY = 95
    const bustY = 140
    const underBustY = 165
    const waistY = 195
    const hipTopY = 225
    const hipWidestY = 260
    const crotchY = 295
    const kneeY = 380
    const ankleY = 470

    // Generate smooth body path using cubic bezier curves
    const rightBodyPath = useMemo(() => {
        const points = [
            // Neck to shoulder
            { x: centerX + 8, y: neckBottom, type: 'M' },
            {
                x: centerX + shoulderWidth, y: shoulderY,
                cp1x: centerX + 15, cp1y: neckBottom + 5,
                cp2x: centerX + shoulderWidth - 10, cp2y: shoulderY - 8, type: 'C'
            },

            // Shoulder to bust
            {
                x: centerX + bustWidth, y: bustY,
                cp1x: centerX + shoulderWidth + 5, cp1y: shoulderY + 20,
                cp2x: centerX + bustWidth + 8, cp2y: bustY - 25, type: 'C'
            },

            // Bust to underbust  
            {
                x: centerX + underBustWidth, y: underBustY,
                cp1x: centerX + bustWidth + 2, cp1y: bustY + 12,
                cp2x: centerX + underBustWidth + 5, cp2y: underBustY - 8, type: 'C'
            },

            // Underbust to waist
            {
                x: centerX + waistWidth, y: waistY,
                cp1x: centerX + underBustWidth - 2, cp1y: underBustY + 10,
                cp2x: centerX + waistWidth + 5, cp2y: waistY - 12, type: 'C'
            },

            // Waist to hip top
            {
                x: centerX + hipWidth - 5, y: hipTopY,
                cp1x: centerX + waistWidth - 3, cp1y: waistY + 12,
                cp2x: centerX + hipWidth - 12, cp2y: hipTopY - 10, type: 'C'
            },

            // Hip top to hip widest
            {
                x: centerX + hipWidth, y: hipWidestY,
                cp1x: centerX + hipWidth + 2, cp1y: hipTopY + 15,
                cp2x: centerX + hipWidth + 3, cp2y: hipWidestY - 15, type: 'C'
            },

            // Hip to thigh
            {
                x: centerX + thighWidth + 8, y: crotchY,
                cp1x: centerX + hipWidth - 2, cp1y: hipWidestY + 18,
                cp2x: centerX + thighWidth + 15, cp2y: crotchY - 12, type: 'C'
            },
        ]

        return points.map((p, i) => {
            if (p.type === 'M') return `M ${p.x} ${p.y}`
            return `C ${p.cp1x} ${p.cp1y}, ${p.cp2x} ${p.cp2y}, ${p.x} ${p.y}`
        }).join(' ')
    }, [shoulderWidth, bustWidth, underBustWidth, waistWidth, hipWidth, thighWidth])

    // Left side (mirrored)
    const leftBodyPath = useMemo(() => {
        const points = [
            { x: centerX - 8, y: neckBottom, type: 'M' },
            {
                x: centerX - shoulderWidth, y: shoulderY,
                cp1x: centerX - 15, cp1y: neckBottom + 5,
                cp2x: centerX - shoulderWidth + 10, cp2y: shoulderY - 8, type: 'C'
            },
            {
                x: centerX - bustWidth, y: bustY,
                cp1x: centerX - shoulderWidth - 5, cp1y: shoulderY + 20,
                cp2x: centerX - bustWidth - 8, cp2y: bustY - 25, type: 'C'
            },
            {
                x: centerX - underBustWidth, y: underBustY,
                cp1x: centerX - bustWidth - 2, cp1y: bustY + 12,
                cp2x: centerX - underBustWidth - 5, cp2y: underBustY - 8, type: 'C'
            },
            {
                x: centerX - waistWidth, y: waistY,
                cp1x: centerX - underBustWidth + 2, cp1y: underBustY + 10,
                cp2x: centerX - waistWidth - 5, cp2y: waistY - 12, type: 'C'
            },
            {
                x: centerX - hipWidth + 5, y: hipTopY,
                cp1x: centerX - waistWidth + 3, cp1y: waistY + 12,
                cp2x: centerX - hipWidth + 12, cp2y: hipTopY - 10, type: 'C'
            },
            {
                x: centerX - hipWidth, y: hipWidestY,
                cp1x: centerX - hipWidth - 2, cp1y: hipTopY + 15,
                cp2x: centerX - hipWidth - 3, cp2y: hipWidestY - 15, type: 'C'
            },
            {
                x: centerX - thighWidth - 8, y: crotchY,
                cp1x: centerX - hipWidth + 2, cp1y: hipWidestY + 18,
                cp2x: centerX - thighWidth - 15, cp2y: crotchY - 12, type: 'C'
            },
        ]

        return points.map((p, i) => {
            if (p.type === 'M') return `M ${p.x} ${p.y}`
            return `C ${p.cp1x} ${p.cp1y}, ${p.cp2x} ${p.cp2y}, ${p.x} ${p.y}`
        }).join(' ')
    }, [shoulderWidth, bustWidth, underBustWidth, waistWidth, hipWidth, thighWidth])

    // Right leg path
    const rightLegPath = useMemo(() => {
        const legStart = centerX + 12
        return `
      M ${legStart + thighWidth - 4} ${crotchY}
      C ${legStart + thighWidth} ${crotchY + 30}, ${legStart + thighWidth - 8} ${kneeY - 20}, ${legStart + 12} ${kneeY}
      C ${legStart + 10} ${kneeY + 40}, ${legStart + 8} ${ankleY - 30}, ${legStart + 6} ${ankleY}
      L ${legStart - 6} ${ankleY}
      C ${legStart - 4} ${ankleY - 30}, ${legStart - 2} ${kneeY + 40}, ${legStart - 4} ${kneeY}
      C ${legStart - 6} ${kneeY - 20}, ${legStart - 2} ${crotchY + 30}, ${legStart} ${crotchY + 5}
    `
    }, [thighWidth])

    // Left leg path
    const leftLegPath = useMemo(() => {
        const legStart = centerX - 12
        return `
      M ${legStart - thighWidth + 4} ${crotchY}
      C ${legStart - thighWidth} ${crotchY + 30}, ${legStart - thighWidth + 8} ${kneeY - 20}, ${legStart - 12} ${kneeY}
      C ${legStart - 10} ${kneeY + 40}, ${legStart - 8} ${ankleY - 30}, ${legStart - 6} ${ankleY}
      L ${legStart + 6} ${ankleY}
      C ${legStart + 4} ${ankleY - 30}, ${legStart + 2} ${kneeY + 40}, ${legStart + 4} ${kneeY}
      C ${legStart + 6} ${kneeY - 20}, ${legStart + 2} ${crotchY + 30}, ${legStart} ${crotchY + 5}
    `
    }, [thighWidth])

    // Bikini top path - triangle style that morphs with bust
    const bikiniTopPath = useMemo(() => {
        const topY = bustY - 18
        const bottomY = underBustY - 5
        const cupWidth = bustWidth * 0.7
        const centerGap = 8

        // Right cup
        const rightCup = `
      M ${centerX + centerGap} ${bottomY}
      Q ${centerX + cupWidth * 0.3} ${topY - 5}, ${centerX + cupWidth} ${topY + 8}
      Q ${centerX + cupWidth + 5} ${(topY + bottomY) / 2}, ${centerX + cupWidth - 2} ${bottomY}
      Q ${centerX + cupWidth * 0.5} ${bottomY + 3}, ${centerX + centerGap} ${bottomY}
    `

        // Left cup
        const leftCup = `
      M ${centerX - centerGap} ${bottomY}
      Q ${centerX - cupWidth * 0.3} ${topY - 5}, ${centerX - cupWidth} ${topY + 8}
      Q ${centerX - cupWidth - 5} ${(topY + bottomY) / 2}, ${centerX - cupWidth + 2} ${bottomY}
      Q ${centerX - cupWidth * 0.5} ${bottomY + 3}, ${centerX - centerGap} ${bottomY}
    `

        return rightCup + ' ' + leftCup
    }, [bustWidth])

    // Bikini strap paths
    const bikiniStraps = useMemo(() => {
        const cupWidth = bustWidth * 0.7
        const topY = bustY - 10

        return {
            // Neck straps
            leftNeck: `M ${centerX - cupWidth + 5} ${topY} Q ${centerX - 15} ${shoulderY - 20}, ${centerX - 5} ${neckBottom - 5}`,
            rightNeck: `M ${centerX + cupWidth - 5} ${topY} Q ${centerX + 15} ${shoulderY - 20}, ${centerX + 5} ${neckBottom - 5}`,
            // Back straps  
            leftBack: `M ${centerX - cupWidth} ${bustY} Q ${centerX - cupWidth - 10} ${bustY + 5}, ${centerX - shoulderWidth + 5} ${shoulderY + 15}`,
            rightBack: `M ${centerX + cupWidth} ${bustY} Q ${centerX + cupWidth + 10} ${bustY + 5}, ${centerX + shoulderWidth - 5} ${shoulderY + 15}`,
        }
    }, [bustWidth, shoulderWidth])

    // Bikini bottom path - classic style that morphs with hips
    const bikiniBottomPath = useMemo(() => {
        const topY = hipTopY + 5
        const bottomY = crotchY - 5
        const sideWidth = hipWidth * 0.85

        return `
      M ${centerX} ${topY - 5}
      Q ${centerX + sideWidth * 0.3} ${topY - 8}, ${centerX + sideWidth} ${topY + 10}
      Q ${centerX + sideWidth + 3} ${(topY + bottomY) / 2 - 10}, ${centerX + thighWidth + 10} ${bottomY - 15}
      Q ${centerX + 8} ${bottomY + 5}, ${centerX} ${bottomY}
      Q ${centerX - 8} ${bottomY + 5}, ${centerX - thighWidth - 10} ${bottomY - 15}
      Q ${centerX - sideWidth - 3} ${(topY + bottomY) / 2 - 10}, ${centerX - sideWidth} ${topY + 10}
      Q ${centerX - sideWidth * 0.3} ${topY - 8}, ${centerX} ${topY - 5}
    `
    }, [hipWidth, thighWidth])

    // Determine bikini fit visualization
    const bustFit = fitIndicators?.bust?.status || 'perfect'
    const hipFit = fitIndicators?.hips?.status || 'perfect'

    return (
        <svg
            viewBox={`0 0 ${viewWidth} ${viewHeight}`}
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.06))' }}
        >
            <defs>
                {/* Body gradient */}
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5ebe0" />
                    <stop offset="100%" stopColor="#ede4d9" />
                </linearGradient>

                {/* Subtle skin tone */}
                <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8ddd4" />
                    <stop offset="50%" stopColor="#f0e6dc" />
                    <stop offset="100%" stopColor="#e8ddd4" />
                </linearGradient>

                {/* Bikini gradient */}
                <linearGradient id="bikiniGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-navy)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--color-navy)" />
                </linearGradient>

                {/* Active zone glow */}
                <filter id="activeGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Head */}
            <ellipse
                cx={centerX}
                cy={(headTop + headBottom) / 2}
                rx="22"
                ry="24"
                fill="url(#skinGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
            />

            {/* Hair hint */}
            <path
                d={`M ${centerX - 20} ${headTop + 15} Q ${centerX} ${headTop - 5}, ${centerX + 20} ${headTop + 15}`}
                fill="none"
                stroke="var(--color-navy)"
                strokeWidth="1"
                strokeOpacity="0.15"
            />

            {/* Neck */}
            <path
                d={`M ${centerX - 8} ${headBottom - 3} L ${centerX - 8} ${neckBottom} M ${centerX + 8} ${headBottom - 3} L ${centerX + 8} ${neckBottom}`}
                fill="none"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
            />
            <rect
                x={centerX - 8}
                y={headBottom - 3}
                width="16"
                height={neckBottom - headBottom + 3}
                fill="url(#skinGradient)"
            />

            {/* Body outline - right side */}
            <path
                d={rightBodyPath}
                fill="none"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeLinecap="round"
                className="transition-all duration-100"
            />

            {/* Body outline - left side */}
            <path
                d={leftBodyPath}
                fill="none"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                strokeLinecap="round"
                className="transition-all duration-100"
            />

            {/* Body fill */}
            <path
                d={`${rightBodyPath} L ${centerX + thighWidth + 8} ${crotchY} L ${centerX - thighWidth - 8} ${crotchY} ${leftBodyPath.replace('M', 'L')}`}
                fill="url(#skinGradient)"
                className="transition-all duration-100"
            />

            {/* Legs */}
            <path
                d={rightLegPath}
                fill="url(#skinGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                className="transition-all duration-100"
            />
            <path
                d={leftLegPath}
                fill="url(#skinGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                className="transition-all duration-100"
            />

            {/* Zone highlights when active */}
            {activeSlider === 'bust' && (
                <ellipse
                    cx={centerX}
                    cy={bustY}
                    rx={bustWidth + 15}
                    ry="35"
                    fill="var(--color-terracotta)"
                    fillOpacity="0.1"
                    filter="url(#activeGlow)"
                    className="animate-pulse"
                />
            )}
            {activeSlider === 'waist' && (
                <ellipse
                    cx={centerX}
                    cy={waistY}
                    rx={waistWidth + 15}
                    ry="25"
                    fill="var(--color-terracotta)"
                    fillOpacity="0.1"
                    filter="url(#activeGlow)"
                    className="animate-pulse"
                />
            )}
            {activeSlider === 'hips' && (
                <ellipse
                    cx={centerX}
                    cy={hipWidestY}
                    rx={hipWidth + 15}
                    ry="40"
                    fill="var(--color-terracotta)"
                    fillOpacity="0.1"
                    filter="url(#activeGlow)"
                    className="animate-pulse"
                />
            )}

            {/* Bikini Top */}
            <path
                d={bikiniTopPath}
                fill="url(#bikiniGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1"
                className="transition-all duration-100"
            />

            {/* Bikini straps */}
            <path d={bikiniStraps.leftNeck} fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" />
            <path d={bikiniStraps.rightNeck} fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" />
            <path d={bikiniStraps.leftBack} fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
            <path d={bikiniStraps.rightBack} fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />

            {/* Bikini Bottom */}
            <path
                d={bikiniBottomPath}
                fill="url(#bikiniGradient)"
                stroke="var(--color-navy)"
                strokeWidth="1"
                className="transition-all duration-100"
            />

            {/* Fit indicators - subtle visual cues */}
            {bustFit === 'snug' && (
                <>
                    <path
                        d={`M ${centerX + bustWidth * 0.7 + 8} ${bustY - 5} l 6 0`}
                        stroke="var(--color-terracotta)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-pulse"
                    />
                    <path
                        d={`M ${centerX - bustWidth * 0.7 - 8} ${bustY - 5} l -6 0`}
                        stroke="var(--color-terracotta)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-pulse"
                    />
                </>
            )}

            {hipFit === 'snug' && (
                <>
                    <path
                        d={`M ${centerX + hipWidth * 0.85 + 5} ${hipTopY + 15} l 5 0`}
                        stroke="var(--color-terracotta)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-pulse"
                    />
                    <path
                        d={`M ${centerX - hipWidth * 0.85 - 5} ${hipTopY + 15} l -5 0`}
                        stroke="var(--color-terracotta)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-pulse"
                    />
                </>
            )}

            {/* Measurement labels */}
            <g className="font-body text-[10px]" fill="var(--color-gray)">
                <text x={viewWidth - 25} y={bustY + 4} textAnchor="end" opacity={activeSlider === 'bust' ? 1 : 0.5}>
                    Bust
                </text>
                <text x={viewWidth - 25} y={waistY + 4} textAnchor="end" opacity={activeSlider === 'waist' ? 1 : 0.5}>
                    Waist
                </text>
                <text x={viewWidth - 25} y={hipWidestY + 4} textAnchor="end" opacity={activeSlider === 'hips' ? 1 : 0.5}>
                    Hips
                </text>
            </g>

            {/* Measurement lines when active */}
            {activeSlider && (
                <g stroke="var(--color-terracotta)" strokeWidth="1" strokeDasharray="3 2" opacity="0.7">
                    {activeSlider === 'bust' && (
                        <line x1={centerX - bustWidth - 10} y1={bustY} x2={centerX + bustWidth + 10} y2={bustY} />
                    )}
                    {activeSlider === 'waist' && (
                        <line x1={centerX - waistWidth - 10} y1={waistY} x2={centerX + waistWidth + 10} y2={waistY} />
                    )}
                    {activeSlider === 'hips' && (
                        <line x1={centerX - hipWidth - 10} y1={hipWidestY} x2={centerX + hipWidth + 10} y2={hipWidestY} />
                    )}
                </g>
            )}
        </svg>
    )
}
