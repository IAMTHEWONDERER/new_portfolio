import SectionHeader from '../components/SectionHeader'
import { FiCode, FiLayers, FiZap } from 'react-icons/fi'

const skills = [
    {
        icon: FiCode,
        title: 'Frontend Engineering',
        description: 'React, Next.js, Three.js, TypeScript — building performant, interactive interfaces with modern frameworks.',
    },
    {
        icon: FiLayers,
        title: 'Full-Stack Development',
        description: 'Node.js, Python, PostgreSQL, REST & GraphQL — end-to-end systems from database to deployment.',
    },
    {
        icon: FiZap,
        title: 'Creative Technology',
        description: 'WebGL, GSAP, Framer Motion — blending design and engineering to create memorable digital experiences.',
    },
]

export default function About() {
    return (
        <section id="about" className="relative z-10 py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="reveal">
                    <SectionHeader
                        number="01"
                        title="About"
                        subtitle="Engineer. Creator. Problem-solver. I build things that work and feel great."
                    />
                </div>

                {/* Bio */}
                <div className="reveal mt-6 max-w-2xl">
                    <p className="text-lg text-ash leading-relaxed">
                        I'm a developer passionate about crafting clean, performant applications
                        that make an impact. With expertise spanning the full stack and a love for
                        creative technology, I bring ideas to life with precision and style.
                    </p>
                    <p className="mt-4 text-smoke leading-relaxed">
                        When I'm not coding, you'll find me exploring space tech, contributing to
                        open-source projects, or designing systems that push the boundaries of what's
                        possible on the web.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="reveal mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
                    {skills.map((skill) => (
                        <div key={skill.title} className="panel p-6 group">
                            <skill.icon className="w-7 h-7 text-gold mb-4 group-hover:text-gold-bright transition-colors" />
                            <h3 className="font-ui text-h3 text-stellar uppercase tracking-wide">
                                {skill.title}
                            </h3>
                            <p className="mt-3 text-sm text-smoke leading-relaxed">
                                {skill.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
