import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOAD_STEPS = [
  'Initializing ecosystem...',
  'Loading 3D components...',
  'Compiling MERN stack...',
  'Rendering universe...',
  'Welcome.',
]

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Particle canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }))

    let animId
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(225, 29, 72, ${p.alpha})`
        ctx.fill()
      })
      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(225, 29, 72, ${0.05 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(animId)
  }, [])

  useEffect(() => {
    const totalDuration = 3200
    const interval = 30
    const steps = totalDuration / interval

    let current = 0
    const timer = setInterval(() => {
      current++
      const pct = Math.min(100, Math.round((current / steps) * 100))
      setProgress(pct)
      setStep(Math.floor((pct / 100) * (LOAD_STEPS.length - 1)))
      if (pct >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 900)
        }, 400)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="mb-10 w-20 h-20 relative flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-crimson-600/40 rounded-full animate-spin-slow" />
              <div className="absolute inset-2 border border-crimson-500/20 rounded-full" style={{ animationDirection: 'reverse' }} />
              <img 
                src="/favicon.png" 
                alt="JR" 
                className="w-40 h-40 object-contain relative z-10"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="font-display font-bold text-2xl gradient-text-red hidden absolute">JR</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-display font-bold text-5xl md:text-7xl tracking-tight mb-3"
            >
              <span className="text-white">JIGNESH </span>
              <span className="gradient-text-red">RAMAWAT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="font-mono text-xs tracking-[0.4em] uppercase text-crimson-400 mb-16"
            >
              Full Stack Developer
            </motion.p>

            {/* Progress bar */}
            <div className="w-64 md:w-80">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-xs text-white/30">{LOAD_STEPS[step]}</span>
                <span className="font-mono text-xs text-crimson-500">{progress}%</span>
              </div>
              <div className="h-px bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-crimson-700 to-crimson-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-crimson-300/60 blur-sm"
                  style={{ right: `${100 - progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 font-mono text-xs text-white/15 tracking-wider">
            PORTFOLIO 
          </div>
          <div className="absolute top-8 right-8 font-mono text-xs text-white/15 tracking-wider">
            MERN STACK
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-xs text-white/15">
            © 2024 JIGNESH RAMAWAT
          </div>
          <div className="absolute bottom-8 right-8 font-mono text-xs text-crimson-500/60">
            {String(progress).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}