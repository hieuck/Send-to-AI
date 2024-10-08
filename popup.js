document.getElementById('sendTextButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => window.getSelection().toString()
        }, (selectionResult) => {
            if (selectionResult && selectionResult[0]) {
                const selectedText = selectionResult[0].result.trim();
                if (selectedText) {
                    sendTextToChatGPT(selectedText);
                } else {
                    console.error("No text selected. Please select some text before using this feature.");
                }
            } else {
                console.error("No text selected. Please select some text before using this feature.");
            }
        });
    });
});
