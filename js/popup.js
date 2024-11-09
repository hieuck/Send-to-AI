document.addEventListener("DOMContentLoaded", () => {
    const labels = [
        { for: "languageDropdown", message: "languageLabel" },
        { for: "customLanguage", message: "customLanguageLabel" },
        { for: "customPrompt", message: "customPromptLabel" },
        { for: "customChatGPTLink", message: "customChatGPTLinkLabel" },
        { for: "customGeminiLink", message: "customGeminiLinkLabel" },
        { for: "customClaudeLink", message: "customClaudeLinkLabel" },
        { for: "customPOELink", message: "customPOELinkLabel" },
    ];

    // Cập nhật nội dung cho thẻ h1
    document.querySelector('h1').innerText = chrome.i18n.getMessage('extensionName');

    // Cập nhật các nhãn khác bằng forEach
    labels.forEach(label => {
        const element = document.querySelector(`label[for="${label.for}"]`);
        if (element) {
            element.innerText = chrome.i18n.getMessage(label.message);
        } else {
            console.error(`Không tìm thấy label cho: ${label.for}`);
        }
    });

    const saveButton = document.getElementById("saveButton");
    if (saveButton) {
        saveButton.innerText = chrome.i18n.getMessage('saveButton');
    } else {
        console.error("Không tìm thấy nút lưu.");
    }

    // Lấy các phần tử từ HTML
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt");
    const customChatGPTLinkInput = document.getElementById("customChatGPTLink");
    const customGeminiLinkInput = document.getElementById("customGeminiLink");
    const customClaudeLinkInput = document.getElementById("customClaudeLink");
    const customPOELinkInput = document.getElementById("customPOELink");
    const statusMessage = document.getElementById("statusMessage");

    // Tải ngôn ngữ, nội dung tùy chỉnh và custom link đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt", "customChatGPTLink", "customGeminiLink", "customClaudeLink", "customPOELink"], (data) => {
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            updateStatusMessage(`Ngôn ngữ đã chọn: ${data.selectedLanguage}<br>`);
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            updateStatusMessage(`Ngôn ngữ tùy chỉnh: ${data.customLanguage}<br>`);
        }
        if (data.customPrompt) {
            customPromptInput.value = data.customPrompt;
            updateStatusMessage(`Nội dung tùy chỉnh: ${data.customPrompt}<br>`);
        }
        if (data.customChatGPTLink) {
            customChatGPTLinkInput.value = data.customChatGPTLink;
            updateStatusMessage(`Liên kết ChatGPT trả lời (URL): ${data.customChatGPTLink}<br>`);
        }
        if (data.customGeminiLink) {
            customGeminiLinkInput.value = data.customGeminiLink;
            updateStatusMessage(`Liên kết Gemini trả lời (URL): ${data.customGeminiLink}<br>`);
        }
        if (data.customClaudeLink) {
            customClaudeLinkInput.value = data.customClaudeLink;
            updateStatusMessage(`Liên kết Claude trả lời (URL): ${data.customClaudeLink}<br>`);
        }
        if (data.customPOELink) {
            customPOELinkInput.value = data.customPOELink;
            updateStatusMessage(`Liên kết POE trả lời (URL): ${data.customPOELink}<br>`);
        }
    });

    // Cập nhật thông báo trạng thái (gộp các thông báo thành một thông báo duy nhất)
    function updateStatusMessage(message) {
        const newMessage = document.createElement("div");
        newMessage.innerHTML = message;
        statusMessage.appendChild(newMessage); // Thêm thông báo vào container
    }

    let isSaving = false; // Biến để kiểm tra nếu đã nhấn lưu trước đó

    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
        if (isSaving) return; // Nếu đã nhấn lưu, không thực hiện lại
        isSaving = true; // Đánh dấu là đã nhấn lưu

        const selectedLanguage = languageDropdown.value;
        const customLanguage = customLanguageInput.value;
        const customPrompt = customPromptInput.value;
        const customChatGPTLink = customChatGPTLinkInput.value;
        const customGeminiLink = customGeminiLinkInput.value;
        const customClaudeLink = customClaudeLinkInput.value;
        const customPOELink = customPOELinkInput.value;

        // Lưu ngôn ngữ, nội dung tùy chỉnh và custom link vào chrome.storage
        chrome.storage.local.set({
            selectedLanguage,
            customLanguage,
            customPrompt,
            customChatGPTLink,
            customGeminiLink,
            customClaudeLink,
            customPOELink
        }, () => {
            // Xóa các thông báo cũ trước khi thêm mới
            statusMessage.innerHTML = '';

            // Gộp các thông báo lại với nhau thành một thông báo duy nhất
            const allMessages = `
                Ngôn ngữ đã chọn: ${selectedLanguage}<br><br>
                Ngôn ngữ đã lưu: ${selectedLanguage}<br><br>
                Nội dung tùy chỉnh đã lưu: ${customPrompt}<br><br>
                Liên kết ChatGPT đã lưu: ${customChatGPTLink}<br><br>
                Liên kết Gemini đã lưu: ${customGeminiLink}<br><br>
                Liên kết Claude đã lưu: ${customClaudeLink}<br><br>
                Liên kết POE đã lưu: ${customPOELink}<br><br>
            `;

            // Hiển thị thông báo gộp
            showToast("Cài đặt đã được lưu!");
            updateStatusMessage(allMessages);

            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });

            isSaving = false; // Reset lại trạng thái sau khi lưu xong
        });
    });

    // Hàm để hiển thị thông báo toast
    function showToast(message) {
        // Kiểm tra xem có thông báo nào hiện tại hay không
        const existingToast = document.querySelector(".toast");
        if (existingToast) {
            existingToast.remove(); // Nếu có, loại bỏ thông báo cũ
        }

        // Tạo thông báo mới
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerText = message;
        document.body.appendChild(toast);

        // Loại bỏ toast sau 3 giây
        setTimeout(() => toast.remove(), 3000);
    }

    // Hàm để tự động nhận diện và áp dụng chế độ sáng/tối của hệ thống, chỉ khi người dùng chọn "tự động"
    function checkAndSetTheme() {
        // Kiểm tra xem người dùng có chọn chế độ tự động không
        const themeMode = document.getElementById("themeDropdown").value;

        if (themeMode === "auto") {
            // Nếu chọn chế độ tự động, kiểm tra chế độ sáng/tối của hệ thống
            const currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', currentTheme); // Gán data-theme cho body
        }
    }

    // Kiểm tra chế độ hiện tại của hệ thống khi tải trang
    checkAndSetTheme();

    // Theo dõi thay đổi chế độ của hệ thống và chỉ cập nhật khi người dùng chọn "auto"
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkAndSetTheme);

    // Lắng nghe thay đổi giao diện từ dropdown
    document.getElementById("themeDropdown").addEventListener("change", (event) => {
        const selectedTheme = event.target.value;
        localStorage.setItem("theme", selectedTheme);

        // Nếu người dùng chọn chế độ sáng/tối thủ công, áp dụng theme đã chọn
        if (selectedTheme !== "auto") {
            document.body.setAttribute("data-theme", selectedTheme);
        } else {
            // Nếu chọn "auto", tự động áp dụng theo chế độ hệ thống
            checkAndSetTheme();
        }
    });

    // Lấy giá trị theme đã lưu và áp dụng
    const savedTheme = localStorage.getItem("theme") || "light";
    document.getElementById("themeDropdown").value = savedTheme;

    if (savedTheme !== "auto") {
        document.body.setAttribute("data-theme", savedTheme);
    } else {
        checkAndSetTheme();
    }
});
