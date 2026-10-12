const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Plain text with `code` spans, for short frontmatter strings. Safe to pass to set:html. */
export const inline = (s: string) => escape(s).replace(/`([^`]+)`/g, '<code>$1</code>');

const numerals: [number, string][] = [
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

/** 1 → I, 6 → VI: plate numbers, as in Leonardo's codices. */
export function roman(n: number) {
  let out = '';
  for (const [value, glyph] of numerals) {
    while (n >= value) {
      out += glyph;
      n -= value;
    }
  }
  return out;
}
