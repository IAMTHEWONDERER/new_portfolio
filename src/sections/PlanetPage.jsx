import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import InteractiveStarsBg from '../components/InteractiveStarsBg'

const PLANET_METADATA = {
    Venus: { number: '01', color: '#E8D5A3' },
    Earth: { number: '02', color: '#4A7AB5' },
    Mars: { number: '03', color: '#C1440E' },
    Jupiter: { number: '04', color: '#C4A46C' },
}

export default function PlanetPage({ planet, onReturn }) {
    const { t } = useTranslation()
    const metadata = PLANET_METADATA[planet]
    
    const data = useMemo(() => {
        return {
            ...metadata,
            title: t(`planets.${planet}.title`),
            subtitle: t(`planets.${planet}.subtitle`),
            sections: t(`planets.${planet}.sections`, { returnObjects: true }) || []
        }
    }, [t, planet, metadata])

    if (!metadata) return null

    return (
        <div
            style={{
                position: 'relative',
                minHeight: '100vh',
                background: 'transparent', color: '#FFF',
                overflowX: 'hidden',
            }}
        >
            <InteractiveStarsBg />
            <div className="absolute inset-0 bg-black/40 -z-0 pointer-events-none" />

            {/* Content */}
            <div style={{
                position: 'relative', zIndex: 1,
                maxWidth: 640, margin: '0 auto',
                padding: '80px 32px 120px',
            }}>
                {/* Number + Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ marginBottom: 60, textAlign: 'center' }}
                >
                    <span style={{
                        fontFamily: "'Geom', sans-serif",
                        fontSize: '3rem', fontWeight: 200,
                        color: data.color, opacity: 0.3,
                        display: 'block', marginBottom: 8,
                    }}>
                        {metadata.number}
                    </span>
                    <h1 style={{
                        fontFamily: "'Geom', sans-serif",
                        fontSize: '1.8rem', fontWeight: 300,
                        letterSpacing: '0.25em', textTransform: 'uppercase',
                        marginBottom: 8,
                    }}>
                        {data.title}
                    </h1>
                    <p style={{
                        fontFamily: "'Geom', sans-serif",
                        fontSize: '0.6rem', fontWeight: 300,
                        letterSpacing: '0.2em', textTransform: 'uppercase',
                        color: data.color, opacity: 0.6,
                    }}>
                        {data.subtitle}
                    </p>
                    {/* Divider line */}
                    <div style={{
                        width: 40, height: 1,
                        background: data.color, opacity: 0.3,
                        margin: '24px auto 0',
                    }} />
                </motion.div>

                {/* Sections */}
                {data.sections.map((section, i) => (
                    <motion.div
                        key={section.heading}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                        style={{ marginBottom: 48 }}
                    >
                        <h2 style={{
                            fontFamily: "'Geom', sans-serif",
                            fontSize: '0.75rem', fontWeight: 400,
                            letterSpacing: '0.18em', textTransform: 'uppercase',
                            color: data.color, marginBottom: 12,
                        }}>
                            {section.heading}
                        </h2>
                        <p style={{
                            fontFamily: "'Geom', sans-serif",
                            fontSize: '0.85rem', fontWeight: 300,
                            lineHeight: 1.8, color: '#AAA',
                            letterSpacing: '0.02em',
                        }}>
                            {section.text}
                        </p>
                    </motion.div>
                ))}

                {/* Return button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    style={{ textAlign: 'center', marginTop: 40 }}
                >
                    <button
                        onClick={onReturn}
                        style={{
                            fontFamily: "'Geom', sans-serif",
                            fontSize: '0.6rem', fontWeight: 400,
                            letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: '#FFF', background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: 9999, padding: '12px 32px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
                            e.currentTarget.style.background = 'transparent'
                        }}
                    >
                        {t('ui.return')}
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
