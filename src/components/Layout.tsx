import { Link, useLocation } from "react-router-dom";
import { Bot, FileText, Github, HelpCircle, Home, LayoutDashboard, Linkedin, Mail, Menu, Shield, X, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ScrollToTop } from "./ui/scroll-to-top";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button.variants";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/features", label: "Features", icon: Zap },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/docs", label: "Docs", icon: FileText },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <ScrollToTop />
      
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <Link 
            to="/" 
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center space-x-2 group hover:opacity-80 transition-opacity"
          >
            <div className="p-1 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
              <img src="/Favicon.png" alt="AutoDesk AI Logo" className="h-7 w-7" />
            </div>
            <span className="font-bold text-lg tracking-normal pr-2">AutoDesk AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2",
                    isActive
                      ? "bg-primary/10 text-primary shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <div className="h-4 w-px bg-white/10 mx-2" />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/dashboard"
                className={cn(buttonVariants({ size: "sm" }), "ml-2 rounded-full px-6 shadow-lg shadow-primary/30 font-bold transition-all")}
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 w-full border-b border-white/5 bg-background/95 backdrop-blur-xl md:hidden"
            >
              <div className="container py-4 space-y-1 px-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <div className="pt-2 px-4">
                  <Link 
                    to="/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(buttonVariants({ size: "lg" }), "w-full rounded-xl font-bold")}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-16 bg-black/60 relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4 flex flex-col items-center text-center gap-10">
          <Link 
            to="/" 
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex flex-col items-center space-y-3 group"
          >
            <div className="p-2 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 transform group-hover:rotate-12">
              <img src="/Favicon.png" alt="AutoDesk AI" className="h-8 w-8" />
            </div>
            <span className="font-bold text-2xl tracking-normal text-math-gradient px-4 pr-6">AutoDesk AI</span>
          </Link>
          
          <nav className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 text-sm font-bold uppercase tracking-widest">
            {navItems.map((link) => (
              <Link key={link.to} to={link.to} className="text-muted-foreground hover:text-white transition-all hover:scale-110 flex items-center gap-2">
                <link.icon className="w-4 h-4 text-primary" />
                {link.label}
              </Link>
            ))}
            <Link to="/terms" className="text-muted-foreground hover:text-white transition-all hover:scale-110 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Terms
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-white transition-all hover:scale-110 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Privacy
            </Link>
            <Link to="/faq" className="text-muted-foreground hover:text-white transition-all hover:scale-110 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              FAQ
            </Link>
          </nav>
          
          <div className="pt-6 border-t border-white/5 w-full flex flex-col items-center gap-3">
            <p className="text-xs text-muted-foreground/60 font-medium">
              © 2026 AutoDesk AI. All rights reserved. Precision-built automation.
            </p>
            <motion.p 
              whileHover={{ scale: 1.1 }}
              className="text-sm font-black text-primary italic tracking-wider uppercase cursor-default"
            >
              Developed by Babin Bid
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
