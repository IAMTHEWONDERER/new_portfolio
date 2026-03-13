import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SolarSystem from './components/SolarSystem'
import LifeStory from './sections/LifeStory'
import PlanetPage from './sections/PlanetPage'
import LoadingScreen from './components/LoadingScreen'
import AnimatedStarField from './components/AnimatedStarField'

function App() {
    // 'activePage' holds either 'Sun' or a planet name, or null
    const [activePage, setActivePage] = useState(null)
    const [loadProgress, setLoadProgress] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const contentRef = useRef(null)

    // Loading progress
    const handleLoadProgress = useCallback((pct) => {
        setLoadProgress(pct)
        if (pct >= 1 && !loaded) {
            setTimeout(() => setLoaded(true), 600)
        }
    }, [loaded])

    // Sun or planet second-click → show content completely taking over the screen
    const handleEnterSun = useCallback(() => {
        setActivePage('Sun')
    }, [])

    const handleEnterPlanet = useCallback((name) => {
        setActivePage(name)
    }, [])

    // Return → sliding pages down
    const handleGoBack = useCallback(() => {
        setActivePage(null)
    }, [])

    return (
        <div className="bg-black min-h-screen overflow-hidden relative">
            {/* Global Animated Space Background */}
            <AnimatedStarField />

            {/* Loading screen */}
            <LoadingScreen progress={loadProgress} loaded={loaded} />

            {/* Solar System — animates up when a page is active */}
            <motion.section
                className="absolute inset-0 w-full h-full"
                animate={{ y: activePage ? '-100vh' : '0vh' }}
                transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            >
                <SolarSystem
                    onEnterSun={handleEnterSun}
                    onEnterPlanet={handleEnterPlanet}
                    onLoadProgress={handleLoadProgress}
                    hideLabels={!!activePage}
                />
            </motion.section>

            {/* Content Overlay — takes over the screen completely, animates from bottom */}
            <AnimatePresence>
                {activePage && (
                    <motion.section
                        initial={{ y: '100vh' }}
                        animate={{ y: '0vh' }}
                        exit={{ y: '100vh' }}
                        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 z-30 bg-black overflow-y-auto"
                    >
                        {activePage === 'Sun' ? (
                            <LifeStory onGoBack={handleGoBack} />
                        ) : (
                            <PlanetPage planet={activePage} onReturn={handleGoBack} />
                        )}
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
