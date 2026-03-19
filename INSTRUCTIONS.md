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

| Route | What it shows |
| ------- | --------------- |
| `/` | Main dashboard — hero controls, pending tasks, activity log, execution results |
| `/terms` | Terms of Service — legal usage rules with icons and hover effects |
| `/privacy` | Privacy Policy — data handling and credential policies |
| `/faq` | FAQ — 10 questions in an accordion with icons |

### 🔄 Main user flow

1. 🖥️ Open the dashboard at `/`.
2. 🔄 Click **Refresh Tasks** to pull pending work from your Notion database.
3. 🤖 Click **Run Agent** to classify and execute each task using AI.
4. 📊 Review the **Pending Tasks**, **Activity Log**, and **Execution Results** panels.
5. 🧭 Use the top navbar to visit **Terms**, **Privacy**, or **FAQ** pages.
6. 🔗 Click the **GitHub** link in the hero section to open the project repository.

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
| `VITE_OPENAI_API_KEY` | 🤖 OpenAI API key for AI processing |

### ⚖️ Content/legal guidance

- Terms and Privacy pages contain starter legal copy.
- Before launching commercially, have legal text reviewed for your jurisdiction and company structure.

---

## 2. File-by-File Function Guide

### Core application

| File | Function |
| --- | --- |
| `src/main.tsx` | React entry point — mounts the app |
| `src/App.tsx` | Top-level provider setup and route registration (/, /terms, /privacy, /faq) |
| `src/App.css` | Additional application-level CSS |
| `src/index.css` | Global design tokens, theme variables, fonts, and utility styles |
| `src/vite-env.d.ts` | TypeScript declarations for Vite runtime |
| `src/lib/utils.ts` | Shared utility helpers (class name merging, etc.) |

### Pages

| File | Function |
| --- | --- |
| `src/pages/index.tsx` | Dashboard page — hero, tasks, logs, results |
| `src/pages/terms.tsx` | Terms of Service page |
| `src/pages/privacy.tsx` | Privacy Policy page |
| `src/pages/faq.tsx` | FAQ page |
| `src/pages/not-found.tsx` | 404 fallback page |

### Hooks

| File | Function |
| --- | --- |
| `src/hooks/useAgent.ts` | Client-side state and API calls for fetching tasks and running the agent |
| `src/hooks/use-mobile.tsx` | Detects mobile viewport for responsive behavior |
| `src/hooks/use-toast.ts` | Shared hook for toast notifications |

### Components

| File | Function |
| --- | --- |
| `src/components/layout.tsx` | Shared layout with sticky navbar, page links, and footer |
| `src/components/hero-section.tsx` | Hero area with product tagline, Run/Fetch controls, and GitHub link |
| `src/components/task-list.tsx` | Displays pending Notion tasks |
| `src/components/results-panel.tsx` | Shows execution outputs with status badges |
| `src/components/activity-log.tsx` | Timestamped runtime log feed |
| `src/components/legal-section.tsx` | Terms and Privacy content (supports variant prop for single or combined display) |
| `src/components/faq-section.tsx` | FAQ accordion with 10 questions, icons, and hover interactions |
| `src/components/nav-link.tsx` | React Router NavLink wrapper for consistent styling |
| `src/components/ui/*` | shadcn/ui primitives (accordion, button, card, dialog, etc.) |

### Backend

| File | Function |
| --- | --- |
| `supabase/functions/notion-agent/index.ts` | Serverless function — fetches tasks from Notion, classifies with AI, executes, updates Notion |
| `supabase/config.toml` | Backend function configuration |

### Configuration & tooling

| File | Function |
| --- | --- |
| `.env` | Public runtime variables (API URL, public key, project ID) |
| `index.html` | Root HTML document for Vite |
| `tailwind.config.ts` | Tailwind theme extension — colors, fonts, animations |
| `vite.config.ts` | Vite build and alias configuration |
| `vitest.config.ts` | Vitest test runner configuration |
| `tsconfig.json` | Base TypeScript configuration |
| `tsconfig.app.json` | TypeScript config for app source |
| `tsconfig.node.json` | TypeScript config for Node/Vite tooling |
| `postcss.config.js` | PostCSS configuration for Tailwind processing |
| `eslint.config.js` | ESLint linting rules |
| `components.json` | shadcn/ui component registry configuration |

### Auto-generated (do not edit)

| File | Function |
| --- | --- |
| `src/integrations/supabase/client.ts` | Auto-generated backend client |
| `src/integrations/supabase/types.ts` | Auto-generated backend type definitions |

---

## 3. Maintenance Notes

### Customize the GitHub link

Edit the URL in `src/components/HeroSection.tsx`.

### Change legal text

Edit `src/components/LegalSection.tsx`.

### Add more FAQs

Edit `src/components/FAQSection.tsx`.

### Change dashboard behavior

Edit `src/hooks/useAgent.ts` (client) and `supabase/functions/notion-agent/index.ts` (backend).

### Change visual styling

Edit `src/index.css` and `tailwind.config.ts`, then component files as needed.

### Add new pages

1. Create the page in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add the nav link in `src/components/Layout.tsx`

---

## 4. Commercial Readiness Checklist

- [ ] Replace the placeholder GitHub URL with your real repository
- [ ] Review Terms of Service and Privacy Policy with legal counsel
- [ ] Verify Notion database fields and status values match the agent
- [ ] Confirm all secrets are configured securely
- [ ] Test the full Refresh → Run → Results flow end to end
- [ ] Test navigation between all pages on mobile

## 📖 Related Documentation

- [README.md](README.md) - Project overview and quick start guide
- [LICENSE](LICENSE) - MIT License terms
