import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CodeEditor } from "./CodeEditor";

export function AssistantSummary({
  summary,
  sidebarOpen,
}: {
  summary: string;
  sidebarOpen: boolean;
}) {
  // Remove any line that starts with [topic]:
  const filteredSummary = summary
    .split("\n")
    .filter(line => !/^\[topic\]:/.test(line))
    .join("\n");

  return (
    <div
      className={`assistant-summary-container ${
        sidebarOpen ? "w-3/4" : "w-full"
      } flex flex-col overflow-auto p-4`}
    >
      {filteredSummary && (
        <div className="prose prose-neutral dark:prose-invert max-w-none assistant-summary-pre">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              pre({ children }) {
                // If children is an array, get the first element; otherwise, use children directly
                const codeElement = Array.isArray(children)
                  ? children[0]
                  : children;

                if (
                  !codeElement ||
                  typeof codeElement !== "object" ||
                  codeElement.type !== "code"
                ) {
                  return <pre>{children}</pre>;
                }

                const className = codeElement.props.className || "";
                const langMatch = className.match(/language-(\w+)/);
                const lang = langMatch ? langMatch[1] : "plaintext";

                // Get the inner HTML of the code block (highlighted)
                const html = codeElement.props.dangerouslySetInnerHTML
                  ? codeElement.props.dangerouslySetInnerHTML.__html
                  : codeElement.props.children;

                return (
                  <CodeEditor lang={lang}>
                    <code className={className}>
                      {Array.isArray(html) ? html : html}
                    </code>
                  </CodeEditor>
                );
              },
            }}
          >
            {filteredSummary}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
