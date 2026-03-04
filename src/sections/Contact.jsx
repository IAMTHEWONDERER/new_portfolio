import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'

export default function Contact() {
    return (
        <section id="contact" className="relative z-10 py-24 md:py-32 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="reveal">
                    <SectionHeader
                        number="03"
                        title="Contact"
                        subtitle="Ready to launch something together? Let's connect."
                    />
                </div>

                <div className="reveal mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left — Info */}
                    <div>
                        <p className="text-lg text-ash leading-relaxed mb-8">
                            I'm always open to new opportunities, collaborations, and conversations.
                            Whether you have a project in mind or just want to say hello — reach out.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-smoke">
                                <FiMail className="w-5 h-5 text-gold shrink-0" />
                                <span className="font-mono text-sm">hello@example.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-smoke">
                                <FiMapPin className="w-5 h-5 text-gold shrink-0" />
                                <span className="font-mono text-sm">Earth, Solar System</span>
                            </div>
                        </div>
                    </div>

                    {/* Right — Form */}
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="space-y-4"
                    >
                        <div>
                            <label className="font-ui text-label text-smoke uppercase tracking-widest mb-1.5 block">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Commander Shepard"
                                className="w-full bg-surface border border-ridge rounded-md px-4 py-3 text-sm text-ash placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors font-body"
                            />
                        </div>
                        <div>
                            <label className="font-ui text-label text-smoke uppercase tracking-widest mb-1.5 block">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="commander@normandy.ship"
                                className="w-full bg-surface border border-ridge rounded-md px-4 py-3 text-sm text-ash placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors font-body"
                            />
                        </div>
                        <div>
                            <label className="font-ui text-label text-smoke uppercase tracking-widest mb-1.5 block">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                placeholder="Describe your mission..."
                                className="w-full bg-surface border border-ridge rounded-md px-4 py-3 text-sm text-ash placeholder:text-muted focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors resize-none font-body"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-gold w-full justify-center mt-2"
                        >
                            <FiSend className="w-4 h-4" />
                            Transmit Message
                        </motion.button>
                    </form>
                </div>
            </div>
        </section>
    )
}
