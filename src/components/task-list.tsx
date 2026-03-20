import { CheckCircle, Clock, AlertCircle, FileText, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NotionTask {
  id: string;
  title: string;
  status: string;
  lastEditedTime: string;
}

interface TaskListProps {
  tasks: NotionTask[];
  title?: string;
}

export function TaskList({ tasks, title = "Task Overview" }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[2.5rem] border border-white/5 bg-black/40 p-12 backdrop-blur-xl"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-foreground">No Tasks Identified</h3>
            <p className="text-muted-foreground font-medium max-w-xs">
              Connect your Notion database to see your autonomous workflow in action.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black text-foreground flex items-center gap-3">
          <FileText className="h-6 w-6 text-primary" />
          {title}
        </h2>
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-black text-primary uppercase tracking-widest">
          {tasks.length} Entr{tasks.length === 1 ? "y" : "ies"}
        </span>
      </div>
      
      <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                    task.status === "Done" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
                  )}>
                    {task.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                    <Calendar className="w-3 h-3" />
                    {new Date(task.lastEditedTime).toLocaleDateString()} at {new Date(task.lastEditedTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors">
                  {task.title}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all">
                {task.status === "Done" ? <CheckCircle className="w-6 h-6 text-primary" /> : <Clock className="w-6 h-6 text-warning" />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
