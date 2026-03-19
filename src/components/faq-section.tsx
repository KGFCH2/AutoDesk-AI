import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Brain,
  ClipboardList,
  FileText,
  HelpCircle,
  MessageCircleQuestion,
  Search,
  RefreshCcw,
  LockKeyhole,
  Github,
  Shield,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
  icon: LucideIcon;
}

const faqItems: FAQItem[] = [
  {
    question: "What does AutoDesk AI do?",
    answer:
      "It reads tasks from Notion, determines the right action, executes the task, and sends results back so the workspace becomes an execution layer instead of only a planning tool.",
    icon: Bot,
  },
  {
    question: "How does the app know which tasks to run?",
    answer:
      "The current workflow fetches pending tasks from the connected Notion database and processes the ones that match the active execution flow.",
    icon: ClipboardList,
  },
  {
    question: "Which actions can the agent handle right now?",
    answer:
      "The current setup supports common flows like content generation, summarization, analysis, and web research style execution depending on how the task is classified.",
    icon: Brain,
  },
  {
    question: "Does the agent update Notion after finishing a task?",
    answer:
      "Yes. Completed runs are designed to write outcomes back to the connected task record so the user can see status and output in one place.",
    icon: FileText,
  },
  {
    question: "Can I refresh tasks without triggering a full run?",
    answer:
      "Yes. The dashboard separates fetching from execution, so you can pull the latest tasks first and only run the agent when you are ready.",
    icon: RefreshCcw,
  },
  {
    question: "Are private API credentials exposed to visitors?",
    answer:
      "No. Sensitive credentials should stay in secure project secrets and never be rendered in the browser or committed to repository files.",
    icon: LockKeyhole,
  },
  {
    question: "Can I use the app before adding my real GitHub repository link?",
    answer:
      "Yes. The repository CTA can point to a temporary placeholder until your production GitHub repository is ready.",
    icon: Github,
  },
  {
    question: "What happens if a task fails during execution?",
    answer:
      "The run is logged in the activity feed, failed items can be surfaced in the results panel, and the workflow can be retried after fixing the task or integration issue.",
    icon: Shield,
  },
  {
    question: "Can this project be extended with more actions later?",
    answer:
      "Yes. The agent pattern is modular, so new task classifiers and executors can be added without redesigning the whole interface.",
    icon: Sparkles,
  },
  {
    question: "Is web research automated or manual?",
    answer:
      "The project is designed for automated research-style execution, where the agent interprets the task, gathers information, and returns a structured output for the user.",
    icon: Search,
  },
];

export function FAQSection() {
  return (
    <section aria-labelledby="faq-title" className="space-y-5">
      <div className="flex flex-col items-center group/header">
        <h2 id="faq-title" className="text-3xl font-bold tracking-tighter text-primary flex flex-wrap items-center justify-center gap-x-4 gap-y-2 transition-all group-hover/header:scale-[1.02] text-center">
          <MessageCircleQuestion className="h-7 w-7 transition-all duration-500 group-hover/header:rotate-[360deg] opacity-80" />
          <span className="inline-block">Frequently Asked</span>
          <span className="inline-block">Questions</span>
          <MessageCircleQuestion className="h-7 w-7 transition-all duration-500 group-hover/header:rotate-[-360deg] opacity-80" />
        </h2>
        <motion.div
          whileHover={{ scale: 1.2, y: -5 }}
          className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-primary/20"
        >
          <Bot className="h-6 w-6" />
        </motion.div>
        <p className="text-sm text-center text-muted-foreground transition-all group-hover/header:italic mt-3 max-w-md">
          Answers to the most common product, workflow, and safety questions.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-3 px-1">
        {faqItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="group rounded-2xl border border-border bg-card/80 px-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99]"
            >
              <AccordionTrigger className="gap-4 py-5 text-left hover:no-underline border-none">
                <span className="flex items-center gap-4 transition-all group-hover:translate-x-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-primary/10 group-data-[state=open]:bg-primary group-data-[state=open]:text-primary-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold leading-6 text-foreground sm:text-base group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-0 text-sm leading-6 text-muted-foreground">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-border/70 bg-secondary/30 px-4 py-4 font-comic italic group-hover:border-primary/20 transition-all"
                >
                  {item.answer}
                </motion.div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
