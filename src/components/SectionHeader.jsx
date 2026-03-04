export default function SectionHeader({ number, title, subtitle }) {
    return (
        <div className="mb-12">
            <span className="section-stamp">{number} ·</span>
            <h2 className="font-ui text-h2 text-stellar uppercase tracking-wide">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-smoke text-base max-w-xl">
                    {subtitle}
                </p>
            )}
            <div className="divider-gold mt-6 w-32" />
        </div>
    )
}
