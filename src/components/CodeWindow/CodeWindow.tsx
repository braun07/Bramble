import React from "react";
import styles from "./CodeWindow.module.scss";
import { cn } from "../../utils/cn";

export interface CodeWindowProps {
  tabText?: string;
  code?: string;
  className?: string;
  showLineNumbers?: boolean;
}

const DEFAULT_CODE = `// pseudocode
import { Button } from '../components/index.ts'

function App() {

  return (
    <section
      id="center"
      className="flex items-center justify-center m-auto w-fit"
    >
      <Button
        type="button"
        className="flex mt-10 rounded-4"
      >
        Click me!
      </Button>
    </section>
  )
}`;

const KEYWORDS = [
  "import",
  "from",
  "function",
  "return",
  "const",
  "let",
  "var",
  "export",
  "default",
  "new",
  "typeof",
  "of",
  "in",
  "if",
  "else",
  "for",
  "while",
];

const TOKEN_REGEX = new RegExp(
  [
    "(//.*$)",
    String.raw`('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")`,
    String.raw`(</?[A-Za-z][\w.]*)`,
    String.raw`([A-Za-z_$][\w$]*(?=\s*=(?!=)))`,
    `\\b(${KEYWORDS.join("|")})\\b`,
    String.raw`([{}()[\]])`,
  ].join("|"),
  "g",
);

function renderTokenizedLine(line: string, key: number) {
  const nodes: React.ReactNode[] = [];

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenKey = 0;

  TOKEN_REGEX.lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }

    const [full, comment, str, tag, attr, keyword, brace] = match;

    let className = "code-text";

    if (comment) {
      className = "code-comment";
    } else if (str) {
      className = "code-text";
    } else if (tag) {
      const isComponent = /^<\/?[A-Z]/.test(tag);
      const tagMatch = tag.match(/^(<\/?)([A-Za-z][\w.]*)$/);

      if (tagMatch) {
        const [, symbol, tagName] = tagMatch;

        nodes.push(
          <span key={`${key}-${tokenKey++}`} className="text-primary">
            {symbol}
          </span>
        );

        nodes.push(
          <span key={`${key}-${tokenKey++}`} className={
            isComponent ? "code-yellow-text" : "code-purple"
          }>
            {tagName}
          </span>
        );

        lastIndex = TOKEN_REGEX.lastIndex;
        continue;
      }

      className = isComponent ? "code-yellow-text" : "code-purple";
    } else if (attr) {
      className = "code-pink";
    } else if (keyword) {
      className = "code-purple";
    } else if (brace) {
      className = "code-yellow-simbol";
    }

    nodes.push(
      <span key={`${key}-${tokenKey++}`} className={className}>
        {full}
      </span>,
    );

    lastIndex = TOKEN_REGEX.lastIndex;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }

  return (
    <div key={key} className="code-window-line">
      {nodes.length > 0 ? nodes : "\u00A0"}
    </div>
  );
}

export function CodeWindow({
  tabText = "pseudo_code.ts",
  code = DEFAULT_CODE,
  className = "",
  showLineNumbers = true,
}: CodeWindowProps) {
  const lines = code.split("\n");

  return (
    <div className={cn(`relative flex-col rounded-19 overflow-hidden bg-code-2 ${className}`, styles.codeWindow)}>
      <div className="flex items-center gap-12 px-16 py-17 bg-code-1 relative">
        <div className="flex gap-10">
          <span className={cn("dot-red ", styles.codeWindow__dot)}/>
          <span className={cn("dot-yellow ", styles.codeWindow__dot)} />
          <span className={cn("dot-green ", styles.codeWindow__dot)} />
        </div>

        <div className="flex items-center gap-45 ml-4 px-14 py-4 rounded-tl-8 rounded-tr-8 bg-code-2 text-12 absolute left-100 bottom-0">
          <span className="fw-300">{tabText}</span>
          <span className="text-14 cursor-pointer fw-300">×</span>
        </div>
      </div>

      <div
        className={`px-20 py-24 text-primary line-h-140 text-19 flex flex-col ${showLineNumbers ? "code-window__body--numbers" : "code-window__body--numbers-hidden"}`}
      >
        {showLineNumbers
          ? lines.map((line, index) => (
            <div key={index} className="flex w-max">
              <span className="mr-16 code-text-number align-center" style={{ width: "32px" }}>
                {index + 1}
              </span>

              <div className="code-window__line" style={{ whiteSpace: "pre" }}>
                {renderTokenizedLine(line, index)}
              </div>
            </div>
          ))
          : lines.map((line, index) => (
            <div key={index} className="code-window__line" style={{ whiteSpace: "pre" }}>
              {line || "\u00A0"}
            </div>
          ))}
      </div>
    </div>
  );
}