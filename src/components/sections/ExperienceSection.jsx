import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EXPERIENCES = [
  {
    role: 'Full-Stack Developer',
    company: ' CollegeDekho',
    period: '1-May — july 2026',
    type: 'Internship',
    points: [
      'Developed two company portfolio projects using MERN stackCollaborated with team members in an agile development environment and improved communication and teamwork skills.',
      'Worked on full-stack web applications using React.js, Node.js, Express.js, and MongoDB.',
      'Learned and implemented REST API development, API integration, and backend fundamentals in real-world projects.',
      'Strengthened understanding of core web development fundamentals including authentication, routing, CRUD operations, and database management.',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    role: 'MERN Stack Developer Intern',
    company: 'DeltaWare Solutions Private Limited',
    period: 'Jun 2024 — Dec 2024',
    type: 'Remote - Internship',
    points: [
      'Developed two company portfolio projects using MERN stack.',
      'Designed and implemented both admin and user panels with focus on clean code and user experience.',
      'Contributed to project deployment and optimization.',
      'Recognized for strong performance and offered a full-time project-based role.',
    ],
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Spectrics Solutions Private Limited',
    period: 'Jan 2024 — May 2024',
    type: 'Internship',
    points: [
      'Worked on two web applications, improving frontend and backend integration skills.',
      'Implemented reusable React components following modern design patterns.',
      'Optimized bundle size by 35% using code splitting and lazy loading',
      'Reduced development time for new features by 30% through reusable UI architecture.',
    ],
    stack: ['React', 'Tailwind CSS','Bootstrap'],
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="relative py-32 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-label block mb-3"
          >
            04 — Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl"
          >
            Where I've shipped.
          </motion.h2>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="glass rounded-xl p-8 glow-border-hover transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-crimson-500 tracking-wider">{exp.type}</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-crimson-200 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="font-body text-white/40 text-sm mt-1">{exp.company}</p>
                </div>
                <div className="glass-red rounded px-4 py-2 text-center shrink-0">
                  <p className="font-mono text-xs text-crimson-400 tracking-wider">{exp.period}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {exp.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/50 text-sm leading-relaxed">
                    <span className="text-crimson-500 mt-0.5 shrink-0">→</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.stack.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
