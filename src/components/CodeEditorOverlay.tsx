// // components/CodeEditorOverlay.tsx
// import React from "react";

// type CodeEditorOverlayProps = {
//   code: string;
//   lang?: string;
//   open: boolean;
//   onClose?: () => void;
// };

// const CodeEditorOverlay: React.FC<CodeEditorOverlayProps> = ({
//   code,
//   lang = "plaintext",
//   open,
//   onClose,
// }) => {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
//       style={{ backdropFilter: "blur(2px)" }}
//     >
//       <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-0">
//         <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 rounded-t-xl">
//           <span className="font-mono text-xs text-zinc-500">{lang.toUpperCase()}</span>
//           {onClose && (
//             <button
//               onClick={onClose}
//               className="ml-2 text-lg font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
//               aria-label="Close"
//             >
//               &times;
//             </button>
//           )}
//         </div>
//         <div className="p-4 overflow-auto max-h-[60vh] min-w-[500px]">
//           <pre className="!bg-transparent m-0">
//             <code className={`language-${lang}`}>{code}</code>
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeEditorOverlay;
