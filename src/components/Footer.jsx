export default function Footer() {
    return (
        <footer className="bg-[var(--color-navy)] text-white py-16 md:py-24 px-6 md:px-12 lg:px-20">
            <div className="max-w-[1800px] mx-auto">
                {/* Newsletter Section */}
                <div className="text-center mb-16 md:mb-20">
                    <h3 className="font-heading text-3xl md:text-4xl font-light mb-4">
                        Join the Journey
                    </h3>
                    <p className="font-body text-white/60 text-sm mb-8 max-w-md mx-auto">
                        Be the first to discover new collections, exclusive offers, and stories from the Mediterranean.
                    </p>

                    {/* Email Input */}
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 bg-transparent border border-white/30 px-6 py-3 text-sm font-body placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-white text-[var(--color-navy)] px-8 py-3 text-sm font-body tracking-luxury uppercase hover:bg-white/90 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-12 md:pt-16">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <h4 className="font-heading text-2xl mb-4">ST. TROPEZ</h4>
                            <p className="font-body text-white/60 text-sm leading-relaxed">
                                Understated luxury for the modern woman.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="font-body text-xs tracking-luxury uppercase mb-4 text-white/80">
                                Shop
                            </h5>
                            <ul className="space-y-3">
                                {['Bikinis', 'One-Pieces', 'Cover-Ups', 'Accessories'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Info */}
                        <div>
                            <h5 className="font-body text-xs tracking-luxury uppercase mb-4 text-white/80">
                                Information
                            </h5>
                            <ul className="space-y-3">
                                {['About Us', 'Size Guide', 'Shipping', 'Returns'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="font-body text-sm text-white/60 hover:text-white transition-colors">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social */}
                        <div>
                            <h5 className="font-body text-xs tracking-luxury uppercase mb-4 text-white/80">
                                Follow
                            </h5>
                            <div className="flex gap-4">
                                {['Instagram', 'Pinterest', 'TikTok'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="font-body text-sm text-white/60 hover:text-white transition-colors"
                                    >
                                        {social.slice(0, 2)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-body text-xs text-white/40">
                        © 2025 St. Tropez Swimwear. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {['Privacy Policy', 'Terms of Service'].map((item) => (
                            <a key={item} href="#" className="font-body text-xs text-white/40 hover:text-white/60 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
