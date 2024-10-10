document.addEventListener("DOMContentLoaded", () => {
  const languageDropdown = document.getElementById("languageDropdown");
  const customLanguageInput = document.getElementById("customLanguage");
  const saveButton = document.getElementById("saveButton");
  const statusMessage = document.createElement("div");
  document.body.appendChild(statusMessage);

  chrome.storage.local.get(["selectedLanguage", "customLanguage"], (data) => {
      if (data.selectedLanguage) {
          languageDropdown.value = data.selectedLanguage;
          statusMessage.innerText += `Ngôn ngữ đã chọn: ${data.selectedLanguage}\n`;
      }
      if (data.customLanguage) {
          customLanguageInput.value = data.customLanguage;
          statusMessage.innerText += `Ngôn ngữ tùy chỉnh: ${data.customLanguage}\n`;
      }
  });

  // Xử lý sự kiện lưu
  saveButton.addEventListener("click", () => {
      const selectedLanguage = languageDropdown.value;
      const customLanguage = customLanguageInput.value;

      // Lưu ngôn ngữ đã chọn và ngôn ngữ tùy chỉnh vào chrome.storage
      chrome.storage.local.set({ selectedLanguage, customLanguage }, () => {
          alert("Cài đặt ngôn ngữ đã được lưu!");
          // Cập nhật menu chuột phải
          createContextMenus(); // Gọi hàm để cập nhật menu
          statusMessage.innerText = `Ngôn ngữ đã lưu: ${selectedLanguage}`;
      });
  });
});
