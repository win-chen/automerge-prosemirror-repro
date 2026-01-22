import { SchemaAdapter } from "@automerge/prosemirror";
import type { NodeSpec } from "prosemirror-model";

export const schemaAdapter = new SchemaAdapter({
  nodes: {
    doc: {
      content: "block+",
    } as NodeSpec,
    paragraph: {
      automerge: {
        block: "am_paragraph",
      },
      content: "inline*",
      group: "block",
      toDOM() {
        return ["p", 0];
      },
    } as NodeSpec,
    text: {
      group: "inline",
    },
    unknownBlock: {
      automerge: {
        unknownBlock: true,
      },
      group: "block",
      content: "block+", // Allow any block content
      parseDOM: [{ tag: "div", attrs: { "data-unknown-block": "true" } }],
      toDOM() {
        return ["div", { "data-unknown-block": "true" }, 0];
      },
    },
  },
});
