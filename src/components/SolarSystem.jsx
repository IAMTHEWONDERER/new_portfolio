import React, { Suspense, useMemo, useRef, useState, useCallback, useEffect, createContext, useContext } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Html, useGLTF, Billboard, useProgress } from '@react-three/drei'
import { starCatalog, starSize, starOpacity } from '../data/stars'

// Shared planet position store
const PlanetPosContext = createContext(null)

/* =============================
   Planet Config — bigger planets, closer orbits
   ============================= */

const PLANET_MODELS = {
    Venus: '/planets/venus.glb',
    Earth: '/planets/earth.glb',
    Mars: '/planets/mars.glb',
    Jupiter: '/planets/jupiter.glb',
}

const MOON_MODEL = '/planets/moon.glb'

const PLANETS = [
    {
        name: 'Venus', number: '01', radius: 0.315, orbitRadius: 8, speed: -0.5,
        color: '#E8D5A3', moons: [],
        // Venus: 243 Earth-day period, retrograde → very slow, negative
        rotationSpeed: -0.00002,
    },
    {
        name: 'Earth', number: '02', radius: 1.05, orbitRadius: 13, speed: 0.40,
        color: '#4A7AB5',
        moons: [{ name: 'Moon', radius: 0.16, orbitRadius: 2.5, speed: 2.5, color: '#CCC' }],
        // Earth: 1 day period → base speed
        rotationSpeed: 0.005,
    },
    {
        name: 'Mars', number: '03', radius: 0.84, orbitRadius: 19, speed: 0.30,
        color: '#C1440E', moons: [],
        // Mars: 1.03 Earth-day period → ~same as Earth
        rotationSpeed: 0.00485,
    },
    {
        name: 'Jupiter', number: '04', radius: 2.2, orbitRadius: 27, speed: 0.18,
        color: '#C4A46C', moons: [],
        // Jupiter: 0.41 Earth-day period → 2.44× faster than Earth
        rotationSpeed: 0.0122,
    },
]

// Preload all models
Object.values(PLANET_MODELS).forEach(p => useGLTF.preload(p))
useGLTF.preload(MOON_MODEL)
useGLTF.preload('/planets/sun.glb')

/* =============================
   Star Background
   ============================= */

function RealStars() {
    const groupRef = useRef()
    const { positions, sizes, opacities } = useMemo(() => {
        const pos = new Float32Array(starCatalog.length * 3)
        const sz = new Float32Array(starCatalog.length)
        const op = new Float32Array(starCatalog.length)
        starCatalog.forEach((star, i) => {
            const s = 5
            pos[i * 3] = star.position[0] * s
            pos[i * 3 + 1] = star.position[1] * s
            pos[i * 3 + 2] = star.position[2] * s
            sz[i] = starSize(star.magnitude) * 1.2
            op[i] = starOpacity(star.magnitude)
        })
        return { positions: pos, sizes: sz, opacities: op }
    }, [])

    const mat = useMemo(() => new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
      attribute float aSize;
      attribute float aOpacity;
      varying float vOpacity;
      uniform float uTime;
      void main() {
        vOpacity = aOpacity * (0.85 + 0.15 * sin(uTime * 1.5 + position.x * 10.0 + position.y * 7.0));
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (300.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
        fragmentShader: `
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float a = (1.0 - smoothstep(0.0, 0.5, d)) * vOpacity;
        gl_FragColor = vec4(0.95, 0.93, 0.88, a);
      }`,
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    }), [])

    useFrame((state, delta) => {
        if (groupRef.current) { groupRef.current.rotation.y += delta * 0.006; groupRef.current.rotation.x += delta * 0.001 }
        mat.uniforms.uTime.value = state.clock.elapsedTime
    })

    return (
        <group ref={groupRef}>
            <points material={mat}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" array={positions} count={starCatalog.length} itemSize={3} />
                    <bufferAttribute attach="attributes-aSize" array={sizes} count={starCatalog.length} itemSize={1} />
                    <bufferAttribute attach="attributes-aOpacity" array={opacities} count={starCatalog.length} itemSize={1} />
                </bufferGeometry>
            </points>
        </group>
    )
}

