import Moveable from "react-moveable";
import "../index.css";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { AssistantNavbar } from "../components/AssistantNavbar";
import { useStreamingMarkdown } from "./useStreamingMarkdown";
import { useStreamingSummary } from "./useStreamingSummary";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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

  const { summary, loading, startStreaming, cleanup } = useStreamingSummary();
  const { topic, markdown } = useStreamingMarkdown(summary, null);

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
          <AssistantNavbar topic={topic} loading={loading} onClose={onClose} />
          <div className="bg-border shrink-0 h-[1px] w-full" />
          <CardContent className="flex-1 overflow-auto p-4">
            <div className="assistant-summary-container">
              {summary && (
                <div className="prose prose-neutral dark:prose-invert max-w-none assistant-summary-pre">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {markdown}
                  </ReactMarkdown>
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
