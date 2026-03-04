import React, { Suspense, useMemo, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF } from '@react-three/drei'
import { starCatalog, starSize, starOpacity } from '../data/stars'

/* =========================
   Real Solar System Data
   Planets scaled up for visibility
   ========================= */

const PLANETS = [
    {
        name: 'Mercury', radius: 0.4, orbitRadius: 5, speed: 0.8,
        color: '#A0A0A0', emissive: '#555555', moons: [],
    },
    {
        name: 'Venus', radius: 0.6, orbitRadius: 7.5, speed: 0.6,
        color: '#E8D5A3', emissive: '#8A7A50', moons: [],
    },
    {
        name: 'Earth', radius: 0.65, orbitRadius: 10, speed: 0.45,
        color: '#4A7AB5', emissive: '#1A3A60',
        moons: [{ name: 'Moon', radius: 0.15, orbitRadius: 1.2, speed: 3, color: '#CCC' }],
    },
    {
        name: 'Mars', radius: 0.5, orbitRadius: 13, speed: 0.35,
        color: '#C1440E', emissive: '#6A2005',
        moons: [
            { name: 'Phobos', radius: 0.08, orbitRadius: 0.9, speed: 4, color: '#999' },
            { name: 'Deimos', radius: 0.06, orbitRadius: 1.1, speed: 3, color: '#888' },
        ],
    },
    {
        name: 'Jupiter', radius: 1.5, orbitRadius: 18, speed: 0.2,
        color: '#C4A46C', emissive: '#6A5530',
        moons: [
            { name: 'Io', radius: 0.14, orbitRadius: 2.2, speed: 3.5, color: '#D4C070' },
            { name: 'Europa', radius: 0.12, orbitRadius: 2.6, speed: 2.8, color: '#D0C8B8' },
            { name: 'Ganymede', radius: 0.16, orbitRadius: 3.1, speed: 2, color: '#A0A0A0' },
            { name: 'Callisto', radius: 0.14, orbitRadius: 3.6, speed: 1.5, color: '#707070' },
        ],
    },
    {
        name: 'Saturn', radius: 1.3, orbitRadius: 24, speed: 0.14,
        color: '#E0C878', emissive: '#7A6838', hasRings: true,
        moons: [
            { name: 'Titan', radius: 0.16, orbitRadius: 2.4, speed: 2, color: '#D4A020' },
            { name: 'Enceladus', radius: 0.07, orbitRadius: 1.9, speed: 3, color: '#F0F0F0' },
        ],
    },
    {
        name: 'Uranus', radius: 0.9, orbitRadius: 30, speed: 0.09,
        color: '#ACE5EE', emissive: '#4A7A80',
        moons: [{ name: 'Titania', radius: 0.1, orbitRadius: 1.5, speed: 2.5, color: '#C0C0C0' }],
    },
    {
        name: 'Neptune', radius: 0.85, orbitRadius: 35, speed: 0.06,
        color: '#4166F5', emissive: '#1A3090',
        moons: [{ name: 'Triton', radius: 0.12, orbitRadius: 1.5, speed: 2, color: '#B0B0B0' }],
    },
    {
        name: 'Pluto', radius: 0.3, orbitRadius: 40, speed: 0.04,
        color: '#C8B89A', emissive: '#605040',
        moons: [{ name: 'Charon', radius: 0.12, orbitRadius: 0.8, speed: 2.5, color: '#909090' }],
    },
]

/* =========================
   Real Star Background (integrated into the same Canvas)
   ========================= */

function RealStars() {
    const groupRef = useRef()

    const { positions, sizes, opacities } = useMemo(() => {
        const pos = new Float32Array(starCatalog.length * 3)
        const sz = new Float32Array(starCatalog.length)
        const op = new Float32Array(starCatalog.length)

        starCatalog.forEach((star, i) => {
            // Place stars on a large sphere so they surround the solar system
            const scale = 4
            pos[i * 3] = star.position[0] * scale
            pos[i * 3 + 1] = star.position[1] * scale
            pos[i * 3 + 2] = star.position[2] * scale
            sz[i] = starSize(star.magnitude) * 1.2
            op[i] = starOpacity(star.magnitude)
        })

        return { positions: pos, sizes: sz, opacities: op }
    }, [])

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 } },
            vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;
        uniform float uTime;
        void main() {
          vOpacity = aOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.85 + 0.15 * sin(uTime * 1.5 + position.x * 10.0 + position.y * 7.0);
          vOpacity *= twinkle;
          gl_PointSize = aSize * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        varying float vOpacity;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha *= vOpacity;
          gl_FragColor = vec4(0.95, 0.93, 0.88, alpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })
    }, [])

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.006
            groupRef.current.rotation.x += delta * 0.001
        }
        if (shaderMaterial.uniforms) {
            shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <group ref={groupRef}>
            <points material={shaderMaterial}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" array={positions} count={starCatalog.length} itemSize={3} />
                    <bufferAttribute attach="attributes-aSize" array={sizes} count={starCatalog.length} itemSize={1} />
                    <bufferAttribute attach="attributes-aOpacity" array={opacities} count={starCatalog.length} itemSize={1} />
                </bufferGeometry>
            </points>
        </group>
    )
}

