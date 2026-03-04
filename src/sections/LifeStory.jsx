import { motion } from 'framer-motion'

export default function LifeStory({ onGoBack }) {
    return (
        <div className="bg-black text-white">
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '40px 32px 120px' }}>
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
                    Oussama Alouche
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
                    {[
                        {
                            label: 'The Beginning',
                            text: `Every journey begins with a single step. Mine started with curiosity — a relentless desire to understand how things work, how systems connect, and how technology can reshape the way we experience the world.`,
                        },
                        {
                            label: 'The Craft',
                            text: `I write code. I design systems. I build bridges between ideas and reality. From full-stack applications to immersive 3D experiences, I take pride in creating things that are both functional and beautiful — engineered with precision, delivered with care.`,
                        },
                        {
                            label: 'The Mission',
                            text: `I believe in building with purpose. Every line of code should serve the user. Every interface should tell a story. Every system should scale. I'm not just building software — I'm building the future, one project at a time.`,
                        },
                        {
                            label: 'What Drives Me',
                            text: `The intersection of creativity and engineering. The moment when design meets logic and something entirely new emerges. I'm drawn to challenges that push boundaries — projects that demand both technical depth and creative vision.`,
                        },
                    ].map((section, i) => (
                        <motion.section
                            key={section.label}
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
                                {section.label}
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
                        Go back to system
                    </button>
                </motion.div>
            </div>
        </div>
    )
}
