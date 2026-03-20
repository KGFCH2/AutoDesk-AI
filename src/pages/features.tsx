import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Zap, Bot, Database, ZapIcon, FileText, Key, BotIcon } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    { title: "Smart Classification", desc: "Automatically categorizes tasks into Research, Writing, or Analysis buckets using high-speed LPU™ inference.", icon: Zap },
    { title: "Deep Execution", desc: "Uses Llama 3.3 to perform complex multi-step reasoning and generate high-quality Notion content.", icon: FileText },
    { title: "Real-time Sync", desc: "Polls and updates your Notion workspace every few seconds, ensuring zero latency between thought and action.", icon: Database },
    { title: "Global Context", desc: "Reads your entire database structure to understand project relationships and historical context.", icon: Key }
  ];

  return (
    <Layout>
      <div className="container py-16 space-y-16 px-6">
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-normal text-foreground flex items-center justify-center gap-6"
          >
             <Zap className="h-8 w-8 text-primary hidden md:block animate-pulse" />
             <span className="text-math-gradient italic pr-2">Powerful Features</span>
             <Zap className="h-8 w-8 text-primary hidden md:block animate-pulse" />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground font-comic max-w-2xl mx-auto"
          >
            Everything you need to turn Notion into an autonomous productivity engine.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] relative overflow-hidden"
            >
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="p-4 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <f.icon className="w-8 h-8 text-primary" />
               </div>
               <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors">{f.title}</h3>
               <p className="text-lg text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
