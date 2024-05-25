import { CodeHighlight } from "@mantine/code-highlight";
import React, { PropsWithChildren } from "react";

import styles from "./styles.module.css";

const CodeBlock: React.FC<PropsWithChildren> = (props) => {
  const node = props.children as React.ReactElement<{
    children: string;
    className: string;
  }>;
  const cssClassName = node.props.className || "";
  const matches = cssClassName.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || "";

  return (
    <CodeHighlight
      className={styles.root}
      code={node.props.children.trim()}
      language={language}
    />
  );
};

export default CodeBlock;
