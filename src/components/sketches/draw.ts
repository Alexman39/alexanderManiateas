/**
 * Tiny helpers for building ink sketches as SVG markup (200×200 viewBox).
 * Class names map to pen weights in global.css:
 *   m main stroke · t fine detail · h hatching · c construction · w sanguine wash · f solid ink
 */

const r1 = (n: number) => Math.round(n * 10) / 10;

export const path = (d: string, cls = 'm') => `<path class="${cls}" d="${d}"/>`;
export const line = (x1: number, y1: number, x2: number, y2: number, cls = 'm') =>
  `<line class="${cls}" x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}"/>`;
export const circle = (cx: number, cy: number, r: number, cls = 'm') =>
  `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;
export const rect = (x: number, y: number, w: number, h: number, cls = 'm') =>
  `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}"/>`;
export const label = (x: number, y: number, text: string, size = 9) =>
  `<text x="${x}" y="${y}" font-size="${size}">${text}</text>`;

/** Leonardo hatched left-handed: strokes run from top-left to bottom-right (x − y = c). */
export function hatchRect(x: number, y: number, w: number, h: number, gap = 4, cls = 'h') {
  let d = '';
  for (let c = x - (y + h) + gap / 2; c < x + w - y; c += gap) {
    const xa = Math.max(x, c + y);
    const xb = Math.min(x + w, c + y + h);
    if (xb - xa < 1) continue;
    d += `M${r1(xa)} ${r1(xa - c)}L${r1(xb)} ${r1(xb - c)}`;
  }
  return path(d, cls);
}

/**
 * Hatch the part of a circle on one side of its centre line, giving a crescent of shade.
 * `from`/`to` are fractions of the diameter across the hatch direction (0 = lower-left edge, 1 = upper-right edge).
 */
export function hatchCircle(cx: number, cy: number, r: number, gap = 4, from = 0, to = 0.45, cls = 'h') {
  let d = '';
  const span = r * Math.SQRT2 * 2;
  const c0 = cx - cy - r * Math.SQRT2;
  for (let c = c0 + span * from + gap / 2; c < c0 + span * to; c += gap) {
    const dist = (cx - cy - c) / Math.SQRT2;
    const half = Math.sqrt(Math.max(0, r * r - dist * dist));
    if (half < 1) continue;
    // Foot of the perpendicular from the centre onto x − y = c.
    const mx = cx - dist / Math.SQRT2;
    const my = cy + dist / Math.SQRT2;
    const k = half / Math.SQRT2;
    d += `M${r1(mx - k)} ${r1(my - k)}L${r1(mx + k)} ${r1(my + k)}`;
  }
  return path(d, cls);
}

/** A spur gear outline with trapezoid teeth. */
export function gear(cx: number, cy: number, r: number, teeth: number, depth = 6, phase = 0, cls = 'm') {
  const pts: string[] = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = phase + i * step;
    const at = (ang: number, rad: number) =>
      `${r1(cx + Math.cos(ang) * rad)} ${r1(cy + Math.sin(ang) * rad)}`;
    pts.push(at(a, r - depth / 2), at(a + step * 0.18, r + depth / 2), at(a + step * 0.48, r + depth / 2), at(a + step * 0.66, r - depth / 2));
  }
  return path(`M${pts.join('L')}Z`, cls);
}

/** Spokes radiating from a hub to a rim. */
export function spokes(cx: number, cy: number, r0: number, r: number, n: number, phase = 0, cls = 't') {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = phase + (i * Math.PI * 2) / n;
    d += `M${r1(cx + Math.cos(a) * r0)} ${r1(cy + Math.sin(a) * r0)}L${r1(cx + Math.cos(a) * r)} ${r1(cy + Math.sin(a) * r)}`;
  }
  return path(d, cls);
}

/** Wheel: rim, inner rim, hub and spokes. */
export const wheel = (cx: number, cy: number, r: number, n = 8, phase = 0) =>
  circle(cx, cy, r) + circle(cx, cy, r - 4, 't') + circle(cx, cy, 4) + spokes(cx, cy, 4, r - 4, n, phase);

/** Tick marks around a circle, as on a dial. */
export function ticks(cx: number, cy: number, r: number, n: number, len = 3, cls = 't') {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i * Math.PI * 2) / n;
    const l = i % (n / 4) === 0 ? len * 2 : len;
    d += `M${r1(cx + Math.cos(a) * r)} ${r1(cy + Math.sin(a) * r)}L${r1(cx + Math.cos(a) * (r - l))} ${r1(cy + Math.sin(a) * (r - l))}`;
  }
  return path(d, cls);
}

/** Lines of "writing" inside a box. */
export function writing(x: number, y: number, w: number, rows: number, gap = 6, cls = 't') {
  let d = '';
  for (let i = 0; i < rows; i++) {
    const len = w * (i % 3 === 2 ? 0.55 : 0.85 + ((i * 37) % 10) / 70);
    d += `M${x} ${y + i * gap}L${r1(x + Math.min(len, w))} ${y + i * gap}`;
  }
  return path(d, cls);
}

/** A pointed leaf of length `len`, centred on (x, y) and turned by `angle` radians. */
export function leaf(x: number, y: number, angle: number, len = 16, width = 6, cls = 't') {
  const c = Math.cos(angle);
  const sn = Math.sin(angle);
  const at = (u: number, v: number) => `${r1(x + u * c - v * sn)} ${r1(y + u * sn + v * c)}`;
  const h = len / 2;
  return path(`M${at(-h, 0)}Q${at(0, -width)} ${at(h, 0)}Q${at(0, width)} ${at(-h, 0)}M${at(-h, 0)}L${at(h * 0.8, 0)}`, cls);
}

/** Sum of sines, drawn as a line: `harmonics` are [cycles across the width, amplitude]. */
export function wave(x: number, y: number, w: number, h: number, harmonics: [number, number][], cls = 'm') {
  const peak = harmonics.reduce((sum, [, a]) => sum + a, 0);
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const v = harmonics.reduce((sum, [f, a]) => sum + a * Math.sin(2 * Math.PI * f * t), 0) / peak;
    d += `${i ? 'L' : 'M'}${r1(x + t * w)} ${r1(y - v * h)}`;
  }
  return path(d, cls);
}
