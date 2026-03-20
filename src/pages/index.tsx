import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Database, Key, Zap, Bot, Mail, Github, Linkedin, ChevronDown, CheckCircle, ZapIcon, ArrowRightIcon, BotIcon, LayoutDashboard, FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button.variants";
import { Layout } from "@/components/Layout";
import { SlideshowBackground } from "@/components/slideshow-background";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "The Ultimate Workspace",
    description: "Notion is the foundation of modern productivity. It blends notes, tasks, and wikis into one beautiful canvas. But static data is dead data—it needs to move.",
    image: "/feature-1.png",
    align: "left",
    badgeText: "Static to Dynamic",
  },
  {
    title: "The Execution Gap",
    description: "Traditional workspaces are passive. You plan perfectly, but you still have to switch tabs, research, and write. We bridged that gap with an intelligent execution layer.",
    image: "/feature-2.png",
    align: "right",
    badgeText: "Bridging the Gap",
  },
  {
    title: "Meet Your AI Agent",
    description: "AutoDesk AI turns your Notion into an active engine. It reads your 'To Do' items, executes them using Groq's high-speed inference, and reports back automatically.",
    image: "/Notion_Video_1.mp4",
    align: "left",
    badgeText: "AI Automation",
  },
  {
    title: "Dynamic Automation",
    description: "Watch as the agent researches the web, writes documentation, and populates your databases in real-time. It's not just a tool; it's an employee in your workspace.",
    image: "/Notion_Video_2.mp4",
    align: "right",
    badgeText: "Real-time Flow",
  },
  {
    title: "Smart Context Integration",
    description: "Our agent doesn't just execute; it understands the context of your entire database, making decisions based on your project goals and past results.",
    image: "/feature-3.png",
    align: "left",
    badgeText: "Context Aware",
  },
  {
    title: "Real-time Collaboration",
    description: "Share the agent's output directly with your team. AutoDesk AI handles the heavy lifting while you focus on high-level strategy and creative direction.",
    image: "/Notion_Video_3.mp4",
    align: "right",
    badgeText: "Team Synergy",
  },
  {
    title: "Infinite Scalability",
    description: "Whether you have ten tasks or ten thousand, AutoDesk AI scales with your needs, ensuring no detail is overlooked and every deadline is met.",
    image: "/Notion_Video_4.mp4",
    align: "left",
    badgeText: "Scale & Grow",
  },
  {
    title: "Precision Execution",
    description: "Leverage the power of Groq's low-latency performance to get results in seconds, not minutes. Experience the future of automated productivity today.",
    image: "/Notion_Video_5.mp4",
    align: "right",
    badgeText: "Rapid Response",
  },
];