/* Dim dust stars for fill */
function DustStars() {
    const ref = useRef()
    const positions = useMemo(() => {
        const arr = new Float32Array(2000 * 3)
        for (let i = 0; i < 2000; i++) {
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(2 * Math.random() - 1)
            const r = 300 + Math.random() * 100
            arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
            arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
            arr[i * 3 + 2] = r * Math.cos(phi)
        }
        return arr
    }, [])

    useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.002 })

    return (
        <group ref={ref}>
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" array={positions} count={2000} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.4} color="#FAFAFA" transparent opacity={0.2} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
            </points>
        </group>
    )
}

/* =========================
   Sun (GLB model with smooth homogeneous glow)
   ========================= */

useGLTF.preload('/planets/sun.glb')

function Sun({ onClick }) {
    const { scene } = useGLTF('/planets/sun.glb')
    const groupRef = useRef()
    const [hovered, setHovered] = useState(false)

    const sunScene = useMemo(() => {
        const clone = scene.clone(true)
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone()
                child.material.emissive = new THREE.Color('#FDB813')
                child.material.emissiveIntensity = 2
            }
        })
        return clone
    }, [scene])

    useFrame(() => {
        if (groupRef.current) groupRef.current.rotation.y += 0.002
    })

    const scale = 0.2

    return (
        <group>
            {/* GLB Model */}
            <group
                ref={groupRef}
                scale={[scale, scale, scale]}
                onClick={(e) => { e.stopPropagation(); onClick?.() }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
            >
                <primitive object={sunScene} />
            </group>

            {/* Smooth circular glow — custom shader plane */}
            <mesh>
                <planeGeometry args={[12, 12]} />
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    uniforms={{
                        uColor: { value: new THREE.Color('#FDB813') },
                        uOpacity: { value: hovered ? 0.2 : 0.14 },
                    }}
                    vertexShader={`
                        varying vec2 vUv;
                        void main() {
                            vUv = uv;
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                        }
                    `}
                    fragmentShader={`
                        uniform vec3 uColor;
                        uniform float uOpacity;
                        varying vec2 vUv;
                        void main() {
                            float dist = length(vUv - vec2(0.5)) * 2.0;
                            float alpha = 1.0 - smoothstep(0.0, 1.0, dist);
                            alpha = pow(alpha, 1.8);
                            gl_FragColor = vec4(uColor, alpha * uOpacity);
                        }
                    `}
                />
            </mesh>

            {/* "Enter" label on hover */}
            <Html position={[0, 2.5, 0]} center distanceFactor={18} style={{ pointerEvents: 'none' }}>
                <div className={`whitespace-nowrap text-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
                    <span style={{ fontFamily: "'Geom', sans-serif", fontSize: 11, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        Enter
                    </span>
                </div>
            </Html>

            {/* Sun as the main illumination source */}
            <pointLight position={[0, 0, 0]} intensity={4} color="#FDB813" distance={120} decay={2} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#FFFFFF" distance={80} decay={2} />
        </group>
    )
}

/* =========================
   Orbit Ring
   ========================= */

function OrbitRing({ radius }) {
    const geometry = useMemo(() => {
        const pts = []
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2
            pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
        }
        return new THREE.BufferGeometry().setFromPoints(pts)
    }, [radius])
    return <line geometry={geometry}><lineBasicMaterial color="#FFFFFF" transparent opacity={0.06} /></line>
}

/* =========================
   Moon
   ========================= */

function MoonObj({ moon, parentPos }) {
    const ref = useRef()
    const off = useMemo(() => Math.random() * Math.PI * 2, [])
    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.elapsedTime * moon.speed + off
            ref.current.position.x = parentPos.current.x + Math.cos(t) * moon.orbitRadius
            ref.current.position.y = parentPos.current.y + Math.sin(t * 0.3) * 0.1
            ref.current.position.z = parentPos.current.z + Math.sin(t) * moon.orbitRadius
        }
    })
    return <mesh ref={ref}><sphereGeometry args={[moon.radius, 16, 16]} /><meshStandardMaterial color={moon.color} roughness={0.8} /></mesh>
}

/* =========================
   Planet — larger with visible labels
   ========================= */

function Planet({ data }) {
    const groupRef = useRef()
    const meshRef = useRef()
    const posRef = useRef({ x: 0, y: 0, z: 0 })
    const [hovered, setHovered] = useState(false)
    const initAngle = useMemo(() => Math.random() * Math.PI * 2, [])

    useFrame((state) => {
        if (groupRef.current) {
            const t = state.clock.elapsedTime * data.speed + initAngle
            const x = Math.cos(t) * data.orbitRadius
            const z = Math.sin(t) * data.orbitRadius
            const y = Math.sin(t * 1.5) * 0.15
            groupRef.current.position.set(x, y, z)
            posRef.current = { x, y, z }
        }
        if (meshRef.current) meshRef.current.rotation.y += 0.008
    })

    return (
        <>
            <group ref={groupRef}>
                <mesh ref={meshRef}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
                    onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
                >
                    <sphereGeometry args={[data.radius, 32, 32]} />
                    <meshStandardMaterial color={data.color} emissive={data.emissive} emissiveIntensity={hovered ? 0.8 : 0.15} roughness={0.7} metalness={0.1} />
                </mesh>
                {data.hasRings && (
                    <mesh rotation={[Math.PI * 0.4, 0, 0]}>
                        <ringGeometry args={[data.radius * 1.3, data.radius * 2.2, 64]} />
                        <meshBasicMaterial color="#D4B878" transparent opacity={0.35} side={THREE.DoubleSide} />
                    </mesh>
                )}
                {hovered && (
                    <mesh><sphereGeometry args={[data.radius * 1.5, 16, 16]} /><meshBasicMaterial color="#FFFFFF" transparent opacity={0.06} side={THREE.BackSide} /></mesh>
                )}
                {/* Always-visible label */}
                <Html position={[0, data.radius + 0.5, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                    <div className={`whitespace-nowrap text-center transition-all duration-300 ${hovered ? 'opacity-100' : 'opacity-60'}`}>
                        <span style={{
                            fontFamily: "'Geom', sans-serif",
                            fontSize: 12,
                            color: '#FFF',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            fontWeight: hovered ? 500 : 300,
                            textShadow: '0 0 8px rgba(0,0,0,0.8)',
                        }}>
                            {data.name}
                        </span>
                    </div>
                </Html>
            </group>
            {data.moons.map((m) => <MoonObj key={m.name} moon={m} parentPos={posRef} />)}
        </>
    )
}

/* =========================
   Camera Zoom Controller
   ========================= */

function CameraZoom({ zoomed }) {
    const { camera } = useThree()
    const targetPos = useMemo(() => new THREE.Vector3(0, 2, 5), [])
    const defaultPos = useMemo(() => new THREE.Vector3(0, 15, 35), [])

    useFrame((_, delta) => {
        const dest = zoomed ? targetPos : defaultPos
        camera.position.lerp(dest, delta * (zoomed ? 1.2 : 1.8))
        const targetFov = zoomed ? 20 : 60
        camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, delta * (zoomed ? 1.2 : 2.5))
        camera.updateProjectionMatrix()
    })

    return null
}

/* =========================
   Main Export
   ========================= */

export default function SolarSystem({ onEnterSun, zoomed }) {
    const handleSunClick = useCallback(() => {
        document.body.style.cursor = 'auto'
        onEnterSun?.()
    }, [onEnterSun])

    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas
                camera={{ position: [0, 15, 35], fov: 60 }}
                gl={{ alpha: false, antialias: true }}
                onCreated={({ gl }) => {
                    gl.setClearColor('#000000')
                    gl.domElement.style.pointerEvents = 'auto'
                }}
            >
                <Suspense fallback={null}>
                    {/* Real star background */}
                    <RealStars />
                    <DustStars />

                    {/* Solar system */}
                    <Sun onClick={handleSunClick} />
                    {PLANETS.map((p) => (
                        <React.Fragment key={p.name}>
                            <OrbitRing radius={p.orbitRadius} />
                            <Planet data={p} />
                        </React.Fragment>
                    ))}

                    {/* Only very subtle ambient — sun is the main source */}
                    <ambientLight intensity={0.04} color="#FFFFFF" />
                    <CameraZoom zoomed={zoomed} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom={!zoomed}
                        enableRotate={!zoomed}
                        minDistance={8}
                        maxDistance={55}
                        autoRotate={!zoomed}
                        autoRotateSpeed={0.15}
                        rotateSpeed={0.4}
                        zoomSpeed={0.8}
                        target={[0, 0, 0]}
                        maxPolarAngle={Math.PI * 0.75}
                        minPolarAngle={Math.PI * 0.15}
                    />
                </Suspense>
            </Canvas>

            {/* Name — bottom center */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none transition-opacity duration-700"
                style={{ opacity: zoomed ? 0 : 1 }}
            >
                <h1 style={{ fontFamily: "'Geom', sans-serif", fontSize: '1.1rem', color: '#FFF', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 300 }}>
                    Oussama Alouche
                </h1>
            </div>

            {/* Subtitle */}
            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500"
                style={{ opacity: zoomed ? 0 : 1 }}
            >
                <p style={{ fontFamily: "'Geom', sans-serif", fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Click the sun to enter
                </p>
            </div>
        </div>
    )
}
