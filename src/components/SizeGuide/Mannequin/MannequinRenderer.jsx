import { useMemo } from 'react'
import {
    LANDMARKS,
    generateBodyPath,
    generateLegPaths,
    generateHeadPath,
    interpolateWidths,
    measurementToT,
} from '../../../assets/svg/mannequin/MannequinPaths'

/**
 * MannequinRenderer
 * 
 * Renders an SVG mannequin that morphs in real-time based on measurements.
 * Uses smooth bezier curves for a professional fashion croquis look.
 */
export default function MannequinRenderer({
    bust = 90,
    waist = 70,
    hips = 96,
    activeZone = null,
    className = '',
}) {
    // Convert measurements to 0-1 interpolation values
    const bustT = measurementToT(bust, 75, 110)
    const waistT = measurementToT(waist, 55, 90)
    const hipsT = measurementToT(hips, 80, 115)

    // Calculate interpolated widths
    const widths = useMemo(
        () => interpolateWidths(bustT, waistT, hipsT),
        [bustT, waistT, hipsT]
    )

    // Generate all paths
    const { rightPath, leftPath } = useMemo(
        () => generateBodyPath(widths),
        [widths]
    )

    const { rightLeg, leftLeg } = useMemo(
        () => generateLegPaths(widths),
        [widths]
    )

    const headPath = useMemo(() => generateHeadPath(), [])

    // Create closed torso path by combining right and left
    const torsoPath = useMemo(() => {
        // Connect right side to left side at bottom, then back up
        return `
      ${rightPath}
      L ${100 - widths.thigh - 5} ${LANDMARKS.crotchY}
      ${leftPath.replace('M 100', 'L 100').split('\n').reverse().join('\n')}
      Z
    `
    }, [rightPath, leftPath, widths.thigh])

    return (
        <svg
            viewBox="0 0 200 400"
            className={`w-full h-full ${className}`}
            style={{ maxHeight: '500px' }}
        >
            <defs>
                {/* Skin gradient */}
                <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e8ddd4" />
                    <stop offset="50%" stopColor="#f0e6dc" />
                    <stop offset="100%" stopColor="#e8ddd4" />
                </linearGradient>

                {/* Subtle shadow gradient */}
                <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4c9c0" />
                    <stop offset="50%" stopColor="#e8ddd4" />
                    <stop offset="100%" stopColor="#d4c9c0" />
                </linearGradient>

                {/* Active zone highlight */}
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-terracotta)" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="var(--color-terracotta)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="var(--color-terracotta)" stopOpacity="0.2" />
                </linearGradient>

                {/* Glow filter for active zones */}
                <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background shape for depth */}
            <g id="body-shadow" opacity="0.3">
                <path
                    d={torsoPath}
                    fill="url(#shadowGradient)"
                    transform="translate(2, 2)"
                />
            </g>

            {/* Head and neck */}
            <g id="head">
                <path
                    d={headPath}
                    fill="url(#skinGradient)"
                    stroke="#c4b5a9"
                    strokeWidth="1"
                />
                {/* Hair hint */}
                <ellipse
                    cx="100"
                    cy={LANDMARKS.headTop + 8}
                    rx="18"
                    ry="12"
                    fill="#d4c9c0"
                    opacity="0.3"
                />
            </g>

            {/* Main torso */}
            <g id="torso">
                {/* Body fill */}
                <path
                    d={torsoPath}
                    fill="url(#skinGradient)"
                    stroke="#c4b5a9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{ transition: 'd 0.15s ease-out' }}
                />

                {/* Bust curve detail */}
                <path
                    d={`M ${100 - widths.bust - 4} ${LANDMARKS.bustPeak} 
              Q 100 ${LANDMARKS.bustBottom + 5}, ${100 + widths.bust + 4} ${LANDMARKS.bustPeak}`}
                    fill="none"
                    stroke="#d4c9c0"
                    strokeWidth="1"
                    opacity="0.5"
                    style={{ transition: 'd 0.15s ease-out' }}
                />

                {/* Waist curve detail */}
                <path
                    d={`M ${100 - widths.waist - 2} ${LANDMARKS.waistY} 
              Q 100 ${LANDMARKS.waistY + 3}, ${100 + widths.waist + 2} ${LANDMARKS.waistY}`}
                    fill="none"
                    stroke="#d4c9c0"
                    strokeWidth="0.5"
                    opacity="0.4"
                    style={{ transition: 'd 0.15s ease-out' }}
                />
            </g>

            {/* Legs */}
            <g id="legs">
                <path
                    d={rightLeg}
                    fill="url(#skinGradient)"
                    stroke="#c4b5a9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{ transition: 'd 0.15s ease-out' }}
                />
                <path
                    d={leftLeg}
                    fill="url(#skinGradient)"
                    stroke="#c4b5a9"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{ transition: 'd 0.15s ease-out' }}
                />
            </g>

            {/* Zone highlight overlays */}
            <g id="zone-highlights">
                {/* Bust zone */}
                {activeZone === 'bust' && (
                    <ellipse
                        cx="100"
                        cy={LANDMARKS.bustPeak}
                        rx={widths.bust + 15}
                        ry="25"
                        fill="url(#activeGradient)"
                        filter="url(#activeGlow)"
                        className="animate-pulse"
                    />
                )}

                {/* Waist zone */}
                {activeZone === 'waist' && (
                    <ellipse
                        cx="100"
                        cy={LANDMARKS.waistY}
                        rx={widths.waist + 12}
                        ry="20"
                        fill="url(#activeGradient)"
                        filter="url(#activeGlow)"
                        className="animate-pulse"
                    />
                )}

                {/* Hips zone */}
                {activeZone === 'hips' && (
                    <ellipse
                        cx="100"
                        cy={LANDMARKS.hipPeakY}
                        rx={widths.hipPeak + 15}
                        ry="30"
                        fill="url(#activeGradient)"
                        filter="url(#activeGlow)"
                        className="animate-pulse"
                    />
                )}
            </g>

            {/* Measurement lines when zone is active */}
            <g id="measurement-lines">
                {activeZone === 'bust' && (
                    <>
                        <line
                            x1={100 - widths.bust - 10}
                            y1={LANDMARKS.bustPeak}
                            x2={100 + widths.bust + 10}
                            y2={LANDMARKS.bustPeak}
                            stroke="var(--color-terracotta)"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                        />
                        <circle cx={100 - widths.bust - 10} cy={LANDMARKS.bustPeak} r="3" fill="var(--color-terracotta)" />
                        <circle cx={100 + widths.bust + 10} cy={LANDMARKS.bustPeak} r="3" fill="var(--color-terracotta)" />
                    </>
                )}

                {activeZone === 'waist' && (
                    <>
                        <line
                            x1={100 - widths.waist - 8}
                            y1={LANDMARKS.waistY}
                            x2={100 + widths.waist + 8}
                            y2={LANDMARKS.waistY}
                            stroke="var(--color-terracotta)"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                        />
                        <circle cx={100 - widths.waist - 8} cy={LANDMARKS.waistY} r="3" fill="var(--color-terracotta)" />
                        <circle cx={100 + widths.waist + 8} cy={LANDMARKS.waistY} r="3" fill="var(--color-terracotta)" />
                    </>
                )}

                {activeZone === 'hips' && (
                    <>
                        <line
                            x1={100 - widths.hipPeak - 10}
                            y1={LANDMARKS.hipPeakY}
                            x2={100 + widths.hipPeak + 10}
                            y2={LANDMARKS.hipPeakY}
                            stroke="var(--color-terracotta)"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                        />
                        <circle cx={100 - widths.hipPeak - 10} cy={LANDMARKS.hipPeakY} r="3" fill="var(--color-terracotta)" />
                        <circle cx={100 + widths.hipPeak + 10} cy={LANDMARKS.hipPeakY} r="3" fill="var(--color-terracotta)" />
                    </>
                )}
            </g>

            {/* Labels */}
            <g id="labels" className="font-body" style={{ fontSize: '8px' }} fill="#9a8b7d">
                <text x="175" y={LANDMARKS.bustPeak + 3} opacity={activeZone === 'bust' ? 1 : 0.6}>
                    Bust
                </text>
                <text x="175" y={LANDMARKS.waistY + 3} opacity={activeZone === 'waist' ? 1 : 0.6}>
                    Waist
                </text>
                <text x="175" y={LANDMARKS.hipPeakY + 3} opacity={activeZone === 'hips' ? 1 : 0.6}>
                    Hips
                </text>
            </g>
        </svg>
    )
}
