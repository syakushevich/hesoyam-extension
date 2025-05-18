import { useCallback, useRef, useState } from "react";

export function useStreamingSummary() {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const portRef = useRef<chrome.runtime.Port | null>(null);

  const startStreaming = useCallback((transcript: string) => {
    setLoading(true);
    setSummary("");
    // Open a port for streaming
    const port = chrome.runtime.connect({ name: "gpt-stream" });
    portRef.current = port;
    port.postMessage({
      type: "STREAM_DETAILED_ANSWER",
      transcript,
    });
    port.onMessage.addListener((msg) => {
      if (msg.type === "STREAM_CHUNK") {
        setSummary((prev) => prev + msg.chunk);
      } else if (msg.type === "STREAM_DONE") {
        setLoading(false);
        port.disconnect();
        portRef.current = null;
      } else if (msg.type === "STREAM_ERROR") {
        setLoading(false);
        setSummary("Error: " + msg.error);
        port.disconnect();
        portRef.current = null;
      }
    });
  }, []);

  // Optional: cleanup on unmount
  const cleanup = useCallback(() => {
    if (portRef.current) {
      portRef.current.disconnect();
      portRef.current = null;
    }
  }, []);

  return { summary, loading, startStreaming, cleanup };
}
