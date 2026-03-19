import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface NotionTask {
  id: string;
  title: string;
  status: string;
}

interface TaskListProps {
  tasks: NotionTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-6 scroll-reveal md:p-8"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3 text-math-gradient md:text-3xl">
          <FileText className="h-8 w-8 text-muted-foreground" />
          Pending Tasks
        </h2>
        <div className="flex flex-col items-center py-12 px-6 rounded-3xl bg-background/50 border-2 border-dashed border-white/5 shadow-inner">
          <p className="text-muted-foreground text-lg text-center font-bold italic opacity-60">
            No pending tasks found.
          </p>
          <p className="text-muted-foreground/40 text-sm text-center mt-2 italic font-mono">
            Click "Refresh" to check your Notion database.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6 scroll-reveal bg-playful-1 md:p-8"
    >
      <h2 className="text-2xl font-black mb-8 flex flex-col items-center gap-4 text-math-gradient md:flex-row md:justify-between md:text-3xl">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary group-hover:animate-bounce" />
          Pending Tasks
        </div>
        <span className="rounded-2xl bg-primary/15 border border-primary/20 px-6 py-2 text-sm font-black text-primary backdrop-blur-md shadow-lg shadow-primary/10">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </h2>
      <div className="space-y-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, x: 5 }}
            className="flex flex-col items-center gap-4 rounded-3xl border-2 border-dashed border-primary/20 bg-background/90 p-5 shadow-xl md:flex-row md:p-6"
          >
            <div className="p-3 rounded-2xl bg-warning/10 border border-warning/10 shadow-inner">
              <Clock className="h-6 w-6 text-warning shrink-0" />
            </div>
            <span className="text-xl font-black text-center text-foreground/90 md:text-left leading-tight lg:text-2xl">
              {task.title}
            </span>
            <span className="md:ml-auto rounded-xl bg-warning/10 px-5 py-2 text-xs font-black text-warning border border-warning/20 shadow-lg tracking-widest uppercase">
              {task.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
