/**
 * SVG Mannequin Path Data
 * 
 * Professional fashion croquis-style female mannequin.
 * All paths are designed for smooth morphing between sizes.
 * 
 * Coordinate system:
 * - ViewBox: 0 0 200 400
 * - Center X: 100
 * - Head top: 20
 * - Feet: 380
 */

// Key Y positions (consistent across all sizes)
export const LANDMARKS = {
    headTop: 20,
    headBottom: 50,
    neckTop: 50,
    neckBottom: 62,
    shoulderY: 72,
    bustTop: 88,
    bustPeak: 100,
    bustBottom: 112,
    underbustY: 120,
    waistY: 145,
    hipTopY: 165,
    hipPeakY: 185,
    hipBottomY: 200,
    crotchY: 215,
    midThighY: 250,
    kneeY: 290,
    calfY: 330,
    ankleY: 370,
    footY: 380,
}

// Width multipliers for different body parts at each size
// These will be interpolated based on measurements
export const SIZE_WIDTHS = {
    small: {
        shoulder: 38,
        bust: 32,
        underbust: 28,
        waist: 24,
        hipTop: 30,
        hipPeak: 36,
        thigh: 18,
        knee: 12,
        calf: 11,
        ankle: 7,
    },
    medium: {
        shoulder: 42,
        bust: 38,
        underbust: 32,
        waist: 28,
        hipTop: 35,
        hipPeak: 42,
        thigh: 21,
        knee: 13,
        calf: 12,
        ankle: 8,
    },
    large: {
        shoulder: 48,
        bust: 48,
        underbust: 38,
        waist: 35,
        hipTop: 42,
        hipPeak: 52,
        thigh: 26,
        knee: 15,
        calf: 14,
        ankle: 9,
    },
}

/**
 * Generate body outline path based on width parameters
 * Creates smooth bezier curves for a realistic silhouette
 */
export function generateBodyPath(widths, centerX = 100) {
    const L = LANDMARKS
    const W = widths

    // Right side of body (will be mirrored for left)
    const rightPath = `
    M ${centerX} ${L.neckBottom}
    
    C ${centerX + 5} ${L.neckBottom},
      ${centerX + W.shoulder * 0.6} ${L.shoulderY - 5},
      ${centerX + W.shoulder} ${L.shoulderY}
    
    C ${centerX + W.shoulder + 3} ${L.shoulderY + 8},
      ${centerX + W.bust + 8} ${L.bustTop},
      ${centerX + W.bust + 6} ${L.bustPeak}
    
    C ${centerX + W.bust + 4} ${L.bustPeak + 8},
      ${centerX + W.bust} ${L.bustBottom - 5},
      ${centerX + W.underbust + 2} ${L.underbustY}
    
    C ${centerX + W.underbust - 2} ${L.underbustY + 10},
      ${centerX + W.waist + 2} ${L.waistY - 10},
      ${centerX + W.waist} ${L.waistY}
    
    C ${centerX + W.waist - 2} ${L.waistY + 8},
      ${centerX + W.hipTop - 5} ${L.hipTopY - 5},
      ${centerX + W.hipTop} ${L.hipTopY}
    
    C ${centerX + W.hipTop + 5} ${L.hipTopY + 8},
      ${centerX + W.hipPeak + 3} ${L.hipPeakY - 8},
      ${centerX + W.hipPeak} ${L.hipPeakY}
    
    C ${centerX + W.hipPeak - 3} ${L.hipPeakY + 10},
      ${centerX + W.thigh + 8} ${L.hipBottomY + 5},
      ${centerX + W.thigh + 5} ${L.crotchY}
  `

    // Left side (mirrored)
    const leftPath = `
    M ${centerX} ${L.neckBottom}
    
    C ${centerX - 5} ${L.neckBottom},
      ${centerX - W.shoulder * 0.6} ${L.shoulderY - 5},
      ${centerX - W.shoulder} ${L.shoulderY}
    
    C ${centerX - W.shoulder - 3} ${L.shoulderY + 8},
      ${centerX - W.bust - 8} ${L.bustTop},
      ${centerX - W.bust - 6} ${L.bustPeak}
    
    C ${centerX - W.bust - 4} ${L.bustPeak + 8},
      ${centerX - W.bust} ${L.bustBottom - 5},
      ${centerX - W.underbust - 2} ${L.underbustY}
    
    C ${centerX - W.underbust + 2} ${L.underbustY + 10},
      ${centerX - W.waist - 2} ${L.waistY - 10},
      ${centerX - W.waist} ${L.waistY}
    
    C ${centerX - W.waist + 2} ${L.waistY + 8},
      ${centerX - W.hipTop + 5} ${L.hipTopY - 5},
      ${centerX - W.hipTop} ${L.hipTopY}
    
    C ${centerX - W.hipTop - 5} ${L.hipTopY + 8},
      ${centerX - W.hipPeak - 3} ${L.hipPeakY - 8},
      ${centerX - W.hipPeak} ${L.hipPeakY}
    
    C ${centerX - W.hipPeak + 3} ${L.hipPeakY + 10},
      ${centerX - W.thigh - 8} ${L.hipBottomY + 5},
      ${centerX - W.thigh - 5} ${L.crotchY}
  `

    return { rightPath, leftPath }
}

