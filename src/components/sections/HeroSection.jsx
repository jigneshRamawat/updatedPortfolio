import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import jignesh from '../../../public/img/hero.png'
const Scene3D = lazy(() => import('../3d/Scene3D'))

const TYPING_WORDS = [
  'Full Stack Developer',
  'MERN Developer',
  'Backend Developer',
  'React Developer',
]

function useTypingEffect(words, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIdx]
    let timeout

    if (!deleting && charIdx <= word.length) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx))
        setCharIdx(c => c + 1)
      }, speed)
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(word.slice(0, charIdx))
        setCharIdx(c => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
      setCharIdx(0)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

export default function HeroSection() {
  const typed = useTypingEffect(TYPING_WORDS)
  const scrollRef = useRef(null)

  const scrollToProjects = () => {
    document
      .querySelector('#projects')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document
      .querySelector('#contact')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen pt-20 overflow-hidden bg-[#050508]"
      ref={scrollRef}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
            </div>
          }
        >
          <Scene3D />
        </Suspense>
      </div>

      {/* Overlays */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, transparent 0%, #050508 70%)',
        }}
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.6) 45%, rgba(5,5,8,0.2) 70%, transparent 100%)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[1]"
        style={{
          background:
            'linear-gradient(to top, #050508 0%, transparent 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-8 lg:pt-0">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT CONTENT */}
            <div className="max-w-2xl -mt-8 lg:-mt-16">

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="w-8 h-px bg-red-500" />
                <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Available for Opportunities
                </span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              </motion.div>

              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-mono text-sm text-white/40 mb-2 tracking-wider"
              >
                Hello, I'm
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="font-bold leading-none mb-5"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
              >
                <span className="text-white block">
                  Jignesh
                </span>

                <span className="bg-gradient-to-r text-white bg-clip-text text-transparent">
                  Ramawat
                </span>
              </motion.h1>

              {/* Typing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-3 mb-6 h-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />

                <span className="font-mono text-lg text-red-300">
                  {typed}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-white/55 leading-relaxed text-sm md:text-base max-w-lg mb-8"
              >
                Motivated MCA student with real-world internship
                experience in MERN stack development. Building
                scalable, secure and performant web applications
                from database to deployment.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={scrollToProjects}
                  className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all duration-300 shadow-lg shadow-red-600/30"
                >
                  View Projects
                </button>

                <a
                  href="/Jignesh_Ramawat_Resume.pdf"
                  download
                  className="px-6 py-3 rounded-full border border-white/20 hover:border-red-500 text-white/80 hover:text-white transition-all duration-300"
                >
                  Download Resume
                </a>

                <button
                  onClick={scrollToContact}
                  className="text-white/50 hover:text-white transition-all duration-300 px-2"
                >
                  Contact Me →
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex gap-8 mt-12"
              >
                {[
                  { num: '7', label: 'Projects' },
                  { num: '2+', label: 'Internships' },
                  { num: 'MCA', label: ['Student' , '+ Profesional']  },
                ].map(item => (
                  <div key={item.label}>
                    <h3 className="text-2xl font-bold text-white">
                      {item.num}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-white/30">
                      {item.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              {/* Glow */}
              <div className="absolute w-[450px] h-[450px] rounded-full bg-red-600/20 blur-[120px]" />

              {/* Rotating Border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute w-[430px] h-[430px] rounded-full border border-red-500/20"
              />

              {/* Image Container */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_100px_rgba(255,0,0,0.15)]">

                  <img
                    src={jignesh}
                    alt="Jignesh Ramawat"
                    className="w-[380px] h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                </div>

                {/* Badge */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-4 -left-5 bg-[#111] border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-xl"
                >
                  <p className="text-sm text-white">
                    MERN Developer
                  </p>
                </motion.div>

                {/* Experience */}
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                  }}
                  className="absolute top-5 -right-5 bg-red-600/20 border border-red-500/20 px-5 py-3 rounded-2xl backdrop-blur-xl"
                >
                  <p className="text-sm text-white">
                    12 Months Experience
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs tracking-[0.25em] text-white/20">
          SCROLL
        </span>

        <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}