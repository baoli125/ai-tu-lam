import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Flame } from "lucide-react";
import scalesTexture from "@/assets/dragon-scales-texture.jpg";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="relative flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="✍️ Khắc lời hỏi của ngươi vào đây..."
          disabled={disabled}
          className="min-h-[70px] max-h-[200px] resize-none bg-background/70 backdrop-blur-md border-2 border-border/50 focus:border-[hsl(var(--dragon-gold))]/70 rounded-xl transition-all duration-300 text-base relative overflow-hidden"
          style={{
            boxShadow: '0 4px 20px hsl(0 0% 0% / 0.3), inset 0 1px 3px hsl(var(--dragon-gold) / 0.1)',
            backgroundImage: `url(${scalesTexture})`,
            backgroundSize: '80px 80px',
            backgroundBlendMode: 'overlay'
          }}
          rows={2}
        />
        {/* Rune decoration corner */}
        <div className="absolute bottom-2 right-2 text-[hsl(var(--dragon-gold))]/20 text-xs pointer-events-none">
          ⚜️
        </div>
      </div>
      
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        size="icon"
        className="h-[70px] w-[70px] flex-shrink-0 rounded-xl border-2 border-[hsl(var(--dragon-gold))]/40 relative overflow-hidden group transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--dragon-rune)), hsl(var(--dragon-fire)), hsl(var(--dragon-gold)))',
          boxShadow: '0 4px 20px hsl(0 0% 0% / 0.5), 0 0 40px -10px hsl(var(--dragon-fire) / 0.6)',
        }}
      >
        {/* Animated fire glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle at center, hsl(var(--dragon-fire) / 0.4), transparent)',
            animation: 'molten-glow 2s ease-in-out infinite'
          }}
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          <Send className="w-6 h-6 text-background" style={{ filter: 'drop-shadow(0 0 4px hsl(var(--dragon-gold)))' }} />
          <Flame className="w-3 h-3 text-[hsl(var(--dragon-fire))] absolute -top-1 -right-1 animate-pulse" />
        </div>
      </Button>
    </div>
  );
};
