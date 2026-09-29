// Tiny client-side search: every query word must match somewhere; matches in
// the title and tags rank higher. Plenty for a directory of a few hundred items.

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export type SearchField = { text: string; weight: number };

export function score(query: string, fields: SearchField[]): number {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (terms.length === 0) return 1;
  const prepared = fields.map((f) => ({ words: normalize(f.text).split(" "), weight: f.weight }));
  let total = 0;
  for (const term of terms) {
    let best = 0;
    for (const { words, weight } of prepared) {
      for (const word of words) {
        if (word === term) best = Math.max(best, weight * 2);
        else if (word.startsWith(term)) best = Math.max(best, weight);
      }
    }
    if (best === 0) return 0; // every term must match something
    total += best;
  }
  return total;
}
