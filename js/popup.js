document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt");
    const customLinkInput = document.getElementById("customLink");
    const saveButton = document.getElementById("saveButton");
    const statusMessage = document.createElement("div");
    document.body.appendChild(statusMessage);

    // Tải ngôn ngữ, nội dung tùy chỉnh và custom link đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt", "customLink"], (data) => {
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            statusMessage.innerText += `Ngôn ngữ đã chọn: ${data.selectedLanguage}\n`;
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            statusMessage.innerText += `Ngôn ngữ tùy chỉnh: ${data.customLanguage}\n`;
        }
        if (data.customPrompt) {
            customPromptInput.value = data.customPrompt;
            statusMessage.innerText += `Nội dung tùy chỉnh: ${data.customPrompt}\n`;
        }
        if (data.customLink) {
            customLinkInput.value = data.customLink;
            statusMessage.innerText += `Liên kết trả lời (URL): ${data.customLink}\n`;
        }
    });

    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
        const selectedLanguage = languageDropdown.value;
        const customLanguage = customLanguageInput.value;
        const customPrompt = customPromptInput.value;
        const customLink = customLinkInput.value;

        // Lưu ngôn ngữ, nội dung tùy chỉnh và custom link vào chrome.storage
        chrome.storage.local.set({ selectedLanguage, customLanguage, customPrompt, customLink }, () => {
            alert("Cài đặt đã được lưu!");
            statusMessage.innerText = `Ngôn ngữ đã lưu: ${selectedLanguage}\nNội dung tùy chỉnh: ${customPrompt}\nLiên kết trả lời (URL): ${customLink}`;

            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });
        });
    });
});
