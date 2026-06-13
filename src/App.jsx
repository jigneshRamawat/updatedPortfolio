import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import LoadingScreen from './components/ui/LoadingScreen'
import Cursor from './components/ui/Cursor'
import Navbar from './components/ui/Navbar'
import Footer from './components/ui/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import SkillsSection from './components/sections/SkillsSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ContactSection from './components/sections/ContactSection'

// Smooth scroll divider component
function SectionDivider() {
  return (
    <div className="w-full px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 py-2">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson-500/20 to-transparent" />
          <div className="w-1 h-1 rounded-full bg-crimson-500/30" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return

    let lenis
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      lenisRef.current = lenis

      const raf = (time) => {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    })

    return () => {
      if (lenisRef.current) lenisRef.current.destroy()
    }
  }, [loaded])

  return (
    <>
      {/* Noise overlay for film grain effect */}
      <div className="noise-overlay" />

      {/* Custom cursor */}
      <Cursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />

            <main>
              <HeroSection />
              <SectionDivider />
              <AboutSection />
              <SectionDivider />
              <SkillsSection />
              <SectionDivider />
              <ProjectsSection />
              <SectionDivider />
              <ExperienceSection />
              <SectionDivider />
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
