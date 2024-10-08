document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("selectedText", (data) => {
    const selectedText = data.selectedText || "";
    document.getElementById("response").innerText = `You sent: ${selectedText}`;
    
    // Call your ChatGPT API here using the selectedText
    // Example: sendChatGPTRequest(selectedText);
  });
});

// Example function to send request to ChatGPT
function sendChatGPTRequest(text) {
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    })
  })
  .then(response => response.json())
  .then(data => {
    // Display the response from ChatGPT
    console.log(data);
  })
  .catch(error => console.error("Error:", error));
}
