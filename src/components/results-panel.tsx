import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TaskResult {
  task: string;
  action: string;
  status: string;
  output: string;
}

interface ResultsPanelProps {
  results: TaskResult[];
}

const actionLabels: Record<string, string> = {
  generate_content: "Content Generation",
  search_web: "Web Research",
  summarize: "Summarization",
  analyze: "Analysis",
  error: "Error",
};

export function ResultsPanel({ results }: ResultsPanelProps) {
  if (results.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-4"
    >
      <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        Execution Results
      </h2>
      <div className="space-y-2">
        {results.map((result, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg border border-border bg-secondary/30 p-3"
          >
            <div className="flex items-center gap-2 mb-2">
              {result.status === "completed" ? (
                <CheckCircle className="h-3 w-3 text-success shrink-0" />
              ) : (
                <XCircle className="h-3 w-3 text-destructive shrink-0" />
              )}
              <span className="font-medium text-xs text-foreground/90">{result.task}</span>
              <span className={cn(
                "ml-auto rounded-full px-2 py-0.5 text-xs font-bold transition-all border",
                result.action === "error"
                  ? "bg-destructive text-white border-destructive/50 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse"
                  : "bg-accent/20 text-accent-foreground border-accent/20"
              )}>
                {actionLabels[result.action] || result.action}
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
              {result.output}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
