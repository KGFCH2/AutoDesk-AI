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
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      <div className="relative z-10 space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 p-1"
              >
                <img src="/Favicon.png" alt="AutoDesk AI Logo" className="h-8 w-8" />
              </motion.div>
              <h1 className="text-3xl font-bold tracking-tight text-math-gradient">AutoDesk AI</h1>
            </div>
            <p className="max-w-2xl text-lg font-medium text-comic-gradient">
              Notion-powered AI agent that reads your tasks, understands them, executes actions, and updates results — automatically.
            </p>
          </div>

          <motion.a
            whileHover={{ y: -2 }}
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-w-[14rem] flex-col rounded-2xl border border-border bg-secondary/50 p-3 transition-all duration-300 hover:border-primary/40 hover:bg-secondary hover:shadow-lg hover:shadow-primary/10"
            aria-label="Open project GitHub repository"
          >
            <span className="mb-1 flex items-center gap-2 text-xs font-medium text-foreground">
              <Github className="h-3 w-3 text-primary" />
              Project Repository
              <ArrowUpRight className="ml-auto h-3 w-3 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="text-xs text-muted-foreground italic font-comic">Connect your workflow with intelligent automation.</span>
          </motion.a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onRun}
              disabled={isRunning}
              className="group font-semibold"
              size="sm"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-3 w-3 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                  Run Agent
                </>
              )}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={onFetch} disabled={isFetching} variant="outline" size="sm" className="group">
              {isFetching ? (
                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-3 w-3 transition-all duration-500 group-hover:rotate-180" />
              )}
              Refresh
            </Button>
          </motion.div>
          {taskCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {taskCount} pending
            </motion.span>
          )}
        </div>
      </div>
    </motion.section>
  );
}
