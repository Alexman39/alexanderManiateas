import { navigate } from 'astro:transitions/client';
import { seals } from '../data/codex';
import { load, progress, record, reset } from './codex';
import { drawIn, reducedMotion } from './ink';

const CAM_KEY = 'codex:camera';
const INKED_KEY = 'codex:inked';
const VIEW_KEY = 'codex:view';

type Cam = { x: number; y: number; k: number };

const session = {
  get<T>(key: string): T | null {
    try {
      return JSON.parse(sessionStorage.getItem(key) ?? 'null');
    } catch {
      return null;
    }
  },
  set(key: string, value: unknown) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
};

let teardown: (() => void) | null = null;

document.addEventListener('astro:page-load', () => {
  teardown?.();
  teardown = null;
  const root = document.querySelector<HTMLElement>('[data-codex]');
  if (root) teardown = initCodex(root);
});

function initCodex(root: HTMLElement) {
  const ac = new AbortController();
  const on = { signal: ac.signal };
  const wrap = root.querySelector<HTMLElement>('[data-desk-wrap]')!;
  const desk = root.querySelector<HTMLElement>('[data-desk]')!;
  const world = root.querySelector<HTMLElement>('[data-world]')!;
  const W = Number(world.dataset.w);
  const H = Number(world.dataset.h);
  const nodes = [...root.querySelectorAll<HTMLAnchorElement>('[data-node]')];
  const mapView = root.querySelector<SVGRectElement>('[data-map-view]')!;
  const minimap = root.querySelector<HTMLElement>('[data-minimap]')!;

  root.classList.add('js-ready');

  /* ------------------------------------------------------------ view */

  const views = root.querySelectorAll<HTMLButtonElement>('[data-view-button]');
  let started = false;
  function setView(view: 'desk' | 'index') {
    root.dataset.view = view;
    views.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewButton === view)));
    try {
      localStorage.setItem(VIEW_KEY, view);
    } catch {}
    if (view === 'desk' && !started) {
      started = true;
      requestAnimationFrame(start);
    }
  }
  views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.viewButton as 'desk' | 'index'), on));

  /* ---------------------------------------------------------- camera */

  let cam: Cam = { x: 0, y: 0, k: 0.5 };
  let size = { w: 1, h: 1 };
  let tween = 0;
  let saveTimer = 0;

  // Room kept clear for the HUD when the whole desk is shown.
  const INSET = { top: 72, bottom: 12, side: 16 };
  const fitK = () => Math.min((size.w - 2 * INSET.side) / W, (size.h - INSET.top - INSET.bottom) / H);
  const minK = () => fitK() * 0.8;
  const maxK = () => 1.5;

  function measure() {
    const r = desk.getBoundingClientRect();
    size = { w: r.width || 1, h: r.height || 1 };
  }

  function clamp(c: Cam): Cam {
    const k = Math.min(maxK(), Math.max(minK(), c.k));
    const slackX = size.w * 0.4;
    const slackY = size.h * 0.4;
    const fit = (pos: number, view: number, span: number, slack: number) => {
      const lo = view - span * k - slack;
      const hi = slack;
      return lo > hi ? (view - span * k) / 2 : Math.min(hi, Math.max(lo, pos));
    };
    return { k, x: fit(c.x, size.w, W, slackX), y: fit(c.y, size.h, H, slackY) };
  }

  function apply() {
    world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.k})`;
    // Keep captions and domain names legible at any zoom.
    const cap = Math.min(18, Math.max(11, 16 * cam.k)) / cam.k / 16;
    world.dataset.lod = cam.k < 0.5 ? 'far' : 'near';
    world.style.setProperty('--cap', cap.toFixed(3));
    world.style.setProperty('--domain-size', `${(Math.min(60, Math.max(24, 60 * cam.k)) / cam.k).toFixed(1)}px`);
    mapView.setAttribute('x', String(-cam.x / cam.k));
    mapView.setAttribute('y', String(-cam.y / cam.k));
    mapView.setAttribute('width', String(size.w / cam.k));
    mapView.setAttribute('height', String(size.h / cam.k));
    clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => session.set(CAM_KEY, cam), 150);
  }

  function set(c: Cam) {
    cancelAnimationFrame(tween);
    cam = clamp(c);
    apply();
  }

  function flyTo(target: Cam, ms = 900) {
    cancelAnimationFrame(tween);
    const to = clamp(target);
    if (reducedMotion()) return set(to), Promise.resolve();
    const from = { ...cam };
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    return new Promise<void>((resolve) => {
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        const e = ease(t);
        // Interpolate zoom geometrically so the dive feels even.
        const k = from.k * Math.pow(to.k / from.k, e);
        // Interpolate the world point at the viewport centre, then derive x/y.
        const cx = lerp((size.w / 2 - from.x) / from.k, (size.w / 2 - to.x) / to.k, e);
        const cy = lerp((size.h / 2 - from.y) / from.k, (size.h / 2 - to.y) / to.k, e);
        cam = { k, x: size.w / 2 - cx * k, y: size.h / 2 - cy * k };
        apply();
        if (t < 1) tween = requestAnimationFrame(step);
        else resolve();
      };
      tween = requestAnimationFrame(step);
    });
  }

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const centreOn = (wx: number, wy: number, k = cam.k): Cam => ({ k, x: size.w / 2 - wx * k, y: size.h / 2 - wy * k });
  const fitCam = (): Cam => {
    const c = centreOn(W / 2, H / 2, fitK());
    return { ...c, y: c.y + (INSET.top - INSET.bottom) / 2 };
  };

  function zoomAt(factor: number, px = size.w / 2, py = size.h / 2) {
    const k = Math.min(maxK(), Math.max(minK(), cam.k * factor));
    const wx = (px - cam.x) / cam.k;
    const wy = (py - cam.y) / cam.k;
    set({ k, x: px - wx * k, y: py - wy * k });
  }

  /* ---------------------------------------------------------- input */

  const pointers = new Map<number, { x: number; y: number }>();
  let dragged = false;
  let downAt = { x: 0, y: 0 };
  let pinch: { d: number; k: number; wx: number; wy: number } | null = null;

  const local = (e: { clientX: number; clientY: number }) => {
    const r = desk.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  desk.addEventListener(
    'pointerdown',
    (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      cancelAnimationFrame(tween);
      pointers.set(e.pointerId, local(e));
      if (pointers.size === 1) {
        dragged = false;
        downAt = local(e);
      }
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), k: cam.k, wx: (mid.x - cam.x) / cam.k, wy: (mid.y - cam.y) / cam.k };
        dragged = true;
      }
    },
    on,
  );

  desk.addEventListener(
    'pointermove',
    (e) => {
      const prev = pointers.get(e.pointerId);
      if (!prev) return;
      const p = local(e);
      pointers.set(e.pointerId, p);

      if (pointers.size === 1) {
        if (!dragged && Math.hypot(p.x - downAt.x, p.y - downAt.y) > 6) {
          dragged = true;
          desk.setPointerCapture(e.pointerId);
          desk.classList.add('is-dragging');
          wrap.classList.add('has-moved');
        }
        if (dragged) set({ ...cam, x: cam.x + p.x - prev.x, y: cam.y + p.y - prev.y });
      } else if (pointers.size === 2 && pinch) {
        const [a, b] = [...pointers.values()];
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const k = pinch.k * (Math.hypot(a.x - b.x, a.y - b.y) / pinch.d);
        set({ k, x: mid.x - pinch.wx * k, y: mid.y - pinch.wy * k });
        wrap.classList.add('has-moved');
      }
    },
    on,
  );

  const release = (e: PointerEvent) => {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinch = null;
    if (pointers.size === 0) desk.classList.remove('is-dragging');
  };
  desk.addEventListener('pointerup', release, on);
  desk.addEventListener('pointercancel', release, on);

  desk.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      cancelAnimationFrame(tween);
      wrap.classList.add('has-moved');
      const p = local(e);
      const lines = e.deltaMode === 1 ? 16 : 1;
      // Trackpads send small, fractional or sideways deltas: pan with them. Pinch arrives as ctrl+wheel.
      const trackpadPan = !e.ctrlKey && e.deltaMode === 0 && (e.deltaX !== 0 || !Number.isInteger(e.deltaY) || Math.abs(e.deltaY) < 30);
      if (trackpadPan) set({ ...cam, x: cam.x - e.deltaX, y: cam.y - e.deltaY });
      else zoomAt(Math.exp(-e.deltaY * lines * (e.ctrlKey ? 0.012 : 0.0018)), p.x, p.y);
    },
    { ...on, passive: false },
  );

  desk.addEventListener(
    'keydown',
    (e) => {
      if (e.target !== desk) return;
      const step = 90;
      const moves: Record<string, [number, number]> = {
        ArrowLeft: [step, 0],
        ArrowRight: [-step, 0],
        ArrowUp: [0, step],
        ArrowDown: [0, -step],
      };
      if (moves[e.key]) {
        e.preventDefault();
        const [dx, dy] = moves[e.key];
        flyTo({ ...cam, x: cam.x + dx, y: cam.y + dy }, 250);
      } else if (e.key === '+' || e.key === '=') zoomAt(1.25);
      else if (e.key === '-' || e.key === '_') zoomAt(0.8);
      else if (e.key === '0') flyTo(fitCam(), 600);
    },
    on,
  );

  root.querySelectorAll<HTMLButtonElement>('[data-zoom]').forEach((b) =>
    b.addEventListener(
      'click',
      () => {
        const z = b.dataset.zoom;
        if (z === 'fit') flyTo(fitCam(), 700);
        else {
          const k = cam.k * (z === 'in' ? 1.4 : 1 / 1.4);
          flyTo({ k, x: size.w / 2 - ((size.w / 2 - cam.x) / cam.k) * k, y: size.h / 2 - ((size.h / 2 - cam.y) / cam.k) * k }, 350);
        }
      },
      on,
    ),
  );

  /* ---------------------------------------------------------- nodes */

  for (const node of nodes) {
    const slug = node.dataset.node!;
    const nx = Number(node.dataset.x);
    const ny = Number(node.dataset.y);

    // Swallow the click that ends a drag.
    node.addEventListener('click', (e) => {
      e.preventDefault();
      if (dragged) return;
      const before = { ...cam };
      session.set(CAM_KEY, before);
      if (reducedMotion()) return navigate(node.href);
      flyTo(centreOn(nx, ny, Math.max(cam.k, 1.25)), 700).then(() => {
        // Return to the view the visitor left, not the dive.
        clearTimeout(saveTimer);
        session.set(CAM_KEY, before);
        navigate(node.href);
      });
    }, on);

    // Keyboard users: bring the focused folio into view.
    node.addEventListener('focus', () => {
      if (pointers.size === 0) flyTo(centreOn(nx, ny, Math.max(cam.k, 0.9)), 500);
    }, on);

    const threads = root.querySelectorAll(`.thread[data-a="${slug}"], .thread[data-b="${slug}"]`);
    node.addEventListener('pointerenter', () => threads.forEach((t) => t.classList.add('hot')), on);
    node.addEventListener('pointerleave', () => threads.forEach((t) => t.classList.remove('hot')), on);
  }

  /* -------------------------------------------------------- minimap */

  let mapDragging = false;
  const mapTo = (e: PointerEvent) => {
    const svg = minimap.querySelector('svg')!.getBoundingClientRect();
    const wx = ((e.clientX - svg.left) / svg.width) * W;
    const wy = ((e.clientY - svg.top) / svg.height) * H;
    set(centreOn(wx, wy));
  };
  minimap.addEventListener('pointerdown', (e) => {
    mapDragging = true;
    minimap.setPointerCapture(e.pointerId);
    mapTo(e);
    record('map');
  }, on);
  minimap.addEventListener('pointermove', (e) => mapDragging && mapTo(e), on);
  minimap.addEventListener('pointerup', () => (mapDragging = false), on);

  /* -------------------------------------------------------- progress */

  function renderProgress(animate: boolean) {
    const state = load();
    const p = progress(state);
    const inked = new Set(session.get<string[]>(INKED_KEY) ?? []);
    const firstArrival = !session.get(CAM_KEY);

    nodes.forEach((node, i) => {
      const slug = node.dataset.node!;
      const studied = state.visited.includes(slug);
      const svg = node.querySelector<SVGSVGElement>('svg.sketch')!;
      node.classList.toggle('is-studied', studied);
      const stateEl = node.querySelector<HTMLElement>('[data-node-state]')!;
      stateEl.textContent = (studied ? stateEl.dataset.studied : stateEl.dataset.notStudied) ?? '';
      root.querySelector(`[data-map-node="${slug}"]`)?.classList.toggle('studied', studied);
      if (!node.classList.contains('unfinished')) {
        svg.classList.toggle('is-pencil', !studied);
        svg.classList.toggle('is-ink', studied);
      }
      if (animate) {
        // Newly studied folios ink themselves in; everything else is sketched in on first arrival.
        if (firstArrival) drawIn(svg, 150 + i * 90, 18);
        else if (studied && !inked.has(slug)) drawIn(svg, 500);
      }
      if (studied) inked.add(slug);
    });
    session.set(INKED_KEY, [...inked]);

    root.querySelectorAll<SVGPathElement>('.thread').forEach((t) => {
      t.classList.toggle('lit', state.visited.includes(t.dataset.a!) && state.visited.includes(t.dataset.b!));
    });

    const text = (sel: string, value: string) => root.querySelectorAll(sel).forEach((el) => (el.textContent = value));
    text('[data-hud-rank-name]', p.rank.name);
    text('[data-hud-rank-en]', p.rank.gloss[document.documentElement.lang === 'el' ? 'el' : 'en']);
    text('[data-hud-studied]', String(p.studied));
    text('[data-hud-total]', String(p.total));
    text('[data-hud-seals]', `${state.seals.length}/${seals.length}`);
    root.querySelector<HTMLElement>('[data-hud-meter]')!.style.width = `${(p.studied / Math.max(1, p.total)) * 100}%`;
    root.querySelectorAll<HTMLElement>('[data-seal]').forEach((li) => li.classList.toggle('earned', state.seals.includes(li.dataset.seal!)));
  }

  document.addEventListener('codex:change', () => renderProgress(false), on);

  root.querySelector('[data-reset]')?.addEventListener('click', () => {
    const button = root.querySelector<HTMLElement>('[data-reset]')!;
    if (!confirm(button.dataset.confirm)) return;
    session.set(INKED_KEY, []);
    reset();
  }, on);

  /* ----------------------------------------------------------- start */

  function start() {
    measure();
    const saved = session.get<Cam>(CAM_KEY);
    if (saved) set(saved);
    else {
      // Open slightly zoomed in, then settle back to show the whole desk.
      set(centreOn(W / 2, H / 2, fitK() * 1.18));
      requestAnimationFrame(() => flyTo(fitCam(), 1600));
    }
  }

  const resize = new ResizeObserver(() => {
    if (root.dataset.view !== 'desk') return;
    const cx = (size.w / 2 - cam.x) / cam.k;
    const cy = (size.h / 2 - cam.y) / cam.k;
    measure();
    set(centreOn(cx, cy));
  });
  resize.observe(desk);

  let initial: 'desk' | 'index' = matchMedia('(max-width: 760px)').matches ? 'index' : 'desk';
  try {
    const v = localStorage.getItem(VIEW_KEY);
    if (v === 'desk' || v === 'index') initial = v;
  } catch {}
  renderProgress(true);
  setView(initial);

  return () => {
    ac.abort();
    resize.disconnect();
    cancelAnimationFrame(tween);
  };
}
