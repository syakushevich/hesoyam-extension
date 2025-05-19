import { useEffect, useRef, useState } from "react";

export function useStreamingMarkdown(buffer: string, delay: number | null = 100) {
  const [content, setContent] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (delay === null || delay === 0) {
      setContent(buffer);
      return;
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setContent(buffer);
    }, delay);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [buffer, delay]);

  return content;
}
