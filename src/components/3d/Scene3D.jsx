import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// React atom rings
function ReactAtom({ position }) {
  const groupRef = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    if (ring1.current) ring1.current.rotation.x += 0.02
    if (ring2.current) ring2.current.rotation.y += 0.018
    if (ring3.current) ring3.current.rotation.z += 0.015
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position}>
        {/* Nucleus */}
        <Sphere args={[0.18, 16, 16]}>
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.6} />
        </Sphere>
        {/* Orbit rings */}
        <Torus ref={ring1} args={[0.55, 0.02, 8, 60]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.4} transparent opacity={0.8} />
        </Torus>
        <Torus ref={ring2} args={[0.55, 0.02, 8, 60]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.4} transparent opacity={0.6} />
        </Torus>
        <Torus ref={ring3} args={[0.55, 0.02, 8, 60]} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.4} transparent opacity={0.5} />
        </Torus>
      </group>
    </Float>
  )
}

// Node.js cube
function NodeCube({ position }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <Box ref={meshRef} args={[0.7, 0.7, 0.7]} position={position}>
        <meshStandardMaterial
          color="#68a063"
          emissive="#3d7a35"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
    </Float>
  )
}

// MongoDB sphere
function MongoSphere({ position }) {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
      <Sphere ref={meshRef} args={[0.45, 32, 32]} position={position}>
        <MeshDistortMaterial
          color="#00ed64"
          emissive="#00684a"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  )
}

// Glowing ring
function GlowRing({ position, color = '#e11d48', radius = 1.2 }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.1
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
    }
  })
  return (
    <Float speed={0.8} floatIntensity={0.3}>
      <Torus ref={ref} args={[radius, 0.012, 8, 120]} position={position}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.7} />
      </Torus>
    </Float>
  )
}

// Particles field
function ParticleField() {
  const count = 600
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
      ref.current.rotation.x = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#e11d48"
        size={0.018}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

// Mouse-reactive camera rig
function CameraRig() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 5))

  useFrame((state) => {
    const mouse = state.mouse
    target.current.x += (mouse.x * 0.8 - target.current.x) * 0.05
    target.current.y += (mouse.y * 0.4 - target.current.y) * 0.05
    camera.position.x += (target.current.x - camera.position.x) * 0.05
    camera.position.y += (target.current.y - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

// Central glowing orb
function CentralOrb() {
  const meshRef = useRef()
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.6, 64, 64]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#1a0510"
        emissive="#e11d48"
        emissiveIntensity={0.3}
        roughness={0.1}
        metalness={0.9}
        distort={0.15}
        speed={1.5}
      />
    </Sphere>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#e11d48" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#61dafb" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />

        <CameraRig />
        <ParticleField />
        <CentralOrb />

        {/* Tech objects orbiting */}
        <ReactAtom position={[-2.2, 0.8, -0.5]} />
        <NodeCube position={[2.1, -0.6, -0.5]} />
        <MongoSphere position={[0.4, 1.8, -1]} />

        {/* Rings */}
        <GlowRing position={[0, 0, 0]} radius={1.8} color="#e11d48" />
        <GlowRing position={[0, 0, 0]} radius={2.8} color="#e11d48" />
        <GlowRing position={[-1.5, 0.5, -1]} radius={0.6} color="#61dafb" />
      </Suspense>
    </Canvas>
  )
}
