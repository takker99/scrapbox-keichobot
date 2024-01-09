import { insertText, takeCursor, takeSelection } from "./deps/scrapbox-dom.ts";
import { BaseLine } from "./deps/scrapbox-std.ts";

/** `base`の下に書き込む */
export const writeAfter = async (
  text: string,
  base: BaseLine,
  lineNo: number,
): Promise<number> => {
  const cursor = takeCursor();

  // 挿入位置を探す

  // 1. baseのidと一致する行
  let insertNo = cursor.lines.findIndex((line) => line.id === base.id);
  if (insertNo < 0) {
    // 2. baseのtextと一致する行
    insertNo = cursor.lines.findIndex((line) => line.text === base.text);
  }
  if (insertNo < 0) {
    // 3. baseの行番号から推定する
    insertNo = Math.min(lineNo, Math.max(0, cursor.lines.length - 1));
  }

  //書き込む
  const prevText = cursor.lines[insertNo].text;
  takeSelection().clear();
  cursor.setPosition({ line: insertNo, char: [...prevText].length });
  await insertText(`\n${text}`);

  return cursor.getPosition().line;
};
