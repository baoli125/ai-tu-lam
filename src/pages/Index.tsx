import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { usePolicyChat } from "@/hooks/usePolicyChat";
import { FileText, Shield, Flame } from "lucide-react";
import dragonBg from "@/assets/dragon-bg.jpg";

const Index = () => {
  const { messages, isLoading, sendMessage } = usePolicyChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Dragon Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-30"
        style={{ backgroundImage: `url(${dragonBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95 backdrop-blur-[2px]" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border/50 bg-card/80 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-[hsl(var(--dragon-gold))] flex items-center justify-center shadow-[var(--shadow-glow)] animate-pulse">
                <Shield className="w-6 h-6 text-primary-foreground relative z-10" />
                <Flame className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-bounce" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Trợ lý Chính sách CIRT</h1>
                <p className="text-sm text-muted-foreground">
                  Hỏi đáp về chính sách Ứng phó Sự cố Máy tính
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex flex-col gap-4 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-[hsl(var(--dragon-gold))]/20 flex items-center justify-center mb-4 shadow-[var(--shadow-glow)]">
                  <FileText className="w-10 h-10 text-primary animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-[hsl(var(--dragon-gold))] bg-clip-text text-transparent mb-2">
                  Chào mừng đến với Trợ lý CIRT
                </h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Tôi có thể giúp bạn hiểu và phân tích chính sách về Nhóm Ứng phó Sự cố Máy tính
                  của Ngân hàng Tín dụng ABC
                </p>
                <div className="grid gap-3 w-full max-w-md">
                  <button
                    onClick={() => sendMessage("6 bước trong quy trình ứng phó sự cố là gì?")}
                    className="group relative p-4 text-left text-sm bg-card/60 backdrop-blur-sm hover:bg-card border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-message)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">6 bước trong quy trình ứng phó sự cố là gì?</span>
                  </button>
                  <button
                    onClick={() => sendMessage("Vai trò của CIRT là gì?")}
                    className="group relative p-4 text-left text-sm bg-card/60 backdrop-blur-sm hover:bg-card border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-message)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Vai trò của CIRT là gì?</span>
                  </button>
                  <button
                    onClick={() => sendMessage("Phạm vi áp dụng của chính sách?")}
                    className="group relative p-4 text-left text-sm bg-card/60 backdrop-blur-sm hover:bg-card border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-message)] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Phạm vi áp dụng của chính sách?</span>
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => <ChatMessage key={idx} role={msg.role} content={msg.content} />)
            )}
            {isLoading && (
              <div className="flex gap-2 items-center text-muted-foreground text-sm ml-4">
                <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:-0.3s] shadow-[0_0_8px_hsl(var(--accent))]" />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s] shadow-[0_0_8px_hsl(var(--primary))]" />
                <div className="w-2 h-2 rounded-full bg-[hsl(var(--dragon-gold))] animate-bounce shadow-[0_0_8px_hsl(var(--dragon-gold))]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <footer className="sticky bottom-0 z-20 border-t border-border/50 bg-card/80 backdrop-blur-xl shadow-[0_-4px_16px_hsl(0_0%_0%_/_0.1)]">
          <div className="container mx-auto px-4 py-4 max-w-4xl">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
