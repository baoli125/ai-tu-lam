import { useEffect, useRef } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { usePolicyChat } from "@/hooks/usePolicyChat";
import { FileText, Shield, Flame, Sparkles } from "lucide-react";
import dragonBg from "@/assets/dragon-kingdom-bg.jpg";
import dragonCrest from "@/assets/dragon-crest.png";
import scalesTexture from "@/assets/dragon-scales-texture.jpg";

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Epic Dragon Background with Multiple Layers */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${dragonBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95" />
      
      {/* Floating Ember Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `-10px`,
              animation: `ember-float ${8 + Math.random() * 6}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 10px hsl(var(--dragon-fire))',
            }}
          />
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header with Dragon Crest */}
        <header className="sticky top-0 z-20 border-b border-border/50 backdrop-blur-xl relative overflow-hidden">
          {/* Dragon scales texture overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{ 
              backgroundImage: `url(${scalesTexture})`,
              backgroundSize: '150px 150px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gradient-header))]" />
          
          <div className="container mx-auto px-4 py-4 relative">
            <div className="flex items-center gap-4">
              {/* Dragon Crest Emblem */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <img 
                  src={dragonCrest} 
                  alt="Dragon Crest" 
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_hsl(var(--dragon-gold)_/_0.6)]"
                  style={{ 
                    filter: 'drop-shadow(0 0 10px hsl(var(--dragon-fire) / 0.5))',
                    animation: 'rune-pulse 3s ease-in-out infinite'
                  }}
                />
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-[hsl(var(--dragon-gold))]" style={{ animationDuration: '3s' }} />
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--dragon-gold))] via-foreground to-[hsl(var(--dragon-gold))] bg-clip-text text-transparent">
                  ⚔️ Trợ lý Chính sách CIRT ⚔️
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[hsl(var(--dragon-rune))]" />
                  Tri thức cổ xưa về Ứng phó Sự cố Máy tính
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--dragon-gold))] to-transparent opacity-60" />
        </header>

        {/* Chat Area */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
          <div className="flex flex-col gap-6 pb-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                {/* Mystical Welcome Icon */}
                <div className="relative w-28 h-28 mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[hsl(var(--dragon-rune))]/20 via-[hsl(var(--dragon-gold))]/20 to-[hsl(var(--dragon-fire))]/20 animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-4 border-[hsl(var(--dragon-gold))]/30 animate-spin" style={{ animationDuration: '8s' }} />
                  <div className="absolute inset-4 rounded-full border-2 border-[hsl(var(--dragon-rune))]/40 animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-[hsl(var(--dragon-gold))]" style={{ filter: 'drop-shadow(0 0 15px hsl(var(--dragon-gold)))' }} />
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--dragon-rune))] via-[hsl(var(--dragon-gold))] to-[hsl(var(--dragon-fire))] bg-clip-text text-transparent" style={{ animation: 'rune-pulse 4s ease-in-out infinite' }}>
                  🐉 Chào mừng, Chiến binh 🐉
                </h2>
                
                <p className="text-foreground/80 max-w-md mb-8 text-lg leading-relaxed">
                  Ta là người giữ gìn tri thức về <span className="text-[hsl(var(--dragon-gold))] font-semibold">Nhóm Ứng phó Sự cố Máy tính</span> của <span className="text-[hsl(var(--dragon-rune))] font-semibold">Ngân hàng Tín dụng ABC</span>. Hãy hỏi ta điều ngươi muốn biết...
                </p>
                
                {/* Ancient Quest Cards */}
                <div className="grid gap-4 w-full max-w-lg">
                  {[
                    { q: "6 bước trong quy trình ứng phó sự cố là gì?", icon: "📜" },
                    { q: "Vai trò của CIRT là gì?", icon: "⚔️" },
                    { q: "Phạm vi áp dụng của chính sách?", icon: "🛡️" }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(item.q)}
                      className="group relative p-5 text-left bg-card/40 backdrop-blur-md border-2 border-border/40 hover:border-[hsl(var(--dragon-gold))]/60 rounded-xl transition-all duration-500 overflow-hidden"
                      style={{
                        boxShadow: '0 4px 20px hsl(0 0% 0% / 0.4), inset 0 1px 2px hsl(var(--dragon-gold) / 0.1)',
                        backgroundImage: `url(${scalesTexture})`,
                        backgroundSize: '120px 120px',
                        backgroundBlendMode: 'overlay'
                      }}
                    >
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--dragon-rune))]/0 via-[hsl(var(--dragon-gold))]/10 to-[hsl(var(--dragon-fire))]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Engraved rune decoration */}
                      <div className="absolute top-2 right-2 text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                        {item.icon}
                      </div>
                      
                      <span className="relative text-base font-medium text-foreground/90 group-hover:text-[hsl(var(--dragon-gold))] transition-colors">
                        {item.q}
                      </span>
                      
                      {/* Bottom accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--dragon-gold))]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, idx) => <ChatMessage key={idx} role={msg.role} content={msg.content} />)
            )}
            
            {isLoading && (
              <div className="flex gap-3 items-center text-muted-foreground text-sm ml-4">
                <span className="text-[hsl(var(--dragon-gold))]">🔮 Triệu hồi tri thức cổ đại</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--dragon-fire))] animate-bounce [animation-delay:-0.3s]" style={{ boxShadow: '0 0 8px hsl(var(--dragon-fire))' }} />
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--dragon-rune))] animate-bounce [animation-delay:-0.15s]" style={{ boxShadow: '0 0 8px hsl(var(--dragon-rune))' }} />
                  <div className="w-2 h-2 rounded-full bg-[hsl(var(--dragon-gold))] animate-bounce" style={{ boxShadow: '0 0 8px hsl(var(--dragon-gold))' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area - Ancient Scroll Style */}
        <footer className="sticky bottom-0 z-20 border-t-2 border-[hsl(var(--dragon-gold))]/30 backdrop-blur-xl relative overflow-hidden">
          {/* Texture overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{ 
              backgroundImage: `url(${scalesTexture})`,
              backgroundSize: '100px 100px'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/95 to-card/80" />
          
          {/* Top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--dragon-gold))] to-transparent opacity-60" />
          
          <div className="container mx-auto px-4 py-5 max-w-4xl relative">
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
