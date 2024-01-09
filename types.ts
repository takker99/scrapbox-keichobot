export type Result<T, E> = { ok: true; value: T } | { ok: false; value: E };

export interface ResponseError {
  name: "ResponseError";
  res: Response;
}

export interface GMFetchNotAvailableError {
  name: "GMFetchNotAvailableError";
}
