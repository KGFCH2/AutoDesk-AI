import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
            <div className="relative">
                <motion.div
                    animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-16 bg-primary/20 blur-[100px] rounded-full"
        />
        
        {/* Mandala Spinning Circles */}
        <div className="absolute inset-0 flex items-center justify-center scale-[2.5]">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 overflow-visible">
                <circle
                  cx="50"
                  cy="50"
                  r={30 + i * 8}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="1, 4"
                  className="text-primary"
                />
                {[...Array(12)].map((_, j) => (
                  <circle
                    key={j}
                    cx={50 + (30 + i * 8) * Math.cos((j * 30 * Math.PI) / 180)}
                    cy={50 + (30 + i * 8) * Math.sin((j * 30 * Math.PI) / 180)}
                    r="1.5"
                    className="fill-primary"
                  />
                ))}
              </svg>
            </motion.div>
          ))}
        </div>
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 border-2 border-primary/20 shadow-2xl shadow-primary/20 backdrop-blur-xl"
                >
                    <img src="/Favicon.png" alt="Logo" className="h-16 w-16" />

                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 -right-4"
                    >
                        <Sparkles className="h-8 w-8 text-primary" />
                    </motion.div>
                </motion.div>
            </div>

            <div className="mt-12 space-y-4 text-center">
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black tracking-tighter text-math-gradient"
                >
                    AutoDesk AI
                </motion.h1>

                <div className="flex flex-col items-center gap-2">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 200 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-1.5 bg-primary/20 rounded-full overflow-hidden"
                    >
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="h-full w-1/2 bg-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                        />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-xs font-bold text-muted-foreground uppercase tracking-[0.3em] font-mono animate-pulse"
                    >
                        Initializing Agent...
                    </motion.p>
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1 opacity-40">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    Knowledge Acquisition Project
                </span>
                <div className="flex items-center gap-2">
                    <Bot className="h-3 w-3" />
                    <span className="text-[10px] font-mono italic">Babin Bid Edition</span>
                </div>
            </div>
        </motion.div>
    );
}
