import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { usePolicyChat } from "@/hooks/usePolicyChat";
import { FileText, Shield } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
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
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Chào mừng đến với Trợ lý CIRT
              </h2>
              <p className="text-muted-foreground max-w-md mb-6">
                Tôi có thể giúp bạn hiểu và phân tích chính sách về Nhóm Ứng phó Sự cố Máy tính
                của Ngân hàng Tín dụng ABC
              </p>
              <div className="grid gap-2 w-full max-w-md">
                <button
                  onClick={() => sendMessage("6 bước trong quy trình ứng phó sự cố là gì?")}
                  className="p-3 text-left text-sm bg-card hover:bg-secondary border border-border rounded-lg transition-colors"
                >
                  6 bước trong quy trình ứng phó sự cố là gì?
                </button>
                <button
                  onClick={() => sendMessage("Vai trò của CIRT là gì?")}
                  className="p-3 text-left text-sm bg-card hover:bg-secondary border border-border rounded-lg transition-colors"
                >
                  Vai trò của CIRT là gì?
                </button>
                <button
                  onClick={() => sendMessage("Phạm vi áp dụng của chính sách?")}
                  className="p-3 text-left text-sm bg-card hover:bg-secondary border border-border rounded-lg transition-colors"
                >
                  Phạm vi áp dụng của chính sách?
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => <ChatMessage key={idx} role={msg.role} content={msg.content} />)
          )}
          {isLoading && (
            <div className="flex gap-2 items-center text-muted-foreground text-sm ml-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default Index;
