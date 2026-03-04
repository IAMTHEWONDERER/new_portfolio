import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { starCatalog, starSize, starOpacity } from '../data/stars'

/**
 * Real-sky star renderer — plots ~200 actual stars from the HYG/Hipparcos
 * catalog at their true Right Ascension / Declination positions on a
 * celestial sphere. The scene slowly rotates to simulate Earth's rotation.
 *
 * Stars are monochrome white per the Apollo Monochrome design system.
 * Brighter stars (lower apparent magnitude) are rendered larger and more opaque.
 */

function RealStars() {
    const groupRef = useRef()
    const pointsRef = useRef()

    // Build geometry from catalog
    const { positions, sizes, opacities } = useMemo(() => {
        const pos = new Float32Array(starCatalog.length * 3)
        const sz = new Float32Array(starCatalog.length)
        const op = new Float32Array(starCatalog.length)

        starCatalog.forEach((star, i) => {
            pos[i * 3] = star.position[0]
            pos[i * 3 + 1] = star.position[1]
            pos[i * 3 + 2] = star.position[2]
            sz[i] = starSize(star.magnitude)
            op[i] = starOpacity(star.magnitude)
        })

        return { positions: pos, sizes: sz, opacities: op }
    }, [])

    // Custom shader material for variable-size, variable-opacity stars
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
            },
            vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;
        varying float vSize;
        uniform float uTime;

        void main() {
          vOpacity = aOpacity;
          vSize = aSize;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // Subtle twinkle based on position + time
          float twinkle = 0.85 + 0.15 * sin(uTime * 1.5 + position.x * 10.0 + position.y * 7.0);
          vOpacity *= twinkle;

          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying float vOpacity;
        varying float vSize;

        void main() {
          // Circular soft point
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          // Soft glow falloff
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= vOpacity;

          // Pure white stars (per design system: monochrome, not colored)
          gl_FragColor = vec4(0.95, 0.93, 0.88, alpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
    }, [])

    // Slow rotation to simulate sidereal motion
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotate around the polar axis (Y) — simulates Earth spinning
            groupRef.current.rotation.y += delta * 0.008
            // Very subtle tilt drift
            groupRef.current.rotation.x += delta * 0.002
        }
        // Update twinkle
        if (shaderMaterial.uniforms) {
            shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <group ref={groupRef}>
            <points ref={pointsRef} material={shaderMaterial}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={positions}
                        count={starCatalog.length}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-aSize"
                        array={sizes}
                        count={starCatalog.length}
                        itemSize={1}
                    />
                    <bufferAttribute
                        attach="attributes-aOpacity"
                        array={opacities}
                        count={starCatalog.length}
                        itemSize={1}
                    />
                </bufferGeometry>
            </points>
        </group>
    )
}

/**
 * Background dust / faint fill stars rendered via drei Stars for depth.
 * These are intentionally dim to fill in the gaps between real catalog stars.
 */
function DustStars() {
    const ref = useRef()

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.003
        }
    })

    return (
        <group ref={ref}>
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={useMemo(() => {
                            const arr = new Float32Array(1500 * 3)
                            for (let i = 0; i < 1500; i++) {
                                // Random points on a sphere
                                const theta = Math.random() * Math.PI * 2
                                const phi = Math.acos(2 * Math.random() - 1)
                                const r = 95 + Math.random() * 10
                                arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
                                arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
                                arr[i * 3 + 2] = r * Math.cos(phi)
                            }
                            return arr
                        }, [])}
                        count={1500}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.15}
                    color="#FAFAFA"
                    transparent
                    opacity={0.25}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

export default function StarField() {
    return (
        <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
            <Canvas
                camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 300 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true, antialias: false }}
            >
                {/* Real catalog stars */}
                <RealStars />
                {/* Dim random fill for density */}
                <DustStars />
            </Canvas>
        </div>
    )
}
