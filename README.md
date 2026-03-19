# 🤖 AutoDesk AI – Notion Execution Agent

AutoDesk AI is a smooth, mobile-friendly Notion-controlled execution dashboard with scroll animations, built with React, TypeScript, Tailwind CSS, and direct Notion API integration.

## ✨ What it does

- 📥 Fetches pending tasks from a connected Notion database
- 🧠 Classifies each task using AI (content generation, research, summarization, analysis)
- ⚡ Executes the classified action and writes results back to Notion
- 📊 Displays logs, results, and pending work in a compact, animated dashboard
- 📄 Includes dedicated Terms of Service, Privacy Policy, and FAQ pages

## 🎯 Core product idea

**Notion becomes the control panel.** 🚀
Users create tasks in Notion → the agent fetches, classifies, executes, and pushes results back — all from a single dashboard.

## 🌟 Features

- 🎨 **Smooth Animations**: Framer Motion-powered entrance animations and hover effects
- 📱 **Mobile-Friendly**: Responsive design that works perfectly on all devices
- 🎯 **Compact UI**: Streamlined interface with efficient use of space
- 📜 **Scroll Animations**: Smooth scrolling behavior throughout the app

## 📋 Pages

|Route|Page|Description|
|---|---|---|
|`/`|Dashboard|Hero section, pending tasks, activity log, execution results|
|`/terms`|Terms of Service|Legal usage rules with icons and hover effects|
|`/privacy`|Privacy Policy|Data handling and credential security policies|
|`/faq`|FAQ|10 frequently asked questions with accordion UI|

## 🛠️ Tech stack

- ⚛️ React 18 + React Router (multi-page SPA)
- 📘 TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS + shadcn/ui
- 🎭 Framer Motion (animations)
- 🎯 Lucide icons
- 🔗 Direct Notion API integration

## 📁 Project structure

```bash
src/
├── pages/
│   ├── index.tsx             – dashboard (tasks, logs, results)
│   ├── terms.tsx             – terms of service page
│   ├── privacy.tsx           – privacy policy page
│   ├── faq.tsx               – FAQ page
│   └── not-found.tsx          – 404 fallback
├── components/
│   ├── layout.tsx            – shared layout with navbar and footer
│   ├── hero-section.tsx       – hero with controls and repo link
│   ├── task-list.tsx          – pending task display
│   ├── results-panel.tsx      – execution result cards
│   ├── activity-log.tsx       – timestamped log feed
│   ├── legal-section.tsx      – terms & privacy content (variant-based)
│   ├── faq-section.tsx        – FAQ accordion (10 items)
│   └── ui/                   – shadcn/ui primitives
├── hooks/useAgent.ts         – client-side agent state and API calls
├── index.css                 – design tokens and global styles
└── lib/utils.ts              – utility functions
```

## 🔧 Environment variables

Configure these in your `.env` file (copy from `.env.example`):

|Variable|Purpose|
|---|---|
|`VITE_NOTION_API_KEY`|🔑 Notion integration token (starts with `ntn_`)|
|`VITE_NOTION_DATABASE_ID`|🗄️ ID of the Notion database containing tasks|
|`VITE_OPENAI_API_KEY`|🤖 OpenAI API key for task classification and execution|

## 📊 Notion database setup

### 1. Create a Notion Integration

1. Go to the [Notion My Integrations](https://www.notion.so/my-integrations) page.
2. Click **+ New integration**.
3. Select the **Associated workspace** where your database will live.
4. Give it a name (e.g., "AutoDesk AI") and click **Submit**.
5. Under `Secrets`, click **Show** and copy your **Internal Integration Token** (starts with `ntn_`).
6. Paste this into your `.env` file as `VITE_NOTION_API_KEY`.

### 2. Prepare your Database

1. Create a new **Table** database in Notion.
2. Ensure it has these exact properties:
   - **Name** (Title property): The task description.
   - **Status** (Status property):
     - Add `To Do` (The agent searches for tasks with this status).
     - Add `Done` (The agent will update the task to this status after execution).
3. (Optional) Add a **Result** property (Text) if you want the agent to write the output directly into a property.

### 3. Get your Database ID

1. Open your database in the Notion desktop app or browser as a full page.
2. Look at the URL in your browser: `https://www.notion.so/[workspace_name]/[database_id]?v=[view_id]`
3. The **Database ID** is the 32-character string of numbers and letters between the slash `/` and the question mark `?`.
   - *Example:* If the URL is `.../a8aec43384f447edbbdd3039e1428c03?v=...`, the ID is `a8aec43384f447edbbdd3039e1428c03`.
4. Paste this into your `.env` file as `VITE_NOTION_DATABASE_ID`.

### 4. Connect the Integration to your Database

1. Open your database in Notion.
2. Click the **three dots `...`** in the top right corner.
3. Scroll down to **Connect to** (or **Add connections**).
4. Search for your integration name (e.g., "AutoDesk AI") and select it.
5. Confirm by clicking **Confirm** or **Yes**.

---

## 🚀 Running the project

1. 📥 Clone the repository or open in your editor
2. 📦 Install dependencies: `npm install`
3. ⚙️ Configure the required environment variables in `.env` (copy from `.env.example`)
4. 🖥️ Start development server: `npm run dev`
5. 🔄 Click **Refresh Tasks** to fetch pending items from Notion
6. 🤖 Click **Run Agent** to classify and execute all pending tasks
7. 🧭 Navigate between pages using the top navbar

## ⚠️ Configuration notes

- 🔒 **Security Note**: API keys are exposed client-side for demo purposes. In production, use a backend proxy.
- 📂 Replace the placeholder GitHub URL in `src/components/HeroSection.tsx` with your real repo
- 📱 The app is optimized for mobile devices with touch-friendly interactions
- ⚖️ Legal copy is starter text — have it reviewed before going live

## 📖 Documentation

See [INSTRUCTIONS.md](INSTRUCTIONS.md) for a detailed user guide and file-by-file function reference.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Built with ❤️ by Babin Bid
