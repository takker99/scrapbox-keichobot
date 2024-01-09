import { APIROOT } from "./APIROOT.ts";
import { GMFetchNotAvailableError, ResponseError, Result } from "./types.ts";

declare global {
  interface Window {
    GM_fetch: (typeof fetch) | undefined;
  }
}

export type Mode = "normal" | "empathy_writing" | "KPT" | "value_hypothesis";

export const getNewTalkId = async (
  mode: Mode = "normal",
): Promise<Result<string, ResponseError | GMFetchNotAvailableError>> => {
  if (!window.GM_fetch) {
    return { ok: false, value: { name: "GMFetchNotAvailableError" } };
  }

  const res = await window.GM_fetch(`${APIROOT}web/create/?mode=${mode}`, {
    mode: "cors",
  });

  return res.ok
    ? { ok: true, value: await res.text() }
    : { ok: false, value: { name: "ResponseError", res } };
};
