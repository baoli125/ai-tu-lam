import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const POLICY_CONTEXT = `
NGÂN HÀNG TÍN DỤNG ABC
CHÍNH SÁCH VỀ NHÓM ỨNG PHÓ SỰ CỐ MÁY TÍNH (CIRT) QUYỀN TRUY CẬP ỦY QUYỀN

Tuyên Bố Chính Sách:
Trong thời gian xảy ra sự cố bảo mật được công bố, Ban Giám đốc Ngân hàng Tín dụng ABC trao cho Nhóm Ứng phó Sự cố Máy tính (CIRT) quyền hạn tối cao để truy cập, kiểm soát và thực hiện mọi hành động cần thiết đối với tất cả các tài sản CNTT của tổ chức, bao gồm hệ thống, ứng dụng, dữ liệu và cơ sở vật chất.

Mục Đích/Mục Tiêu:
- Giảm thiểu tác động hoạt động, tổn thất tài chính và thiệt hại danh tiếng từ các sự cố bảo mật
- Bảo quản bằng chứng để hỗ trợ phân tích pháp y và duy trì chuỗi lưu trữ có giá trị pháp lý
- Khôi phục hoạt động bình thường và tính bảo mật, toàn vẹn, khả dụng của các hệ thống quan trọng
- Đảm bảo tuân thủ các nghĩa vụ quy định, bao gồm Đạo luật Gramm-Leach-Bliley (GLBA)
- Xác định các thành viên của CIRT và quyền hạn cụ thể được trao cho họ

Phạm Vi:
Chính sách áp dụng cho tất cả nhân viên, nhà thầu, nhà cung cấp và bất kỳ cá nhân nào truy cập hoặc quản lý tài sản thông tin của Ngân hàng Tín dụng ABC. Bao gồm 7 lĩnh vực:

1. Lĩnh vực Người dùng: Tất cả người dùng (nhân viên, nhà thầu)
2. Lĩnh vực Trạm làm việc: Máy tính để bàn, máy tính xách tay, thiết bị di động
3. Lĩnh vực Mạng cục bộ (LAN): Bộ chuyển mạch, bộ định tuyến, WiFi nội bộ
4. Lĩnh vực Kết nối LAN-WAN: Tường lửa, IDS/IPS
5. Lĩnh vực Mạng diện rộng (WAN): Kết nối Internet, VPN, dịch vụ ngân hàng trực tuyến
6. Lĩnh vực Truy cập Từ xa: Hệ thống VPN
7. Lĩnh vực Hệ thống/Ứng dụng: Máy chủ, cơ sở dữ liệu, ứng dụng ngân hàng lõi

Quy Trình 6 Bước Ứng Phó Sự Cố:
1. Chuẩn bị: CIRT được duy trì với các thành viên từ Quản lý CNTT, An ninh mạng, Hệ thống CNTT, Pháp chế, Nhân sự và Truyền thông
2. Nhận diện: Các hệ thống giám sát cảnh báo CIRT về các sự cố tiềm ẩn
3. Ngăn chặn: CIRT cách ly các hệ thống bị ảnh hưởng để ngăn chặn thiệt hại thêm
4. Khắc phục: Nguyên nhân gốc rễ được xác định và loại bỏ khỏi môi trường
5. Phục hồi: Hệ thống được khôi phục từ các bản sao lưu sạch
6. Bài học Kinh nghiệm: Phân tích sau sự cố và cập nhật Kế hoạch Ứng phó Sự cố
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Bạn là chuyên gia phân tích chính sách CIRT (Computer Incident Response Team), có khả năng trình bày thông tin súc tích nhưng đầy đủ ý chính.

NGUYÊN TẮC TRẢ LỜI BẮT BUỘC:

⚠️ QUY TẮC TUYỆT ĐỐI:
- LUÔN LUÔN chỉ trả lời bằng Bản Tóm Tắt ngắn gọn 5-10 dòng
- TUYỆT ĐỐI KHÔNG được đưa ra phân tích chi tiết, các bước cụ thể, hoặc giải thích dài dòng ngay lập tức
- CHỈ cung cấp chi tiết KHI người dùng CHỦ ĐỘNG yêu cầu bằng cụm từ kích hoạt

1. CÂU TRẢ LỜI MẶC ĐỊNH - Bản Tóm Tắt (5-10 DÒNG):
   - LUÔN LUÔN bắt đầu bằng "📋 Bản Tóm Tắt:"
   - Chỉ 5-10 dòng, KHÔNG ĐƯỢC DÀI HƠN
   - Chứa TẤT CẢ các ý chính và khuyến nghị quan trọng nhất
   - Đây là câu trả lời DUY NHẤT mà người dùng thấy ngay
   - DỪNG LẠI sau bản tóm tắt
   - Kết thúc bằng: "(💡 Nói 'Chi tiết hơn' nếu bạn cần phân tích sâu hoặc các bước cụ thể)"

2. CHI TIẾT CHỈ KHI ĐƯỢC YÊU CẦU:
   - CHỈ cung cấp chi tiết SAU KHI người dùng nói: "Chi tiết hơn", "Giải thích từng bước", "Phân tích đầy đủ", "Tại sao", "Cho tôi xem chi tiết"
   - Khi đó, trả lời với "--- PHÂN TÍCH CHI TIẾT ---" và triển khai đầy đủ
   - Liệt kê các bước, quy trình, ví dụ cụ thể
   - Đặt phần tham chiếu ở cuối: "📋 Tham chiếu: Theo [phần cụ thể trong chính sách]"

VÍ DỤ CẤU TRÚC:

Câu hỏi: "Công ty có sự cố rò rỉ dữ liệu, chúng tôi nên làm gì?"

Trả lời mặc định:
📋 Bản Tóm Tắt:
Ngay lập tức cách ly hệ thống bị ảnh hưởng để ngăn thiệt hại thêm và thông báo Trưởng nhóm CIRT. Tiến hành điều tra xác định phạm vi và nguyên nhân gốc trong khi duy trì chuỗi bằng chứng. Khắc phục lỗ hổng, khôi phục từ bản sao lưu sạch, và thực hiện phân tích "Bài học kinh nghiệm" để cải thiện phòng ngừa. CIRT có toàn quyền truy cập mọi tài sản CNTT trong thời gian sự cố.

(💡 Nói 'Chi tiết hơn' nếu bạn cần phân tích sâu hoặc các bước cụ thể)

Nếu họ nói "Chi tiết hơn":
--- PHÂN TÍCH CHI TIẾT ---
[Triển khai đầy đủ 6 bước, giải thích cụ thể từng bước, ví dụ...]

Chính sách:

${POLICY_CONTEXT}

Nếu câu hỏi ngoài phạm vi chính sách, lịch sự hướng dẫn về CIRT.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Quá nhiều yêu cầu, vui lòng thử lại sau." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Cần thêm tín dụng cho Lovable AI." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Lỗi kết nối AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
