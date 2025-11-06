-- Create function to update timestamps (if not exists)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for policy versions
CREATE TABLE public.policy_versions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  version_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.policy_versions ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view policy versions"
ON public.policy_versions
FOR SELECT
USING (true);

-- Create policy for authenticated users to insert
CREATE POLICY "Authenticated users can insert policy versions"
ON public.policy_versions
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy for authenticated users to update
CREATE POLICY "Authenticated users can update policy versions"
ON public.policy_versions
FOR UPDATE
TO authenticated
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_policy_versions_updated_at
BEFORE UPDATE ON public.policy_versions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups of active policy
CREATE INDEX idx_policy_versions_active ON public.policy_versions(is_active) WHERE is_active = true;

-- Insert the current policy as version 1.0
INSERT INTO public.policy_versions (version_name, content, is_active, description)
VALUES (
  'v1.0 - Original CIRT Policy',
  'Lab 8 - Nhóm 10
Thành viên:
- Nguyễn Tiến Thảo - SE180588
- Nguyễn Hồng Quang - SE180641
Phần 1:
Quy trình xử lý sự cố tại công ty TNHH Công Nghệ TechCorp được thiết kế để đảm bảo rằng mọi sự cố bảo mật được phát hiện, phản ứng và khắc phục một cách nhanh chóng và hiệu quả. Quy trình này không chỉ giúp giảm thiểu tác động của các sự cố mà còn đảm bảo rằng các biện pháp phòng ngừa được triển khai để ngăn chặn các sự cố tương tự trong tương lai.

1. Phát hiện và Báo cáo Sự cố
Quy trình bắt đầu khi một sự cố bảo mật được phát hiện. Sự cố có thể được phát hiện thông qua các hệ thống giám sát tự động, báo cáo từ nhân viên, hoặc thông báo từ các bên thứ ba. Ngay khi sự cố được phát hiện, nhân viên phát hiện phải báo cáo ngay lập tức cho Nhóm Ứng phó Sự cố Máy tính (CIRT) qua các kênh liên lạc đã được thiết lập, như email khẩn cấp, điện thoại, hoặc hệ thống báo cáo sự cố nội bộ.

2. Phân loại và Ưu tiên
Sau khi nhận được báo cáo, CIRT sẽ tiến hành phân loại sự cố dựa trên các tiêu chí như mức độ nghiêm trọng, phạm vi ảnh hưởng, và loại sự cố. Sự cố được chia thành các mức độ ưu tiên khác nhau:
- Mức độ cao: Sự cố gây gián đoạn nghiêm trọng đến hoạt động kinh doanh hoặc có nguy cơ rò rỉ dữ liệu quan trọng.
- Mức độ trung bình: Sự cố ảnh hưởng đến một phần hệ thống hoặc dữ liệu nhưng không gây gián đoạn toàn diện.
- Mức độ thấp: Sự cố nhỏ, ảnh hưởng hạn chế, và có thể được giải quyết mà không cần can thiệp khẩn cấp.

3. Phản ứng và Kiểm soát
Dựa trên mức độ ưu tiên, CIRT sẽ triển khai các biện pháp phản ứng phù hợp. Đối với sự cố mức độ cao, các biện pháp khẩn cấp như cách ly hệ thống bị nhiễm, ngắt kết nối mạng, hoặc tạm dừng các dịch vụ bị ảnh hưởng sẽ được thực hiện ngay lập tức. Đối với sự cố mức độ trung bình và thấp, CIRT sẽ thực hiện các bước phân tích chi tiết để xác định nguyên nhân gốc rễ và triển khai các biện pháp khắc phục phù hợp.

4. Điều tra và Phân tích
Sau khi sự cố được kiểm soát, CIRT sẽ tiến hành điều tra chi tiết để xác định nguyên nhân gốc rễ của sự cố. Quá trình này bao gồm thu thập bằng chứng, phân tích log hệ thống, và xem xét các hoạt động bất thường. Mục tiêu là hiểu rõ cách thức sự cố xảy ra, ai hoặc cái gì gây ra sự cố, và tác động của nó đến hệ thống.

5. Khắc phục và Phục hồi
Dựa trên kết quả điều tra, CIRT sẽ triển khai các biện pháp khắc phục để loại bỏ nguyên nhân của sự cố và phục hồi hệ thống về trạng thái bình thường. Các biện pháp khắc phục có thể bao gồm cài đặt bản vá bảo mật, thay đổi cấu hình hệ thống, hoặc nâng cấp phần mềm. Sau khi khắc phục, hệ thống sẽ được kiểm tra kỹ lưỡng để đảm bảo rằng sự cố đã được giải quyết hoàn toàn và không còn nguy cơ tái diễn.

6. Báo cáo và Tài liệu hóa
Mọi sự cố phải được tài liệu hóa đầy đủ trong hệ thống quản lý sự cố của công ty. Báo cáo sự cố bao gồm thông tin chi tiết về sự cố, các bước phản ứng đã thực hiện, kết quả điều tra, và các biện pháp khắc phục. Báo cáo này sẽ được lưu trữ để phục vụ cho các mục đích kiểm toán, đánh giá, và học tập từ sự cố.

7. Rút kinh nghiệm và Cải tiến
Sau khi sự cố được giải quyết, CIRT sẽ tổ chức một cuộc họp rút kinh nghiệm (post-incident review) để đánh giá quy trình xử lý sự cố và xác định các cải tiến cần thiết. Mục tiêu là học hỏi từ sự cố và nâng cao khả năng phản ứng của công ty trong tương lai. Các cải tiến có thể bao gồm cập nhật quy trình, đào tạo nhân viên, hoặc triển khai các công nghệ mới.

Phần 2:
Tại công ty TNHH Công Nghệ TechCorp, việc tương tác với Nhóm Ứng phó Sự cố Máy tính (CIRT) là rất quan trọng để đảm bảo rằng mọi sự cố bảo mật được xử lý nhanh chóng và hiệu quả. Dưới đây là hướng dẫn chi tiết về cách tương tác với CIRT trong các tình huống khác nhau:

1. Truy cập CIRT
Nhân viên có thể truy cập CIRT thông qua nhiều kênh khác nhau:
- Email khẩn cấp: cirt@techcorp.com
- Hotline: 1800-CIRT (hoạt động 24/7)
- Hệ thống báo cáo sự cố nội bộ: Truy cập qua cổng thông tin nội bộ của công ty tại https://intranet.techcorp.com/incident-report
- Chat trực tiếp: Sử dụng ứng dụng chat nội bộ của công ty (TechCorp Chat) và chọn kênh "CIRT Support"

2. Báo cáo Sự cố
Khi phát hiện hoặc nghi ngờ có sự cố bảo mật, nhân viên cần báo cáo ngay lập tức cho CIRT. Báo cáo sự cố nên bao gồm các thông tin sau:
- Mô tả chi tiết sự cố: Mô tả rõ ràng về sự cố, bao gồm thời gian phát hiện, các triệu chứng, và tác động hiện tại.
- Thông tin hệ thống: Tên hệ thống, địa chỉ IP, và các thông tin liên quan khác.
- Bằng chứng: Nếu có, đính kèm ảnh chụp màn hình, log hệ thống, hoặc bất kỳ bằng chứng nào liên quan.
- Thông tin liên lạc: Tên, email, và số điện thoại của người báo cáo.

3. Phản ứng ban đầu
Sau khi nhận được báo cáo, CIRT sẽ xác nhận đã nhận được thông tin và cung cấp một mã số sự cố (incident number) để theo dõi. CIRT sẽ hỏi thêm thông tin nếu cần và hướng dẫn nhân viên thực hiện các bước phản ứng ban đầu, chẳng hạn như:
- Cách ly hệ thống: Ngắt kết nối hệ thống khỏi mạng để ngăn chặn sự lây lan.
- Bảo toàn bằng chứng: Không tắt máy hoặc xóa dữ liệu để bảo toàn bằng chứng.
- Thông báo cấp trên: Thông báo cho quản lý trực tiếp về sự cố.

4. Hợp tác với CIRT
Trong quá trình xử lý sự cố, nhân viên cần hợp tác chặt chẽ với CIRT bằng cách:
- Cung cấp thông tin: Trả lời các câu hỏi và cung cấp thông tin bổ sung khi được yêu cầu.
- Thực hiện hướng dẫn: Tuân thủ các hướng dẫn từ CIRT để đảm bảo sự cố được xử lý đúng cách.
- Cập nhật tiến độ: Thông báo cho CIRT về bất kỳ thay đổi nào trong tình hình sự cố.

5. Theo dõi Sự cố
Nhân viên có thể theo dõi tiến độ xử lý sự cố thông qua mã số sự cố đã được cung cấp. CIRT sẽ cập nhật định kỳ về tình hình xử lý sự cố qua email hoặc hệ thống quản lý sự cố nội bộ. Nếu cần thông tin cập nhật, nhân viên có thể liên hệ trực tiếp với CIRT thông qua các kênh đã nêu trên.

6. Sau khi Sự cố được Giải quyết
Sau khi sự cố được giải quyết, CIRT sẽ gửi báo cáo tóm tắt cho nhân viên liên quan, bao gồm:
- Nguyên nhân gốc rễ: Giải thích về nguyên nhân của sự cố.
- Các biện pháp đã thực hiện: Mô tả các bước đã thực hiện để khắc phục sự cố.
- Khuyến nghị: Các biện pháp phòng ngừa để tránh sự cố tương tự trong tương lai.

Nhân viên nên đọc kỹ báo cáo và thực hiện các khuyến nghị của CIRT để cải thiện bảo mật.

7. Đào tạo và Nâng cao Nhận thức
Để nâng cao khả năng phản ứng với sự cố, công ty tổ chức các buổi đào tạo định kỳ về bảo mật thông tin và quy trình xử lý sự cố. Nhân viên nên tham gia các buổi đào tạo này để hiểu rõ hơn về vai trò của mình trong việc bảo vệ hệ thống công ty.

Phần 3:
1. Phạm vi áp dụng của chính sách CIRT
Chính sách này áp dụng cho tất cả nhân viên, nhà thầu, đối tác và bất kỳ bên thứ ba nào có quyền truy cập vào hệ thống thông tin của công ty TNHH Công Nghệ TechCorp. Chính sách CIRT bao gồm tất cả các hệ thống IT, mạng, thiết bị, và dữ liệu thuộc sở hữu hoặc được quản lý bởi công ty. Điều này đảm bảo rằng mọi người đều có trách nhiệm và nghĩa vụ trong việc bảo vệ hệ thống và dữ liệu công ty khỏi các mối đe dọa bảo mật.

2. Các loại sự cố mà CIRT xử lý
CIRT xử lý nhiều loại sự cố bảo mật khác nhau, bao gồm:
- Tấn công mạng: Các cuộc tấn công từ chối dịch vụ (DDoS), tấn công phishing, malware, ransomware, và các hình thức tấn công mạng khác.
- Rò rỉ dữ liệu: Truy cập trái phép vào dữ liệu nhạy cảm hoặc rò rỉ dữ liệu ra ngoài công ty.
- Vi phạm chính sách bảo mật: Các hành vi vi phạm chính sách bảo mật của công ty, như sử dụng mật khẩu yếu, chia sẻ thông tin nhạy cảm không được phép.
- Lỗi hệ thống: Các lỗi kỹ thuật hoặc cấu hình sai dẫn đến lỗ hổng bảo mật.
- Sự cố nội bộ: Các hành vi cố ý hoặc vô ý từ nhân viên nội bộ gây ra sự cố bảo mật.

3. Quyền truy cập vào hệ thống CIRT
Quyền truy cập vào hệ thống CIRT được kiểm soát chặt chẽ để đảm bảo rằng chỉ những người có thẩm quyền mới có thể truy cập vào các thông tin nhạy cảm và công cụ xử lý sự cố. Các thành viên của CIRT được cấp quyền truy cập dựa trên vai trò và trách nhiệm của họ. Quyền truy cập được định kỳ xem xét và cập nhật để đảm bảo tuân thủ chính sách bảo mật của công ty.

4. Tiêu chuẩn bảo mật mà CIRT tuân thủ
CIRT tuân thủ các tiêu chuẩn bảo mật quốc tế và các quy định của ngành, bao gồm:
- ISO/IEC 27001: Tiêu chuẩn quốc tế về quản lý bảo mật thông tin.
- NIST Cybersecurity Framework: Khung làm việc bảo mật mạng của Viện Tiêu chuẩn và Công nghệ Quốc gia Hoa Kỳ.
- GDPR: Quy định bảo vệ dữ liệu chung của Liên minh Châu Âu (nếu công ty xử lý dữ liệu của công dân EU).
- PCI DSS: Tiêu chuẩn bảo mật dữ liệu thẻ thanh toán (nếu công ty xử lý thông tin thẻ thanh toán).

5. Quy trình kiểm toán và đánh giá CIRT
CIRT được kiểm toán và đánh giá định kỳ để đảm bảo hiệu quả hoạt động và tuân thủ chính sách. Các bước bao gồm:
- Kiểm toán nội bộ: Được thực hiện hàng quý để đánh giá quy trình xử lý sự cố và xác định các điểm yếu.
- Kiểm toán bên ngoài: Được thực hiện hàng năm bởi các tổ chức kiểm toán độc lập để đảm bảo tuân thủ các tiêu chuẩn bảo mật quốc tế.
- Đánh giá sau sự cố: Sau mỗi sự cố lớn, CIRT sẽ tiến hành đánh giá để rút kinh nghiệm và cải thiện quy trình.

6. Chính sách về quyền riêng tư và bảo mật dữ liệu
CIRT cam kết bảo vệ quyền riêng tư và bảo mật dữ liệu của nhân viên và khách hàng. Mọi thông tin thu thập trong quá trình xử lý sự cố được sử dụng chỉ cho mục đích điều tra và khắc phục sự cố, và được bảo mật theo các quy định pháp luật hiện hành. Dữ liệu cá nhân chỉ được truy cập bởi những người có thẩm quyền và được lưu trữ an toàn.

7. Chính sách về đào tạo và nâng cao nhận thức
Công ty cam kết đào tạo tất cả nhân viên về bảo mật thông tin và quy trình xử lý sự cố. Các buổi đào tạo được tổ chức định kỳ và bao gồm các chủ đề như:
- Nhận diện các mối đe dọa bảo mật.
- Cách báo cáo sự cố.
- Các biện pháp phòng ngừa sự cố.
- Quy trình xử lý sự cố của CIRT.

8. Chính sách về hợp tác với các bên thứ ba
Khi xử lý sự cố, CIRT có thể cần hợp tác với các bên thứ ba như nhà cung cấp dịch vụ bảo mật, cơ quan thực thi pháp luật, hoặc các đối tác kinh doanh. Mọi hợp tác với bên thứ ba đều tuân thủ các thỏa thuận bảo mật và quy định pháp luật hiện hành để đảm bảo rằng thông tin nhạy cảm được bảo vệ.

9. Chính sách về lưu trữ và xử lý bằng chứng
Bằng chứng thu thập trong quá trình điều tra sự cố được lưu trữ an toàn và xử lý theo các quy định pháp luật. CIRT đảm bảo rằng bằng chứng được bảo toàn để phục vụ cho các mục đích pháp lý và kiểm toán. Bằng chứng chỉ được truy cập bởi những người có thẩm quyền và được lưu trữ trong khoảng thời gian quy định.

10. Chính sách về cập nhật và cải tiến
Chính sách CIRT được định kỳ xem xét và cập nhật để phản ánh các thay đổi trong môi trường bảo mật và công nghệ. Công ty cam kết liên tục cải thiện quy trình xử lý sự cố dựa trên các bài học rút ra từ sự cố và phản hồi từ nhân viên.

Phần 4: 10 câu hỏi và trả lời về chính sách CIRT
1. CIRT là gì và vai trò của nó trong công ty?
CIRT (Computer Incident Response Team) là nhóm ứng phó sự cố máy tính, chịu trách nhiệm phát hiện, phản ứng và khắc phục các sự cố bảo mật trong công ty. Vai trò của CIRT bao gồm giám sát hệ thống, điều tra sự cố, và triển khai các biện pháp phòng ngừa.

2. Làm thế nào để báo cáo một sự cố bảo mật cho CIRT?
Nhân viên có thể báo cáo sự cố thông qua email khẩn cấp (cirt@techcorp.com), hotline (1800-CIRT), hệ thống báo cáo sự cố nội bộ (https://intranet.techcorp.com/incident-report), hoặc chat trực tiếp qua ứng dụng TechCorp Chat.

3. Các loại sự cố nào mà CIRT xử lý?
CIRT xử lý các sự cố như tấn công mạng (DDoS, phishing, malware, ransomware), rò rỉ dữ liệu, vi phạm chính sách bảo mật, lỗi hệ thống, và sự cố nội bộ.

4. Quy trình xử lý sự cố của CIRT bao gồm những bước nào?
Quy trình bao gồm: Phát hiện và báo cáo sự cố, phân loại và ưu tiên, phản ứng và kiểm soát, điều tra và phân tích, khắc phục và phục hồi, báo cáo và tài liệu hóa, và rút kinh nghiệm và cải tiến.

5. Ai có quyền truy cập vào hệ thống CIRT?
Chỉ những người có thẩm quyền, bao gồm các thành viên của CIRT, mới có quyền truy cập vào hệ thống CIRT. Quyền truy cập được kiểm soát chặt chẽ dựa trên vai trò và trách nhiệm.

6. CIRT tuân thủ những tiêu chuẩn bảo mật nào?
CIRT tuân thủ các tiêu chuẩn như ISO/IEC 27001, NIST Cybersecurity Framework, GDPR (nếu áp dụng), và PCI DSS (nếu xử lý thông tin thẻ thanh toán).

7. Làm thế nào để theo dõi tiến độ xử lý sự cố?
Nhân viên có thể theo dõi tiến độ xử lý sự cố thông qua mã số sự cố đã được cung cấp. CIRT sẽ cập nhật định kỳ về tình hình xử lý sự cố qua email hoặc hệ thống quản lý sự cố nội bộ.

8. Chính sách về quyền riêng tư và bảo mật dữ liệu của CIRT là gì?
CIRT cam kết bảo vệ quyền riêng tư và bảo mật dữ liệu. Mọi thông tin thu thập trong quá trình xử lý sự cố chỉ được sử dụng cho mục đích điều tra và khắc phục, và được bảo mật theo quy định pháp luật.

9. Công ty có tổ chức đào tạo về bảo mật thông tin không?
Có, công ty tổ chức các buổi đào tạo định kỳ về bảo mật thông tin và quy trình xử lý sự cố để nâng cao nhận thức và kỹ năng của nhân viên.

10. Làm thế nào để cải tiến quy trình xử lý sự cố?
Sau mỗi sự cố, CIRT tổ chức cuộc họp rút kinh nghiệm để đánh giá quy trình và xác định các cải tiến cần thiết. Chính sách CIRT cũng được định kỳ xem xét và cập nhật để phản ánh các thay đổi trong môi trường bảo mật.',
  true,
  'Phiên bản gốc của CIRT Policy từ Lab 8 Report'
);