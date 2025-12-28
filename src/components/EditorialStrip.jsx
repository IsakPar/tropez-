export default function EditorialStrip() {
    return (
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&q=80')`,
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
