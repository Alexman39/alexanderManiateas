export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Draw a sketch's strokes in, one after another, as if by hand. */
export function drawIn(svg: SVGSVGElement | null | undefined, delay = 0, pace = 28) {
  if (!svg || reducedMotion()) return;
  const strokes = svg.querySelectorAll<SVGElement>('.m, .t, .h');
  strokes.forEach((el, i) => {
    el.style.animationDelay = `${delay + Math.min(i * pace, 900)}ms`;
  });
  svg.classList.remove('is-drawing');
  // Force a reflow so the animation restarts if it ran before.
  void svg.getBoundingClientRect();
  svg.classList.add('is-drawing');
  const total = delay + Math.min(strokes.length * pace, 900) + 1600;
  setTimeout(() => svg.classList.remove('is-drawing'), total);
}
