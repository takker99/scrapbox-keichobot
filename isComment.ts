/** Detect whether `text` is a comment or not */
export const isComment = (text: string): boolean => /^[(（]/.test(text);
