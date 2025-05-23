'use client';

import { useRef } from 'react';

export type CodeEditorProps = {
  children: React.ReactNode;
  lang?: string;
  header?: boolean;
  title?: string;
};

export function CodeEditor({
  children,
  lang = 'plaintext',
  header = true,
  title,
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Convert children to string safely
  const visibleCode =
    typeof children === "string"
      ? children
      : Array.isArray(children)
      ? children.join("")
      : String(children);

  return (
    <div
      data-slot="code-editor"
      className="relative bg-muted/50 w-[600px] h-[400px] border border-border overflow-hidden flex flex-col rounded-xl"
    >
      {header && (
        <div className="bg-muted border-b border-border/75 dark:border-border/50 relative flex flex-row items-center justify-between gap-y-2 h-10 px-4">
          <div className="flex flex-row gap-x-2">
            <div className="size-2 rounded-full bg-red-500"></div>
            <div className="size-2 rounded-full bg-yellow-500"></div>
            <div className="size-2 rounded-full bg-green-500"></div>
          </div>
          {title && (
            <figcaption className="flex-1 truncate text-muted-foreground text-[13px] text-center">
              {title}
            </figcaption>
          )}
        </div>
      )}
      <div
        ref={editorRef}
        className="h-[calc(100%-2.75rem)] w-full text-sm p-4 font-mono relative overflow-auto flex-1"
      >
        <pre>
          <code className={`language-${lang}`}>{visibleCode}</code>
        </pre>
      </div>
    </div>
  );
}
