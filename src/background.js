const OPENAI_API_KEY = "YOUR_KEY";
const DETAILED_ANSWER_PROMPT = `
You are an intelligent assistant designed to analyze discussions and provide clear, focused information.
Analyze the provided transcript. If multiple topics, questions, or points of discussion are present, you **must focus exclusively on the very last one mentioned chronologically**.

Instructions:
1.  Identify the single, very last topic, question, or main point discussed at the end of the transcript.
2.  Start your response with this identified item, formatted as:
    [topic]: <The very last topic, question, or point discussed>
3.  Following the [topic] line, provide a thorough, clear, and helpful answer or explanation directly addressing this last item.
4.  After your explanation, include an "Example:" section:
    - If the topic is technical (e.g., programming, science, mathematics) and a code snippet or a specific technical illustration is the most relevant example, provide that. Ensure code is well-commented.
    - For other topics, provide a concise, illustrative example that clarifies your explanation or provides a practical instance.
    - If no specific example significantly enhances understanding or is not applicable to the nature of the topic, you may state "Example: Not applicable for this topic."
5.  Use markdown formatting for lists, emphasis, and code blocks (if any).
6.  Your entire response should be clear, concise, and directly address the user's likely need for information on that last point. Assume the user is looking for a useful and direct response.
7.  Do not add any introductory or concluding remarks outside the specified structure.
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
