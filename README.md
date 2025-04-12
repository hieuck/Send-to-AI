# Send-to-AI Service v0.2.0

Send-to-AI là một tiện ích mở rộng cho trình duyệt Chrome, giúp bạn dễ dàng tương tác với các nền tảng AI phổ biến như ChatGPT, Gemini, Claude, POE, DeepSeek, và Perplexity. Tiện ích này cung cấp các tính năng nổi bật như:

- **Gửi văn bản hoặc liên kết**: Nhanh chóng gửi nội dung được chọn đến các nền tảng AI.
- **Viết lại văn bản**: Cải thiện chất lượng và phong cách của văn bản.
- **Dịch ngôn ngữ**: Dịch văn bản sang ngôn ngữ bạn mong muốn.
- **Menu phân cấp thông minh**: Lựa chọn nền tảng, hành động, và mẫu prompt chỉ với vài thao tác.
- **Prompts tùy chỉnh**: Hỗ trợ nhiều mẫu prompt từ cơ bản đến nâng cao cho từng hành động.
- **Hỗ trợ nhiều nền tảng AI**: Tích hợp với các công cụ AI hàng đầu, bao gồm Perplexity, giúp bạn làm việc hiệu quả hơn.
- **Tùy chỉnh linh hoạt**: Cho phép thay đổi ngôn ngữ mặc định, liên kết nền tảng, và các tùy chọn khác.

Send-to-AI là giải pháp lý tưởng để tối ưu hóa quy trình làm việc của bạn với các công cụ AI hiện đại.

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

- **Menu phân cấp thông minh với biểu tượng**:
  - Cấp 1: 🤖 Gửi tới AI
  - Cấp 2: Chọn nền tảng AI
    - 🤖 ChatGPT
    - 🌟 Gemini 
    - 🎭 Claude
    - 📚 POE
    - 🔍 DeepSeek
    - 💡 Perplexity
  - Cấp 3: Chọn hành động
    - ❓ Trả lời
    - ✏️ Viết lại
    - 🌐 Dịch
  - Cấp 4: Chọn kiểu prompt
    - ⚡ Phiên bản nhanh 
    - 📝 Phiên bản ngắn gọn
    - 📋 Phiên bản chi tiết
    - 📚 Phiên bản nâng cao
    - ⭐ Phiên bản tùy chỉnh

- **Prompts tùy chỉnh**: Tích hợp trực tiếp vào menu hành động:
  - Trả lời với Prompt tùy chỉnh
  - Viết lại với Prompt tùy chỉnh
  - Mỗi loại prompt có biểu tượng riêng để dễ phân biệt

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

```
\Send-to-AI\
│
├── src\
│   ├── js\
│   │   ├── background.js       # Xử lý logic nền của tiện ích
│   │   ├── content.js          # Inject script vào các trang web
│   │   ├── menu.js             # Xử lý logic menu chuột phải
│   │   └── utils.js            # Các hàm tiện ích dùng chung
│   ├── css\
│   │   ├── style.css           # Định dạng giao diện của tiện ích
│   │   └── theme.css           # Định dạng theme tùy chỉnh
│   ├── img\
│   │   ├── icon.png            # Biểu tượng của tiện ích
│   │   └── banner.png          # Hình ảnh banner cho trang cài đặt
│   ├── _locales\
│   │   ├── en\
│   │   │   └── messages.json   # Tệp ngôn ngữ tiếng Anh
│   │   └── vi\
│   │       └── messages.json   # Tệp ngôn ngữ tiếng Việt
│   ├── manifest.json           # Tệp cấu hình chính của tiện ích
│   ├── options.html            # Trang cài đặt tùy chọn
│   ├── popup.html              # Giao diện popup của tiện ích
│   └── service-worker.js       # Service worker để xử lý các tác vụ nền
│
└── README.md                   # Tài liệu hướng dẫn sử dụng
```

## Known Issues
- Một số trang AI có thể thay đổi selector khiến việc inject không hoạt động:
  - ChatGPT: Thay đổi định kỳ cấu trúc UI
  - Claude: Cập nhật lớn có thể thay đổi cấu trúc button
  - Perplexity: Thường xuyên cập nhật giao diện chat
- Cần refresh lại trang sau khi thay đổi ngôn ngữ hoặc URL tùy chỉnh
- Menu chuột phải có thể bị trễ khi hiển thị lần đầu
- Một số trang web chặn việc inject script tự động

## Roadmap
- [ ] Tính năng OCR và xử lý ảnh:
  - Trích xuất text từ ảnh
  - Hỗ trợ screenshot và crop
  - Nhận diện bảng và biểu đồ
- [ ] Hỗ trợ thêm các nền tảng AI:
  - Anthropic Claude 3
  - Microsoft Copilot
  - Inflection Pi
  - Character.AI
  - Phind
- [ ] Cải thiện UX/UI:
  - Giao diện options page mới
  - Dark mode
  - Tùy chỉnh theme
  - Phím tắt tùy chỉnh
  - Quản lý prompt theo folder
- [ ] Tính năng nâng cao:
  - Import/export cài đặt và prompt
  - Đồng bộ hóa cross-device
  - Lịch sử truy vấn
  - Bookmark prompt hay dùng
  - API tích hợp cho các nền tảng AI
  - Hỗ trợ voice input/output
  - Chế độ offline với mô hình local
  - Tự động cập nhật selector

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