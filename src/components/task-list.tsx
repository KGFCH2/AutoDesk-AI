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
        className="rounded-xl border border-border bg-card p-4 scroll-reveal"
      >
        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-math-gradient">
          <FileText className="h-6 w-6 text-muted-foreground" />
          Pending Tasks
        </h2>
        <p className="text-muted-foreground text-sm text-center py-6 font-medium italic">
          No pending tasks. Click "Refresh Tasks" to fetch from Notion.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-4 scroll-reveal bg-playful-1"
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-math-gradient">
        <FileText className="h-6 w-6 text-primary" />
        Pending Tasks
        <span className="ml-auto text-sm font-bold text-comic-gradient">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </span>
      </h2>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="flex items-center gap-3 rounded-lg border-2 border-dashed border-primary/20 bg-background/80 p-4 shadow-sm"
          >
            <Clock className="h-5 w-5 text-warning shrink-0" />
            <span className="text-lg font-bold truncate text-foreground/90">{task.title}</span>
            <span className="ml-auto rounded-full bg-warning/10 px-3 py-1 text-xs font-bold text-warning border border-warning/20">
              {task.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
