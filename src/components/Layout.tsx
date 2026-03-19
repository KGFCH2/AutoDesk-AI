import { Link, useLocation } from "react-router-dom";
import { Bot, FileText, Github, HelpCircle, LayoutDashboard, Linkedin, Mail, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/terms", label: "Terms", icon: FileText },
  { to: "/privacy", label: "Privacy", icon: Shield },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl"
      >
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-1 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
              <img src="/Favicon.png" alt="AutoDesk AI Logo" className="h-8 w-8" />
            </div>
            <span className="font-bold text-xl ml-2 text-math-gradient transition-all duration-300 group-hover:tracking-wider">AutoDesk AI</span>
          </Link>

          <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(34,197,94,0.1)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="hidden sm:inline font-bold">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto py-8 group/footer">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center space-x-3">
              <div className="p-1 rounded-lg bg-primary/10 transition-all duration-300 group-hover/footer:bg-primary/20 group-hover/footer:scale-110">
                <img src="/Favicon.png" alt="AutoDesk AI" className="h-6 w-6 transition-all duration-500 group-hover/footer:rotate-[360deg]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground">AutoDesk AI</span>
                <span className="text-[10px] text-muted-foreground italic font-comic">
                  Technical exploration by Babin Bid
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground/60 font-mono">
              <a href="https://github.com/KGFCH2/AutoDesk-AI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors group/link">
                <Github className="h-3 w-3 group-hover/link:animate-bounce" /> GitHub
              </a>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <a href="mailto:babinbid05@gmail.com" className="flex items-center gap-1 hover:text-primary transition-colors group/link">
                <Mail className="h-3 w-3 group-hover/link:animate-bounce" /> Email
              </a>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <a href="https://linkedin.com/in/babinbid123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors group/link">
                <Linkedin className="h-3 w-3 group-hover/link:animate-bounce" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1">
            <div className="text-sm font-medium text-muted-foreground">
              © 2026 <span className="text-math-gradient font-bold">AutoDesk AI</span>. Developed by Babin Bid.
            </div>
            <div className="text-[10px] text-muted-foreground/50 font-mono uppercase tracking-widest">
              Knowledge Acquisition Project • V1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
