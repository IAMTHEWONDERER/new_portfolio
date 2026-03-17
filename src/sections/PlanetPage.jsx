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
        subtitle: 'Who I Am',
        color: '#E8D5A3',
        sections: [
            {
                heading: 'The Beginning',
                text: "I'm Oussama Alouche, a Frontend Engineer based in Morocco, passionate about crafting scalable, high-performance web experiences that users love. My approach combines modern frontend architecture with cutting-edge technology to deliver solutions that are both visually stunning and technically robust.",
            },
            {
                heading: 'The Craft',
                text: 'With expertise in React, TypeScript, and design systems, I transform complex requirements into elegant, intuitive interfaces with exceptional UX. I specialize in frontend architecture, performance optimization, and AI integration — leading teams to build products that make a real impact.',
            },
            {
                heading: 'What Drives Me',
                text: 'The intersection of creativity and engineering. The moment when design meets logic and something entirely new emerges. I believe in crafting software that feels alive — interfaces that breathe, animate, and respond in ways that delight users. Every pixel, every transition, every interaction is an opportunity to tell a story.',
            },
        ],
    },
    Earth: {
        number: '02',
        title: 'Technical Expertise',
        subtitle: 'The Stack',
        color: '#4A7AB5',
        sections: [
            {
                heading: 'Modern Frontend',
                text: 'Expert in React.js, Next.js, TypeScript, and Redux. Building scalable, high-performance web applications with component-driven architecture, design tokens, and responsive design systems that maintain cross-platform consistency.',
            },
            {
                heading: 'UI/UX & Design Systems',
                text: 'From wireframes to high-fidelity prototypes in Figma. Proficient in Tailwind CSS, accessibility (WCAG), visual hierarchy, and creating reusable component libraries with comprehensive documentation.',
            },
            {
                heading: 'Backend & APIs',
                text: 'Node.js, Express, Python/FastAPI, Supabase, PostgreSQL, MongoDB. Experienced with REST APIs, GraphQL, webhooks, and third-party service integration. Docker, Git, CI/CD, and Vercel for deployment.',
            },
            {
                heading: 'AI Integration',
                text: 'AI APIs, Model Context Protocols (MCPs), conversational interfaces, and AI-assisted workflows. Building intelligent features that enhance user experiences with cutting-edge AI technology.',
            },
        ],
    },
    Mars: {
        number: '03',
        title: 'Selected Work',
        subtitle: 'The Portfolio',
        color: '#C1440E',
        sections: [
            {
                heading: 'ASANADA LMS Platform',
                text: 'Full learning management system frontend with courses, quizzes, forums, real-time notifications and responsive layouts. Built with React.js, TypeScript, and Tailwind CSS.',
            },
            {
                heading: 'FOSTP Platform',
                text: 'High-performance SSR website using Next.js with real-time synchronization, member management, and multi-step forms. Powered by Tailwind CSS and Firebase.',
            },
            {
                heading: 'RMA-connect',
                text: 'IoT management frontend for electric charging stations with real-time monitoring dashboards and cross-platform user interfaces. Built with React, Angular, and Flutter.',
            },
            {
                heading: 'WorkWhile & Appart9',
                text: 'Innovative workspace solution and modern real estate platforms with clean interface design, advanced property search, virtual tours, and comprehensive listing management. Built with React, Node.js, MongoDB, and PostgreSQL.',
            },
            {
                heading: 'UI/UX Design',
                text: 'AidUs — a comprehensive charity and donation platform designed in Figma. ITS — a modern marketplace for construction materials designed with Figma and Protopie. Intuitive donation flows, community engagement, and seamless ordering experiences.',
            },
        ],
    },
    Jupiter: {
        number: '04',
        title: "Let's Connect",
        subtitle: 'Get In Touch',
        color: '#C4A46C',
        sections: [
            {
                heading: 'Start a Conversation',
                text: "Ready to bring your vision to life? Whether it's a complex web application, an immersive 3D experience, or an AI-powered product — let's discuss your next project and create something extraordinary together.",
            },
            {
                heading: 'Reach Out',
                text: 'Email: oussama.alouche@outlook.com\nPhone: +212 7 20 14 88 07\nGitHub: github.com/IAMTHEWONDERER\nLinkedIn: linkedin.com/in/oussama-alouche',
            },
            {
                heading: 'What I Deliver',
                text: 'Frontend Development • UI/UX Design • AI Integration • Web Applications • Backend Systems • Design Systems. Comprehensive digital solutions tailored to transform your vision into exceptional user experiences that drive results.',
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
