export default function TimelineEntry({ year, title, organization, description }) {
    return (
        <div className="mission-entry mb-10 pl-8">
            <span className="font-mono text-xs text-gold tracking-widest">{year}</span>
            <h3 className="font-ui text-h3 text-stellar mt-1">{title}</h3>
            {organization && (
                <span className="font-ui text-sm text-gold-mid uppercase tracking-wide">
                    {organization}
                </span>
            )}
            <p className="mt-2 text-smoke text-sm leading-relaxed max-w-lg">
                {description}
            </p>
        </div>
    )
}
