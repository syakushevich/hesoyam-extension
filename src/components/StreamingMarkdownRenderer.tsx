// import { CodeEditor } from "../components/animate-ui/components/code-editor";
// import { marked } from "marked";
// import React from "react";

// // Use marked.Token[] for tokens
// function renderTokens(tokens: marked.Token[]) {
//   return tokens.map((token, i) => {
//     if (token.type === "code") {
//       const codeToken = token as marked.Tokens.Code;
//       const isMultiline = codeToken.text.includes("\n");
//       if (isMultiline) {
//         return (
//           <CodeEditor
//             key={i}
//             lang={codeToken.lang || ""}
//             title={codeToken.lang ? `code.${codeToken.lang}` : "code"}
//             duration={15}
//             delay={0.5}
//             copyButton
//             className="w-full min-h-[120px] my-4"
//           >
//             {codeToken.text}
//           </CodeEditor>
//         );
//       }
//       // Inline or single-line code
//       return (
//         <pre key={i} className="inline bg-gray-800 text-white px-2 py-1 rounded">
//           {codeToken.text}
//         </pre>
//       );
//     }
//     if (token.type === "heading") {
//       const heading = token as marked.Tokens.Heading;
//       const Tag = `h${heading.depth}` as keyof JSX.IntrinsicElements;
//       return React.createElement(Tag, { key: i }, heading.text);
//     }
//     if (token.type === "paragraph") {
//       return <p key={i}>{(token as marked.Tokens.Paragraph).text}</p>;
//     }
//     if (token.type === "list") {
//       const list = token as marked.Tokens.List;
//       const ListTag = list.ordered ? "ol" : "ul";
//       return React.createElement(
//         ListTag,
//         { key: i },
//         list.items.map((item, j) => <li key={j}>{item.text}</li>)
//       );
//     }
//     // Add more token types as needed
//     return null;
//   });
// }

// export function StreamingMarkdownRenderer({ tokens }: { tokens: marked.Token[] }) {
//   return <div className="prose prose-invert max-w-none">{renderTokens(tokens)}</div>;
// }
