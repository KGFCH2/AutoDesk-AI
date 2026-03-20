import { useState, useMemo } from "react";
import { ActivityLog } from "@/components/activity-log";
import { HeroSection } from "@/components/hero-section";
import { ResultsPanel } from "@/components/results-panel";
import { TaskList } from "@/components/task-list";
import { useAgent } from "@/hooks/useAgent";
import { Layout } from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Filter, Activity, CheckCircle2, Clock, Zap, Cpu, Server, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Index = () => {
  const { tasks, logs, results, isRunning, isFetching, showHistory, setShowHistory, fetchTasks, runAgent } = useAgent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derived Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Done" || t.status === "Completed").length;
    const pending = tasks.filter(t => t.status === "To Do" || t.status === "Pending" || t.status === "In Progress").length;
    const successRate = results.length > 0 
      ? Math.round((results.filter(r => r.status === "completed").length / results.length) * 100) 
      : 100;
    
    return [
      { label: "Active Engine", value: isRunning ? "Running" : "Idle", icon: Zap, color: "text-primary", bg: "bg-primary/10" },
      { label: "Total Tasks", value: total, icon: Server, color: "text-blue-400", bg: "bg-blue-400/10" },
      { label: "Success Rate", value: `${successRate}%`, icon: ShieldCheck, color: "text-purple-400", bg: "bg-purple-400/10" },
      { label: "Pending queue", value: pending, icon: Clock, color: "text-warning", bg: "bg-warning/10" },
    ];
  }, [tasks, results, isRunning]);

  return (
    <Layout>
      <div className="container py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Command Center Hero */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-black/40 border border-white/5 rounded-[3rem] p-6 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl">
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black tracking-widest uppercase text-primary">
              <Cpu className="w-3 h-3 animate-pulse" />
              <span>Neural Engine 01 - Online</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-none">
              Mission <br />
              <span className="text-math-gradient">Control Center</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed font-comic">
              Orchestrate your autonomous agents, monitor real-time execution, and analyze production intelligence from one unified interface.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
               <Button 
                size="lg" 
                className="rounded-full px-8 py-7 font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all w-full sm:w-auto"
                onClick={runAgent}
                disabled={isRunning}
               >
                 {isRunning ? <Zap className="mr-2 animate-spin" /> : <Zap className="mr-2 h-5 w-5" />}
                 Force Engine Start
               </Button>
               <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-7 font-black text-lg border-2 bg-white/5 backdrop-blur-md w-full sm:w-auto"
                onClick={fetchTasks}
                disabled={isFetching}
               >
                 <Activity className={cn("mr-2 h-5 w-5", isFetching && "animate-spin")} />
                 Scan Notion DB
               </Button>
            </div>
          </div>

          <div className="relative flex-1 w-full max-w-md hidden lg:block">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center gap-3 group/stat hover:bg-white/[0.05] transition-all cursor-default"
                  >
                    <div className={cn("p-3 rounded-2xl transition-transform group-hover/stat:rotate-12", stat.bg)}>
                       <stat.icon className={cn("w-6 h-6", stat.color)} />
                    </div>
                    <div className="text-2xl font-black text-foreground">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Status & Results */}
          <div className="lg:col-span-8 space-y-8">
             <ResultsPanel results={results} />
             {results.length === 0 && (
               <div className="rounded-[2.5rem] border border-white/5 bg-black/20 p-20 flex flex-col items-center justify-center text-center gap-6">
                  <div className="p-6 rounded-full bg-white/5 border border-white/10">
                    <Globe className="w-12 h-12 text-muted-foreground/40 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-foreground italic">System Idle — Awaiting Input</h3>
                    <p className="text-muted-foreground font-comic max-w-sm">
                      Initialize the neural bridge by scanning your Notion workspace for pending missions.
                    </p>
                  </div>
               </div>
             )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             <ActivityLog logs={logs} />
             
             <motion.div 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="group relative cursor-pointer"
               onClick={() => setIsModalOpen(true)}
             >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative p-10 rounded-[2.5rem] bg-black/60 border border-white/10 flex flex-col items-center text-center gap-6">
                   <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center ring-4 ring-primary/5">
                      <Search className="w-10 h-10 text-primary transition-transform group-hover:scale-125" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-2xl font-black text-foreground">Mission Logs</h2>
                      <p className="text-sm font-medium text-muted-foreground font-comic">Full visibility into your historically completed and pending tasks.</p>
                   </div>
                   <Button variant="outline" className="rounded-full px-8 py-6 font-black border-2 bg-white/5">
                      Open Log Viewer
                   </Button>
                </div>
             </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl h-[80vh] overflow-hidden rounded-[3rem] border border-white/10 bg-black/60 shadow-[0_0_100px_rgba(34,197,94,0.15)] flex flex-col"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
                      Task Intelligence <Filter className="w-5 h-5 text-primary" />
                    </h2>
                    <p className="text-muted-foreground font-medium">Analyze and manage your autonomous engine's workload.</p>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10" onClick={() => setIsModalOpen(false)}>
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <div className="p-8 flex gap-4 bg-white/[0.01]">
                   <Button 
                    variant={!showHistory ? "secondary" : "ghost"} 
                    className={cn("rounded-2xl px-8 font-black transition-all", !showHistory ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "")}
                    onClick={() => setShowHistory(false)}
                   >
                     Pending Tasks
                   </Button>
                   <Button 
                    variant={showHistory ? "secondary" : "ghost"} 
                    className={cn("rounded-2xl px-8 font-black transition-all", showHistory ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "")}
                    onClick={() => setShowHistory(true)}
                   >
                     Historical Timeline
                   </Button>
                </div>

                <div className="flex-1 overflow-hidden p-8 pt-0">
                  <TaskList tasks={tasks} title={showHistory ? "Historical Timeline" : "Active Queue"} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Index;
