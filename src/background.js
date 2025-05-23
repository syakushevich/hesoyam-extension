const OPENAI_API_KEY = "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";
const DETAILED_ANSWER_PROMPT = `
You are a world-class programming tutor. Analyze the provided meeting transcript, identify the last main programming topic or question** discussed, and provide a detailed, structured answer in markdown.

Instructions:
- Start with: <topic name> (on its own line)
- Then give a thorough, clear, and educational explanation focused on the last topic or question.
- Then: "Code example:" (provide a relevant, well-commented code example)
- Use markdown formatting for code blocks, lists, and emphasis.
- Be clear, concise, and helpful. Assume the reader is eager to learn.
- Do not add any introductory or concluding remarks outside the structure above.
`;

chrome.action.onClicked.addListener((tab) => {
  if (tab.id && tab.url && tab.url.startsWith("https://meet.google.com/")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["assets/contentScript.js"],
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "gpt-stream") {
    port.onMessage.addListener(async (msg) => {
      if (msg.type === "STREAM_DETAILED_ANSWER") {
        try {
          await streamSummaryFromOpenAI(msg.transcript, port, DETAILED_ANSWER_PROMPT);
        } catch (error) {
          port.postMessage({ type: "STREAM_ERROR", error: error.message });
        }
      }
    });
  }
});

async function streamSummaryFromOpenAI(transcript, port, systemPrompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      Accept: "text/event-stream"
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: transcript }
      ],
      temperature: 0.5,
      stream: true
    }),
  });

  if (!response.ok) {
    let errorBody = {};
    try { errorBody = await response.json(); } catch (e) {}
    const detail = errorBody?.error?.message || `Status ${response.status}`;
    port.postMessage({ type: "STREAM_ERROR", error: detail });
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullResponse = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let lines = buffer.split("\n\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const dataJson = line.substring(6).trim();
        if (dataJson === "[DONE]") continue;
        try {
          const parsed = JSON.parse(dataJson);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (typeof delta === "string") {
            fullResponse += delta;
            console.log("Streamed chunk:", delta);
            port.postMessage({ type: "STREAM_CHUNK", chunk: delta });
          }
        } catch (e) {}
      }
    }
  }
  console.log("Full streamed response:", fullResponse);
  port.postMessage({ type: "STREAM_DONE" });
}
