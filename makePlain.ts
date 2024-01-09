import { Node, parse } from "./deps/scrapbox-parser.ts";

/** purge scrapbox syntax
 *
 * @param text text to purge
 * @return plain text
 */
export const makePlain = (text: string): string =>
  parse(text, { hasTitle: false })
    .map((block) => {
      if (block.type === "title") return block.text.trimEnd();
      const indent = " ".repeat(block.indent);
      switch (block.type) {
        case "codeBlock":
          return [
            `${indent}${block.fileName}`,
            ...block.content.split("\n").map((line) => `${indent} ${line}`),
          ].join("\n").trimEnd();
        case "table":
          return [
            `${indent}${block.fileName}`,
            ...block.cells.map((row) =>
              `${indent} ${
                row.flatMap((cell) => cell.map((node) => plainNode(node))).join(
                  "\t",
                )
              }`
            ),
          ].join("\n").trimEnd();
        case "line":
          return `${indent}${
            block.nodes.map((node) => plainNode(node)).join("")
          }`.trimEnd();
      }
    }).join("\n");

const plainNode = (node: Node): string => {
  switch (node.type) {
    case "quote":
      return `> ${node.nodes.map((node) => plainNode(node)).join("")}`;
    case "helpfeel":
    case "commandLine":
      return node.raw;
    case "strongImage":
    case "image":
    case "strongIcon":
    case "icon":
    case "googleMap":
      return "";
    case "strong":
    case "decoration":
    case "numberList":
      return node.nodes.map((node) => plainNode(node)).join("");
    case "formula":
      return `\\(${node.formula}\\)`;
    case "code":
      return ` ${node.text} `;
    case "blank":
    case "plain":
      return node.raw;
    case "hashTag":
      return node.href;
    case "link":
      switch (node.pathType) {
        case "absolute":
          return node.content ? ` ${node.content} ` : "";
        case "root":
          return node.href.split("/").pop() ?? "";
        case "relative":
          return node.href;
      }
  }
};
