import { useState, useCallback, useRef } from 'react'
import SolarSystem from './components/SolarSystem'
import LifeStory from './sections/LifeStory'
import PlanetPage from './sections/PlanetPage'
import LoadingScreen from './components/LoadingScreen'

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

    // Sun or planet second-click → show content below & scroll down
    const handleEnterSun = useCallback(() => {
        setActivePage('Sun')
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }, [])

    const handleEnterPlanet = useCallback((name) => {
        setActivePage(name)
        setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
    }, [])

    // Return → scroll up then clear
    const handleGoBack = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setTimeout(() => { setActivePage(null) }, 800)
    }, [])

    return (
        <div className="bg-black min-h-screen">
            {/* Loading screen */}
            <LoadingScreen progress={loadProgress} loaded={loaded} />

            {/* Solar System — always at top, 100vh */}
            <section className="relative h-screen w-full">
                <SolarSystem
                    onEnterSun={handleEnterSun}
                    onEnterPlanet={handleEnterPlanet}
                    onLoadProgress={handleLoadProgress}
                    hideLabels={!!activePage}
                />
            </section>

            {/* Content — revealed below solar system by scrolling */}
            {activePage && (
                <section ref={contentRef} className="relative z-30">
                    {activePage === 'Sun' ? (
                        <LifeStory onGoBack={handleGoBack} />
                    ) : (
                        <PlanetPage planet={activePage} onReturn={handleGoBack} />
                    )}
                </section>
            )}
        </div>
    )
}

export default App
