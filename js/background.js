// Khi tiện ích được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  // Tạo menu chuột phải cho đoạn văn bản được chọn
  chrome.contextMenus.create({
    id: "sendToChatGPTText",
    title: "Send selected text to ChatGPT",
    contexts: ["selection"] // Chỉ hiện menu khi có đoạn văn bản được chọn
  });

  // Tạo menu chuột phải cho việc gửi liên kết trang hiện tại
  chrome.contextMenus.create({
    id: "sendToChatGPTLink",
    title: "Send page link to ChatGPT",
    contexts: ["page", "link"] // Hiện menu cho toàn trang hoặc khi nhấp chuột phải vào liên kết
  });
});

// Hàm mở tab mới với ChatGPT và dán văn bản hoặc liên kết
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

              if (inputField) {
                // Thêm đoạn văn bản "trả lời bằng VI-VN." trước nội dung gốc
                const fullText = `Answer in VI-VN. \n\n${text}`;
                inputField.innerText = fullText; 
                inputField.dispatchEvent(new Event('input', { bubbles: true })); // Bắt sự kiện input để cập nhật

                // Tìm nút gửi và nhấn
                const sendButtonXPath = '//*[@data-testid="send-button"]';
                const sendButton = document.evaluate(sendButtonXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                
                if (sendButton) {
                  setTimeout(() => {
                    sendButton.click(); // Nhấn nút gửi
                    clearInterval(checkTextarea); // Dừng kiểm tra khi đã nhấn nút gửi
                  }, 500); 
                }
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
  if (info.menuItemId === "sendToChatGPTText" && info.selectionText) {
    sendTextToChatGPT(info.selectionText); // Gửi văn bản đã chọn
  } else if (info.menuItemId === "sendToChatGPTLink") {
    const pageUrl = info.linkUrl || tab.url; // Nếu có liên kết được chọn, gửi liên kết đó. Nếu không, gửi URL trang
    sendTextToChatGPT(pageUrl);
  }
});

// Xử lý khi nhấn vào biểu tượng tiện ích
chrome.action.onClicked.addListener((tab) => {
  console.log("Icon clicked");

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString() // Lấy văn bản được chọn
  }, (selectionResult) => {
    if (selectionResult && selectionResult[0]) {
      const selectedText = selectionResult[0].result.trim();
      if (selectedText) {
        sendTextToChatGPT(selectedText); // Gửi văn bản nếu có
      } else {
        sendTextToChatGPT(tab.url); // Nếu không có văn bản, gửi URL của trang
      }
    } else {
      sendTextToChatGPT(tab.url); // Nếu không lấy được văn bản, gửi URL của trang
    }
  });
});
