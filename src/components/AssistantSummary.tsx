import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export function AssistantSummary({ summary, sidebarOpen }: { summary: string; sidebarOpen: boolean }) {
  return (
    <div className={`assistant-summary-container ${sidebarOpen ? "w-3/4" : "w-full"} flex flex-col overflow-auto p-4`}>
      {summary && (
        <div className="prose prose-neutral dark:prose-invert max-w-none assistant-summary-pre">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {summary}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
