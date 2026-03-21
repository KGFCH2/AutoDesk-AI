# 🤖 AutoDesk AI – Notion Execution Agent

**Created by [Babin Bid](https://github.com/KGFCH2)**

AutoDesk AI is a cinematic, professional-grade execution dashboard that orchestrates autonomous AI agents directly within your Notion workspace.

## 👤 Developer Profile

- **Developer**: Babin Bid
- **GitHub**: [KGFCH2](https://github.com/KGFCH2)
- **Email**: [babinbid05@gmail.com](mailto:babinbid05@gmail.com)
- **LinkedIn**: [babinbid123](https://linkedin.com/in/babinbid123)

## ✨ What it does

- 📥 **Deep Notion Integration**: Fetches pending missions from your database.
- 🧠 **Multi-Tier Classification**: Uses Llama 3.1 8B for sub-second task parsing.
- ⚡ **Autonomous Execution**: Powerful Llama 3.3 70B models generate content, research, and perform analysis.
- 🕒 **Historical Timeline**: Tracks exact completion times and historical mission logs.
- 📊 **Mission Control**: Features a "Mission Control" center with real-time success rates and engine status metrics.

## 🎯 Core product idea

**Notion is the Command Center, AutoDesk is the Engine.** 🚀
Users create tasks in Notion → AutoDesk scans and classifies them → AI agents execute the logic → Results are pushed back to Notion in real-time.

## 🌟 Modern Features

- 🎨 **Asymmetric Hero Design**: A cinematic, ultra-wide landing page with 3D product mocks and glassmorphic elements.
- 🏛️ **Mission Control Dashboard**: Glassmorphic UI with analytics (Engine Status, Success Rate) and real-time activity tracking.
- 📜 **Task Intelligence Modal**: A full-screen portal for managing active queues and historical timelines.
- 📱 **Ultra-Mobile Responsive**: Precision-engineered layout that looks perfect on everything from 320px mobile screens to 4K monitors.
- 🔒 **High-Security Architecture**: Zero-key frontend with a backend proxy (Vercel Functions) to keep your API credentials 100% private.

## 📋 Pages

|Route|Page|Description|
|---|---|---|
|`/`|Home (Landing)|Ultra-wide cinematic hero, product features, and storytelling zig-zags.|
|`/dashboard`|Mission Control|The agent hub: Neural engine controls, real-time stats, activity logs, and results.|
|`/features`|Features|Deep-dive into the technical capabilities of the neural engine.|
|`/docs`|Documentation|Guidelines for connecting Notion and optimizing agent performance.|
|`/terms`|Terms|Professional usage policy with visual icon system.|

## 🛠️ Tech stack

- ⚛️ React 18 + React Router (SPA)
- 📘 TypeScript
- 🚦 Framer Motion (3D Hover & Layout Animations)
- 🎨 Tailwind CSS + Glassmorphism Tokens
- 🔗 Notion API (v2022-06-28)
- 🤖 Groq LPU™ Reference (Llama 3.1 & 3.3)

## 📁 Project structure

```bash
├── api/
│   ├── notion.ts           – Secure Notion proxy (hides API Key and DB ID)
│   └── groq.ts             – Secure Groq proxy (hides API Key)
├── src/
├── pages/
│   ├── Index.tsx             – Homepage (Cinematic Hero + Storytelling)
│   ├── dashboard.tsx         – Mission Control (Stats, Engine, Activity)
│   ├── features.tsx          – Feature deep-dive
│   └── docs.tsx              – Technical guides
├── components/
│   ├── Layout.tsx            – Navigation with robust mobile-first drawer system
│   ├── hero-section.tsx       – Dashboard's Command Center UI
│   ├── task-list.tsx          – Task Intelligence modal content
│   ├── results-panel.tsx      – Execution result feeds
│   └── activity-log.tsx       – Real-time neural log streaming
├── hooks/
│   └── useAgent.ts           – Orchestration hook (Zero-key logic)
└── lib/utils.ts              – Tailwind utility merging
```

## 🔧 Installation & Environment

Configure these in your `.env` file (No `VITE_` prefix required for keys):

|Variable|Purpose|
|---|---|
|`NOTION_API_KEY`|🔑 Internal Notion integration token|
|`NOTION_DATABASE_ID`|🗄️ Secure Notion database ID|
|`GROQ_API_KEY`|🤖 Groq API key for LPU™ inference|

---

## 🚀 Running the project

1. 📥 Clone the repository.
2. 📦 Run `npm install`.
3. ⚙️ Populate `.env` with your keys.
4. 🖥️ Execute `npm run dev`.
5. 🤖 Open the **Mission Control** to launch the neural engine.

---

## Built with ❤️ by Babin Bid

- [INSTRUCTIONS.md](INSTRUCTIONS.md) – Detailed user guide and file-by-file reference.
- [ARCHITECTURE.md](ARCHITECTURE.md) – Technical system overview and Mermaid diagrams.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Connect & Explore

**Developed with precision by [Babin Bid](https://github.com/KGFCH2)**  
*Neural Integration | Autonomous Systems | Motion UI*

[GitHub](https://github.com/KGFCH2) | [LinkedIn](https://linkedin.com/in/babinbid123) | [Email](mailto:babinbid05@gmail.com)