function DustStars() {
    const ref = useRef()
    const positions = useMemo(() => {
        const a = new Float32Array(2000 * 3)
        for (let i = 0; i < 2000; i++) {
            const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1), r = 400 + Math.random() * 100
            a[i * 3] = r * Math.sin(p) * Math.cos(t); a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t); a[i * 3 + 2] = r * Math.cos(p)
        }
        return a
    }, [])
    useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.002 })
    return (
        <group ref={ref}><points><bufferGeometry>
            <bufferAttribute attach="attributes-position" array={positions} count={2000} itemSize={3} />
        </bufferGeometry>
            <pointsMaterial size={0.4} color="#FAFAFA" transparent opacity={0.2} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points></group>
    )
}

/* =============================
   Sun Glow Shader
   ============================= */

const glowVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const glowFragmentShader = `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    vec2 center = vUv - vec2(0.5);
    float dist = length(center) * 2.0;
    if (dist > 1.0) discard;
    float core = exp(-dist * dist * 6.0) * 0.5;
    float mid = exp(-dist * dist * 1.5) * 0.2;
    float outer = (1.0 - smoothstep(0.0, 1.0, dist)) * 0.06;
    float alpha = (core + mid + outer) * uIntensity;
    if (alpha < 0.002) discard;
    vec3 col = mix(uColor, uColor * 0.7, dist);
    gl_FragColor = vec4(col, alpha);
  }
`

/* =============================
   Sun (GLB)
   ============================= */

