# Send-to-AI Service v0.2.0

Send-to-AI là một tiện ích mở rộng cho trình duyệt Chrome, cho phép bạn gửi văn bản hoặc liên kết đến các nền tảng AI phổ biến như ChatGPT, Gemini, Claude, POE, và DeepSeek. Tiện ích này hỗ trợ các tính năng như viết lại văn bản, dịch ngôn ngữ, và nhiều hơn nữa.

## Changelog
v0.2.0
- Cải thiện menu chuột phải thành 4 cấp
- Thêm nhiều mẫu prompt cho mỗi hành động
- Sửa lỗi không hiển thị ngôn ngữ trong prompt
- Sửa lỗi không inject được văn bản vào một số trang AI

v0.1.1 
- Phiên bản đầu tiên với chức năng cơ bản

## Tính năng chính
![image](https://github.com/user-attachments/assets/b642416d-5c49-4ad8-bdb9-d85d3e08512c)
- **Gửi văn bản hoặc liên kết**: Dễ dàng gửi văn bản được chọn hoặc liên kết đến các nền tảng AI.
- **Viết lại văn bản**: Cải thiện độ rõ ràng và phong cách của văn bản.
- **Dịch văn bản**: Dịch văn bản sang ngôn ngữ bạn chọn.
- **Hỗ trợ nhiều nền tảng AI**:
  - ChatGPT
  - Gemini
  - Claude
  - POE
  - DeepSeek
  - Perplexity

## Tính năng mới

- **Menu phân cấp thông minh**:
  - Cấp 1: Gửi tới AI
  - Cấp 2: Chọn nền tảng AI (ChatGPT, Gemini, Claude,...)
  - Cấp 3: Chọn hành động (Trả lời, Viết lại, Dịch)
  - Cấp 4: Chọn mẫu prompt (Mặc định, Mẫu 1, Mẫu 2, Mẫu 3)

- **Prompts tùy chỉnh**: Mỗi hành động có 4 mẫu prompt khác nhau:
  - Mặc định: Prompt cơ bản
  - Mẫu 1: Phiên bản ngắn gọn
  - Mẫu 2: Phiên bản chi tiết
  - Mẫu 3: Phiên bản nâng cao

## Cách cài đặt

1. Tải xuống mã nguồn từ [GitHub](https://github.com/hieuck/send-to-ai) hoặc sao chép thư mục dự án.
2. Mở trình duyệt Chrome và truy cập `chrome://extensions/`.
3. Bật **Chế độ nhà phát triển** (Developer mode) ở góc trên bên phải.
4. Nhấn **Tải tiện ích đã giải nén** (Load unpacked) và chọn thư mục `src` trong dự án.

## Hướng dẫn sử dụng

1. **Gửi văn bản hoặc liên kết**:
   - Chọn văn bản hoặc nhấp chuột phải vào liên kết.
   - Chọn nền tảng AI từ menu chuột phải (ví dụ: "Gửi đến ChatGPT").
2. **Viết lại văn bản**:
   - Chọn văn bản, nhấp chuột phải, và chọn "Viết lại với [Nền tảng AI]".
3. **Dịch văn bản**:
   - Chọn văn bản, nhấp chuột phải, và chọn "Dịch với [Nền tảng AI]".

## Tùy chỉnh

Bạn có thể tùy chỉnh tiện ích bằng cách:
- **Chọn ngôn ngữ mặc định**: Đặt ngôn ngữ bạn muốn sử dụng cho dịch thuật.
- **Liên kết tùy chỉnh**: Cung cấp URL tùy chỉnh cho các nền tảng AI.

## Cấu trúc thư mục

\Send-to-AI\
│
├── src\
│   ├── js\
│   │   ├── background.js
│   │   └── content.js
│   ├── css\
│   │   └── style.css
│   ├── img\
│   │   └── icon.png
│   ├── _locales\
│   │   └── vi\
│   │       └── messages.json
│   ├── manifest.json
│   ├── options.html
│   └── popup.html
│
└── README.md

## Known Issues
- Một số trang AI có thể thay đổi selector khiến việc inject không hoạt động
- Cần refresh lại trang sau khi thay đổi ngôn ngữ
- Menu chuột phải có thể bị trễ khi hiển thị lần đầu

## Roadmap
- [ ] Thêm tính năng OCR để trích xuất text từ ảnh
- [ ] Hỗ trợ thêm các nền tảng AI mới
- [ ] Cải thiện UX của options page
- [ ] Thêm tính năng import/export cài đặt

## Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng tạo một **Pull Request** hoặc mở một **Issue** trên [GitHub](https://github.com/hieuck/send-to-ai).

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT. Xem tệp `LICENSE` để biết thêm chi tiết.

Nội dung cập nhật:
Giới thiệu tiện ích: Mô tả các tính năng chính của tiện ích.
Hướng dẫn cài đặt: Hướng dẫn chi tiết cách cài đặt tiện ích trong Chrome.
Hướng dẫn sử dụng: Cách sử dụng các tính năng chính như gửi văn bản, viết lại, và dịch.
Tùy chỉnh: Hướng dẫn cách tùy chỉnh ngôn ngữ và liên kết.
Cấu trúc thư mục: Hiển thị cấu trúc thư mục để người dùng dễ dàng tìm kiếm tệp.
Đóng góp và giấy phép: Thông tin về cách đóng góp và giấy phép sử dụng.