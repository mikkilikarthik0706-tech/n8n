# Mikkili Karthik — Personal Portfolio & Automation Lab

A modern, creative developer portfolio website built with HTML5, CSS3, and vanilla JavaScript. Designed at the intersection of **Business, Finance, and Artificial Intelligence**.

---

## 🌟 Highlights & Design Aesthetic

- **Visual Inspiration:** Inspired by **Fernhollow**, **Linear**, **Vercel**, and **Raycast**.
- **Typography:** **Antonio** (condensed editorial headers) + **Manrope** (clean geometric body) + **JetBrains Mono** (technical details & code).
- **Color Palette:**
  - Background: Deep Void (`#08090B`) & Secondary Dark (`#0D0F14`, `#111318`)
  - Typography: Organic Warm Cream (`#f5efe2`) & Subdued Cream (`rgba(245,239,226,0.65)`)
  - Accents: Electric Blue (`#3B82F6`), Vibrant Purple (`#A855F7`), Emerald (`#22C55E`), Amber (`#F97316`)
- **Interactive UI/UX:**
  - Ambient particle canvas background
  - Radial glow orbs & glassmorphic cards
  - Scroll-triggered reveal animations
  - Custom fluid cursor (desktop with fine pointer)
  - Light/Dark theme toggle (saved in `localStorage`)
  - Fully responsive on desktop, laptop, tablet, and mobile

---

## 📁 Project Structure

```text
portfolio/
├── index.html           # Main portfolio website
├── admin.html           # Password-protected admin dashboard
├── style.css            # Complete styling & responsive design rules
├── script.js            # Particle canvas, smooth navigation, dynamic sync & validation
├── README.md            # Documentation & setup guide
└── assets/
    ├── n8n-workflow.png          # Workflow 01: AI Telegram Automation
    ├── n8n-invoice-workflow.png  # Workflow 02: AI Invoice Reminder Automation
    └── profile.png               # (Optional) Drop your photo here to display
```

---

## 🚀 Key Sections

### 1. Navigation & Hero
- Fixed glassmorphism navbar with active scroll spy tracking and signature cream pill button (`Let's talk`).
- Interactive particle canvas with connection lines.
- Live status badge: *"Available for opportunities"*, location indicator (*Bangalore, Karnataka*), and hero stats.

### 2. About Me
- Grounded in academic foundation as a **Bachelor of Business Administration (BBA)** student at **Stride School of Business, Bengaluru**.
- Explains hands-on experience in AI automation, copycraft, and digital operations.
- Highlights participation in the **McKinsey Forward Program**.

### 3. Skills & Toolbox
Categorized by honest learning journey:
- **AI & Automation:** n8n, LLMs, Prompt Engineering, AI Agents, API Integrations, Chatbots.
- **Programming & Dev:** HTML, CSS, JavaScript, Python, Web Design, REST APIs, Git & GitHub.
- **Business & Finance:** Financial Analysis, Financial Modelling, Business Analytics, Excel, Copywriting, Email Marketing.
- **Cybersecurity (Learning Interest):** Security Fundamentals, Networking, Linux, Web Security, Ethical Hacking Concepts.

### 4. Featured Projects
- **Project 01: AI Telegram Automation (Live Project):**
  Incoming Telegram webhook → Basic LLM Chain (OpenAI & Gemini fallback) → Automated Telegram response.
- **Project 02: CopycraftStudios Digital Operations (Live Work):**
  Responsive landing pages, email marketing automation, short-form media editing, and AI-assisted client pipelines.
- **Project 03: Financial Analysis Dashboard (Upcoming):**
  Interactive analytics dashboard for profitability, financial ratios, and business performance benchmarking.
- **Project 04: Cybersecurity Learning Lab (Learning):**
  Documented learning journey covering Linux CLI, networking protocols, OWASP Top 10, and TryHackMe labs.
- **Project 05: AI Invoice Reminder Automation (Featured Workflow):**
  Scheduled daily review → Google Sheets invoice extraction → Days-until-due calculation → OpenAI message drafting → Urgency routing (Upcoming 1–3 Days vs. Overdue 1–15 Days + Accounts Team alert) → Gmail send → Sheet update.

### 5. Inside My Automation Lab
Engineering case studies visually illustrating information flow through both **n8n** automation systems with architecture diagrams and node-by-node breakdowns.

### 6. Dynamic Upcoming Projects & Research
Admin-powered sections that automatically populate when you add entries in the admin console.

### 7. Experience & Timeline
- Education: Stride School of Business (BBA, 2026–Present) & SR Junior College (MPC, 91.9%).
- Leadership: AIESEC Youth 4 Impact (Team Member, Leadership & Career Domain).
- Certifications: McKinsey Forward Program (In Progress) & Web Design & Email Marketing.

### 8. Contact Section
- Social links: Email (`mikkilikarthik0706@gmail.com`), LinkedIn (`karthik-mikkili`), GitHub (`themkarthik`), and Instagram (`@themkarthik`).
- Validated contact form with interactive feedback.

---

## 🔐 Admin Dashboard (`admin.html`)

A local-first, zero-backend content management dashboard.

### Access:
- **URL:** Open [`admin.html`](admin.html) directly or visit `http://localhost:3000/admin.html`.
- **Default Password:** `mkportfolio2026` *(changeable in Settings tab)*.

### Capabilities:
1. **Upcoming Projects CRUD:** Add, edit, or delete future project concepts with custom icons, color tags, status badges, and timeline dates.
2. **Research & Notes CRUD:** Publish research notes, summaries, dates, tags, and document links.
3. **Instant Multi-Tab Sync:** Updates instantly sync to `index.html` via the browser's `localStorage` and `storage` events — **no page reload needed** if both tabs are open!
4. **Data Backup:** Export your entire project and research archive as a single `.json` file, or restore/import anytime.

---

## 💻 Local Development

### Option A: Direct Open
Double-click `index.html` in your file manager or run:
```bash
open index.html
```

### Option B: Local HTTP Server (Recommended)
Running through an HTTP server ensures all Google Fonts, Lucide icons, and browser APIs load smoothly:
```bash
# Navigate to the portfolio folder
cd /path/to/portfolio

# Start Python 3 web server
python3 -m http.server 3000
```
Then visit:
- **Portfolio:** [http://localhost:3000](http://localhost:3000)
- **Admin:** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 🌐 Deployment Guide

### Deploying to GitHub Pages (Free)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a repository on GitHub (e.g. `portfolio` or `username.github.io`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/themkarthik/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**. Your site will be live at `https://themkarthik.github.io/portfolio/`.

### Deploying to Vercel (Fastest)
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Run deployment:
   ```bash
   vercel
   ```
3. Follow the CLI prompts. Your site will be live instantly with a global CDN and HTTPS.

---

## 📝 Personalization Checklist

- [ ] **Profile Photo:** Drop your photo as `profile.png` into the `assets/` folder to replace the user avatar placeholder.
- [ ] **Admin Password:** Log into `admin.html` and update your password in the **Settings** tab.
- [ ] **Contact Form Backend:** To deliver messages to your inbox, connect the form in `script.js` to [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/).

---

## 📄 License & Credits
- Built by **Mikkili Karthik**
- Designed with **Antonio**, **Manrope**, **JetBrains Mono**, and **Lucide Icons**.