function Sun({ onFocus, isFocused }) {
    const { scene } = useGLTF('/planets/sun.glb')
    const groupRef = useRef()
    const [hovered, setHovered] = useState(false)

    const sunScene = useMemo(() => {
        const c = scene.clone(true)
        c.traverse((child) => {
            if (child.isMesh) {
                child.material = child.material.clone()
                child.material.emissive = new THREE.Color('#FDB813')
                child.material.emissiveIntensity = 2
            }
        })
        return c
    }, [scene])

    useFrame(() => { if (groupRef.current) groupRef.current.rotation.y += 0.002 })

    const scale = 0.35

    return (
        <group>
            <group
                ref={groupRef}
                scale={[scale, scale, scale]}
                onClick={(e) => { e.stopPropagation(); onFocus?.('Sun') }}
                onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
                onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
            >
                <primitive object={sunScene} />
            </group>

            <Billboard>
                <mesh>
                    <planeGeometry args={[22, 22]} />
                    <shaderMaterial
                        transparent depthWrite={false} blending={THREE.AdditiveBlending}
                        vertexShader={glowVertexShader} fragmentShader={glowFragmentShader}
                        uniforms={{
                            uColor: { value: new THREE.Color('#FDB813') },
                            uIntensity: { value: hovered ? 0.3 : 0.2 },
                        }}
                    />
                </mesh>
            </Billboard>

            <Html position={[0, 4, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
                <div className={`whitespace-nowrap text-center transition-all duration-300 ${hovered || isFocused ? 'opacity-100' : 'opacity-50'}`}>
                    <span style={{
                        fontFamily: "'Geom', sans-serif", fontSize: 13, color: '#FFF',
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        fontWeight: hovered || isFocused ? 500 : 300,
                        textShadow: '0 0 10px rgba(0,0,0,0.9)',
                    }}>Sun</span>
                    {isFocused && (
                        <span style={{
                            fontFamily: "'Geom', sans-serif", fontSize: 8,
                            color: '#888', letterSpacing: '0.15em',
                            textTransform: 'uppercase', display: 'block', marginTop: 4,
                        }}>Click to explore</span>
                    )}
                </div>
            </Html>

            <pointLight position={[0, 0, 0]} intensity={500} color="#FDB813" distance={300} decay={1.8} />
            <pointLight position={[0, 0, 0]} intensity={200} color="#FFFFFF" distance={250} decay={1.8} />
        </group>
    )
}

/* =============================
   Orbit Ring
   ============================= */

function OrbitRing({ radius }) {
    const geo = useMemo(() => {
        const pts = []
        for (let i = 0; i <= 128; i++) {
            const a = (i / 128) * Math.PI * 2
            pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
        }
        return new THREE.BufferGeometry().setFromPoints(pts)
    }, [radius])
    return <line geometry={geo}><lineBasicMaterial color="#FFFFFF" transparent opacity={0.05} /></line>
}

/* =============================
   GLB Moon
   ============================= */

function MoonGLB({ moon, parentPos }) {
    const { scene } = useGLTF(MOON_MODEL)
    const ref = useRef()
    const modelRef = useRef()
    const off = useMemo(() => Math.random() * Math.PI * 2, [])

    const moonScene = useMemo(() => {
        const c = scene.clone(true)
        c.traverse((child) => {
            if (child.isMesh) {
                if (child.material.isMeshBasicMaterial) {
                    const old = child.material
                    child.material = new THREE.MeshStandardMaterial({
                        map: old.map,
                        color: old.color,
                        roughness: 0.8,
                        metalness: 0.02,
                    })
                } else {
                    child.material = child.material.clone()
                    child.material.roughness = Math.max(child.material.roughness || 0.6, 0.5)
                }
            }
        })
        return c
    }, [scene])

    useFrame((s) => {
        if (!ref.current) return
        const t = s.clock.elapsedTime * moon.speed + off
        ref.current.position.set(
            parentPos.current.x + Math.cos(t) * moon.orbitRadius,
            parentPos.current.y + Math.sin(t * 0.3) * 0.1,
            parentPos.current.z + Math.sin(t) * moon.orbitRadius
        )
        // Moon: 27.3 Earth-day rotation period (tidally locked)
        if (modelRef.current) modelRef.current.rotation.y += 0.000183
    })

    // Auto-compute scale from bounding box to match desired radius
    const autoScale = useMemo(() => {
        const box = new THREE.Box3().setFromObject(moonScene)
        const size = new THREE.Vector3()
        box.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim === 0) return 0.004
        return (moon.radius * 2) / maxDim
    }, [moonScene, moon.radius])
    return (
        <group ref={ref}>
            <group ref={modelRef} scale={[autoScale, autoScale, autoScale]}>
                <primitive object={moonScene} />
            </group>
        </group>
    )
}

/* =============================
   GLB Planet
   ============================= */

function Planet({ data, onFocus, focusPlanet }) {
    const { scene } = useGLTF(PLANET_MODELS[data.name])
    const groupRef = useRef()
    const modelRef = useRef()
    const posRef = useRef({ x: 0, y: 0, z: 0 })
    const [hovered, setHovered] = useState(false)
    const initAngle = useMemo(() => Math.random() * Math.PI * 2, [])
    const planetPositions = useContext(PlanetPosContext)
    const isFocused = focusPlanet === data.name

    const planetScene = useMemo(() => {
        const c = scene.clone(true)
        c.traverse((child) => {
            if (child.isMesh) {
                // Keep the original material — do NOT replace it.
                // This preserves Earth's texture, Mars's surface, etc.
                // Just ensure it responds to scene lights properly.
                if (child.material.isMeshBasicMaterial) {
                    // Only convert flat materials that can't receive light
                    const old = child.material
                    child.material = new THREE.MeshStandardMaterial({
                        map: old.map,
                        color: old.color,
                        roughness: 0.7,
                        metalness: 0.05,
                    })
                } else {
                    // Already a lit material — just tweak for better look
                    child.material = child.material.clone()
                    child.material.roughness = Math.max(child.material.roughness || 0.5, 0.4)
                    child.material.metalness = Math.min(child.material.metalness || 0.1, 0.3)
                    // Subtle emissive so the dark side isn't pitch black
                    child.material.emissive = new THREE.Color(data.color)
                    child.material.emissiveIntensity = 0.02
                }
            }
        })
        return c
    }, [scene])

    useFrame((s) => {
        // Orbital movement
        if (groupRef.current) {
            const t = s.clock.elapsedTime * data.speed + initAngle
            const x = Math.cos(t) * data.orbitRadius, z = Math.sin(t) * data.orbitRadius, y = Math.sin(t * 1.5) * 0.15
            groupRef.current.position.set(x, y, z)
            posRef.current = { x, y, z }
            if (planetPositions) planetPositions.current[data.name] = { x, y, z }
        }
        // Axial rotation — realistic speed per planet
        if (modelRef.current) {
            modelRef.current.rotation.y += (data.rotationSpeed || 0.005)
        }
    })

    // Auto-compute scale from model's bounding box to match desired radius
    const autoScale = useMemo(() => {
        const box = new THREE.Box3().setFromObject(planetScene)
        const size = new THREE.Vector3()
        box.getSize(size)
        const maxDim = Math.max(size.x, size.y, size.z)
        if (maxDim === 0) return data.modelScale || 0.01
        // Scale so the model fits exactly into data.radius * 2 (diameter)
        return (data.radius * 2) / maxDim
    }, [planetScene, data.radius])

    return (
        <>
            <group ref={groupRef}>
                <group
                    ref={modelRef}
                    scale={[autoScale, autoScale, autoScale]}
                    onClick={(e) => { e.stopPropagation(); onFocus?.(data.name) }}
                    onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
                    onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto' }}
                >
                    <primitive object={planetScene} />
                </group>

                {/* Number label */}
                <Html position={[0, data.radius + 0.8, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                    <div className={`whitespace-nowrap text-center transition-all duration-300 ${hovered || isFocused ? 'opacity-100' : 'opacity-50'}`}>
                        <span style={{
                            fontFamily: "'Geom', sans-serif", fontSize: 10,
                            color: data.color, opacity: 0.5,
                            letterSpacing: '0.1em', display: 'block', marginBottom: 2,
                        }}>{data.number}</span>
                        <span style={{
                            fontFamily: "'Geom', sans-serif", fontSize: 13, color: '#FFF',
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            fontWeight: hovered || isFocused ? 500 : 300,
                            textShadow: '0 0 10px rgba(0,0,0,0.9)',
                        }}>{data.name}</span>
                        {isFocused && (
                            <span style={{
                                fontFamily: "'Geom', sans-serif", fontSize: 8,
                                color: '#888', letterSpacing: '0.15em',
                                textTransform: 'uppercase', display: 'block', marginTop: 4,
                            }}>Click to explore</span>
                        )}
                    </div>
                </Html>
            </group>
            {data.moons?.map((m) => <MoonGLB key={m.name} moon={m} parentPos={posRef} />)}
        </>
    )
}

/* =============================
   Camera Controller
   ============================= */

function CameraController({ focusPlanet, planets, controlsRef }) {
    const { camera } = useThree()
    const defaultPos = useMemo(() => new THREE.Vector3(0, 18, 42), [])
    const planetPositions = useContext(PlanetPosContext)
    const lookTarget = useRef(new THREE.Vector3(0, 0, 0))

    useFrame((_, delta) => {
        let dest = defaultPos
        let fov = 60
        let target = new THREE.Vector3(0, 0, 0)

        if (focusPlanet === 'Sun') {
            // Sun focus — camera zooms in from the side, same system as planets
            dest = new THREE.Vector3(7, 4, 12)
            target = new THREE.Vector3(0, 0, 0)
            fov = 35
        } else if (focusPlanet && planetPositions?.current[focusPlanet]) {
            const pos = planetPositions.current[focusPlanet]
            const pd = planets.find(p => p.name === focusPlanet)
            const r = pd ? pd.radius : 1
            // Zoom closer for small planets, further for big ones
            const camDist = Math.max(r * 6, 3)
            // Camera between planet and sun (facing sun-lit side)
            const toSun = new THREE.Vector3(-pos.x, 0, -pos.z).normalize()
            // Side offset — shift camera to the right so planet sits on left of screen
            const right = new THREE.Vector3(-toSun.z, 0, toSun.x)
            dest = new THREE.Vector3(
                pos.x + toSun.x * camDist + right.x * r * 2.5,
                r * 2.5,
                pos.z + toSun.z * camDist + right.z * r * 2.5
            )
            target = new THREE.Vector3(pos.x, pos.y, pos.z)
            fov = r < 0.5 ? 30 : 40
        }

        camera.position.lerp(dest, delta * 1.8)
        camera.fov = THREE.MathUtils.lerp(camera.fov, fov, delta * 2)
        camera.updateProjectionMatrix()

        // Update OrbitControls target to follow the planet
        lookTarget.current.lerp(target, delta * 2)
        if (controlsRef?.current) {
            controlsRef.current.target.copy(lookTarget.current)
            controlsRef.current.update()
        }
    })

    return null
}

/* =============================
   Progress Reporter
   ============================= */

function ProgressReporter({ onProgress }) {
    const { progress } = useProgress()
    useEffect(() => {
        onProgress?.(progress / 100)
    }, [progress, onProgress])
    return null
}

/* =============================
   Planet Sidebar
   ============================= */

function PlanetSidebar({ onSelect, active }) {

    const items = [
        { name: 'Sun', icon: '☀', color: '#FDB813' },
        ...PLANETS.map(p => ({ name: p.name, icon: p.number, color: p.color })),
    ]

    return (
        <div
            className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2"
            style={{ pointerEvents: 'auto' }}
        >
            {items.map((item) => (
                <button
                    key={item.name}
                    onClick={() => onSelect(active === item.name ? null : item.name)}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        background: active === item.name ? 'rgba(255,255,255,0.08)' : 'transparent',
                        border: '1px solid',
                        borderColor: active === item.name ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)',
                        borderRadius: 9999, padding: '6px 12px 6px 8px',
                        cursor: 'pointer', backdropFilter: 'blur(8px)',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = active === item.name ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'
                    }}
                >
                    <div style={{
                        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                        background: item.color, boxShadow: `0 0 6px ${item.color}40`,
                    }} />
                    <span style={{
                        fontFamily: "'Geom', sans-serif", fontSize: '0.55rem',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: active === item.name ? '#FFF' : '#666',
                        fontWeight: active === item.name ? 500 : 300,
                    }}>{item.name}</span>
                </button>
            ))}
        </div>
    )
}

