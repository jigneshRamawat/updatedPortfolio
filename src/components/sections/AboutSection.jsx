import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const TIMELINE = [
  {
    year: '2024',
    title: 'MERN Stack Intern',
    org: 'DeltaWare Solutions Private Limited',
    desc: 'Built scalable REST APIs with Node.js & Express. Developed React dashboards. MongoDB database design and optimization.',
  },
  {
    year: '2024',
    title: 'Frontend Intern',
    org: 'Spectrics Solutions Private Limited',
    desc: 'Developed responsive React interfaces. Integrated third-party APIs. Improved Lighthouse performance scores significantly.',
  },
  {
    year: '2024-2026',
    title: 'MCA — Master of Computer Applications',
    org: 'University',
    desc: 'Specializing in full-stack development, algorithms, and cloud computing. Active in hackathons and tech clubs.',
  },
]

// GitHub Data
const GITHUB_USERNAME = 'jigneshRamawat'
const GITHUB_STATS = {
  repos: 26,
  languages: ['JavaScript', 'HTML', 'CSS'],
  topRepos: [
    { name: 'latest', desc: 'my portfolio', lang: 'JavaScript', stars: 0 },
    { name: 'MernAutharp', desc: 'MERN auth system with OTP email verify', lang: 'JavaScript', stars: 0 },
    { name: 'Ai-Image-generate', desc: 'AI image generator with login & credits', lang: 'JavaScript', stars: 0 },
    { name: 'Quze', desc: 'Quiz web application', lang: 'JavaScript', stars: 0 },
    { name: 'pokemontoplay', desc: 'play to learning', lang: 'JavaScript', stars: 0 },
    { name: 'portfolio', desc: 'jignesh portfolio', lang: 'JavaScript', stars: 0 },
  ],
}

// Language colors
const LANG_COLORS = {
  JavaScript: '#F7DF1E',
  HTML: '#E34F26',
  CSS: '#1572B6',
  React: '#61DAFB',
  'Node.js': '#339933',
  MongoDB: '#47A248',
}

// Generate 6-month contribution heatmap data (26 weeks x 7 days = 182 squares)
// 0 = no activity, 1-4 = intensity levels
const generateContributionData = () => {
  const data = []
  const today = new Date('2026-06-14')
  const sixMonthsAgo = new Date(today)
  sixMonthsAgo.setMonth(today.getMonth() - 6)
  
  for (let week = 0; week < 26; week++) {
    const weekData = []
    for (let day = 0; day < 7; day++) {
      const date = new Date(sixMonthsAgo)
      date.setDate(sixMonthsAgo.getDate() + (week * 7) + day)
      
      if (date > today) {
        weekData.push({ date, level: -1 }) // Future dates
      } else {
        // Random activity with some patterns
        const rand = Math.random()
        let level = 0
        if (rand > 0.6) level = 1
        if (rand > 0.75) level = 2
        if (rand > 0.88) level = 3
        if (rand > 0.95) level = 4
        weekData.push({ date, level })
      }
    }
    data.push(weekData)
  }
  return data
}

const CONTRIBUTION_DATA = generateContributionData()

// Heatmap color levels (0-4) — crimson theme
const HEATMAP_COLORS = [
  'bg-white/[0.03]',      // 0 - no activity
  'bg-crimson-500/20',    // 1 - low
  'bg-crimson-500/40',    // 2 - medium
  'bg-crimson-500/60',    // 3 - high
  'bg-crimson-500',       // 4 - very high
]

