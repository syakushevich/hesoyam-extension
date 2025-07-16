import { useEffect, useState, useRef } from "react";

export type CaptionLine = {
  name: string;
  text: string;
};

export function useLiveCaptions(enabled: boolean) {
  const [captions, setCaptions] = useState<CaptionLine[]>([]);
  const observerRef = useRef<MutationObserver | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    function setupObserver() {
      const captionsRegion = document.querySelector('div[aria-label="Captions"]');
      if (!captionsRegion) {
        intervalRef.current = window.setTimeout(setupObserver, 500);
        return;
      }

      const handleCaptions = () => {
        const blocks = Array.from(captionsRegion.children).slice(0, -1);
        const lines: CaptionLine[] = blocks.map(block => {
          // block: <div>...</div>
          // Speaker name: block.firstElementChild?.lastElementChild?.textContent
          // Caption text: block.lastElementChild?.textContent
          let name = "Unknown";
          let text = "";

          // Speaker name: div > div:first-child > div > span
          const nameSpan = block.querySelector("div:first-child > div > span");
          if (nameSpan) {
            name = nameSpan.textContent?.trim() || "Unknown";
          }

          const textDiv = block.children[1];
          if (textDiv) {
            text = textDiv.textContent?.trim() || "";
          }

          return { name, text };
        }).filter(line => line.text.length > 0);

        setCaptions(lines);
      };

      handleCaptions();

      const observer = new MutationObserver(handleCaptions);
      observer.observe(captionsRegion, { childList: true, subtree: true, characterData: true });
      observerRef.current = observer;
    }

    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled]);

  return captions;
}
