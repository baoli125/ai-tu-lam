import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.77.0';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to get active policy from database
async function getActivePolicy() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  const { data, error } = await supabase
    .from('policy_versions')
    .select('content')
    .eq('is_active', true)
    .single();
  
  if (error) {
    console.error('Error fetching active policy:', error);
    throw new Error('Failed to fetch active policy from database');
  }
  
  if (!data) {
    throw new Error('No active policy found in database');
  }
  
  return data.content;
}

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

    // Fetch active policy from database
    const POLICY_CONTEXT = await getActivePolicy();

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
