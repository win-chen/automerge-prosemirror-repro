import "./style.css";
import { Repo } from "@automerge/automerge-repo";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { wireCreateDoc, wireLoadDoc } from "./wiring.ts";
import "prosemirror-view/style/prosemirror.css";

const repo = new Repo({
  storage: new IndexedDBStorageAdapter(),
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div><span>docurl </span><textarea type="text" id="docUrl"></textarea></div>
    <div>
      <span><button id="createDoc">create doc</button></span>
      <span><button id="loadDoc">load doc</button></span>
    </div>
    <div id="editorEntry"></div>
  </div>
`;

wireCreateDoc(
  document.querySelector<HTMLButtonElement>("#createDoc")!,
  document.querySelector<HTMLDivElement>("#editorEntry")!,
  document.querySelector<HTMLTextAreaElement>("#docUrl")!,
  repo,
);

wireLoadDoc(
  document.querySelector<HTMLButtonElement>("#loadDoc")!,
  document.querySelector<HTMLDivElement>("#editorEntry")!,
  document.querySelector<HTMLTextAreaElement>("#docUrl")!,
  repo,
);
