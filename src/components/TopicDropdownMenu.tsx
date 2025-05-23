import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CardTitle } from "./ui/card";

type TopicNode = {
  topic: string;
  summary: string;
  children: TopicNode[];
  parent?: TopicNode | null;
};

export function TopicDropdownMenu({
  title,
  portalContainer,
  topicTree,
  onSelectTopic,
}: {
  title: React.ReactNode;
  portalContainer: HTMLElement | null | undefined;
  topicTree: TopicNode[];
  onSelectTopic: (topic: TopicNode) => void;
}) {
  function flattenTopics(
    nodes: TopicNode[],
    depth = 0
  ): { node: TopicNode; depth: number }[] {
    return nodes.flatMap((node) => [
      { node, depth },
      ...flattenTopics(node.children, depth + 1),
    ]);
  }
  const flatTopics = flattenTopics(topicTree);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="group transition-colors px-4 py-2 rounded-md hover:bg-[color:var(--hesoyam-accent)] hover:text-[color:var(--hesoyam)] focus:outline-none focus:ring-0 focus:ring-transparent ring-0"
          style={{ minHeight: "unset", minWidth: "unset" }}
        >
          <CardTitle className="transition-colors group-hover:text-[color:var(--hesoyam)] text-center font-normal p-0 m-0">
            <p>
              <strong>{title}</strong>
            </p>
          </CardTitle>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal container={portalContainer ?? undefined}>
        <DropdownMenuContent
          className="z-[99999] text-center min-w-max"
          style={{ borderColor: "var(--border)" }}
        >
          {flatTopics.length === 0 ? (
            <DropdownMenuItem disabled>
              <p>No topics yet</p>
            </DropdownMenuItem>
          ) : (
            flatTopics.map((t, i) => (
              <DropdownMenuItem
                key={i}
                className="truncate whitespace-nowrap max-w-full"
                title={t.node.topic}
                onSelect={() => onSelectTopic(t.node)}
              >
                <p>{t.node.topic}</p>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}
