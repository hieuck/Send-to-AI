document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("languageDropdown");
    const customLanguageInput = document.getElementById("customLanguage");
    const customPromptInput = document.getElementById("customPrompt"); // Thêm dòng này
    const saveButton = document.getElementById("saveButton");
    const statusMessage = document.createElement("div");
    document.body.appendChild(statusMessage);
  
    // Tải ngôn ngữ và nội dung tùy chỉnh đã lưu
    chrome.storage.local.get(["selectedLanguage", "customLanguage", "customPrompt"], (data) => {
        if (data.selectedLanguage) {
            languageDropdown.value = data.selectedLanguage;
            statusMessage.innerText += `Ngôn ngữ đã chọn: ${data.selectedLanguage}\n`;
        }
        if (data.customLanguage) {
            customLanguageInput.value = data.customLanguage;
            statusMessage.innerText += `Ngôn ngữ tùy chỉnh: ${data.customLanguage}\n`;
        }
        if (data.customPrompt) { // Thêm dòng này để tải customPrompt
            customPromptInput.value = data.customPrompt;
            statusMessage.innerText += `Nội dung tùy chỉnh: ${data.customPrompt}\n`;
        }
    });
  
    // Xử lý sự kiện lưu
    saveButton.addEventListener("click", () => {
        const selectedLanguage = languageDropdown.value;
        const customLanguage = customLanguageInput.value;
        const customPrompt = customPromptInput.value; // Thêm dòng này
  
        // Lưu ngôn ngữ đã chọn, ngôn ngữ tùy chỉnh và nội dung tùy chỉnh vào chrome.storage
        chrome.storage.local.set({ selectedLanguage, customLanguage, customPrompt }, () => {
            alert("Cài đặt đã được lưu!");
            statusMessage.innerText = `Ngôn ngữ đã lưu: ${selectedLanguage}`;
  
            // Gửi thông báo đến background để cập nhật menu
            chrome.runtime.sendMessage({ action: "createContextMenus" });
        });
    });
  });
  