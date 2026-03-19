import { ArrowUpRight, Github, Loader2, RefreshCw, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onRun: () => void;
  onFetch: () => void;
  isRunning: boolean;
  isFetching: boolean;
  taskCount: number;
}

const REPOSITORY_URL = "https://github.com/KGFCH2/AutoDesk-AI";

export function HeroSection({ onRun, onFetch, isRunning, isFetching, taskCount }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="flex flex-col items-center gap-6 w-full lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-4 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 p-1.5 shadow-lg shadow-primary/5"
              >
                <img src="/Favicon.png" alt="AutoDesk AI Logo" className="h-10 w-10" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-math-gradient">AutoDesk AI</h1>
            </div>
            <p className="max-w-2xl text-lg md:text-xl font-medium text-comic-gradient leading-relaxed">
              Notion-powered AI agent that reads your tasks, understands them, executes actions, and updates results — automatically.
            </p>
          </div>

          <motion.a
            whileHover={{ y: -5, scale: 1.02 }}
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-w-[14rem] max-w-xs flex-col rounded-3xl border border-border bg-secondary/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-secondary/50 hover:shadow-2xl hover:shadow-primary/10"
            aria-label="Open project GitHub repository"
          >
            <span className="mb-2 flex items-center justify-center lg:justify-start gap-2 text-sm font-bold text-foreground">
              <Github className="h-4 w-4 text-primary" />
              Project Repository
              <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <span className="text-xs text-muted-foreground italic font-comic text-center lg:text-left leading-relaxed">Connect your workflow with intelligent automation.</span>
          </motion.a>
        </div>

        <div className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button
              onClick={onRun}
              disabled={isRunning}
              className="group font-bold text-base px-8 py-6 rounded-2xl shadow-xl shadow-primary/20 w-full sm:w-auto"
              size="lg"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5 transition-all duration-300 group-hover:scale-120 group-hover:rotate-12 group-hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
                  Run Agent
                </>
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Button onClick={onFetch} disabled={isFetching} variant="outline" size="lg" className="group font-bold text-base px-8 py-6 rounded-2xl w-full sm:w-auto border-2">
              {isFetching ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-5 w-5 transition-all duration-500 group-hover:rotate-180" />
              )}
              Refresh
            </Button>
          </motion.div>
          {taskCount > 0 && (
            <motion.span
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="rounded-full bg-primary/20 border border-primary/30 px-4 py-2 text-sm font-black text-primary shadow-lg"
            >
              {taskCount} pending tasks
            </motion.span>
          )}
        </div>
      </div>
    </motion.section>
  );
}
