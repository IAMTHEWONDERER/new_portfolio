import { useState, useCallback, useRef, useEffect } from 'react'
import SolarSystem from './components/SolarSystem'
import LifeStory from './sections/LifeStory'

function App() {
    const [zoomed, setZoomed] = useState(false)
    const [showStory, setShowStory] = useState(false)
    const storyRef = useRef(null)
    const topRef = useRef(null)

    const handleEnterSun = useCallback(() => {
        setZoomed(true)
        // After zoom animation finishes, reveal story and scroll down
        setTimeout(() => {
            setShowStory(true)
            setTimeout(() => {
                storyRef.current?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }, 1800)
    }, [])

    const handleGoBack = useCallback(() => {
        // Scroll to top first
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // After scroll, zoom out and hide story
        setTimeout(() => {
            setZoomed(false)
            setShowStory(false)
        }, 800)
    }, [])

    return (
        <div className="bg-black min-h-screen" ref={topRef}>
            {/* Solar System — always at top, 100vh */}
            <section className="relative h-screen w-full">
                <SolarSystem onEnterSun={handleEnterSun} zoomed={zoomed} />
            </section>

            {/* Sticky Sun Glow — visible when scrolling story */}
            {showStory && (
                <div className="sticky top-0 z-40 flex justify-center pointer-events-none">
                    <div
                        className="w-full h-24 flex justify-center items-start pt-4"
                        style={{
                            background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0) 100%)',
                        }}
                    >
                        {/* Mini sun disc */}
                        <div
                            className="w-10 h-10 rounded-full"
                            style={{
                                background: 'radial-gradient(circle at 35% 35%, #FFE066, #FDB813, #E8960C)',
                                boxShadow: '0 0 30px rgba(253,184,19,0.35), 0 0 60px rgba(253,184,19,0.12)',
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Life Story Content — revealed after zoom */}
            {showStory && (
                <section ref={storyRef} className="relative z-30">
                    <LifeStory onGoBack={handleGoBack} />
                </section>
            )}
        </div>
    )
}

export default App
