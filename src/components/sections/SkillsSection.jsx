import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  { category: 'Frontend', color: '#61dafb', items: ['React.js', 'Tailwind CSS', 'HTML5/CSS3'] },
  { category: 'Language', color: '#31dafb', items: ['Java', 'Java-Script', 'HTML'] },
  { category: 'Backend', color: '#68a063', items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'] },
  { category: 'Database', color: '#00ed64', items: ['MongoDB', 'Mongoose', 'SQL Basics',] },
  { category: 'DevOps & Tools', color: '#e11d48', items: ['Git & GitHub', 'Docker', 'Vite', 'Postman', 'VS Code'] },
]

const PROFICIENCY = [
  { skill: 'React.js', pct: 70 },
  { skill: 'Node.js & Express', pct: 60 },
  { skill: 'MongoDB', pct: 62 },
  { skill: 'JavaScript (ES6+)', pct: 92 },
  { skill: 'REST API Design', pct: 70 },
]

export default function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label block mb-3"
          >
            02 — Skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl"
          >
            The tech I work with.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill categories */}
          <div className="grid grid-cols-2 gap-4">
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + gi * 0.1 }}
                className="glass rounded-lg p-5 glow-border-hover transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full" style={{ background: group.color }} />
                  <span className="font-mono text-xs tracking-wider text-white/40 uppercase">{group.category}</span>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-body text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Proficiency bars */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="font-mono text-xs text-white/30 tracking-wider uppercase mb-8"
            >
              Core Proficiency
            </motion.p>
            {PROFICIENCY.map((item, i) => (
              <motion.div
                key={item.skill}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-body text-sm text-white/70">{item.skill}</span>
                  <span className="font-mono text-xs text-crimson-400">{item.pct}%</span>
                </div>
                <div className="h-px bg-white/8 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full"
                    style={{ background: `linear-gradient(to right, #9f1239, #e11d48, #fb7185)` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${item.pct}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
