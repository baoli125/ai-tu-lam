import { FileText, Shield, Download, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CIRT-Policy.pdf";
    link.download = "CIRT-Policy-ABC-Bank.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card shadow-[var(--shadow-card)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Trợ lý Chính sách CIRT</h1>
              </div>
            </Link>
            <Button asChild variant="ghost">
              <Link to="/">Trở về</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Về Trợ lý CIRT
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trợ lý AI thông minh giúp bạn hiểu và áp dụng chính sách Ứng phó Sự cố Máy tính
            của Ngân hàng Tín dụng ABC
          </p>
        </div>

        {/* Policy Info Card */}
        <Card className="p-6 mb-8 border-primary/20 bg-card">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Chính sách CIRT
                </h2>
                <Badge variant="default">Lab 8</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                <strong>Ngân hàng Tín dụng ABC</strong> - Chính sách về Nhóm Ứng phó Sự cố Máy tính
              </p>
              <Button onClick={handleDownload} className="gap-2">
                <Download className="w-4 h-4" />
                Tải xuống chính sách đầy đủ (PDF)
              </Button>
            </div>
          </div>
        </Card>

        {/* How AI Works */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Cách AI Hoạt động
          </h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Phân tích Ngữ cảnh Thông minh
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    AI được huấn luyện với toàn bộ nội dung chính sách CIRT, hiểu rõ từng phần,
                    từ quyền truy cập ủy quyền đến quy trình ứng phó 6 bước.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Trả lời Có Cấu trúc
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Mỗi câu trả lời được tổ chức theo 2 cấp độ: Tóm tắt ngắn gọn trước,
                    sau đó là phân tích chi tiết với ví dụ cụ thể.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Nhớ Ngữ cảnh Hội thoại
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    AI ghi nhớ toàn bộ cuộc trò chuyện, cho phép bạn đặt câu hỏi tiếp theo
                    hoặc yêu cầu làm rõ mà không cần lặp lại ngữ cảnh.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Powered by Google Gemini 2.5 Flash
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Sử dụng mô hình AI tiên tiến của Google với khả năng xử lý ngôn ngữ tự nhiên
                    và phân tích ngữ cảnh phức tạp.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Policy Coverage */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Phạm vi Chính sách
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border-border">
              <h3 className="font-semibold text-foreground mb-2">Quyền Truy cập</h3>
              <p className="text-sm text-muted-foreground">
                Quyền hạn tối cao của CIRT trong thời gian sự cố
              </p>
            </Card>
            <Card className="p-4 border-border">
              <h3 className="font-semibold text-foreground mb-2">7 Lĩnh vực CNTT</h3>
              <p className="text-sm text-muted-foreground">
                Người dùng, Trạm làm việc, LAN, LAN-WAN, WAN, Remote, System/Application
              </p>
            </Card>
            <Card className="p-4 border-border">
              <h3 className="font-semibold text-foreground mb-2">6 Bước Ứng phó</h3>
              <p className="text-sm text-muted-foreground">
                Chuẩn bị, Phát hiện, Phân tích, Ngăn chặn, Khắc phục, Phục hồi
              </p>
            </Card>
            <Card className="p-4 border-border">
              <h3 className="font-semibold text-foreground mb-2">Tuân thủ</h3>
              <p className="text-sm text-muted-foreground">
                Đạo luật Gramm-Leach-Bliley (GLBA) và các quy định liên quan
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            Bắt đầu khám phá chính sách với trợ lý AI
          </p>
          <Button asChild size="lg">
            <Link to="/">Bắt đầu trò chuyện</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default About;
