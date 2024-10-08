// Khi tiện ích được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  // Tạo menu chuột phải cho đoạn văn bản được chọn
  chrome.contextMenus.create({
    id: "sendToChatGPT",
    title: "Send to ChatGPT",
    contexts: ["selection"] // Chỉ hiện menu khi có đoạn văn bản được chọn
  });
});

// Hàm mở tab mới với ChatGPT và dán đoạn văn bản
function sendTextToChatGPT(text) {
  chrome.tabs.create({ url: "https://chatgpt.com/?model=auto" }, (newTab) => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
      if (tabId === newTab.id && info.status === 'complete') {
        // Sau khi tab đã được tải đầy đủ, truyền văn bản vào
        chrome.scripting.executeScript({
          target: { tabId: newTab.id },
          func: (text) => {
            const checkTextarea = setInterval(() => {
              const inputField = document.querySelector('textarea');
              if (inputField) {
                inputField.value = text; // Dán văn bản vào ô nhập
                clearInterval(checkTextarea); // Dừng kiểm tra khi textarea xuất hiện
                inputField.dispatchEvent(new Event('input', { bubbles: true })); // Bắt sự kiện input để cập nhật
              }
            }, 100); // Kiểm tra textarea sau mỗi 100ms
          },
          args: [text]
        });
        chrome.tabs.onUpdated.removeListener(listener); // Dừng lắng nghe sự kiện sau khi tab hoàn thành tải
      }
    });
  });
}

// Xử lý khi nhấp vào menu chuột phải
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendToChatGPT" && info.selectionText) {
    sendTextToChatGPT(info.selectionText);
  }
});

// Xử lý khi nhấn vào biểu tượng tiện ích
chrome.action.onClicked.addListener((tab) => {
  // Lấy đoạn văn bản đã chọn trên tab hiện tại
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString() // Lấy văn bản được chọn
  }, (selectionResult) => {
    if (selectionResult && selectionResult[0]) { // Kiểm tra xem selectionResult có tồn tại và có giá trị
      const selectedText = selectionResult[0].result.trim();
      if (selectedText) {
        sendTextToChatGPT(selectedText);
      } else {
        alert("Please select some text before clicking the extension icon.");
      }
    } else {
      alert("No text selected. Please select some text before using this feature.");
    }
  });
});
