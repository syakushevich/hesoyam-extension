import { TopicDropdownMenu } from "./TopicDropdownMenu";
import { CardHeader } from "./ui/card";
import { AnimatedCloseButton } from "./AnimatedCloseButton";
import { Loader } from "lucide-react";

type TopicNode = {
  topic: string;
  summary: string;
  children: TopicNode[];
  parent?: TopicNode | null;
};

export function AssistantNavbar({
  topic,
  loading,
  onClose,
  left,
  topicTree,
  onSelectTopic,
}: {
  topic: string | null;
  loading: boolean;
  onClose: () => void;
  left?: React.ReactNode;
  topicTree: TopicNode[];
  onSelectTopic: (topic: TopicNode) => void;
}) {
  let title: React.ReactNode = "Press spacebar to ask AI";
  if (loading && topic) {
    title = (
      <span className="flex items-center justify-center gap-1">
        <Loader
          className="animate-spin w-4 h-4 text-[color:var(--hesoyam)]"
          style={{ animationDuration: "1s" }}
        />
        <span>{topic}</span>
      </span>
    );
  } else if (loading) {
    title = (
      <span className="flex items-center justify-center gap-1">
        <Loader
          className="animate-spin w-4 h-4 text-[color:var(--hesoyam)]"
          style={{ animationDuration: "1s" }}
        />
      </span>
    );
  } else if (topic) {
    title = topic;
  }

  // Get the portal container from the shadow root
  let portalContainer: HTMLElement | null = null;
  if (typeof window !== "undefined") {
    const shadowHost = document.getElementById("my-extension-shadow-host");
    portalContainer =
      shadowHost?.shadowRoot?.getElementById(
        "my-extension-portal-container"
      ) ?? null;
  }

  return (
    <CardHeader className="relative flex flex-row items-center justify-center">
      {left}
      <div className="flex-1 flex justify-center">
        <TopicDropdownMenu
          title={title}
          portalContainer={portalContainer}
          topicTree={topicTree}
          onSelectTopic={onSelectTopic}
        />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
        <AnimatedCloseButton onClick={onClose} />
      </div>
    </CardHeader>
  );
}
