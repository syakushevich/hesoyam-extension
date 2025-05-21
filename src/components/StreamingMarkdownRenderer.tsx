// import { CodeEditor } from "../components/animate-ui/components/code-editor";
// import { marked } from "marked";
// import React from "react";

// MultilineCodeBlock.tsx
export function MultilineCodeBlock({ code }: { code: string }) {
  return (
    <div className="test">
      {code.split("\n").map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
