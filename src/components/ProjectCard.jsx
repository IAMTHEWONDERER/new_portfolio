import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

export default function ProjectCard({ project, featured = false }) {
    const { title, description, tags, image, liveUrl, repoUrl } = project

    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: [0.25, 0, 0, 1] }}
            className={`${featured ? 'panel-featured' : 'panel'} overflow-hidden group`}
        >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-surface">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="font-mono text-sm text-muted">[ IMAGE ]</span>
                    </div>
                )}
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-ui text-h3 text-stellar group-hover:text-gold-bright transition-colors duration-200">
                    {title}
                </h3>
                <p className="mt-2 text-sm text-smoke leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span
                            key={tag}
                            className="font-ui text-label text-gold bg-gold/10 px-2 py-1 rounded-sharp"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex gap-3">
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-1.5 px-3">
                            <FiExternalLink className="w-3.5 h-3.5" />
                            Live
                        </a>
                    )}
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-1.5 px-3">
                            <FiGithub className="w-3.5 h-3.5" />
                            Code
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    )
}
