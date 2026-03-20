# 📋 AutoDesk AI – Instructions & File Guide

**Designed and Developed by [Babin Bid](https://github.com/KGFCH2)**

## 1. 👤 Developer & Project Context

This project was built by **Babin Bid** to demonstrate advanced integration between Notion and AI processors. It is intended for technical knowledge gain and architectural exploration.

- **GitHub**: [github.com/KGFCH2](https://github.com/KGFCH2)
- **Email**: [babinbid05@gmail.com](mailto:babinbid05@gmail.com)
- **LinkedIn**: [linkedin.com/in/babinbid123](https://linkedin.com/in/babinbid123)

## 2. 👤 User Guide

### 🎯 Product purpose

AutoDesk AI turns a Notion task database into an automated execution interface. Add tasks in Notion, then fetch and execute them from a single dashboard.

### 📄 Pages overview

| `/` | Home | Landing page with storytelling, features overview, and product mission |
| `/dashboard` | Mission Control | Core agent control panel (tasks, logs, execution results) |
| `/features` | Features | Detailed breakdown of the agent's capabilities and tech stack |
| `/docs` | Docs | Comprehensive setup guide and FAQ knowledge base |
| `/terms` | Terms of Service | Legal usage rules with icons and hover effects |
| `/privacy` | Privacy Policy — data handling and credential policies |
| `/faq` | FAQ — 10 questions in an accordion with icons |

### 🔄 Main user flow

1. 🖥️ Open the **Mission Control Dashboard** at `/dashboard`.
2. 🔄 Click **Scan Notion DB** to pull pending work from your workspace.
3. 🤖 Click **Force Engine Start** to classify and execute each mission using AI.
4. 📊 Review the **Pending Tasks**, **Activity Log**, and **Execution Results** panels.
5. 🧭 Toggle the **History** view to see past mission logs within the portal.

### 📝 Notion setup

#### 🔗 1. Create a Notion Integration

1. Go to [Notion My Integrations](https://www.notion.so/my-integrations).
2. Click **+ New integration**.
3. Choose your **Workspace** and give it a name like `AutoDesk AI`.
4. Click **Submit** and copy the **Internal Integration Token** (starts with `ntn_`).
5. Paste this into your `.env` as `VITE_NOTION_API_KEY`.

#### 📂 2. Create the Task Database

1. Create a new **Table** in your Notion workspace.
2. Add a property called **Status** (type: Status).
   - Ensure you have a `To Do` status (the agent looks for this).
   - Ensure you have a `Done` status (the agent updates this).

#### 🆔 3. Get your Database ID

1. Open your database in Notion as a full page.
2. Observe the URL: `https://www.notion.so/[workspace]/[database_id]?v=[view_id]`
3. The **Database ID** is the 32-character string *before* the `?v=` and *after* the final `/`.
   - *Example:* `a8aec43384f447edbbdd3039e1428c03`
4. Paste this into your `.env` as `VITE_NOTION_DATABASE_ID`.

#### 🤝 4. Share with your Integration

1. Click the `...` menu in the top right of your database.
2. Select **Connect to** (or **Add connections**).
3. Search for the name of your integration and click **Confirm**.

---

### 🔧 Environment & secrets

**Client-side `.env`** (copy from `.env.example`):

| Variable | Purpose |
| --- | --- |
| `VITE_NOTION_API_KEY` | 🔑 Notion integration token (starts with `ntn_`) |
| `VITE_NOTION_DATABASE_ID` | 🗄️ Database ID from Notion URL (32-char hex string) |
| `VITE_GROQ_API_KEY` | 🤖 Groq API key for AI processing |

---

## 2. File-by-File Function Guide

### Core application

| File | Function |
| --- | --- |
| `src/main.tsx` | React entry point — mounts the app |
| `src/App.tsx` | Top-level provider setup and route registration |
| `src/index.css` | Global design tokens, theme variables, fonts, and utility styles |
| `src/vite-env.d.ts` | TypeScript declarations for Vite runtime |
| `src/lib/utils.ts` | Shared utility helpers (class name merging, etc.) |

### Pages

| File | Function |
| --- | --- |
| `src/pages/Index.tsx` | Home page — Cinematic storytelling and guide |
| `src/pages/dashboard.tsx` | Mission Control — Dashboard with stats and results |
| `src/pages/features.tsx` | Features deep-dive |
| `src/pages/docs.tsx` | Technical documentation and guide |
| `src/pages/not-found.tsx` | 404 fallback page |

### Hooks

| File | Function |
| --- | --- |
| `src/hooks/useAgent.ts` | Orchestration layer managing state and multi-tier AI execution |

### Components

| File | Function |
| --- | --- |
| `src/components/Layout.tsx` | Shared navigation with robust redirection logic |
| `src/components/task-list.tsx` | Visual task intelligence modal content |
| `src/components/results-panel.tsx` | Streaming execution output feed |
| `src/components/activity-log.tsx` | Real-time neural log terminal |
| `src/components/ui/*` | Professional-grade interface primitives |

---

## 3. Maintenance Notes

### Change dashboard behavior

Edit `src/hooks/useAgent.ts` (logic) and `src/pages/dashboard.tsx` (view).

### Add new pages

1. Create the page in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add the nav link in `src/components/Layout.tsx`

---

## 4. Commercial Readiness Checklist

- [x] Verify Notion database fields and status values match the agent
- [x] Confirm all secrets are configured securely
- [x] Test the full Scan → Launch → Result cycle end-to-end
- [x] Test navigation between all pages on mobile viewports

---

## 📖 Related Documentation

- [README.md](README.md) - Project overview and quick start guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture overview
- [LICENSE](LICENSE) - MIT License terms

---

## 🔗 Connect & Explore

**Developed with precision by [Babin Bid](https://github.com/KGFCH2)**  
*Neural Integration | Autonomous Systems | Motion UI*

[GitHub](https://github.com/KGFCH2) | [LinkedIn](https://linkedin.com/in/babinbid123) | [Email](mailto:babinbid05@gmail.com)
