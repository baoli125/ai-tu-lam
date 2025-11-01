import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-xl shadow-[var(--shadow-message)] animate-in fade-in-0 slide-in-from-bottom-2 duration-300 backdrop-blur-sm border",
        isUser
          ? "bg-[hsl(var(--chat-user-bg))]/90 text-[hsl(var(--chat-user-fg))] ml-auto max-w-[85%] border-primary/30"
          : "bg-[hsl(var(--chat-ai-bg))]/80 text-[hsl(var(--chat-ai-fg))] mr-auto max-w-[90%] border-border/50"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/20">
            <User className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
          </div>
        ) : (
          <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-[hsl(var(--dragon-gold))]/20 flex items-center justify-center border border-accent/30">
            <Bot className="w-5 h-5 text-accent relative z-10" />
            <div className="absolute inset-0 rounded-full bg-accent/5 animate-pulse" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
};
