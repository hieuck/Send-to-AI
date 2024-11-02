document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt");
    const customChatGPTLinkInput = document.getElementById("customChatGPTLink");
    const customGeminiLinkInput = document.getElementById("customGeminiLink");
    const saveButton = document.getElementById("saveButton");
    const statusMessage = document.createElement("div");
    document.body.appendChild(statusMessage);

    // Tải ngôn ngữ, nội dung tùy chỉnh và custom link đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt", "customChatGPTLink", "customGeminiLink"], (data) => {
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            statusMessage.innerText += `\nNgôn ngữ đã chọn: ${data.selectedLanguage}\n`;
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            statusMessage.innerText += `\nNgôn ngữ tùy chỉnh: ${data.customLanguage}\n`;
        }
        if (data.customPrompt) {
            customPromptInput.value = data.customPrompt;
            statusMessage.innerText += `\nNội dung tùy chỉnh: ${data.customPrompt}\n`;
        }
        if (data.customChatGPTLink) {
            customChatGPTLinkInput.value = data.customChatGPTLink;
            statusMessage.innerText += `\nLiên kết ChatGPT trả lời (URL): ${data.customChatGPTLink}\n`;
        }
        if (data.customGeminiLink) {
            customGeminiLinkInput.value = data.customGeminiLink;
            statusMessage.innerText += `\nLiên kết Gemini trả lời (URL): ${data.customGeminiLink}\n`;
        }
    });

    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
        const selectedLanguage = languageDropdown.value;
        const customLanguage = customLanguageInput.value;
        const customPrompt = customPromptInput.value;
        const customChatGPTLink = customChatGPTLinkInput.value;
        const customGeminiLink = customGeminiLinkInput.value;

        // Lưu ngôn ngữ, nội dung tùy chỉnh và custom link vào chrome.storage
        chrome.storage.local.set({ selectedLanguage, customLanguage, customPrompt, customChatGPTLink, customGeminiLink }, () => {
            alert("Cài đặt đã được lưu!");
            statusMessage.innerText = `\nNgôn ngữ đã lưu: ${selectedLanguage}\n\nNội dung tùy chỉnh: ${customPrompt}\n\nLiên kết ChatGPT trả lời (URL): ${customChatGPTLink}\n\nLiên kết Gemini trả lời (URL): ${customGeminiLink}`;

            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });
        });
    });
});
