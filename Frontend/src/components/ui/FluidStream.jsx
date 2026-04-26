import { useEffect, useRef } from 'react'

/**
 * FluidStream — Soft, smoky, glowing aurora wave
 * Hardware-accelerated blur via CSS, soft sine waves drawn on canvas.
 */
export default function FluidStream() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    
    // Use lower internal resolution for better performance with blur
    const dpr = window.devicePixelRatio > 1 ? 1.5 : 1
    const CANVAS_H = 1000   // Extremely tall internal canvas to guarantee no edge clipping

    function resize() {
      canvas.width  = window.innerWidth * dpr
      canvas.height = CANVAS_H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Waves ────────────────────────────────
    const waves = [
      {
        color: 'rgba(0, 229, 255, 0.95)', // Cyan core (Sáng hơn nhiều)
        baseY: 0.55,
        amp: 0.10, // increased for more separation
        freq: 0.8,
        speed: 0.3,
        phase: 0,
        thickness: 80,
        dip: 0.15,
        edgeDrop: 0, // Stays up at the edges
      },
      {
        color: 'rgba(0, 191, 165, 0.55)', // Teal - (Đậm hơn) sweeps down into black corners
        baseY: 0.58,
        amp: 0.18,
        freq: 1.2,
        speed: 0.4,
        phase: 2.0,
        thickness: 160, // Tăng độ dày một chút
        dip: 0.10,
        edgeDrop: 0.25,
      },
      {
        color: 'rgba(0, 150, 255, 0.45)', // Blue - (Đậm hơn)
        baseY: 0.56,
        amp: 0.12,
        freq: 0.5,
        speed: 0.25,
        phase: 4.0,
        thickness: 140, // Tăng độ dày một chút
        dip: 0.18,
        edgeDrop: 0.10,
      },
      {
        color: 'rgba(255, 255, 255, 0.95)', // Solid bright core (Sáng rực)
        baseY: 0.55,
        amp: 0.05,
        freq: 1.5,
        speed: 0.5,
        phase: 1.5,
        thickness: 30, // Sharp inner core
        dip: 0.15,
        edgeDrop: 0,
      }
    ]

    let startTime = null

    function draw(ts) {
      if (!startTime) startTime = ts
      const t = (ts - startTime) / 1000   // seconds
      const w = window.innerWidth

      ctx.clearRect(0, 0, w, CANVAS_H)
      
      // Screen blend mode makes overlapping colors glow brighter
      ctx.globalCompositeOperation = 'screen'

      const STEPS = 100 // Resolution of the curve

      for (const wave of waves) {
        ctx.beginPath()
        for (let s = 0; s <= STEPS; s++) {
          const x = (s / STEPS) * w
          // Normalized x (0 to 1)
          const nx = s / STEPS
          
          // Calculate Y position using a combination of sine waves for organic movement
          const wave1 = Math.sin(t * wave.speed + nx * wave.freq * Math.PI * 2 + wave.phase)
          const wave2 = Math.sin(t * wave.speed * 1.3 + nx * wave.freq * Math.PI * 1.5 - wave.phase)
          
          // 1. Hammock dip (võng xuống ở giữa) cho từng layer
          const hammockDip = Math.sin(nx * Math.PI) * wave.dip * CANVAS_H

          // 2. Edge Drop (rủ xuống ở 2 mép để lấp đầy góc đen)
          // Tính toán: nx từ 0 -> 1. (Math.abs(nx - 0.5) * 2) sẽ là 1 ở mép, 0 ở giữa.
          // Bình phương lên để đường cong rủ xuống mượt mà ở sát mép.
          const edgeDropCurve = Math.pow(Math.abs(nx - 0.5) * 2, 2)
          const edgeDrop = edgeDropCurve * wave.edgeDrop * CANVAS_H
          
          // Combine waves and apply amplitude
          const yOffset = (wave1 * 0.6 + wave2 * 0.4) * wave.amp * CANVAS_H
          
          // Final Y
          const y = wave.baseY * CANVAS_H + hammockDip + edgeDrop + yOffset

          if (s === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.strokeStyle = wave.color
        ctx.lineWidth = wave.thickness * dpr
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // No wrapper div, directly return canvas with absolute positioning
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '60%', // Lower half of the hero
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw', // Force full viewport width
        height: '1000px', // Massive height to prevent any internal clipping
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'blur(16px)', // Even less blur for a much more solid, defined shape
        opacity: 0.9,
      }}
    />
  )
}
