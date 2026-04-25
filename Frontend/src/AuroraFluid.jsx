import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── SHADERS ───

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

// Fluid simulation — ping-pong velocity field
const fluidFragmentShader = /* glsl */ `
  precision mediump float;
  
  uniform sampler2D uPrevFrame;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uMouseActive;
  uniform float uTime;
  uniform float uDissipation;
  
  varying vec2 vUv;
  
  void main() {
    vec2 texel = 1.0 / uResolution;
    vec4 prev = texture2D(uPrevFrame, vUv);
    
    // Advection
    vec2 vel = prev.xy * 2.0 - 1.0;
    vec2 advUv = vUv - vel * texel * 2.5;
    vec4 advected = texture2D(uPrevFrame, advUv) * uDissipation;
    
    // Mouse splat
    if (uMouseActive > 0.5) {
      vec2 mVel = (uMouse - uPrevMouse) * 6.0;
      float dist = distance(vUv, uMouse);
      float radius = 0.1;
      float strength = exp(-dist * dist / (radius * radius)) * 0.5;
      advected.xy += (mVel * strength + 0.5) * strength;
    }
    
    // Subtle ambient flow — slower for less lag
    advected.x += sin(vUv.y * 3.0 + uTime * 0.1) * 0.0003;
    advected.y += cos(vUv.x * 2.5 + uTime * 0.08) * 0.0002;
    
    // Diffusion
    vec4 l = texture2D(uPrevFrame, vUv - vec2(texel.x, 0.0));
    vec4 r = texture2D(uPrevFrame, vUv + vec2(texel.x, 0.0));
    vec4 t = texture2D(uPrevFrame, vUv + vec2(0.0, texel.y));
    vec4 b = texture2D(uPrevFrame, vUv - vec2(0.0, texel.y));
    
    gl_FragColor = (advected * 4.0 + l + r + t + b) / 8.0;
  }
`

// Display shader — CYAN/TEAL only, no purple
const displayFragmentShader = /* glsl */ `
  precision mediump float;
  
  uniform sampler2D uFluidTex;
  uniform vec2 uResolution;
  uniform float uTime;
  
  varying vec2 vUv;
  
  // Cyan/Teal palette matching product_drone.png
  vec3 auroraColor(float t) {
    vec3 deepCyan  = vec3(0.0, 0.55, 0.65);    // #008ca6
    vec3 brightCyan = vec3(0.0, 0.898, 1.0);    // #00e5ff
    vec3 teal       = vec3(0.0, 0.75, 0.65);    // #00bfa5
    vec3 iceCyan    = vec3(0.3, 0.9, 0.95);     // #4de6f2
    vec3 darkTeal   = vec3(0.0, 0.42, 0.47);    // #006b78
    
    t = fract(t);
    
    if (t < 0.2)       return mix(darkTeal,   brightCyan, t / 0.2);
    else if (t < 0.4)  return mix(brightCyan, teal,       (t - 0.2) / 0.2);
    else if (t < 0.6)  return mix(teal,       iceCyan,    (t - 0.4) / 0.2);
    else if (t < 0.8)  return mix(iceCyan,    deepCyan,   (t - 0.6) / 0.2);
    else                return mix(deepCyan,   darkTeal,   (t - 0.8) / 0.2);
  }
  
  void main() {
    vec4 fluid = texture2D(uFluidTex, vUv);
    vec2 vel = fluid.xy * 2.0 - 1.0;
    float speed = length(vel);
    
    vec2 distUv = vUv + vel * 0.1;
    
    // Silk fold waves
    float fold1 = sin(distUv.x * 5.0 + distUv.y * 2.0 + uTime * 0.25) * 0.5 + 0.5;
    float fold2 = sin(distUv.x * 3.0 - distUv.y * 3.5 + uTime * 0.18) * 0.5 + 0.5;
    float fold3 = sin(distUv.x * 7.0 + distUv.y * 1.0 - uTime * 0.12) * 0.5 + 0.5;
    float foldPattern = fold1 * 0.5 + fold2 * 0.3 + fold3 * 0.2;
    
    // Color from fold pattern
    float colorIdx = foldPattern * 0.4 + distUv.x * 0.35 + uTime * 0.015;
    vec3 color = auroraColor(colorIdx);
    
    // Band shape — concentrated in lower 60% (around 3D model area)
    // vUv.y = 0 is bottom, 1 is top in GL coords
    float bandCenter = 0.4;   // slightly below center
    float yDist = abs(vUv.y - bandCenter);
    float bandShape = smoothstep(0.5, 0.1, yDist);
    
    // Horizontal stream shape (narrower, like a river/stream)
    float streamWidth = 0.35;
    float stream = smoothstep(streamWidth, streamWidth * 0.3, yDist);
    
    // Interaction glow
    float glow = smoothstep(0.0, 0.1, speed) * 0.6;
    
    // Opacity
    float baseAlpha = stream * 0.18;
    float foldAlpha = pow(foldPattern, 2.0) * 0.15 * bandShape;
    float alpha = baseAlpha + foldAlpha + glow * stream;
    alpha = clamp(alpha, 0.0, 0.4);
    
    // Edge fade
    float xFade = smoothstep(0.0, 0.05, vUv.x) * smoothstep(1.0, 0.95, vUv.x);
    alpha *= xFade;
    
    // Fold highlights
    color += vec3(pow(foldPattern, 2.5) * 0.08);
    
    gl_FragColor = vec4(color, alpha);
  }
`

