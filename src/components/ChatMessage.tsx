import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const parseMarkdownBold = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

const parseContent = (content: string) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let bulletItems: string[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('* ')) {
      bulletItems.push(trimmedLine.slice(2));
    } else {
      if (bulletItems.length > 0) {
        elements.push(
          <ul key={`ul-${index}`} className="list-disc list-inside space-y-1 my-2">
            {bulletItems.map((item, i) => (
              <li key={i}>{parseMarkdownBold(item)}</li>
            ))}
          </ul>
        );
        bulletItems = [];
      }
      
      if (trimmedLine || index === 0) {
        elements.push(
          <span key={`line-${index}`}>
            {parseMarkdownBold(line)}
            {index < lines.length - 1 && '\n'}
          </span>
        );
      }
    }
  });
  
  if (bulletItems.length > 0) {
    elements.push(
      <ul key="ul-end" className="list-disc list-inside space-y-1 my-2">
        {bulletItems.map((item, i) => (
          <li key={i}>{parseMarkdownBold(item)}</li>
        ))}
      </ul>
    );
  }
  
  return elements;
};

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg shadow-[var(--shadow-message)] animate-in fade-in-0 slide-in-from-bottom-2 duration-300",
        isUser
          ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-fg))] ml-auto max-w-[85%]"
          : "bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-fg))] mr-auto max-w-[90%] border border-border"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-accent" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {parseContent(content)}
        </div>
      </div>
    </div>
  );
};