/**
 * Generate leg paths
 */
export function generateLegPaths(widths, centerX = 100) {
    const L = LANDMARKS
    const W = widths

    // Right leg
    const rightLeg = `
    M ${centerX + 8} ${L.crotchY}
    
    C ${centerX + W.thigh} ${L.crotchY + 10},
      ${centerX + W.thigh + 2} ${L.midThighY - 10},
      ${centerX + W.thigh - 2} ${L.midThighY}
    
    C ${centerX + W.thigh - 5} ${L.midThighY + 15},
      ${centerX + W.knee + 4} ${L.kneeY - 15},
      ${centerX + W.knee + 2} ${L.kneeY}
    
    C ${centerX + W.knee} ${L.kneeY + 15},
      ${centerX + W.calf + 3} ${L.calfY - 15},
      ${centerX + W.calf + 1} ${L.calfY}
    
    C ${centerX + W.calf - 1} ${L.calfY + 15},
      ${centerX + W.ankle + 2} ${L.ankleY - 10},
      ${centerX + W.ankle} ${L.ankleY}
    
    L ${centerX + W.ankle - 2} ${L.footY}
    L ${centerX + 4} ${L.footY}
    L ${centerX + 4} ${L.ankleY + 5}
    
    C ${centerX + 5} ${L.ankleY - 5},
      ${centerX + 6} ${L.calfY + 10},
      ${centerX + 7} ${L.calfY}
    
    C ${centerX + 8} ${L.calfY - 15},
      ${centerX + 8} ${L.kneeY + 10},
      ${centerX + 7} ${L.kneeY}
    
    C ${centerX + 6} ${L.kneeY - 10},
      ${centerX + 7} ${L.midThighY + 10},
      ${centerX + 8} ${L.midThighY}
    
    C ${centerX + 9} ${L.midThighY - 10},
      ${centerX + 8} ${L.crotchY + 5},
      ${centerX + 8} ${L.crotchY}
    
    Z
  `

    // Left leg (mirrored)
    const leftLeg = `
    M ${centerX - 8} ${L.crotchY}
    
    C ${centerX - W.thigh} ${L.crotchY + 10},
      ${centerX - W.thigh - 2} ${L.midThighY - 10},
      ${centerX - W.thigh + 2} ${L.midThighY}
    
    C ${centerX - W.thigh + 5} ${L.midThighY + 15},
      ${centerX - W.knee - 4} ${L.kneeY - 15},
      ${centerX - W.knee - 2} ${L.kneeY}
    
    C ${centerX - W.knee} ${L.kneeY + 15},
      ${centerX - W.calf - 3} ${L.calfY - 15},
      ${centerX - W.calf - 1} ${L.calfY}
    
    C ${centerX - W.calf + 1} ${L.calfY + 15},
      ${centerX - W.ankle - 2} ${L.ankleY - 10},
      ${centerX - W.ankle} ${L.ankleY}
    
    L ${centerX - W.ankle + 2} ${L.footY}
    L ${centerX - 4} ${L.footY}
    L ${centerX - 4} ${L.ankleY + 5}
    
    C ${centerX - 5} ${L.ankleY - 5},
      ${centerX - 6} ${L.calfY + 10},
      ${centerX - 7} ${L.calfY}
    
    C ${centerX - 8} ${L.calfY - 15},
      ${centerX - 8} ${L.kneeY + 10},
      ${centerX - 7} ${L.kneeY}
    
    C ${centerX - 6} ${L.kneeY - 10},
      ${centerX - 7} ${L.midThighY + 10},
      ${centerX - 8} ${L.midThighY}
    
    C ${centerX - 9} ${L.midThighY - 10},
      ${centerX - 8} ${L.crotchY + 5},
      ${centerX - 8} ${L.crotchY}
    
    Z
  `

    return { rightLeg, leftLeg }
}

