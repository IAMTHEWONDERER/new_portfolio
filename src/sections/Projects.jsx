import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'

const projects = [
    {
        title: 'Orbital Dashboard',
        description: 'A real-time monitoring dashboard for satellite telemetry data. Built with React, D3.js, and WebSocket streams for live data visualization.',
        tags: ['React', 'D3.js', 'WebSocket', 'Node.js'],
        image: null,
        liveUrl: '#',
        repoUrl: '#',
    },
    {
        title: 'Cosmos CMS',
        description: 'Headless content management system with a beautiful admin UI, markdown support, and a lightning-fast API layer powered by GraphQL.',
        tags: ['Next.js', 'GraphQL', 'PostgreSQL', 'Tailwind'],
        image: null,
        liveUrl: '#',
        repoUrl: '#',
    },
    {
        title: 'Nebula AI',
        description: 'An AI-powered writing assistant that helps craft compelling copy. Features real-time suggestions, tone analysis, and multi-language support.',
        tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
        image: null,
        liveUrl: '#',
        repoUrl: '#',
    },
    {
        title: 'StarChart 3D',
        description: 'Interactive three-dimensional star map built with Three.js. Explore constellations, planets, and deep-space objects in real-time.',
        tags: ['Three.js', 'React', 'WebGL', 'Astronomy API'],
        image: null,
        liveUrl: null,
        repoUrl: '#',
    },
]

export default function Projects() {
    return (
        <section id="projects" className="section relative z-10">
            <div className="reveal">
                <SectionHeader
                    number="02"
                    title="Projects"
                    subtitle="Selected works from my engineering and creative portfolio."
                />
            </div>

            <div className="reveal mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        featured={i === 0}
                    />
                ))}
            </div>

            <div className="reveal mt-10 text-center">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                    View All on GitHub
                </a>
            </div>
        </section>
    )
}
