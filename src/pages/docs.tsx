import { Layout } from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Key, Database, Zap, FileText } from "lucide-react";

export default function DocsPage() {
  return (
    <Layout>
      <div className="container py-16 px-6 max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
           <h1 className="text-3xl md:text-7xl font-black tracking-normal text-foreground flex items-center gap-6 justify-center">
              <FileText className="h-8 w-8 text-primary hidden md:block animate-pulse" />
              <span className="text-math-gradient italic pr-2">Knowledge Base</span>
              <FileText className="h-8 w-8 text-primary hidden md:block animate-pulse" />
           </h1>
           <p className="text-base md:text-xl text-muted-foreground font-comic leading-relaxed max-w-2xl mx-auto px-4">
             Explore our documentation to get the most out of AutoDesk AI. From setup to advanced execution.
           </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border border-white/10 rounded-2xl px-6 bg-white/5 hover:bg-white/10 transition-colors group">
            <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all">
                   <Key className="h-5 w-5 text-primary" />
                </div>
                How do I get my Notion API Key?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pl-6 md:pl-14">
              Go to the <a href="https://www.notion.so/my-integrations" target="_blank" rel="noreferrer noopener" className="text-primary hover:underline transition-all">Notion Integrations</a> page, create a new integration, and copy your Internal Integration Token.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="border border-white/10 rounded-2xl px-6 bg-white/5 hover:bg-white/10 transition-colors group">
            <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all">
                   <Database className="h-5 w-5 text-primary" />
                </div>
                Which Database ID do I use?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pl-6 md:pl-14">
              Open your Notion database in the browser. The ID is the 32-character string in the URL after your workspace name and the slash, but before the question mark.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-white/10 rounded-2xl px-6 bg-white/5 hover:bg-white/10 transition-colors group">
            <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all">
                   <Zap className="h-5 w-5 text-primary" />
                </div>
                How does the auto-execution work?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pl-6 md:pl-14">
              The agent polls for tasks with the 'To Do' status. It then classifies the task using Groq Llama, executes it using Groq Llama 3.3, and writes the results back to Notion before marking it 'Done'.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="border border-white/10 rounded-2xl px-6 bg-white/5 hover:bg-white/10 transition-colors group">
            <AccordionTrigger className="hover:no-underline font-bold text-lg py-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 transition-all">
                   <FileText className="h-5 w-5 text-primary" />
                </div>
                Can I use other models?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-6 pl-6 md:pl-14">
              Currently we support Groq's high-speed Llama and Mixtral (Llama 3.3 replacement) models for maximum performance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Layout>
  );
}
