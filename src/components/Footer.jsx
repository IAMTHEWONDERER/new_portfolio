import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative z-10 border-t border-ridge">
            <div className="divider-gold" />
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-mono text-xs text-muted tracking-wider">
                    © {year} · SPACE PORTFOLIO · ALL SYSTEMS NOMINAL
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-gold transition-colors duration-200"
                        aria-label="GitHub"
                    >
                        <FiGithub className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted hover:text-gold transition-colors duration-200"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:hello@example.com"
                        className="text-muted hover:text-gold transition-colors duration-200"
                        aria-label="Email"
                    >
                        <FiMail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
