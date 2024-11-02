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
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt");
    const customChatGPTLinkInput = document.getElementById("customChatGPTLink");
    const customGeminiLinkInput = document.getElementById("customGeminiLink");
    const customClaudeLinkInput = document.getElementById("customClaudeLink");
    const customPOELinkInput = document.getElementById("customPOELink");
    const statusMessage = document.createElement("div");
    document.body.appendChild(statusMessage);

    // Tải ngôn ngữ, nội dung tùy chỉnh và custom link đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt", "customChatGPTLink", "customGeminiLink", "customClaudeLink", "customPOELink"], (data) => {
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
        if (data.customClaudeLink) {
            customClaudeLinkInput.value = data.customClaudeLink;
            statusMessage.innerText += `\nLiên kết Claude trả lời (URL): ${data.customClaudeLink}\n`;
        }
        if (data.customPOELink) {
            customPOELinkInput.value = data.customPOELink;
            statusMessage.innerText += `\nLiên kết POE trả lời (URL): ${data.customPOELink}\n`;
        }
    });

    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
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
            alert("Cài đặt đã được lưu!");

            statusMessage.innerText = `
                \nNgôn ngữ đã lưu: ${selectedLanguage}\n
                \nNội dung tùy chỉnh: ${customPrompt}\n
                \nLiên kết ChatGPT trả lời (URL): ${customChatGPTLink}\n
                \nLiên kết Gemini trả lời (URL): ${customGeminiLink}\n
                \nLiên kết Claude trả lời (URL): ${customClaudeLink}\n
                \nLiên kết POE trả lời (URL): ${customPOELink}\n
            `;

            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });
        });
    });
});
