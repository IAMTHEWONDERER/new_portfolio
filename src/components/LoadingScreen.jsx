import { useState, useEffect } from 'react'

/**
 * Full-screen loading screen with planet-themed progress.
 * Shows total bytes loaded / total bytes across all GLB models.
 */
export default function LoadingScreen({ progress, loaded }) {
    const [dots, setDots] = useState('')

    useEffect(() => {
        const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400)
        return () => clearInterval(id)
    }, [])

    if (loaded) return null

    const pct = Math.round(progress * 100)

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#000', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
        }}>
            {/* Subtle radial glow */}
            <div style={{
                position: 'absolute', width: 300, height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(253,184,19,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            {/* Title */}
            <h1 style={{
                fontFamily: "'Geom', sans-serif",
                fontSize: '1.2rem', letterSpacing: '0.4em',
                textTransform: 'uppercase', color: '#FFF',
                fontWeight: 300, marginBottom: 40,
            }}>
                Oussama Alouche
            </h1>

            {/* Progress bar */}
            <div style={{
                width: 240, height: 2,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 1, overflow: 'hidden',
                marginBottom: 16,
            }}>
                <div style={{
                    width: `${pct}%`, height: '100%',
                    background: 'linear-gradient(90deg, #FDB813, #FF8C00)',
                    borderRadius: 1,
                    transition: 'width 0.3s ease-out',
                }} />
            </div>

            {/* Percentage + status */}
            <p style={{
                fontFamily: "'Geom', sans-serif",
                fontSize: '0.55rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#555',
                fontWeight: 300,
            }}>
                Loading system{dots} {pct}%
            </p>
        </div>
    )
}