// Month labels for the heatmap
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Calculate total contributions
  const totalContributions = CONTRIBUTION_DATA.flat().reduce((sum, day) => 
    day.level > 0 ? sum + day.level : sum, 0
  )

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 md:px-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="mb-3"
            >
              <span className="section-label">01 — About</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl leading-tight mb-8"
            >
              Turning ideas into
              <br />
              <span className="gradient-text-red">digital reality.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-white/50 font-body text-base leading-relaxed"
            >
              <p>
                I'm Jignesh Ramawat, a passionate MERN stack developer pursuing my MCA degree.
                I specialize in building end-to-end web applications — from architecting MongoDB schemas
                to crafting pixel-perfect React interfaces.
              </p>
              <p>
                My journey in web development started with curiosity and evolved into a deep passion for
                creating performant, scalable applications that solve real problems. I thrive in the intersection
                of clean code and thoughtful user experience.
              </p>
              <p>
                When I'm not coding, I contribute to open-source projects, explore new tech, and keep
                pushing the limits of what's possible on the web.
              </p>
            </motion.div>

            {/* Signature decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-crimson-500/50 to-transparent" />
              <span className="font-mono text-xs text-crimson-500/60 tracking-widest">MERN STACK</span>
              <div className="h-px w-8 bg-crimson-500/30" />
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                className="relative pl-8 pb-10 last:pb-0"
              >
                {/* Vertical line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute left-2.5 top-5 bottom-0 w-px bg-gradient-to-b from-crimson-500/30 to-transparent" />
                )}

                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-crimson-500 ring-2 ring-crimson-500/20" />
                </div>

                {/* Year */}
                <div className="font-mono text-xs text-crimson-500 tracking-widest mb-1">{item.year}</div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg text-white mb-0.5">{item.title}</h3>
                <p className="font-mono text-xs text-white/30 mb-2">{item.org}</p>

                {/* Desc */}
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            GITHUB STATS SECTION
            ═══════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson-500/30 to-transparent" />
            <span className="font-mono text-xs text-crimson-500/60 tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GITHUB — @{GITHUB_USERNAME}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-crimson-500/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ═══════ LEFT COLUMN: Stats + Streak + Heatmap ═══════ */}
            <div className="lg:col-span-1 space-y-4">
              
              {/* Repositories */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-white/30 tracking-wider">REPOSITORIES</span>
                  <svg className="w-4 h-4 text-crimson-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <p className="font-display font-bold text-3xl text-white">{GITHUB_STATS.repos}</p>
                <p className="text-white/30 text-xs mt-1">Public repositories</p>
              </motion.div>

              {/* Languages */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-white/30 tracking-wider">TOP LANGUAGES</span>
                  <svg className="w-4 h-4 text-crimson-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <div className="space-y-3">
                  {GITHUB_STATS.languages.map((lang) => (
                    <div key={lang} className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: LANG_COLORS[lang] || '#888' }}
                      />
                      <span className="text-white/60 text-sm font-body">{lang}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Current Streak - Live from GitHub Readme Stats API */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="glass rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-white/30 tracking-wider">CURRENT STREAK</span>
                  <svg className="w-4 h-4 text-orange-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                  </svg>
                </div>
                
                {/* Live streak image from GitHub Readme Stats */}
                <div className="rounded-lg overflow-hidden bg-white/5">
                  <img 
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=dark&background=00000000&border=00000000&stroke=crimson&ring=crimson&fire=orange&currStreakNum=white&sideNums=white&currStreakLabel=white&sideLabels=white&dates=white/30`}
                    alt="GitHub Streak"
                    className="w-full h-auto"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="hidden items-center justify-center py-8">
                    <p className="text-white/30 text-sm font-mono">Streak data unavailable</p>
                  </div>
                </div>
                
                <p className="text-white/20 text-[10px] mt-2 font-mono">Live data from GitHub</p>
              </motion.div>

              {/* 6-Month Contribution Heatmap — GitHub Style with Crimson Theme */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-white/30 tracking-wider">6 MONTH CONTRIBUTIONS</span>
                  <span className="font-mono text-[10px] text-white/20">{totalContributions} total</span>
                </div>

                {/* Month labels */}
                <div className="flex gap-[3px] mb-1 pl-6">
                  {MONTH_LABELS.map((month) => (
                    <span key={month} className="font-mono text-[9px] text-white/20 w-8 text-center">
                      {month}
                    </span>
                  ))}
                </div>

                {/* Heatmap Grid */}
                <div className="flex gap-[3px]">
                  {/* Day labels */}
                  <div className="flex flex-col gap-[3px] mr-1">
                    {['M', 'W', 'F'].map((day) => (
                      <span key={day} className="font-mono text-[8px] text-white/15 w-4 h-3 flex items-center justify-center">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Weeks */}
                  <div className="flex gap-[3px] overflow-x-auto">
                    {CONTRIBUTION_DATA.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-[3px]">
                        {week.map((day, dayIndex) => (
                          <motion.div
                            key={dayIndex}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 1.0 + (weekIndex * 0.02) + (dayIndex * 0.01),
                              ease: 'backOut'
                            }}
                            className={`w-3 h-3 rounded-[2px] ${
                              day.level === -1 
                                ? 'bg-transparent' 
                                : HEATMAP_COLORS[day.level]
                            } hover:ring-1 hover:ring-white/30 transition-all cursor-pointer relative group`}
                            title={`${day.date.toDateString()}: ${day.level > 0 ? day.level + ' contributions' : 'No contributions'}`}
                          >
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white/10 backdrop-blur-md rounded px-2 py-1 text-[10px] font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                              {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              {day.level > 0 && ` — ${day.level} contrib`}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-3 justify-end">
                  <span className="font-mono text-[9px] text-white/20">Less</span>
                  {HEATMAP_COLORS.map((color, i) => (
                    <div key={i} className={`w-3 h-3 rounded-[2px] ${color}`} />
                  ))}
                  <span className="font-mono text-[9px] text-white/20">More</span>
                </div>
              </motion.div>
            </div>

            {/* ═══════ RIGHT COLUMN: Top Repositories ═══════ */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="glass rounded-xl p-6 h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-white/30 tracking-wider">TOP REPOSITORIES</span>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-crimson-500/60 hover:text-crimson-400 text-xs font-mono transition-colors flex items-center gap-1"
                  >
                    View all
                    <span className="text-xs">↗</span>
                  </a>
                </div>

                <div className="space-y-3">
                  {GITHUB_STATS.topRepos.map((repo, i) => (
                    <motion.a
                      key={repo.name}
                      href={`https://github.com/${GITHUB_USERNAME}/${repo.name}`}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="group flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-crimson-500/20 transition-all duration-300"
                    >
                      {/* Repo icon */}
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-crimson-500/10 transition-colors">
                        <svg className="w-5 h-5 text-white/40 group-hover:text-crimson-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                        </svg>
                      </div>

                      {/* Repo info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-mono text-sm text-white group-hover:text-crimson-400 transition-colors truncate">
                            {repo.name}
                          </h4>
                          <span className="text-[10px] text-white/20 group-hover:text-white/40 transition-colors">↗</span>
                        </div>
                        <p className="text-white/30 text-xs mt-0.5 truncate">{repo.desc}</p>
                      </div>

                      {/* Language badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: LANG_COLORS[repo.lang] || '#888' }}
                        />
                        <span className="font-mono text-[10px] text-white/30">{repo.lang}</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* GitHub Profile Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
            className="mt-8 text-center"
          >
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-crimson-500/30 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-white/40 group-hover:text-crimson-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-mono text-sm text-white/40 group-hover:text-white transition-colors">
                github.com/{GITHUB_USERNAME}
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}