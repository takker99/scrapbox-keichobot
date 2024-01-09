import { APIROOT } from "./APIROOT.ts";
import { GMFetchNotAvailableError, ResponseError, Result } from "./types.ts";

declare global {
  interface Window {
    GM_fetch: (typeof fetch) | undefined;
  }
}

export interface Answer {
  text: string;
  buttons: string[];
  canInput: boolean;
}

export const ask = async (
  text: string,
  talkId: string,
): Promise<Result<Answer, ResponseError | GMFetchNotAvailableError>> => {
  if (!window.GM_fetch) {
    return { ok: false, value: { name: "GMFetchNotAvailableError" } };
  }

  const res = await window.GM_fetch(`${APIROOT}web/`, {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ user: "nobody", talk: talkId, text }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) return { ok: false, value: { name: "ResponseError", res } };

  const data = await res.json();
  return {
    ok: true,
    value: { text: data.text, buttons: data.buttons, canInput: data.can_input },
  };
};
