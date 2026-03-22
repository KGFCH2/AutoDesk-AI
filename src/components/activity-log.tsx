import { Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ActivityLogProps {
  logs: string[];
  className?: string;
  consoleClassName?: string;
}

export function ActivityLog({ logs, className, consoleClassName }: ActivityLogProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("rounded-xl border border-border bg-card p-4", className)}
    >
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        Activity Log
      </h2>
      <div className={cn("bg-background rounded-lg p-3 overflow-y-auto font-mono text-xs space-y-1", consoleClassName)}>
        <AnimatePresence>
          {logs.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
            >
              No activity yet...
            </motion.p>
          ) : (
            logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="text-muted-foreground"
              >
                {log}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