// ─── AURORA MESH ───

function AuroraFluidMesh() {
  const meshRef = useRef()
  const { gl, size } = useThree()
  
  // Lower resolution for performance
  const SIM_RES = 96
  
  const renderTargets = useMemo(() => {
    const params = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    }
    return [
      new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, params),
      new THREE.WebGLRenderTarget(SIM_RES, SIM_RES, params),
    ]
  }, [])
  
  const fluidMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: fluidFragmentShader,
    uniforms: {
      uPrevFrame: { value: null },
      uResolution: { value: new THREE.Vector2(SIM_RES, SIM_RES) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseActive: { value: 0.0 },
      uTime: { value: 0.0 },
      uDissipation: { value: 0.985 },
    },
  }), [])
  
  const displayMaterial = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: displayFragmentShader,
    uniforms: {
      uFluidTex: { value: null },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTime: { value: 0.0 },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  }), [size.width, size.height])
  
  const pingPongRef = useRef(0)
  const frameCountRef = useRef(0)
  
  const fluidScene = useMemo(() => {
    const scene = new THREE.Scene()
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fluidMaterial))
    return scene
  }, [fluidMaterial])
  
  const fluidCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), [])
  
  // No mouse interaction — aurora is purely ambient
  
  useFrame((state) => {
    // Throttle to ~30fps to reduce lag
    frameCountRef.current++
    if (frameCountRef.current % 2 !== 0) return
    
    const t = state.clock.elapsedTime
    
    const cur = pingPongRef.current
    const next = 1 - cur
    
    fluidMaterial.uniforms.uPrevFrame.value = renderTargets[cur].texture
    fluidMaterial.uniforms.uMouse.value.set(0.5, 0.5)
    fluidMaterial.uniforms.uPrevMouse.value.set(0.5, 0.5)
    fluidMaterial.uniforms.uMouseActive.value = 0.0
    fluidMaterial.uniforms.uTime.value = t
    
    gl.setRenderTarget(renderTargets[next])
    gl.render(fluidScene, fluidCamera)
    gl.setRenderTarget(null)
    
    pingPongRef.current = next
    
    if (meshRef.current) {
      meshRef.current.material.uniforms.uFluidTex.value = renderTargets[next].texture
      meshRef.current.material.uniforms.uTime.value = t
    }
  })
  
  return (
    <mesh ref={meshRef} material={displayMaterial}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  )
}

// ─── EXPORTED COMPONENT ───

export default function AuroraFluid() {
  return (
    <div className="hero-aurora-webgl" style={{ pointerEvents: 'none', userSelect: 'none' }}>
      <Canvas
        gl={{ 
          alpha: true, 
          antialias: false, 
          powerPreference: 'low-power',
          premultipliedAlpha: false,
        }}
        camera={{ position: [0, 0, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        frameloop="always"
      >
        <AuroraFluidMesh />
      </Canvas>
    </div>
  )
}
