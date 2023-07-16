import React, { ReactNode } from "react";
import styles from "./Text.module.css";

type TextSize = "xs" | "s" | "m" | "l" | "xl" | "h2" | "h1";
type TextWeight = "regular" | "medium" | "semibold";

interface TextProps {
  size?: TextSize;
  weight?: TextWeight;
  children: ReactNode;
}

const Text: React.FC<TextProps> = ({
  size = "m",
  weight = "regular",
  children,
}) => {
  const element = size.startsWith("h")
    ? React.createElement(size, null, children)
    : React.createElement("p", null, children);
  return element;
};

export default Text;
