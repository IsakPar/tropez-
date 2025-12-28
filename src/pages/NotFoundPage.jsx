import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[var(--color-cream)] pt-32 pb-24 flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* Large 404 */}
                <h1 className="font-heading text-[var(--color-navy)]/10 text-[12rem] md:text-[16rem] font-light leading-none select-none">
                    404
                </h1>

                {/* Content */}
                <div className="-mt-16 md:-mt-24 relative z-10">
                    <h2 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light mb-4">
                        Page Not Found
                    </h2>
                    <p className="font-body text-[var(--color-gray)] mb-8 leading-relaxed">
                        The page you're looking for seems to have drifted away with the tide.
                        Let's get you back to the shore.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Back Home
                        </Link>
                        <Link
                            to="/shop"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[var(--color-navy)] text-[var(--color-navy)] font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy)] hover:text-white transition-colors"
                        >
                            Continue Shopping
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
