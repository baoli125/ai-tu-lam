import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

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
    <div className="flex gap-2 items-end">
      <div className="relative flex-1">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Đặt câu hỏi về chính sách CIRT..."
          disabled={disabled}
          className="min-h-[60px] max-h-[200px] resize-none bg-background/60 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:shadow-[0_0_20px_hsl(var(--primary)_/_0.2)] transition-all duration-300"
          rows={2}
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        size="icon"
        className="h-[60px] w-[60px] flex-shrink-0 bg-gradient-to-br from-primary via-accent to-[hsl(var(--dragon-gold))] hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
        <Send className="w-5 h-5 relative z-10" />
      </Button>
    </div>
  );
};
