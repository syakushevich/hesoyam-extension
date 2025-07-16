'use client';

import React from "react";
import {
  DiJavascript1,
  DiPython,
  DiJava,
  DiRuby,
  DiPhp,
  DiGo,
  DiHtml5,
  DiCss3,
  DiSwift,
  DiRust,
  DiScala,
  DiDart,
} from "react-icons/di";
import {
  SiTypescript,
  SiKotlin,
  SiPerl,
  SiJson,
  SiShell,
  SiR,
  SiLua,
  SiC,
  SiCplusplus,
  SiSharp,
} from "react-icons/si";
import { FiFileText } from "react-icons/fi";

export type CodeEditorProps = {
  children: React.ReactNode;
  lang?: string;
  header?: boolean;
};

const LANGUAGES: Record<
  string,
  {
    icon: React.ReactElement;
    ext: string;
  }
> = {
  javascript: { icon: <DiJavascript1 />, ext: "js" },
  js: { icon: <DiJavascript1 />, ext: "js" },
  typescript: { icon: <SiTypescript />, ext: "ts" },
  ts: { icon: <SiTypescript />, ext: "ts" },
  python: { icon: <DiPython />, ext: "py" },
  py: { icon: <DiPython />, ext: "py" },
  java: { icon: <DiJava />, ext: "java" },
  c: { icon: <SiC />, ext: "c" },
  cpp: { icon: <SiCplusplus />, ext: "cpp" },
  cplusplus: { icon: <SiCplusplus />, ext: "cpp" },
  csharp: { icon: <SiSharp />, ext: "cs" },
  cs: { icon: <SiSharp />, ext: "cs" },
  ruby: { icon: <DiRuby />, ext: "rb" },
  rb: { icon: <DiRuby />, ext: "rb" },
  php: { icon: <DiPhp />, ext: "php" },
  go: { icon: <DiGo />, ext: "go" },
  html: { icon: <DiHtml5 />, ext: "html" },
  css: { icon: <DiCss3 />, ext: "css" },
  sql: { icon: <DiSwift />, ext: "sql" },
  swift: { icon: <DiSwift />, ext: "swift" },
  rust: { icon: <DiRust />, ext: "rs" },
  scala: { icon: <DiScala />, ext: "scala" },
  dart: { icon: <DiDart />, ext: "dart" },
  kotlin: { icon: <SiKotlin />, ext: "kt" },
  json: { icon: <SiJson />, ext: "json" },
  shell: { icon: <SiShell />, ext: "sh" },
  sh: { icon: <SiShell />, ext: "sh" },
  r: { icon: <SiR />, ext: "r" },
  lua: { icon: <SiLua />, ext: "lua" },
  perl: { icon: <SiPerl />, ext: "pl" },
  text: { icon: <FiFileText />, ext: "txt" },
  txt: { icon: <FiFileText />, ext: "txt" },
};

function getLangIconAndExt(lang?: string) {
  const iconProps = {
    className: "inline w-4 h-4 mr-1",
    style: { color: "var(--muted-foreground)" },
  };
  const key = (lang || "").toLowerCase();
  const entry = LANGUAGES[key];
  if (entry) {
    return {
      icon: React.cloneElement(entry.icon, iconProps),
      ext: entry.ext,
    };
  }
  return {
    icon: <FiFileText {...iconProps} />,
    ext: lang || "txt",
  };
}

export function CodeEditor({
  children,
  lang = "plaintext",
  header = true,
}: CodeEditorProps) {
  const { icon, ext } = getLangIconAndExt(lang);
  const filename = `example.${ext}`;

  return (
    <div
      data-slot="code-editor"
      className="relative bg-muted/50 w-full border border-border overflow-hidden flex flex-col rounded-none"
      style={{ height: "auto", borderRadius: "0.75rem" }}
    >
      {header && (
        <div className="bg-muted border-b border-border/75 dark:border-border/50 border-border-custom relative flex flex-row items-center justify-between gap-y-2 h-10 px-4">
          <div className="flex flex-row gap-x-2">
            <div className="size-2 rounded-full bg-red-500"></div>
            <div className="size-2 rounded-full bg-yellow-500"></div>
            <div className="size-2 rounded-full bg-green-500"></div>
          </div>
          <figcaption className="absolute left-1/2 -translate-x-1/2 text-muted-foreground text-[13px] font-semibold">
            {icon}
            {filename}
          </figcaption>
        </div>
      )}
      <div
        className="h-[calc(100%-2.75rem)] w-full text-sm font-mono relative overflow-auto flex-1"
      >
        <pre>
          {children}
        </pre>
      </div>
    </div>
  );
}
