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
              // Sử dụng XPath để tìm ô nhập
              const inputFieldXPath = '//*[@id="prompt-textarea"]';
              const inputField = document.evaluate(inputFieldXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

              console.log('Input field found:', inputField); // Ghi log để kiểm tra

              if (inputField) {
                // Ghi log nội dung để xác minh
                console.log('Text to input:', text);
                
                // Dán văn bản vào ô nhập
                inputField.innerText = text; 
                inputField.dispatchEvent(new Event('input', { bubbles: true })); // Bắt sự kiện input để cập nhật

                // Tìm nút gửi và nhấn
                const sendButtonXPath = '//*[@data-testid="send-button"]'; // Sử dụng XPath để tìm nút gửi
                const sendButton = document.evaluate(sendButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; // Cập nhật tìm kiếm nút gửi
                console.log('Send button found:', sendButton); // Ghi log để kiểm tra

                if (sendButton) {
                  setTimeout(() => {
                    sendButton.click(); // Nhấn nút gửi
                    console.log("Button clicked");
                    clearInterval(checkTextarea); // Dừng kiểm tra khi đã nhấn nút gửi
                  }, 500); // Thêm delay 500ms trước khi nhấn nút gửi
                }
              } else {
                console.log('Input field not found, retrying...'); // Nếu không tìm thấy, ghi log và tiếp tục
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
  console.log("Icon clicked"); // Ghi log khi biểu tượng được nhấn

  // Lấy đoạn văn bản đã chọn trên tab hiện tại
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString() // Lấy văn bản được chọn
  }, (selectionResult) => {
    console.log("Selection result:", selectionResult); // Ghi log kết quả lựa chọn
    if (selectionResult && selectionResult[0]) { // Kiểm tra xem selectionResult có tồn tại và có giá trị
      const selectedText = selectionResult[0].result.trim();
      if (selectedText) {
        console.log("Selected text:", selectedText); // Ghi log văn bản đã chọn
        sendTextToChatGPT(selectedText);
      } else {
        console.error("No text selected. Please select some text before using this feature.");
      }
    } else {
      console.error("No text selected. Please select some text before using this feature.");
    }
  });
});
