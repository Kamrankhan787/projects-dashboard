# 🤖 Agentic AI Portfolio Dashboard

> A production-ready, futuristic dark-mode dashboard showcasing 6 Agentic AI internship projects — built with **Next.js 16**, **Tailwind CSS v4**, and **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF?logo=framer) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## ✨ Features

- **Dark/Light Theme Toggle** — cyberpunk dark mode by default, switchable at runtime
- **Particle Background** — interactive canvas particles that respond to the theme
- **Scroll Progress Bar** — Framer Motion spring-based top progress indicator
- **Boot Loader Screen** — simulated terminal initialization splash screen
- **Collapsible Sidebar** — full dashboard navigation with scroll-aware active states
- **Mobile Responsive** — slide-out drawer on mobile, collapsible sidebar on desktop
- **Project Cards Grid** — searchable, filterable 6-project dashboard with badges
- **Project Detail Modal** — tabbed deep-dive with architecture SVG flowcharts, previews, and video embeds
- **Analytics Dashboard** — animated counters, interactive bar charts, GitHub heatmap
- **Skills Section** — animated progress bars triggered on scroll
- **Journey Timeline** — vertical milestone cards for each internship task
- **Contact Form** — email, WhatsApp, and LinkedIn quick-connect cards
- **SEO Optimized** — full Open Graph metadata, semantic HTML

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── globals.css        # Theme tokens, glassmorphism, animations
│   ├── layout.tsx         # Root layout + SEO metadata
│   └── page.tsx           # Main page orchestrator + loading screen
├── components/
│   ├── ParticleBackground.tsx
│   ├── Sidebar.tsx
│   ├── Hero.tsx
│   ├── SocialLinks.tsx
│   ├── ProjectsDashboard.tsx
│   ├── ProjectModal.tsx
│   ├── Analytics.tsx
│   ├── Skills.tsx
│   ├── Timeline.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── data/
    └── projects.ts        # ← Edit this to update all project content
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000

# Production build
npm run build
```

---

## 🔧 Personalizing Your Portfolio

All placeholder data is centralized for easy replacement:

### 1. Update Your Info
Edit **`src/components/Hero.tsx`**:
```tsx
// Change "Aiden Sterling" to your name
<span className="text-slate-900 dark:text-slate-100">Your Name Here</span>
```

### 2. Update Project Data
Edit **`src/data/projects.ts`** — replace the placeholder URLs:
```ts
github: "https://github.com/YOUR_USERNAME/project-name",
demo:   "https://your-project.vercel.app",
video:  "https://www.youtube.com/embed/YOUR_VIDEO_ID",
```

### 3. Update Social Links
Search for `placeholder` across the codebase:
```bash
# Find all placeholder URLs at once
grep -r "placeholder" src/
```

Replace with:
- `https://linkedin.com/in/YOUR_LINKEDIN`
- `https://github.com/YOUR_GITHUB`
- `mailto:YOUR_EMAIL`
- `https://wa.me/YOUR_WHATSAPP_NUMBER`

### 4. Update Resume Link
In `src/components/Hero.tsx`, find:
```tsx
href="#resume-placeholder"
```
Replace with your Google Drive / direct PDF link.

---

## ☁️ Deploy to Vercel

### Option A — Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Option B — Vercel Dashboard
1. Push this folder to a **GitHub repository**
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy** — done!

> The `vercel.json` is already configured for zero-config deployment.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript 5 |
| Deployment | Vercel |

---

## 📋 Sections

| # | Section | Component |
|---|---|---|
| 1 | Hero — Name, Title, CTA | `Hero.tsx` |
| 2 | Social Links Cards | `SocialLinks.tsx` |
| 3 | Projects Dashboard | `ProjectsDashboard.tsx` |
| 4 | Project Detail Modal | `ProjectModal.tsx` |
| 5 | Analytics Hub | `Analytics.tsx` |
| 6 | Skills Architecture | `Skills.tsx` |
| 7 | Journey Timeline | `Timeline.tsx` |
| 8 | Contact Form | `Contact.tsx` |
| 9 | Footer | `Footer.tsx` |

---

## 📄 License
MIT — Free to use and modify for your portfolio.
