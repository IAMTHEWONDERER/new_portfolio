import { useMemo, useEffect, useState } from 'react'

export default function AnimatedStarField({ planetColor = 'rgba(255,255,255,0)' }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate a normalized offset from the center of the screen (-1 to 1)
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            setMousePos({ x, y })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    // Generate stars once
    const stars = useMemo(() =>
        Array.from({ length: 200 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100, // full screen spread
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.7 + 0.1,
            duration: Math.random() * 40 + 30,
            delay: Math.random() * -40,
        })),
    [])

    // Galaxy nebulae — tinted by current active planet
    const galaxies = useMemo(() => [
        { x: 15, y: 20, size: 280, color: planetColor, rotation: 25 },
        { x: 75, y: 55, size: 220, color: 'rgba(100,120,255,0.06)', rotation: -15 },
        { x: 40, y: 85, size: 300, color: planetColor, rotation: 40 },
    ], [planetColor])

    return (
        <div 
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden" 
            style={{ 
                background: '#000',
                transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
                transition: 'transform 0.4s ease-out'
            }}
        >
            <style>{`
                @keyframes starDrift {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(12px, -8px); }
                    50% { transform: translate(-6px, 14px); }
                    75% { transform: translate(8px, 6px); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes galaxySpin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes starTwinkle {
                    0%, 100% { opacity: var(--star-opacity); }
                    50% { opacity: calc(var(--star-opacity) * 0.3); }
                }
            `}</style>

            {stars.map(star => (
                <div
                    key={star.id}
                    style={{
                        position: 'absolute',
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        borderRadius: '50%',
                        background: '#FFF',
                        '--star-opacity': star.opacity,
                        opacity: star.opacity,
                        animation: `starDrift ${star.duration}s ease-in-out ${star.delay}s infinite, starTwinkle ${star.duration * 0.6}s ease-in-out ${star.delay}s infinite`,
                    }}
                />
            ))}

            {galaxies.map((g, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        left: `${g.x}%`,
                        top: `${g.y}%`,
                        width: g.size,
                        height: g.size * 0.5,
                        borderRadius: '50%',
                        background: `radial-gradient(ellipse at center, ${g.color} 0%, transparent 70%)`,
                        transform: `translate(-50%, -50%) rotate(${g.rotation}deg)`,
                        filter: 'blur(30px)',
                        animation: `galaxySpin ${200 + i * 80}s linear infinite`,
                        transition: 'background 1.5s ease', // Smooth color transition when changing planets
                    }}
                />
            ))}
        </div>
    )
}