/* =============================
   Main Export
   ============================= */

export default function SolarSystem({ onEnterSun, onEnterPlanet, onLoadProgress, hideLabels }) {
    const [focusPlanet, setFocusPlanet] = useState(null)
    const planetPositionsRef = useRef({})
    const controlsRef = useRef()

    const handleSidebarSelect = useCallback((name) => {
        if (!name) {
            setFocusPlanet(null)
        } else {
            setFocusPlanet(name)
        }
    }, [])

    const handleFocus = useCallback((name) => {
        if (focusPlanet === name) {
            // Already focused — enter page
            document.body.style.cursor = 'auto'
            if (name === 'Sun') {
                onEnterSun?.()
            } else {
                onEnterPlanet?.(name)
            }
            setFocusPlanet(null)
        } else {
            setFocusPlanet(name)
        }
    }, [focusPlanet, onEnterSun, onEnterPlanet])

    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas
                camera={{ position: [0, 18, 42], fov: 60 }}
                gl={{ alpha: false, antialias: true }}
                onCreated={({ gl }) => { gl.setClearColor('#000000'); gl.domElement.style.pointerEvents = 'auto' }}
            >
                <PlanetPosContext.Provider value={planetPositionsRef}>
                    <ProgressReporter onProgress={onLoadProgress} />
                    <Suspense fallback={null}>
                        <RealStars />
                        <DustStars />
                        <Sun onFocus={handleFocus} isFocused={focusPlanet === 'Sun'} />
                        {PLANETS.map((p) => (
                            <React.Fragment key={p.name}>
                                <OrbitRing radius={p.orbitRadius} />
                                <Planet data={p} onFocus={handleFocus} focusPlanet={focusPlanet} />
                            </React.Fragment>
                        ))}
                        <ambientLight intensity={0.05} color="#FFFFFF" />
                        <CameraController focusPlanet={focusPlanet} planets={PLANETS} controlsRef={controlsRef} />
                        <OrbitControls
                            ref={controlsRef}
                            enablePan={false}
                            enableZoom={!focusPlanet}
                            enableRotate={!focusPlanet}
                            minDistance={8}
                            maxDistance={60}
                            autoRotate={!focusPlanet}
                            autoRotateSpeed={0.12}
                            rotateSpeed={0.4}
                            zoomSpeed={0.8}
                            maxPolarAngle={Math.PI * 0.75}
                            minPolarAngle={Math.PI * 0.15}
                        />
                    </Suspense>
                </PlanetPosContext.Provider>
            </Canvas>

            {/* Sidebar */}
            <div style={{ transition: 'opacity 0.5s', opacity: hideLabels ? 0 : 1, pointerEvents: hideLabels ? 'none' : 'auto' }}>
                <PlanetSidebar onSelect={handleSidebarSelect} active={focusPlanet || 'Sun'} />
            </div>

            {/* Name */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none transition-opacity duration-700"
                style={{ opacity: focusPlanet || hideLabels ? 0 : 1 }}
            >
                <h1 style={{ fontFamily: "'Geom', sans-serif", fontSize: '1.1rem', color: '#FFF', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 300 }}>
                    Oussama Alouche
                </h1>
            </div>

            <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-opacity duration-500"
                style={{ opacity: focusPlanet || hideLabels ? 0 : 1 }}
            >
                <p style={{ fontFamily: "'Geom', sans-serif", fontSize: '0.6rem', color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    Click the sun to enter · Click a planet to explore
                </p>
            </div>
        </div>
    )
}
