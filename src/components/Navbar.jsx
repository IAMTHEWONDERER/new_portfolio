import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-abyss/90 backdrop-blur-md border-b border-ridge'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="font-display text-xl text-gold font-bold tracking-wide">
                    PORTFOLIO
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2 font-ui text-sm text-smoke uppercase tracking-widest hover:text-stellar transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a href="#contact" className="btn-gold ml-4 text-xs py-2 px-5">
                        Get in Touch
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 w-7 group"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`h-px bg-stellar transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-[4px]' : ''} w-full`} />
                    <span className={`h-px bg-stellar transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''} w-full`} />
                    <span className={`h-px bg-stellar transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-[4px]' : ''} w-full`} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-deep/95 backdrop-blur-md border-b border-ridge overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-4 gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-ui text-sm text-smoke uppercase tracking-widest hover:text-stellar transition-colors py-2"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a href="#contact" className="btn-gold text-xs py-2 px-5 self-start mt-2">
                                Get in Touch
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
