import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import scalesTexture from "@/assets/dragon-scales-texture.jpg";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 p-5 rounded-xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500 backdrop-blur-md border-2 relative overflow-hidden",
        isUser
          ? "bg-[hsl(var(--chat-user-bg))]/60 text-[hsl(var(--chat-user-fg))] ml-auto max-w-[85%] border-[hsl(var(--dragon-rune))]/40"
          : "bg-[hsl(var(--chat-ai-bg))]/70 text-[hsl(var(--chat-ai-fg))] mr-auto max-w-[90%] border-[hsl(var(--dragon-gold))]/30"
      )}
      style={{
        boxShadow: isUser 
          ? '0 4px 20px hsl(0 0% 0% / 0.4), 0 0 30px -10px hsl(var(--dragon-rune) / 0.3), inset 0 1px 2px hsl(var(--dragon-rune) / 0.1)'
          : '0 4px 20px hsl(0 0% 0% / 0.5), 0 0 30px -10px hsl(var(--dragon-gold) / 0.2), inset 0 1px 2px hsl(var(--dragon-gold) / 0.15)',
        backgroundImage: `url(${scalesTexture})`,
        backgroundSize: '100px 100px',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dragon scale texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" />
      
      <div className="flex-shrink-0 mt-1 relative z-10">
        {isUser ? (
          <div className="relative w-10 h-10 rounded-full border-2 border-[hsl(var(--dragon-rune))]/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--dragon-rune))]/30 to-[hsl(var(--dragon-scale))]/30" />
            <User className="w-5 h-5 relative z-10" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--dragon-rune)))' }} />
            <div className="absolute inset-0 bg-[hsl(var(--dragon-rune))]/10 animate-pulse" />
          </div>
        ) : (
          <div className="relative w-10 h-10 rounded-full border-2 border-[hsl(var(--dragon-gold))]/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--dragon-fire))]/20 to-[hsl(var(--dragon-gold))]/30" />
            <Bot className="w-5 h-5 text-[hsl(var(--dragon-gold))] relative z-10" style={{ filter: 'drop-shadow(0 0 6px hsl(var(--dragon-fire)))' }} />
            <div className="absolute inset-0 bg-[hsl(var(--dragon-fire))]/10 animate-pulse" style={{ animationDuration: '2s' }} />
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-base leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
      
      {/* Bottom accent glow */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px] opacity-50",
          isUser 
            ? "bg-gradient-to-r from-transparent via-[hsl(var(--dragon-rune))] to-transparent"
            : "bg-gradient-to-r from-transparent via-[hsl(var(--dragon-gold))] to-transparent"
        )}
      />
    </div>
  );
};
