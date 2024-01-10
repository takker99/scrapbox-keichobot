import { Scrapbox, textInput } from "./deps/scrapbox-dom.ts";
import { startTalk } from "./mod.ts";
declare const scrapbox: Scrapbox;

scrapbox.PopupMenu.addButton({
  title: () => "🤖",
  onClick: (text) => {
    if (text.trim() === "") return undefined;

    startTalk().then((result) => {
      if (!result) return;
      const { ask, visible, onExit } = result;
      const handleKeydown = (e: KeyboardEvent) => {
        if (
          !visible() || e.key !== "Enter" || !e.ctrlKey || e.altKey ||
          e.shiftKey
        ) return;

        e.preventDefault();
        e.stopPropagation();
        ask();
      };
      textInput()!.addEventListener("keydown", handleKeydown);
      onExit(() => textInput()!.removeEventListener("keydown", handleKeydown));
    });
  },
});
