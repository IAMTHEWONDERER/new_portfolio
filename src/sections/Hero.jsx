import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import SolarSystem from '../components/SolarSystem'

const projects = [
    {
        id: '1',
        title: 'Orbital Dashboard',
        description: 'A real-time monitoring dashboard for satellite telemetry data. Built with React, D3.js, and WebSocket streams for live data visualization.',
        tags: ['React', 'D3.js', 'WebSocket', 'Node.js'],
        liveUrl: '#',
        repoUrl: '#',
        planet: { radius: 0.55, color: '#8B9DAF', orbitRadius: 6, speed: 0.35, emissive: '#4A6070' },
    },
    {
        id: '2',
        title: 'Cosmos CMS',
        description: 'Headless content management system with a beautiful admin UI, markdown support, and a lightning-fast API layer powered by GraphQL.',
        tags: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind'],
        liveUrl: '#',
        repoUrl: '#',
        planet: { radius: 0.85, color: '#D4A843', orbitRadius: 10, speed: 0.22, emissive: '#7A5C1E' },
    },
    {
        id: '3',
        title: 'Nebula AI',
        description: 'AI-powered writing assistant with real-time suggestions, tone analysis, and multi-language support.',
        tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
        liveUrl: '#',
        repoUrl: '#',
        planet: { radius: 0.45, color: '#C0392B', orbitRadius: 14, speed: 0.5, emissive: '#7A1A10' },
    },
    {
        id: '4',
        title: 'StarChart 3D',
        description: 'Interactive three-dimensional star map — explore constellations, planets, and deep-space objects in real-time.',
        tags: ['Three.js', 'React', 'WebGL', 'Astronomy API'],
        liveUrl: null,
        repoUrl: '#',
        planet: { radius: 0.65, color: '#6B8E9B', orbitRadius: 18, speed: 0.15, emissive: '#3A5060' },
    },
    {
        id: '5',
        title: 'Quantum Notes',
        description: 'A note-taking app with real-time collaboration, end-to-end encryption, and offline-first architecture.',
        tags: ['React', 'CRDTs', 'WebRTC', 'IndexedDB'],
        liveUrl: '#',
        repoUrl: '#',
        planet: { radius: 0.4, color: '#A0A0A0', orbitRadius: 22, speed: 0.3, emissive: '#505050' },
    },
    {
        id: '6',
        title: 'Launchpad CLI',
        description: 'Developer CLI tool for scaffolding, deploying, and managing full-stack applications with zero config.',
        tags: ['Node.js', 'CLI', 'Docker', 'AWS'],
        liveUrl: null,
        repoUrl: '#',
        planet: { radius: 0.3, color: '#E8C56A', orbitRadius: 25, speed: 0.42, emissive: '#8A7530' },
    },
]

export default function Hero() {
    const underlineRef = useRef(null)

    useEffect(() => {
        if (underlineRef.current) {
            gsap.fromTo(
                underlineRef.current,
                { width: '0%', opacity: 0 },
                { width: '100%', opacity: 1, duration: 1, delay: 1.2, ease: 'power3.out' }
            )
        }
    }, [])

    return (
        <section id="hero" className="relative z-10 h-screen w-full overflow-hidden">
            {/* 3D Solar System Background */}
            <div className="absolute inset-0 z-0">
                <SolarSystem projects={projects} />
            </div>

            {/* Header Overlay — top area */}
            <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                <div className="flex flex-col items-center pt-24 px-6 text-center">
                    {/* Mission stamp */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="section-stamp mb-3"
                    >
                        MISSION CONTROL · PORTFOLIO
                    </motion.span>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0, 0, 1] }}
                        className="font-display text-5xl md:text-hero text-white uppercase leading-none"
                    >
                        Your Name
                    </motion.h1>

                    {/* Gold underline */}
                    <div className="relative w-36 h-px mt-3">
                        <div
                            ref={underlineRef}
                            className="absolute inset-0 bg-gradient-to-r from-gold-deep via-gold to-gold-bright"
                            style={{ width: '0%' }}
                        />
                    </div>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-4 font-ui text-sm md:text-base text-smoke uppercase tracking-[0.2em] max-w-xl"
                    >
                        Full-Stack Developer · Creative Engineer · Builder
                    </motion.p>
                </div>
            </div>
        </section>
    )
}
