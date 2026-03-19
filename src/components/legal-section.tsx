import { BadgeCheck, FileCheck2, Fingerprint, Gavel, Lock, Scale, ShieldCheck } from "lucide-react";

const termsHighlights = [
  "Use the platform lawfully and only with tools and accounts you control.",
  "You are responsible for the accuracy of tasks, prompts, and destination content.",
  "Automated outputs should be reviewed before publishing or acting on them.",
  "Service behavior may evolve as new actions, models, and workflows are introduced.",
  "Abuse, reverse engineering, or attempts to bypass safeguards may result in access restrictions.",
];

const privacyHighlights = [
  "Task titles, outputs, and execution logs are processed to complete requested automations.",
  "Private credentials must remain in secure project secrets and never be exposed in the UI.",
  "Generated content may be stored in connected tools when a workflow writes results back.",
  "Only the minimum operational data required for execution, logging, and debugging should be retained.",
  "Users should avoid submitting regulated or highly sensitive data unless their policies allow it.",
];

interface LegalCardProps {
  title: string;
  description: string;
  icon: typeof Scale;
  items: string[];
}

function LegalCard({ title, description, icon: Icon, items }: LegalCardProps) {
  return (
    <article className="group rounded-2xl border border-border bg-card/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10">
      <div className="mb-5 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg] group-hover:bg-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="group/item flex items-start gap-3 rounded-xl border border-border/70 bg-secondary/40 px-4 py-3 text-sm text-secondary-foreground transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]"
          >
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform duration-500 group-hover/item:scale-125 group-hover/item:rotate-12" />
            <span className="leading-6 text-muted-foreground transition-colors group-hover/item:text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

interface LegalSectionProps {
  variant?: "both" | "terms" | "privacy";
}

export function LegalSection({ variant = "both" }: LegalSectionProps) {
  const showTerms = variant === "both" || variant === "terms";
  const showPrivacy = variant === "both" || variant === "privacy";

  return (
    <section aria-labelledby="legal-title" className="space-y-5">
      <div className="flex flex-col items-center group/header">
        <h2 id="legal-title" className="text-3xl font-bold tracking-tighter text-accent flex items-center justify-center gap-4 transition-all group-hover/header:scale-[1.02]">
          {variant === "terms" && <Scale className="h-7 w-7 transition-all duration-500 group-hover/header:rotate-12 opacity-80" />}
          {variant === "privacy" && <Fingerprint className="h-7 w-7 transition-all duration-500 group-hover/header:rotate-12 opacity-80" />}
          {variant === "terms" ? "Terms of Service" : variant === "privacy" ? "Privacy Policy" : "Legal Framework"}
          {variant === "terms" && <Scale className="h-7 w-7 transition-all duration-500 group-hover/header:-rotate-12 opacity-80" />}
          {variant === "privacy" && <Fingerprint className="h-7 w-7 transition-all duration-500 group-hover/header:-rotate-12 opacity-80" />}
        </h2>
        <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground transition-all duration-500 group-hover/header:rotate-12 group-hover/header:scale-110 group-hover/header:bg-accent/30">
          <FileCheck2 className="h-6 w-6" />
        </div>
        <p className="text-sm text-center text-muted-foreground mt-3 max-w-md">
          {variant === "terms"
            ? "Rules for operating the agent, connected tools, and generated outputs."
            : variant === "privacy"
              ? "How operational data is processed and credentials are handled."
              : "Clear operating rules and data-handling expectations for AutoDesk AI users."}
        </p>
      </div>

      <div className={`grid gap-6 ${variant === "both" ? "xl:grid-cols-2" : ""}`}>
        {showTerms && (
          <LegalCard
            title="Terms of Service"
            description="These terms define how users should operate the agent, connected tools, and generated outputs."
            icon={Scale}
            items={termsHighlights}
          />
        )}
        {showPrivacy && (
          <LegalCard
            title="Privacy Policy"
            description="This policy explains what operational data is processed and how credentials should be handled."
            icon={ShieldCheck}
            items={privacyHighlights}
          />
        )}
      </div>

      <div className="rounded-2xl border border-border bg-secondary/30 p-5 text-sm text-muted-foreground transition-colors duration-300 hover:border-primary/30 hover:bg-secondary/50">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Lock className="h-4 w-4" />
          </div>
          <p className="leading-6">
            Legal text on this page is a product-ready starter summary, not a substitute for jurisdiction-specific legal review.
          </p>
        </div>
      </div>
    </section>
  );
}
