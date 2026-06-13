import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import p1 from "/img/p1.png";
import p2 from "/img/p2.png";
import p3 from "/img/p3.png";
import p4 from "/img/p4.png";

const PROJECTS = [
  {
    id: 1,
    title: "Secure Auth System",
    image: p4,
    category: "Full Stack",
    description:
      "Developed a secure authentication system using JWT-based login and registration with email verification and forgot password functionality using a 6-digit OTP. Implemented bcrypt password hashing, protected routes, and authentication middleware for enhanced security. Integrated Nodemailer and Brevo email services for seamless account verification and password recovery workflows.",
    tags: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "JWT",
      "bcrypt",
      "Nodemailer",
    ],
    color: "#e11d48",
    featured: true,
    github:
      "https://github.com/jigneshRamawat/MernAutharp/tree/main",
    live: "https://arp21.netlify.app/",
    year: "2026",
  },

  {
    id: 2,
    title: "AI Image Generator",
    image: p2,
    category: "AI Integration",
    description:
      "Built a full-stack AI-powered image generation platform that converts text prompts into images using the Clipdrop API. Implemented authentication, prompt management, API integration, and responsive UI. Managed backend API handling, secure authentication flow, and optimized frontend experience for seamless image generation.",
    tags: [
      "React",
      "Node.js",
      "MongoDB",
      "Clipdrop API",
      "JWT",
      "Cloudinary",
    ],
    color: "#8b5cf6",
    featured: true,
    github:
      "https://github.com/jigneshRamawat/Ai-Image-generate",
    live: "https://ai-image-generate-oy7h.vercel.app/",
    year: "2025",
  },

  {
    id: 3,
    title: "JobDekho HRMS Solutions",
    image: p1,
    category: "Job Portal",
    description:
      "Developed a modern Job Portal + HRMS platform connecting job seekers with companies while streamlining recruitment workflows. Built secure authentication, role-based dashboards, company and candidate management systems, responsive UI, and cloud-based media handling using Cloudinary. Focused on scalability and user experience.",
    tags: [
      "MERN Stack",
      "JWT",
      "Cloudinary",
      "Tailwind CSS",
      "EmailJS",
      "REST API",
    ],
    color: "#f59e0b",
    featured: true,
    github:
      "https://github.com/jigneshRamawat/frontendJOBDEKHO",
    live: "https://frontend-jobdekho.vercel.app",
    year: "2026",
  },

  {
    id: 4,
    title: "My Portfolio",
    image: p3,
    category: "Personal Brand",
    description:
      "Designed and developed a premium 3D interactive portfolio inspired by modern cinematic web experiences using React, Framer Motion, GSAP, and Three.js. Implemented smooth animations, glassmorphism UI, custom cursor effects, responsive layouts, project showcases, and immersive user interactions to create a unique developer brand identity.",
    tags: [
      "React",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "Tailwind CSS",
    ],
    color: "#10b981",
    featured: true,
    github:
      "https://github.com/jigneshRamawat/portfolio21",
    live: "https://portfolio-1c7l.vercel.app/",
    year: "2025",
  },
];
function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({ x: -y * 8, y: x * 8 });
  };

  const onMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:
          tilt.x === 0 ? "transform 0.5s ease" : "transform 0.1s ease",
      }}
      className={`relative glass rounded-xl overflow-hidden glow-border-hover transition-all duration-300 ${
        project.featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Top bar with color */}
      <div
        className="h-px w-full"
        style={{
          background: `linear-gradient(to right, ${project.color}, transparent)`,
        }}
      />

      {/* Glow in corner */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${project.color}15, transparent 70%)`,
        }}
      />

      <div className={`p-7 ${project.featured ? "md:flex md:gap-10" : ""}`}>
        {/* Left col */}
        <div className={project.featured ? "md:flex-1" : ""}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-white/25">
                {project.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span
                className="section-label text-xs"
                style={{ color: project.color }}
              >
                {project.category}
              </span>
            </div>
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-white/30 hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs hover:text-white transition-colors"
                style={{ color: `${project.color}99` }}
              >
                Live ↗
              </a>
            </div>
          </div>

          <h3 className="font-display font-bold text-2xl text-white mb-3">
            {project.title}
          </h3>
          <p className="text-white/45 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: visual placeholder for featured */}
        {/* Right: visual placeholder for featured */}
        {/* Project Image */}
        {project.featured && (
          <div className="md:w-[360px] mt-6 md:mt-0">
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}20 0%, transparent 70%)`,
                }}
              />

              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[240px] object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Live badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md border"
                style={{
                  background: `${project.color}20`,
                  borderColor: `${project.color}50`,
                  color: project.color,
                }}
              >
                Live Project
              </div>

              {/* Bottom title */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-semibold text-white text-sm">
                  {project.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-32 px-6 md:px-12 overflow-hidden"
    >
      <div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 100%, rgba(225,29,72,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="section-label block mb-3"
            >
              03 — Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl"
            >
              Selected work.
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="https://github.com/jigneshramawat"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-crimson-400 hover:text-crimson-300 transition-colors tracking-widest uppercase"
          >
            View All on GitHub ↗
          </motion.a>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
