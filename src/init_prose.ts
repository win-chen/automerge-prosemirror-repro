import type { DocHandle } from "@automerge/automerge-repo";
import { init } from "@automerge/prosemirror";
import { schemaAdapter } from "./schema_adapter";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { EditorState } from "prosemirror-state";
import { Automerge } from "@automerge/automerge-repo/slim";
import { EditorView } from "prosemirror-view";

export const initProseMirror = (
  handle: DocHandle<any>,
  editorEntry: HTMLDivElement,
) => {
  const { schema, pmDoc, plugin } = init(handle, ["entry"], {
    schemaAdapter,
  });

  console.log("the schema", schema);
  console.log("the doc", pmDoc.toJSON());

  let editorConfig = {
    schema,
    plugins: [plugin, keymap(baseKeymap)],
    doc: pmDoc,
  };

  let proseState = EditorState.create(editorConfig);

  const view = new EditorView(editorEntry, {
    state: proseState,
    editable: () => true, // can be toggled for readonly
    dispatchTransaction(transaction) {
      let newState = view.state.apply(transaction);
      view.updateState(newState);
    },
  });

  logOnChange(handle, proseState);
};

const logOnChange = (
  handle: DocHandle<{ entry: string }>,
  editorState: EditorState,
) => {
  handle.on("change", () => {
    console.log("automerge spans::", Automerge.spans(handle.doc(), ["entry"]));
    console.log("prosemirror state::", editorState.doc);
  });
};
