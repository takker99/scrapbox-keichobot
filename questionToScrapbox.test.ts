import { assertEquals } from "./deps/assert.ts";
import { questionToScrapbox } from "./questionToScrapbox.ts";

Deno.test("questionToScrapbox()", () => {
  assertEquals(
    questionToScrapbox("あなたはこの会話で何が起きて欲しいですか？"),
    "あなたはこの会話で何が起きて欲しいですか？",
  );

  assertEquals(
    questionToScrapbox(
      "とりあえず質問するか\n\nあなたはこの質問をどう知るのですか？",
    ),
    `> とりあえず質問するか\nあなたはこの質問をどう知るのですか？`,
  );
});
