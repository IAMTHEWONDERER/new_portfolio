import SectionHeader from '../components/SectionHeader'
import TimelineEntry from '../components/TimelineEntry'

const experiences = [
    {
        year: '2024 — PRESENT',
        title: 'Senior Frontend Engineer',
        organization: 'Mission Control Inc.',
        description: 'Led the frontend team in building a next-gen monitoring dashboard. Reduced load times by 60% through code-splitting and SSR. Implemented Three.js-powered data visualizations.',
    },
    {
        year: '2022 — 2024',
        title: 'Full-Stack Developer',
        organization: 'Nebula Labs',
        description: 'Designed and built scalable REST and GraphQL APIs serving 50k+ daily active users. Owned the entire CI/CD pipeline and deployment infrastructure.',
    },
    {
        year: '2020 — 2022',
        title: 'Frontend Developer',
        organization: 'Stellar Studios',
        description: 'Developed responsive web applications and interactive prototypes for clients across fintech and healthcare. Championed accessibility standards across all projects.',
    },
    {
        year: '2018 — 2020',
        title: 'Junior Developer',
        organization: 'Launchpad Agency',
        description: 'Built marketing websites and web apps with React and Vue. Collaborated closely with design teams to translate Figma comps into pixel-perfect implementations.',
    },
]

export default function Experience() {
    return (
        <section id="experience" className="relative z-10 py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="reveal">
                    <SectionHeader
                        number="02"
                        title="Mission Log"
                        subtitle="Career trajectory and key milestones along the way."
                    />
                </div>

                <div className="reveal mt-6 max-w-2xl">
                    {experiences.map((exp) => (
                        <TimelineEntry key={exp.year} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    )
}
