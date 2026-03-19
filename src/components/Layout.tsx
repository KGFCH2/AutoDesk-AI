import { Link, useLocation } from "react-router-dom";
import { Bot, FileText, Github, HelpCircle, LayoutDashboard, Linkedin, Mail, Menu, Shield, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ScrollToTop } from "./ui/scroll-to-top";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/terms", label: "Terms", icon: FileText },
  { to: "/privacy", label: "Privacy", icon: Shield },
  { to: "/faq", label: "FAQ", icon: HelpCircle },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/30">
      <ScrollToTop />
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/40 backdrop-blur-2xl"
      >
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center space-x-2 group shrink-0">
            <div className="p-1 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
              <img src="/Favicon.png" alt="AutoDesk AI Logo" className="h-8 w-8" />
            </div>
            <span className="font-bold text-xl ml-2 text-math-gradient transition-all duration-300 group-hover:tracking-wider">AutoDesk AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
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
                  <span className="font-bold">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button - "Three Lines" Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col items-center justify-center w-10 h-10 space-y-1.5 md:hidden text-muted-foreground hover:text-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current rounded-full origin-center"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="container py-4 space-y-2 px-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "group flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300",
                        isActive
                          ? "bg-primary/15 text-primary shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]"
                          : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      )}
                    >
                      <item.icon className={cn("h-6 w-6 transition-transform", isActive ? "scale-110" : "group-hover:scale-125")} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto py-8 group/footer">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1 text-center w-full">
            <div className="flex flex-col items-center gap-3">
              <div className="p-1.5 rounded-xl bg-primary/10 transition-all duration-300 group-hover/footer:bg-primary/20 group-hover/footer:scale-110">
                <img src="/Favicon.png" alt="AutoDesk AI" className="h-7 w-7 transition-all duration-500 group-hover/footer:rotate-[360deg]" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-base font-bold text-foreground">AutoDesk AI</span>
                <span className="text-xs text-muted-foreground italic font-comic">
                  Technical exploration by Babin Bid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-muted-foreground/60 font-mono">
              <a href="https://github.com/KGFCH2/AutoDesk-AI" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors group/link px-2">
                <Github className="h-3.5 w-3.5 group-hover/link:animate-bounce" /> GitHub
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <a href="mailto:babinbid05@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors group/link px-2">
                <Mail className="h-3.5 w-3.5 group-hover/link:animate-bounce" /> Email
              </a>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <a href="https://linkedin.com/in/babinbid123" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors group/link px-2">
                <Linkedin className="h-3.5 w-3.5 group-hover/link:animate-bounce" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="text-sm font-medium text-muted-foreground/80">
              © 2026 <span className="text-math-gradient font-bold">AutoDesk AI</span>. Developed by Babin Bid.
            </div>
            <div className="text-[10px] text-muted-foreground/40 font-mono uppercase tracking-[0.2em]">
              Knowledge Acquisition Project • V1.0.0
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
