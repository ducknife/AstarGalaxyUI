import { useEffect, useRef } from 'react'

/**
 * Interactive Particle Grid Background - Stitch-inspired physics
 * 
 * Key physics model (matching stitch.withgoogle.com):
 * - FAST initial push: dots quickly move away when mouse approaches
 * - SLOW gradual spring-back: dots drift back to home position gently
 * - High damping: prevents oscillation/bouncing
 * - Smooth mouse tracking with lerp
 */
export default function ParticleGrid() {
  const canvasRef = useRef(null)
  const auroraRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const smoothMouseRef = useRef({ x: -1000, y: -1000 })
  const animFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const aurora = auroraRef.current
    if (!canvas || !aurora) return

    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    // ─── Configuration ───
    const DOT_SPACING = 16          // max density
    const DOT_RADIUS = 1.0
    const DOT_OPACITY = 0.18
    const INFLUENCE_RADIUS = 400   // wider area of effect
    const MAX_DISPLACEMENT_X = 80  // Wide black hole
    const MAX_DISPLACEMENT_Y = 20  // Shorter height (original was 14)
    const MOUSE_SMOOTH = 0.28      // very smooth cursor trail

    // Pure lerp — same speed both ways (expand = contract)
    const LERP_SPEED = 0.2           // balanced: responsive but not snappy
    const LERP_OUT = LERP_SPEED
    const LERP_BACK = LERP_SPEED

    let dots = []
    let cols = 0
    let rows = 0

    function initDots() {
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(w / DOT_SPACING) + 2
      rows = Math.ceil(h / DOT_SPACING) + 2

      const offsetX = (w - (cols - 1) * DOT_SPACING) / 2
      const offsetY = (h - (rows - 1) * DOT_SPACING) / 2

      dots = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const gx = offsetX + col * DOT_SPACING
          const gy = offsetY + row * DOT_SPACING
          dots.push({
            gx, gy,       // home position
            x: gx, y: gy, // current position (no velocity needed)
          })
        }
      }
    }

    function updatePhysics() {
      // Smooth mouse position
      const sm = smoothMouseRef.current
      const rm = mouseRef.current
      sm.x += (rm.x - sm.x) * MOUSE_SMOOTH
      sm.y += (rm.y - sm.y) * MOUSE_SMOOTH

      const mx = sm.x
      const my = sm.y
      const ir2 = INFLUENCE_RADIUS * INFLUENCE_RADIUS

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        const dx = dot.gx - mx
        const dy = dot.gy - my
        const dist2 = dx * dx + dy * dy

        let targetX = dot.gx
        let targetY = dot.gy
        let lerpFactor = LERP_BACK

        if (dist2 < ir2 && dist2 > 0.1) {
          const dist = Math.sqrt(dist2)
          const t = 1 - dist / INFLUENCE_RADIUS
          // Quadratic falloff
          const t2 = t * t
          const forceX = t2 * MAX_DISPLACEMENT_X
          const forceY = t2 * MAX_DISPLACEMENT_Y
          const nx = dx / dist
          const ny = dy / dist
          targetX = dot.gx + nx * forceX
          targetY = dot.gy + ny * forceY
          lerpFactor = LERP_OUT
        }

        // Direct lerp — zero overshoot, zero bounce
        dot.x += (targetX - dot.x) * lerpFactor
        dot.y += (targetY - dot.y) * lerpFactor
      }
    }

    function render() {
      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        const dispX = dot.x - dot.gx
        const dispY = dot.y - dot.gy
        const disp = Math.sqrt(dispX * dispX + dispY * dispY)

        // Soft space color for dots (cyan-blue tint)
        let cr = 100, cg = 200, cb = 255

        // Slightly increase opacity when pushed, but no blinding glow
        const extraBright = Math.min(disp / MAX_DISPLACEMENT_X, 1) * 0.15
        const opacity = Math.min(DOT_OPACITY + extraBright, 0.40)
        const radius = DOT_RADIUS  // ← constant, never changes

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${opacity})`
        ctx.fill()
      }
    }

    function animate() {
      updatePhysics()
      render()
      animFrameRef.current = requestAnimationFrame(animate)
    }

    // Aurora gradient mouse follow
    function updateAurora(e) {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      aurora.style.setProperty('--aurora-x', `${x}%`)
      aurora.style.setProperty('--aurora-y', `${y}%`)
    }

    function onMouseMove(e) {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      updateAurora(e)
    }

    function onMouseLeave() {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    function onResize() {
      initDots()
    }

    initDots()
    animate()

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', onResize)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div
        ref={auroraRef}
        className="particle-aurora"
        style={{ '--aurora-x': '50%', '--aurora-y': '50%' }}
      />
      <canvas ref={canvasRef} className="particle-canvas" />
    </>
  )
}
