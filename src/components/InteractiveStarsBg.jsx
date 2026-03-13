import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { starCatalog, starSize, starOpacity } from '../data/stars'

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

export default function InteractiveStarsBg() {
    return (
        <div className="absolute inset-0 w-full h-full -z-10 bg-black pointer-events-auto">
            <Canvas camera={{ position: [0, 18, 42], fov: 60 }} gl={{ alpha: false, antialias: true }}>
                <RealStars />
                <DustStars />
                <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.06} rotateSpeed={0.15} />
            </Canvas>
        </div>
    )
}
