/** parse a reply by keichobot and convert it to Scrapbox syntax.
 *
 * @param reply reply by keichobot
 * @return Scrapbox syntax
 */
export const questionToScrapbox = (question: string): string => {
  const splitted = question.split("\n\n");
  const q = splitted[1] ?? splitted[0];
  const quote = question === splitted[0] ? "" : splitted[0];
  return quote ? [quote.trim(), q].join("\n") : q;
};
