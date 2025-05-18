import { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import hljs from "highlight.js/lib/core";

// Custom renderer for code blocks (Marked v5+)
const renderer = {
  code({ text, lang }: { text: string; lang?: string }) {
    const langClass = lang ? `highlight-source-${lang}` : '';
    const highlighted = lang && hljs.getLanguage(lang)
      ? hljs.highlight(text, { language: lang }).value
      : hljs.highlightAuto(text).value;

    return `
<div class="highlight ${langClass} notranslate position-relative overflow-auto" dir="auto">
  <pre>${highlighted}</pre>
</div>
`.trim();
  }
};

marked.use({
  gfm: true,
  breaks: true,
  renderer
});

export function useStreamingMarkdown(buffer: string, delay: number | null = 100) {
  const [html, setHtml] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (delay === null || delay === 0) {
      setHtml(marked.parse(buffer) as string);
      return;
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setHtml(marked.parse(buffer) as string);
    }, delay);
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [buffer, delay]);

  return html;
}
