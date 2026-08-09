import { Bot, MessageSquareText, Send, Sparkle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { COPILOT_RESPONSES, COPILOT_SCRIPT } from "@/lib/mock-data";
import { StatusDot } from "./primitives";

type Msg = { role: "ai" | "analyst"; text: string };

const QUICK_ACTIONS = Object.keys(COPILOT_RESPONSES);

export function CopilotPanel({ className, compact = false }: { className?: string; compact?: boolean }) {
  const [messages, setMessages] = useState<Msg[]>(COPILOT_SCRIPT.map((m) => ({ ...m })));
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const respond = (prompt: string) => {
    if (!prompt.trim() || thinking) return;
    setMessages((m) => [...m, { role: "analyst", text: prompt }]);
    setInput("");
    setThinking(true);
    window.setTimeout(() => {
      const canned =
        COPILOT_RESPONSES[prompt] ??
        "Simulated response: I reviewed the current demo telemetry for that query. Nothing above a MEDIUM risk threshold was found outside the three tracked incidents. This assistant runs on scripted data for the demonstration.";
      setMessages((m) => [...m, { role: "ai", text: canned }]);
      setThinking(false);
    }, 850);
  };

  return (
    <div className={cn("glass flex flex-col overflow-hidden rounded-2xl", className)}>
      <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3.5">
        <span className="relative grid h-9 w-9 place-items-center rounded-xl border border-neon/30 bg-neon/12">
          <Bot className="h-4.5 w-4.5 text-neon" />
          <span className="absolute inset-0 rounded-xl bg-neon/20 blur-md" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-display text-sm font-bold tracking-[0.14em]">CYBERSHIELD AI</p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Intelligent Security Assistant
          </p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-safe/25 bg-safe/8 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-safe uppercase">
          <StatusDot tone="safe" /> Online
        </span>
      </div>

      <div
        ref={scrollRef}
        className={cn("flex-1 space-y-3 overflow-y-auto px-4 py-4", compact ? "max-h-72" : "max-h-96")}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex gap-2.5", m.role === "analyst" ? "justify-end" : "justify-start")}
          >
            {m.role === "ai" ? (
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-cyan/25 bg-cyan/10">
                <Sparkle className="h-3 w-3 text-cyan" />
              </span>
            ) : null}
            <div
              className={cn(
                "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line",
                m.role === "analyst"
                  ? "bg-primary text-primary-foreground"
                  : "border border-white/8 bg-white/4 text-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {thinking ? (
          <div className="flex items-center gap-2 px-1 font-mono text-[11px] text-cyan">
            <StatusDot tone="cyan" /> analyzing telemetry…
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/8 px-4 py-3">
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((a) => (
            <button
              key={a}
              onClick={() => respond(a)}
              className="rounded-full border border-cyan/25 bg-cyan/8 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] text-cyan uppercase transition-colors hover:bg-cyan/16"
            >
              {a}
            </button>
          ))}
        </div>
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            respond(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the security copilot…"
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/4 px-3 py-2.5 text-[13px] outline-none placeholder:text-muted-foreground focus:border-cyan/40"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan/35 bg-cyan/12 text-cyan transition-colors hover:bg-cyan/22"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="mt-2 font-mono text-[9px] tracking-[0.12em] text-muted-foreground/70 uppercase">
          Simulated assistant · scripted demo responses
        </p>
      </div>
    </div>
  );
}

export function FloatingCopilot() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? (
        <div className="fixed right-4 bottom-24 z-100 w-[min(24rem,calc(100vw-2rem))]">
          <div className="relative">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close copilot"
              className="absolute -top-3 -right-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-white/12 bg-background text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <CopilotPanel compact />
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-6 z-100 flex items-center gap-2.5 rounded-full border border-cyan/40 bg-background/90 px-4 py-3 font-mono text-[11px] tracking-[0.16em] text-cyan uppercase backdrop-blur-xl transition-all hover:bg-cyan/12 hover:shadow-[0_0_36px_-8px_var(--cyan)]"
      >
        <MessageSquareText className="h-4 w-4" />
        <span className="hidden sm:inline">AI Copilot</span>
        <StatusDot tone="safe" />
      </button>
    </>
  );
}
