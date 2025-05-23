import "../index.css";
import Moveable from "react-moveable";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { AssistantNavbar } from "../components/AssistantNavbar";
import { SidebarToggleWithTooltip } from "../components/SidebarToggleWithTooltip";
import { useStreamingMarkdown } from "./useStreamingMarkdown";
import { useStreamingSummary } from "./useStreamingSummary";
import { useLiveCaptions } from "../hooks/useLiveCaptions";
import { CaptionsSidebar } from "../components/CaptionsSidebar";
import { AssistantSummary } from "../components/AssistantSummary";

type TopicNode = {
  topic: string;
  summary: string;
  children: TopicNode[];
  parent?: TopicNode | null;
};

export default function Assistant({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({
    translate: [0, 0],
    width: 1000,
    height: 600,
  });
  const liveFrame = useRef({
    translate: [0, 0],
    width: 1000,
    height: 600,
  });

  const { summary, loading, startStreaming, cleanup } = useStreamingSummary();
  const { topic, markdown } = useStreamingMarkdown(summary, null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [topicTree, setTopicTree] = useState<TopicNode[]>([]);
  const [currentNode, setCurrentNode] = useState<TopicNode | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<TopicNode | null>(null);

  // Use the custom hook for captions
  const captions = useLiveCaptions(sidebarOpen);

  // Spacebar handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        // Clear selected topic so streaming summary is shown
        setSelectedTopic(null);

        const transcript = captions.map(c => `${c.name}: ${c.text}`).join("\n");
        if (transcript.trim().length === 0) return;
        startStreaming(transcript);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      cleanup();
    };
  }, [startStreaming, cleanup, captions]);

  useEffect(() => {
    if (!loading && summary) {
      // Extract topic from summary
      const match = summary.match(/^\[topic\]:\s*(.+)$/m);
      const topicName = match ? match[1] : "Unknown topic";
      const newNode: TopicNode = {
        topic: topicName,
        summary,
        children: [],
        parent: currentNode,
      };

      // Always add as a sibling (root node)
      setTopicTree((tree) => [...tree, newNode]);
      setCurrentNode(newNode);
    }
    // eslint-disable-next-line
  }, [loading, summary]);

  useEffect(() => {
    console.log("Updated topicTree:", topicTree);
  }, [topicTree]);

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
        <Card className="w-full h-full flex flex-col border" style={{ borderColor: "var(--border)" }}>
          <AssistantNavbar
            topic={selectedTopic ? selectedTopic.topic : topic}
            loading={loading}
            onClose={onClose}
            topicTree={topicTree}
            onSelectTopic={setSelectedTopic}
            left={<SidebarToggleWithTooltip open={sidebarOpen} onToggle={setSidebarOpen} />}
          />
          <div className="bg-border shrink-0 h-[1px] w-full" />
          <CardContent className="flex-1 overflow-auto">
            <div className={`flex h-full min-h-0 ${sidebarOpen ? "flex-row" : ""}`}>
              {sidebarOpen && (
                <>
                  <CaptionsSidebar captions={captions} />
                  <div className="w-px bg-border mx-0 h-full self-stretch" />
                </>
              )}
              <AssistantSummary
                summary={ selectedTopic ? selectedTopic.summary : markdown }
                sidebarOpen={sidebarOpen}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Moveable
        target={ref}
        zoom={2}
        renderDirections={["nw", "ne", "sw", "se"]}
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
