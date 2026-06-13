# Jignesh Ramawat — Premium Cinematic Portfolio

> A premium, cinematic, 3D-powered developer portfolio built with the MERN stack.  
> Immersive. Futuristic. Recruiter-focused.

---

## ✨ What's Inside

| Feature | Tech |
|---|---|
| 3D Tech Ecosystem | Three.js + React Three Fiber + Drei |
| Cinematic Loading | Framer Motion + Canvas particles |
| Smooth Scroll | Lenis |
| Animations | GSAP + Framer Motion |
| Styling | Tailwind CSS + Glassmorphism |
| Contact Form | Express + Nodemailer + MongoDB |
| Custom Cursor | Vanilla JS |
| Typing Effect | Custom React hook |

---

## 🚀 Quick Start

### 1. Frontend

```bash
cd jignesh-portfolio
npm install
npm run dev
# → http://localhost:5173
```

### 2. Backend

```bash
cd jignesh-portfolio/server
npm install

# Copy and fill in env vars
cp .env.example .env
nano .env

npm run dev
# → http://localhost:5000
```

---

## ⚙️ Environment Setup (server/.env)

```env
# MongoDB Atlas URI
MONGODB_URI=mongodb+srv://USER:PASS@cluster.mongodb.net/portfolio

# Gmail credentials
EMAIL_USER=jigneshramawat21@gmail.com
EMAIL_PASS=your_16_char_app_password   # NOT your Gmail password

# Server
PORT=5000
CLIENT_URL=http://localhost:5173       # Change to your domain in prod
```

### Setting up Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification**
3. Under "2-Step Verification" → **App passwords**
4. Generate a new app password for "Mail"
5. Paste the 16-character code as `EMAIL_PASS`

---

## 📁 Project Structure

```
jignesh-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── Scene3D.jsx       ← Three.js ecosystem
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx   ← Fullscreen 3D hero
│   │   │   ├── AboutSection.jsx  ← Timeline layout
│   │   │   ├── SkillsSection.jsx ← Animated skill bars
│   │   │   ├── ProjectsSection.jsx ← 3D tilt cards
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── ContactSection.jsx ← Form → Nodemailer
│   │   └── ui/
│   │       ├── LoadingScreen.jsx ← Cinematic loader
│   │       ├── Navbar.jsx
│   │       ├── Footer.jsx
│   │       └── Cursor.jsx
│   ├── App.jsx                   ← Root with Lenis scroll
│   ├── main.jsx
│   └── index.css                 ← Design tokens, utilities
├── server/
│   ├── index.js                  ← Express + Nodemailer + MongoDB
│   ├── package.json
│   └── .env.example
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 Design System

**Palette**
- `#050508` — Void (background)
- `#0a0a0f` — Obsidian (cards)
- `#e11d48` — Crimson (accent / primary)
- `#fb7185` — Rose (highlights)
- `#ffffff` — White (headings)

**Typography**
- Display: **Space Grotesk** (headings, nav)
- Mono: **JetBrains Mono** (labels, code, tags)
- Body: **Inter** (body text)

**Signature element:** Angled clip-path buttons with deep crimson gradient — a visual motif carried through CTAs, logo mark, and skill tags.

---

## 🌐 Deployment

### Frontend → Vercel

```bash
npm run build
# Deploy /dist to Vercel
```

### Backend → Railway / Render

1. Connect your GitHub repo
2. Set environment variables in the dashboard
3. Set start command: `node server/index.js`

### MongoDB → MongoDB Atlas

1. Create free cluster at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Add connection string to `MONGODB_URI`
3. Whitelist `0.0.0.0/0` for production

---

## ✏️ Customizing Your Content

**Projects** → `src/components/sections/ProjectsSection.jsx` — edit the `PROJECTS` array  
**Skills** → `src/components/sections/SkillsSection.jsx` — edit `SKILLS` and `PROFICIENCY`  
**Experience** → `src/components/sections/ExperienceSection.jsx` — edit `EXPERIENCES`  
**Resume** → Replace `public/Jignesh_Ramawat_Resume.pdf`  
**3D Objects** → `src/components/3d/Scene3D.jsx` — tweak colors, positions, shapes

---

## 📧 Contact Email Templates

When someone submits the contact form:
1. **You receive** a branded HTML notification email with all details
2. **They receive** an auto-reply confirming receipt

Both are styled with your crimson/dark theme.

---

## 📄 License

MIT — use freely, credit appreciated.

---

*Built with passion by Jignesh Ramawat — MERN Stack Developer*
