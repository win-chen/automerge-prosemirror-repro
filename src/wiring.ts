import type { Repo } from "@automerge/automerge-repo";
import { initProseMirror } from "./init_prose";

export const wireCreateDoc = (
  createButton: HTMLButtonElement,
  editorEntry: HTMLDivElement,
  docUrl: HTMLTextAreaElement,
  repo: Repo,
) => {
  createButton.addEventListener("click", () => {
    const handle = repo.create({
      entry: "hello",
    });

    docUrl.value = handle.url;
    initProseMirror(handle, editorEntry);
  });
};

export const wireLoadDoc = (
  loadButton: HTMLButtonElement,
  editorEntry: HTMLDivElement,
  docUrl: HTMLTextAreaElement,
  repo: Repo,
) => {
  loadButton.addEventListener("click", () => {
    const url = docUrl.value;

    repo
      .find(url)
      .then((handle) => {
        console.log("Document found", handle.url);
        initProseMirror(handle, editorEntry);
      })
      .catch(() => {
        console.log("Document not found");
        window.alert(`No document found for url: ${url}`);
      });
  });
};
