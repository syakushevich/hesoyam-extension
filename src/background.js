const OPENAI_API_KEY = "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";
const SYSTEM_PROMPT = `You are a meeting summarization assistant. Analyze the provided meeting transcript. Your goal is to provide a highly structured, brief overview of the main topics and concepts discussed, like a table of contents or a structured outline.

Instructions:
- Use nested bullet points (hyphens or asterisks).
- Be very concise. Avoid detailed explanations or full sentences where possible. Focus on keywords, concepts, and topic headings.
- Identify the core underlying concepts or questions being addressed.
- Structure the output logically based on the flow of the conversation.
- If specific questions are asked, represent them clearly within the structure.
- Do not add introductory or concluding remarks like "Here is the summary:". Just provide the structured overview.

Example Structure:
Topic/Question Area 1:
- Sub-point 1.1
  -- Detail/Concept 1.1.1
  -- Detail/Concept 1.1.2
- Sub-point 1.2
Topic/Question Area 2:
- Concept 2.1
- Question 2.2
  -- Aspect 2.2.1`;

const DETAILED_ANSWER_PROMPT = `
You are a world-class programming tutor. Analyze the provided meeting transcript, identify the main programming topic or question, and provide a detailed, structured answer in markdown.

Instructions:
- Start with: [topic]: <topic name> (on its own line)
- Then give a thorough, clear, and educational explanation.
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
      if (msg.type === "STREAM_SUMMARY") {
        try {
          await streamSummaryFromOpenAI(msg.transcript, port, SYSTEM_PROMPT);
        } catch (error) {
          port.postMessage({ type: "STREAM_ERROR", error: error.message });
        }
      } else if (msg.type === "STREAM_DETAILED_ANSWER") {
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
