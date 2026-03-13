import { useMemo } from 'react'
import { motion } from 'framer-motion'
import InteractiveStarsBg from '../components/InteractiveStarsBg'

/**
 * Content for each planet — mapped to user's background sections.
 */
const PLANET_CONTENT = {
    Venus: {
        number: '01',
        title: 'About Me',
        subtitle: 'Introduction',
        color: '#E8D5A3',
        sections: [
            {
                heading: 'The Beginning',
                text: 'A passionate software engineer and creative technologist with a deep love for building immersive digital experiences. From an early age, the intersection of art and technology sparked a curiosity that continues to drive everything I create.',
            },
            {
                heading: 'Who I Am',
                text: 'I believe in crafting software that feels alive — interfaces that breathe, animate, and respond in ways that delight users. Every pixel, every transition, every interaction is an opportunity to tell a story.',
            },
        ],
    },
    Earth: {
        number: '02',
        title: 'Education & Skills',
        subtitle: 'The Foundation',
        color: '#4A7AB5',
        sections: [
            {
                heading: 'Academic Journey',
                text: 'Studied computer science with a focus on interactive systems and visual computing. Built a strong foundation in algorithms, data structures, and system design while pursuing creative projects on the side.',
            },
            {
                heading: 'Technical Stack',
                text: 'Proficient in React, Three.js, TypeScript, Node.js, Python, and modern web technologies. Experienced with 3D graphics, WebGL, shader programming, and building performant real-time applications.',
            },
        ],
    },
    Mars: {
        number: '03',
        title: 'Experience',
        subtitle: 'The Journey',
        color: '#C1440E',
        sections: [
            {
                heading: 'Professional Path',
                text: 'Worked across startups and established companies, building everything from customer-facing web applications to internal tools and creative installations. Each role shaped a deeper understanding of what makes software truly great.',
            },
            {
                heading: 'Key Achievements',
                text: 'Led frontend architecture migrations, built real-time collaboration tools, shipped products used by thousands, and mentored junior developers. Always pushing for cleaner code, better UX, and more ambitious projects.',
            },
        ],
    },
    Jupiter: {
        number: '04',
        title: 'Projects',
        subtitle: 'The Portfolio',
        color: '#C4A46C',
        sections: [
            {
                heading: 'Creative Works',
                text: 'From interactive 3D visualizations to AI-powered applications, every project is an exploration of what\'s possible. Building tools that solve real problems while delivering experiences that inspire.',
            },
            {
                heading: 'Open Source',
                text: 'Contributing to the developer community through open-source projects, technical writing, and knowledge sharing. Believe in building in public and lifting others as you climb.',
            },
        ],
    },
}

export default function PlanetPage({ planet, onReturn }) {
    const data = PLANET_CONTENT[planet]
    if (!data) return null

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
                        {data.number}
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
                        Return to System
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
