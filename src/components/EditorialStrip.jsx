export default function EditorialStrip() {
    return (
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/cta-beach.png')`,
                }}
            />

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-[var(--color-navy)]/10" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <blockquote className="max-w-3xl">
                    <p className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-light italic leading-relaxed">
                        "Designed for the woman who moves with <br className="hidden md:block" />
                        effortless grace through sun-drenched days"
                    </p>
                </blockquote>
            </div>
        </section>
    )
}
