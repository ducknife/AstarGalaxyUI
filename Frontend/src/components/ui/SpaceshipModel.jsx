import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import modelUrl from './assets/models/cargo.glb?url'

/* Load cargo GLB, remove base platform, enhance materials */
function ShipModel() {
  const groupRef = useRef()
  const { scene } = useGLTF(modelUrl)
  const clonedScene = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    const toRemove = []

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Detect and remove flat platform/base meshes
        child.geometry.computeBoundingBox()
        const bb = child.geometry.boundingBox
        const height = bb.max.y - bb.min.y
        const width = bb.max.x - bb.min.x
        const depth = bb.max.z - bb.min.z

        if (height < 0.15 && (width > 0.5 || depth > 0.5)) {
          toRemove.push(child)
          return
        }

        child.castShadow = true
        child.receiveShadow = true
      }
    })

    toRemove.forEach((mesh) => {
      if (mesh.parent) mesh.parent.remove(mesh)
    })
  }, [clonedScene])

  // Auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={groupRef} scale={2.2} position={[0, 0, 0]} rotation={[0.1, 0.5, 0]}>
      <primitive object={clonedScene} />
    </group>
  )
}

/* Ambient particles */
function Particles() {
  const ref = useRef()
  const count = 50

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 5
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    const pos = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += delta * 0.25
      if (pos[i * 3 + 1] > 2.5) pos[i * 3 + 1] = -2.5
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00e5ff" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

export default function SpaceshipScene() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [4, 2.5, 4], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
        }}
        shadows
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Bright lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 6, 4]} intensity={2.5} color="#ffffff" castShadow />
        <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#ffffff" />
        <spotLight position={[0, 5, 0]} intensity={2} color="#ffffff" angle={0.6} penumbra={0.5} />
        <pointLight position={[0, -1, 3]} intensity={1.5} color="#00e5ff" distance={8} />
        <pointLight position={[3, 1, -2]} intensity={1} color="#ffffff" distance={6} />
        <pointLight position={[-3, 0, 1]} intensity={1} color="#ffffff" distance={6} />

        <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.3}>
          <ShipModel />
        </Float>

        <Particles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>
    </div>
  )
}
