import { useEffect, useRef, useState } from "react";

export function useStreamingMarkdown(
  buffer: string,
  delay: number | null = 100
): { topic: string | null; markdown: string } {
  const [topic, setTopic] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!buffer) {
      setTopic(null);
      setMarkdown("");
      return;
    }

    const update = () => {
      const lines = buffer.split("\n");
      if (lines.length === 0) {
        setTopic(null);
        setMarkdown("");
        return;
      }
      const firstLine = lines[0];
      const topicMatch = firstLine.match(/^\[topic\]:\s*(.+)$/);
      if (topicMatch) {
        setTopic(topicMatch[1]);
      } else {
        setTopic(null);
      }
      setMarkdown(lines.slice(1).join("\n"));
    };

    if (delay === null || delay === 0) {
      update();
      return;
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(update, delay);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [buffer, delay]);

  return { topic, markdown };
}
