import { ask } from "./ask.ts";
import { createPopupMenuBar } from "./popupBar.ts";
import { insertText, Scrapbox, takeStores } from "./deps/scrapbox-dom.ts";
import {
  BaseLine,
  getIndentCount,
  getIndentLineCount,
} from "./deps/scrapbox-std.ts";
import { getNewTalkId, Mode } from "./getNewTalkId.ts";
import { makeShareURL } from "./makeShareURL.ts";
import { questionToScrapbox } from "./questionToScrapbox.ts";
import { writeAfter } from "./writeAfter.ts";
import { makePlain } from "./makePlain.ts";
declare const scrapbox: Scrapbox;

export interface StartTalkInit {
  talkId?: string;
  botIcon?: string;
  mode?: Mode;
  entire?: boolean;
}

export interface StartTalkResult {
  ask: () => Promise<void>;
  open: () => void;
  close: () => void;
  visible: () => boolean;
  exit: () => void;
}

export const startTalk = async (
  init?: StartTalkInit,
): Promise<StartTalkResult | undefined> => {
  const lines = scrapbox.Page.lines;
  if (!lines) return;
  const { cursor, selection } = takeStores();
  const selectAll = init?.entire || selection.hasSelectionAll();
  const initialText = selectAll
    ? lines.map((line) => line.text).join("\n")
    : selection.getSelectedText();

  const botIcon = init?.botIcon ?? "[/nishio/nisbot.icon]";

  const { render, visible, open, close, dispose } = createPopupMenuBar();
  close();

  const Exit = {
    text: "Exit",
    onClick: dispose,
  };

  let talkId_ = init?.talkId || findTalkId(initialText) ||
    (selectAll ? "" : findTalkId(
      lines.slice(0, 1 + cursor.getPosition().line).map((line) => line.text)
        .join("\n"),
    ));
  const newTalkId = !talkId_;
  if (!talkId_) {
    const pending = getNewTalkId(init?.mode);
    let timer = setTimeout(() => {
      render({ text: "Start talking..." });
      open();
      let i = 0;
      timer = setInterval(() => {
        render({ text: `Start talking${".".repeat(i % 3)}` });
        i++;
      }, 1000);
    }, 1000);
    const result = await pending;
    clearTimeout(timer);

    if (!result.ok) {
      if (result.value.name === "GMFetchNotAvailableError") {
        alert(
          "`GM_fetch` is not available. Please use Tampermonkey and install `GM_fethc`.",
        );
        return;
      }
      if (result.value.name === "ResponseError") {
        render({
          text:
            `Error: ${result.value.res.status} ${result.value.res.statusText}`,
        }, Exit);
        open();
        console.error(
          `Error: ${result.value.res.status} ${result.value.res.statusText}`,
          await result.value.res.text(),
        );
        return;
      }
      return;
    }

    talkId_ = result.value;
  }

  /** talk ID */
  const talkId = talkId_;
  const range = selection.normalizeOrder(selection.getRange());
  let lastInsertedNo = selectAll ? lines.length - 1 : range.end.line;
  let lastInsertedLine: BaseLine = lines[lastInsertedNo];
  let indent = selectAll ? "" : " ".repeat(
    Math.min(
      ...lines.slice(range.start.line, range.end.line + 1).map((line) =>
        getIndentCount(line.text)
      ),
    ),
  );

  const send = async (answer: string) => {
    const result = await ask(answer, talkId);
    if (!result.ok) {
      switch (result.value.name) {
        case "ResponseError":
          render({
            text:
              `Error: ${result.value.res.status} ${result.value.res.statusText}`,
          }, Exit);
          open();
          console.error(
            `Error: ${result.value.res.status} ${result.value.res.statusText}`,
            await result.value.res.text(),
          );
          return result;
        case "GMFetchNotAvailableError":
          alert(
            "`GM_fetch` is not available. Please use Tampermonkey and install `GM_fethc`.",
          );
          return result;
      }
    }
    return result;
  };

  const sendMultiple = async (answer: string) => {
    const lines = makePlain(answer).split("\n").map((line) => line.trim());
    if (lines.length === 0) return;
    if (lines.length === 1) return await send(lines[0]);
    {
      const result = await send("まず聞いて");
      if (!result.ok) return result;
    }
    for (const line of lines) {
      const result = await send(line);
      if (!result.ok) return result;
    }
    return await send("おしまい");
  };

  const sendAndWrite = async (answer: string) => {
    if (scrapbox.Layout !== "page") return;
    if (answer === "") return;
    const pending = sendMultiple(answer);
    // 時間がかかるようであれば読み込み中表示をする
    let timer = setTimeout(() => {
      render({ text: "Asking..." });
      open();
      let i = 0;
      timer = setInterval(() => {
        render({ text: `Asking${".".repeat(i % 3)}` });
        i++;
      }, 1000);
    }, 1000);
    const result = await pending;
    clearTimeout(timer);
    if (!result) return;
    if (!result.ok) return;

    const { text: question, buttons } = result.value;
    const formatted = questionToScrapbox(question);
    if (formatted.trim()) {
      const botTalk = `${indent}${botIcon}${
        formatted.includes("\n")
          ? `\n${
            formatted.split("\n").map((line) => ` ${indent}${line}`).join("\n")
          }`
          : formatted
      }\n${indent}`;

      lastInsertedNo = await writeAfter(
        botTalk,
        lastInsertedLine,
        lastInsertedNo,
      );
      lastInsertedLine = lines[lastInsertedNo];
    }

    render(
      {
        text: "Send",
        onClick: ask_,
      },
      {
        text: "🙂",
        onClick: () => insertText("🙂"),
      },
      {
        text: "🙁",
        onClick: () => insertText("🙁"),
      },
      ...buttons.map((button) => ({
        text: button,
        onClick: async () => {
          lastInsertedNo = await writeAfter(
            button,
            lastInsertedLine,
            lastInsertedNo,
          );
          lastInsertedLine = lines[lastInsertedNo];

          await sendAndWrite(button);
        },
      })),
      {
        text: "Exit",
        onClick: () => close(),
      },
    );
    open();
  };

  const ask_ = async () => {
    if (scrapbox.Layout !== "page") return;
    const lines = scrapbox.Page.lines;
    const cursorLineNo = cursor.getPosition().line;
    const [answer, startLineNo, endLineNo] = readAnswer(
      lines,
      cursorLineNo,
      botIcon,
    );
    if (answer === "") return;

    lastInsertedNo = endLineNo;
    lastInsertedLine = lines[lastInsertedNo];
    indent = " ".repeat(
      Math.min(
        ...lines.slice(startLineNo, endLineNo + 1).map((line) =>
          getIndentCount(line.text)
        ),
      ),
    );

    await sendAndWrite(answer);
  };

  if (newTalkId) {
    lastInsertedNo = await writeAfter(
      makeShareURL(talkId),
      lastInsertedLine,
      lastInsertedNo,
    );
    lastInsertedLine = lines[lastInsertedNo];
  }
  await sendAndWrite(initialText);

  return { ask: ask_, open, close, visible, exit: close };
};

/**
 * Retrieves the talk ID from the selected string. The last talk ID is selected.
 * @param selected - The selected string.
 * @returns The talk ID.
 */
const findTalkId = (selected: string): string | undefined => {
  for (const line of selected.split("\n").reverse()) {
    const talkId = line.match(/https?:\/\/keicho\.netlify\.app\/#talk=(\w+)/)
      ?.[1];
    if (talkId) return talkId;
  }
};

const readAnswer = <Line extends BaseLine>(
  lines: Line[],
  endLineNo: number,
  botIcon: string,
): [string, number, number] => {
  const iconLineNo = Math.max(
    lines.findLastIndex((line, index) =>
      index < endLineNo && line.text.trim().startsWith(botIcon)
    ),
    // アイコン行がなければ、タイトルの次の行からテキストを取得する
    1,
  );
  // ぶら下がっている行は含めない
  const startLineNo = iconLineNo + getIndentLineCount(iconLineNo, lines) +
    // アイコン行を除く
    1;

  return [
    lines.slice(startLineNo, endLineNo + 1).map((line) => line.text.trim())
      .join("\n").trim(),
    startLineNo,
    endLineNo,
  ];
};
