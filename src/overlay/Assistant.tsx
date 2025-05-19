import Moveable from "react-moveable";
import "../index.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { AnimatedCloseButton } from "../components/AnimatedCloseButton";
import { useStreamingMarkdown } from "./useStreamingMarkdown";
import { useStreamingSummary } from "./useStreamingSummary";

const testTranscriptForContext = `Interviewer: Can you share some tips for improving Postgres performance?
Guest: Sure! Is it reads or writes that are the bottleneck?
Interviewer: We have slow writes.
Guest: Are you using indexes on the tables with heavy writes?
Interviewer: Yes, but maybe too many.`;

export default function Assistant({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({
    translate: [0, 0],
    width: 800,
    height: 600,
  });
  const liveFrame = useRef({
    translate: [0, 0],
    width: 800,
    height: 600,
  });

  // Use the custom hook for streaming summary
  const { summary, loading, startStreaming, cleanup } = useStreamingSummary();
  const markdown = useStreamingMarkdown(summary, null);

  // Spacebar handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        startStreaming(testTranscriptForContext);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cleanup();
    };
  }, [startStreaming, cleanup]);

  return (
    <>
      <div
        ref={ref}
        className="assistant-overlay"
        style={{
          transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`,
          width: `${frame.width}px`,
          height: `${frame.height}px`,
        }}
      >
        <Card className="w-full h-full flex flex-col">
        <CardHeader className="relative flex flex-row items-center py-4">
          <CardTitle className="w-full text-center">
            Press spacebar to ask AI
          </CardTitle>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <AnimatedCloseButton onClick={onClose} />
          </div>
        </CardHeader>

          <div className="bg-border shrink-0 h-[1px] w-full" />
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="assistant-summary-container">
              {loading && <div>Loading summary...</div>}
              {summary && (
                <div className="markdown-body assistant-summary-pre">
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
                </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Moveable
        target={ref}
        draggable={true}
        resizable={true}
        keepRatio={false}
        throttleResize={0}
        onDrag={({ beforeTranslate }) => {
          liveFrame.current.translate = beforeTranslate;
          if (ref.current) {
            ref.current.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
          }
        }}
        onDragEnd={() => {
          setFrame((f) => ({
            ...f,
            translate: [...liveFrame.current.translate],
          }));
        }}
        onResize={({ width, height, drag }) => {
          liveFrame.current.width = width;
          liveFrame.current.height = height;
          liveFrame.current.translate = drag.beforeTranslate;
          if (ref.current) {
            ref.current.style.width = `${width}px`;
            ref.current.style.height = `${height}px`;
            ref.current.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
          }
        }}
        onResizeEnd={() => {
          setFrame((f) => ({
            ...f,
            width: liveFrame.current.width,
            height: liveFrame.current.height,
            translate: [...liveFrame.current.translate],
          }));
        }}
        minWidth={600}
        minHeight={400}
        maxWidth={1200}
        maxHeight={900}
      />
    </>
  );
}
