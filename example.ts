import { Scrapbox, textInput } from "./deps/scrapbox-dom.ts";
import { startTalk } from "./main.ts";
declare const scrapbox: Scrapbox;

scrapbox.PopupMenu.addButton({
  title: () => "🤖",
  onClick: (text) => {
    if (text.trim() === "") return undefined;

    startTalk().then((result) => {
      if (!result) return;
      const { ask, visible } = result;
      textInput()!.addEventListener("keydown", (e) => {
        if (
          !visible() || e.key !== "Enter" || !e.ctrlKey || e.altKey ||
          e.shiftKey
        ) return;

        e.preventDefault();
        e.stopPropagation();
        ask();
      });
    });
  },
});