/**
 * Generate head and neck path (static, doesn't morph)
 */
export function generateHeadPath(centerX = 100) {
    const L = LANDMARKS

    return `
    M ${centerX} ${L.headTop}
    
    C ${centerX + 18} ${L.headTop},
      ${centerX + 22} ${L.headTop + 10},
      ${centerX + 22} ${L.headTop + 18}
    
    C ${centerX + 22} ${L.headBottom - 8},
      ${centerX + 18} ${L.headBottom},
      ${centerX + 8} ${L.headBottom}
    
    L ${centerX + 8} ${L.neckBottom}
    L ${centerX - 8} ${L.neckBottom}
    L ${centerX - 8} ${L.headBottom}
    
    C ${centerX - 18} ${L.headBottom},
      ${centerX - 22} ${L.headBottom - 8},
      ${centerX - 22} ${L.headTop + 18}
    
    C ${centerX - 22} ${L.headTop + 10},
      ${centerX - 18} ${L.headTop},
      ${centerX} ${L.headTop}
    
    Z
  `
}

/**
 * Interpolate between width sets based on a 0-1 value
 * t = 0 -> small, t = 0.5 -> medium, t = 1 -> large
 */
export function interpolateWidths(bustT, waistT, hipsT) {
    const lerp3 = (small, medium, large, t) => {
        if (t <= 0.5) {
            return small + (medium - small) * (t * 2)
        } else {
            return medium + (large - medium) * ((t - 0.5) * 2)
        }
    }

    const S = SIZE_WIDTHS.small
    const M = SIZE_WIDTHS.medium
    const L = SIZE_WIDTHS.large

    return {
        shoulder: lerp3(S.shoulder, M.shoulder, L.shoulder, bustT),
        bust: lerp3(S.bust, M.bust, L.bust, bustT),
        underbust: lerp3(S.underbust, M.underbust, L.underbust, (bustT + waistT) / 2),
        waist: lerp3(S.waist, M.waist, L.waist, waistT),
        hipTop: lerp3(S.hipTop, M.hipTop, L.hipTop, (waistT + hipsT) / 2),
        hipPeak: lerp3(S.hipPeak, M.hipPeak, L.hipPeak, hipsT),
        thigh: lerp3(S.thigh, M.thigh, L.thigh, hipsT),
        knee: lerp3(S.knee, M.knee, L.knee, hipsT * 0.5 + 0.25),
        calf: lerp3(S.calf, M.calf, L.calf, hipsT * 0.3 + 0.35),
        ankle: lerp3(S.ankle, M.ankle, L.ankle, 0.5),
    }
}

/**
 * Convert measurement in cm to 0-1 interpolation value
 */
export function measurementToT(value, min, max) {
    return Math.max(0, Math.min(1, (value - min) / (max - min)))
}
