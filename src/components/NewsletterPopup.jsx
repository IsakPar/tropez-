/**
 * NewsletterPopup Component
 * 
 * Email capture popup that appears after a delay.
 * Offers discount incentive and stores dismissal state.
 */
import { useState, useEffect } from 'react'

export default function NewsletterPopup() {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        // Check if user has already dismissed/subscribed
        const dismissed = localStorage.getItem('st-tropez-newsletter-dismissed')
        if (dismissed) return

        // Show popup after 8 seconds
        const timer = setTimeout(() => {
            setIsOpen(true)
        }, 8000)

        return () => clearTimeout(timer)
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem('st-tropez-newsletter-dismissed', 'true')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In production, this would send to your email service
        console.log('Newsletter signup:', email)
        setSubmitted(true)

        setTimeout(() => {
            handleClose()
        }, 2000)
    }

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-[fadeIn_0.3s_ease-out]"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto animate-[fadeIn_0.4s_ease-out]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-[var(--color-gray)] hover:text-[var(--color-navy)] transition-colors z-10"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="grid md:grid-cols-2">
                        {/* Image Side */}
                        <div
                            className="hidden md:block h-full min-h-[400px] bg-cover bg-center"
                            style={{ backgroundImage: `url('/Gemini_Generated_Image_9qtkwb9qtkwb9qtk.png')` }}
                        />

                        {/* Content Side */}
                        <div className="p-8 md:p-10 relative">
                            {!submitted ? (
                                <>
                                    <p className="font-body text-[var(--color-terracotta)] text-xs tracking-wide-luxury uppercase mb-4">
                                        Exclusive Access
                                    </p>
                                    <h3 className="font-heading text-[var(--color-navy)] text-3xl md:text-4xl font-light mb-4">
                                        Unlock 10% Off
                                    </h3>
                                    <p className="font-body text-[var(--color-gray)] text-sm leading-relaxed mb-6">
                                        Join our inner circle for early access to new collections, styling tips, and exclusive offers.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            required
                                            className="w-full px-4 py-3 border border-[var(--color-sand)] rounded-lg font-body text-[var(--color-navy)] placeholder:text-[var(--color-gray-light)] focus:outline-none focus:border-[var(--color-navy)] transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-[var(--color-navy)] text-white font-body text-sm tracking-luxury uppercase hover:bg-[var(--color-navy-dark)] transition-colors rounded-lg btn-hover-lift"
                                        >
                                            Get My 10% Off
                                        </button>
                                    </form>

                                    <p className="font-body text-xs text-[var(--color-gray-light)] mt-4 text-center">
                                        No spam, ever. Unsubscribe anytime.
                                    </p>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="font-heading text-[var(--color-navy)] text-2xl mb-2">
                                        Welcome to the Family!
                                    </h3>
                                    <p className="font-body text-[var(--color-gray)] text-sm">
                                        Check your inbox for your discount code.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
