import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import InteractiveStarsBg from '../components/InteractiveStarsBg'

export default function LifeStory({ onGoBack }) {
    const { t } = useTranslation()
    
    const sections = useMemo(() => {
        return t('life_story.sections', { returnObjects: true }) || []
    }, [t])

    return (
        <div className="bg-transparent w-full" style={{ position: 'relative', minHeight: '100vh', color: '#FFF', overflowX: 'hidden' }}>
            <InteractiveStarsBg />
            {/* Optional slight dark tint to ensure text contrast over bright stars */}
            <div className="absolute inset-0 bg-black/40 -z-0 pointer-events-none" />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto', padding: '40px 32px 120px' }}>
                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    style={{
                        fontFamily: "'Geom', sans-serif",
                        fontSize: '2rem',
                        fontWeight: 300,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        marginBottom: '8px',
                    }}
                >
                    {t('life_story.title')}
                </motion.h1>

                {/* Divider */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80px' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    style={{ height: '1px', background: 'rgba(255,255,255,0.25)', margin: '0 auto 64px' }}
                />

                {/* Story sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                    {sections.map((section, i) => (
                        <motion.section
                            key={section.heading}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: 0.1 * i, duration: 0.7 }}
                        >
                            <h2 style={{
                                fontFamily: "'Geom', sans-serif",
                                fontSize: '0.7rem',
                                fontWeight: 500,
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                                color: '#666',
                                marginBottom: '16px',
                            }}>
                                {section.heading}
                            </h2>
                            <p style={{
                                fontFamily: "'Geom', sans-serif",
                                fontSize: '0.95rem',
                                lineHeight: 1.9,
                                color: '#BBB',
                                fontWeight: 300,
                            }}>
                                {section.text}
                            </p>
                        </motion.section>
                    ))}
                </div>

                {/* Go Back Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{ marginTop: '96px', display: 'flex', justifyContent: 'center' }}
                >
                    <button
                        onClick={onGoBack}
                        style={{
                            fontFamily: "'Geom', sans-serif",
                            fontSize: '0.7rem',
                            fontWeight: 400,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: '#FFFFFF',
                            border: '1px solid #FFFFFF',
                            borderRadius: '9999px',
                            padding: '14px 40px',
                            background: 'transparent',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => { e.target.style.background = '#fff'; e.target.style.color = '#000' }}
                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff' }}
                    >
                        {t('ui.back')}
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