const ComparisonCard = ({ title, items, isPrimary = false }: { title: string, items: string[], isPrimary?: boolean }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={cn(
      "p-8 rounded-[2rem] border transition-all duration-300 relative overflow-hidden",
      isPrimary
        ? "bg-primary/5 border-primary/20 shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]"
        : "bg-white/[0.02] border-white/5"
    )}
  >
    {isPrimary && <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest text-center">Recommended</div>}
    <h3 className={cn("text-2xl font-bold mb-6", isPrimary ? "text-primary" : "text-foreground")}>{title}</h3>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
          <CheckCircle2 className={cn("w-4 h-4 shrink-0", isPrimary ? "text-primary" : "text-muted-foreground/40")} />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const APIStep = ({ step, title, description, icon: Icon }: { step: number, title: string, description: string, icon: React.ElementType }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="flex gap-6 group"
  >
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
        0{step}
      </div>
      <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent" />
    </div>
    <div className="pb-12">
      <div className="flex items-center gap-2 mb-2 text-primary">
        <Icon className="w-4 h-4" />
        <h4 className="font-bold tracking-tight">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
        {description}
      </p>
    </div>
  </motion.div>
);

const NotionAppMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{
      scale: 1.05,
      rotateX: -5,
      rotateY: 8,
      boxShadow: "0 20px 80px rgba(34,197,94,0.3), 0 0 40px rgba(34,197,94,0.1)"
    }}
    viewport={{ once: true }}
    className="w-full rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-2xl relative group rotate-y-12 perspective-1000 transition-all duration-500 cursor-pointer"
  >
    <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/10">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/30" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
        <div className="w-3 h-3 rounded-full bg-green-500/30" />
      </div>
      <div className="text-[10px] text-muted-foreground/40 font-mono ml-6 tracking-widest uppercase">Intelligent Workspace v1.0</div>
    </div>
    <div className="p-8 grid grid-cols-12 gap-8">
      <div className="col-span-3 space-y-6 border-r border-white/5 pr-8 hidden md:block">
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 w-full bg-white/5 rounded-full" />
          ))}
        </div>
        <div className="pt-8 space-y-4">
          <div className="h-4 w-1/2 bg-white/10 rounded" />
          <div className="h-24 w-full bg-primary/5 rounded-xl border border-primary/10" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-9 space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-white/10 rounded-lg" />
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-white/5" />
            <div className="w-8 h-8 rounded-full bg-white/5" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
            <Bot className="w-6 h-6 text-primary" />
            <div className="h-4 w-2/3 bg-white/10 rounded" />
            <div className="h-2 w-full bg-white/5 rounded" />
          </div>
          <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 space-y-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
            <Database className="w-6 h-6 text-primary relative z-10" />
            <div className="h-4 w-1/2 bg-white/10 rounded relative z-10" />
            <div className="h-2 w-3/4 bg-white/5 rounded relative z-10" />
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-black/20 border border-white/5 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 group/row">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
              <div className="h-3 w-full bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const FeatureSection = ({ feature, index, isLast }: { feature: { title: string, description: string, badgeText: string, image: string }, index: number, isLast: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col items-center gap-12 lg:gap-32 relative",
        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse text-center lg:text-left"
      )}
    >
      {/* Visual Connector Arrow (Desktop only) */}
      {!isLast && (
        <div className={cn(
          "hidden lg:block absolute -bottom-28 left-1/2 -translate-x-1/2 w-64 h-32 z-0 opacity-20",
          index % 2 === 0 ? "scale-x-100" : "-scale-x-100"
        )}>
          <svg width="100%" height="100%" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M10 10C50 10 150 90 190 90"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="text-primary"
            />
            <motion.path
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              d="M185 85L195 90L185 95"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
        </div>
      )}

      <div className="flex-1 space-y-8 z-10 text-center lg:text-left group/text">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-foreground group-hover/text:text-primary transition-colors duration-500 flex items-center justify-center lg:justify-start gap-4">
          <span className="text-primary italic group-hover/text:rotate-12 group-hover/text:scale-125 transition-all duration-500 inline-block">#{index + 1}</span>
          {feature.title}
          <div className="hidden lg:block">
            {index % 2 === 0 ? <Zap className="h-6 w-6 text-primary opacity-0 group-hover/text:opacity-100 group-hover/text:translate-x-2 transition-all" /> : <BotIcon className="h-6 w-6 text-primary opacity-0 group-hover/text:opacity-100 group-hover/text:-translate-x-2 transition-all" />}
          </div>
        </h2>

        <div className="space-y-4">
          <motion.p
            initial={false}
            animate={{ height: isExpanded ? "auto" : "3em" }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium overflow-hidden group-hover/text:text-foreground transition-colors"
          >
            {feature.description}
          </motion.p>

          <div className="flex flex-col lg:flex-row items-center gap-6 pt-4 justify-center lg:justify-start">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-black hover:bg-primary/20 hover:text-white uppercase tracking-widest text-xs group transition-all"
            >
              {isExpanded ? "Read Less" : "Read More"}
              <ChevronRight className={cn("ml-2 h-4 w-4 transition-transform", isExpanded ? "-rotate-90" : "rotate-90")} />
            </Button>
            <div className="h-px w-24 bg-gradient-to-r from-primary/40 to-transparent hidden lg:block group-hover/text:w-32 transition-all duration-700" />
          </div>
        </div>
      </div>

      <div className="flex-1 w-full aspect-[4/3] rounded-[2.5rem] bg-black/40 border border-white/10 overflow-hidden shadow-2xl relative group transform hover:scale-[1.05] hover:shadow-primary/20 transition-all duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        {feature.image.endsWith(".mp4") ? (
          <video
            autoPlay loop muted playsInline
            src={feature.image}
            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110"
          />
        ) : (
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110"
          />
        )}
        <div className="absolute top-6 right-6 px-4 py-2 glass-dark rounded-full border-white/10 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary animate-pulse flex items-center gap-2">
            <Zap className="h-3 w-3" />
            {feature.badgeText || "AI Native"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  return (
    <Layout>
      <div className="flex flex-col gap-16 pb-20 overflow-hidden">
        <SlideshowBackground />

        {/* Modern Hero Section */}
        {/* Modern Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 px-6 md:px-12 max-w-[1800px] mx-auto z-10">
          <div className="w-full lg:w-[420px] lg:flex-none space-y-8 text-center lg:text-left lg:-translate-x-20 transition-all duration-1000">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-widest uppercase text-primary backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.1)]"
            >
              <Zap className="h-4 w-4 fill-primary animate-pulse" />
              <span>Infinitely Fast Execution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl md:text-7xl font-black leading-[1.1] md:leading-[0.95] text-foreground tracking-normal"
            >
              Notion <br />
              <span className="text-primary italic pr-4 font-comic text-4xl md:text-7xl inline-block mt-2 md:mt-0">Autonomous</span> <br className="hidden md:block" />
              Agents
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-[600px] text-lg md:text-xl text-muted-foreground font-medium leading-relaxed mx-auto lg:mx-0 font-comic"
            >
              Bridge the gap between planning and execution. Read tasks, understand context, and produce results—automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full px-12 py-8 font-black text-xl hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all flex items-center shadow-lg")}
                >
                  Launch Agent <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/docs"
                  className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full px-12 py-8 font-black text-xl bg-white/5 backdrop-blur-md border-2 flex items-center shadow-lg")}
                >
                  Read Documentation
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <div className="flex-1 w-full min-w-0 relative perspective-1000 group lg:scale-[1.15] lg:translate-x-20 transition-all duration-1000">
            <div className="absolute -inset-10 bg-primary/20 blur-[150px] rounded-full pointer-events-none opacity-40 animate-pulse group-hover:opacity-60 transition-opacity" />
            <div className="relative transform-gpu">
              <NotionAppMockup />
            </div>
          </div>
        </section>

        {/* Storytelling Zigzag Sections */}
        <section className="space-y-40 max-w-7xl mx-auto px-6 relative">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              feature={feature}
              index={index}
              isLast={index === features.length - 1}
            />
          ))}
        </section>

        {/* Comparison Section */}
        <section className="bg-black/20 py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4 mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">The Paradigm Shift</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                We're not just another productivity tool. We're the layer that turns your static goals into actual production.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <ComparisonCard
                title="Traditional Notion"
                items={["Manual Data Entry", "Passive Organization", "Requires Constant Attention", "Disconnected from Action"]}
              />
              <ComparisonCard
                isPrimary
                title="AutoDesk AI"
                items={["Autonomous Execution", "Intelligent Orchestration", "Real-time Task Completion", "Direct Web & Code Access"]}
              />
            </div>
          </div>
        </section>

        {/* API Guide Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12 sticky top-32">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Connection Guide</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Setting up your autonomous engine takes less than 2 minutes. Follow these steps to bridge your Notion workspace with our AI.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    <FileText className="w-4 h-4" /> Quick Config Snippet
                  </div>
                  <code className="text-[11px] text-primary block bg-black/40 p-4 rounded-xl font-mono leading-relaxed border border-white/5">
                    NOTION_API_KEY=secret_...<br />
                    DATABASE_ID=8c3d...
                  </code>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-10">
              <APIStep
                step={1}
                title="Create Notion Integration"
                description="Go to Notion's developer portal and create a new internal integration. Save the provided API Secret securely."
                icon={Key}
              />
              <APIStep
                step={2}
                title="Configure Database"
                description="Open your target Notion database, click the '...' menu, and select 'Add Connection' to link your new integration."
                icon={Database}
              />
              <APIStep
                step={3}
                title="Fetch Database ID"
                description="Copy the 32-character ID from your browser's address bar. It's the string following the forward slash after workspace name."
                icon={ChevronRight}
              />
              <APIStep
                step={4}
                title="Launch Engine"
                description="Input your credentials into the AutoDesk AI Dashboard and watch your workspace come to life automatically."
                icon={Zap}
              />
              <div className="pt-8">
                <Link
                  to="/dashboard"
                  className={cn(buttonVariants({ size: "lg" }), "w-full rounded-[1.5rem] py-8 text-xl font-black group flex items-center justify-center")}
                >
                  Open Dashboard <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
