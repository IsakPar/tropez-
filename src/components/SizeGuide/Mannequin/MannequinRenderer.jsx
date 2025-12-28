/**
 * MannequinRenderer
 * 
 * Uses the professionally traced SVG from Vectorizer.ai
 * Beautiful hand-drawn quality curves.
 */
export default function MannequinRenderer({
    bust = 90,
    waist = 70,
    hips = 96,
    activeZone = null,
    className = '',
}) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            {/* The traced SVG mannequin */}
            <img
                src="/mannequins/petite.svg"
                alt="Fashion mannequin"
                className="w-full h-full object-contain"
                style={{
                    maxHeight: '520px',
                    filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))'
                }}
            />

            {/* Measurement zone overlays */}
            <svg
                viewBox="0 0 1024 1024"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ maxHeight: '520px' }}
            >
                {/* Bust zone indicator */}
                {activeZone === 'bust' && (
                    <g>
                        <ellipse
                            cx="512" cy="420"
                            rx="100" ry="35"
                            fill="none"
                            stroke="var(--color-terracotta, #c4705c)"
                            strokeWidth="3"
                            strokeDasharray="8 4"
                            opacity="0.8"
                        />
                        <text
                            x="630" y="425"
                            fill="var(--color-terracotta, #c4705c)"
                            fontSize="24"
                            fontFamily="system-ui"
                        >
                            Bust
                        </text>
                    </g>
                )}

                {/* Waist zone indicator */}
                {activeZone === 'waist' && (
                    <g>
                        <ellipse
                            cx="512" cy="510"
                            rx="65" ry="25"
                            fill="none"
                            stroke="var(--color-terracotta, #c4705c)"
                            strokeWidth="3"
                            strokeDasharray="8 4"
                            opacity="0.8"
                        />
                        <text
                            x="590" y="515"
                            fill="var(--color-terracotta, #c4705c)"
                            fontSize="24"
                            fontFamily="system-ui"
                        >
                            Waist
                        </text>
                    </g>
                )}

                {/* Hips zone indicator */}
                {activeZone === 'hips' && (
                    <g>
                        <ellipse
                            cx="512" cy="580"
                            rx="85" ry="30"
                            fill="none"
                            stroke="var(--color-terracotta, #c4705c)"
                            strokeWidth="3"
                            strokeDasharray="8 4"
                            opacity="0.8"
                        />
                        <text
                            x="610" y="585"
                            fill="var(--color-terracotta, #c4705c)"
                            fontSize="24"
                            fontFamily="system-ui"
                        >
                            Hips
                        </text>
                    </g>
                )}

                {/* Static zone labels when not active */}
                {!activeZone && (
                    <g fill="#9a8b7d" fontSize="20" fontFamily="system-ui" opacity="0.6">
                        <text x="620" y="420">Bust</text>
                        <text x="585" y="510">Waist</text>
                        <text x="605" y="580">Hips</text>
                    </g>
                )}
            </svg>
        </div>
    )
}
