import { rankFor, seals, type CodexMeta } from '../data/codex';

/** Visitor progress through the codex, kept in this browser only. */
type State = { visited: string[]; seals: string[]; events: string[] };

const KEY = 'codex:v1';
const empty = (): State => ({ visited: [], seals: [], events: [] });

export function load(): State {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
    if (raw && Array.isArray(raw.visited)) return { ...empty(), ...raw };
  } catch {}
  return empty();
}

function save(state: State) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function meta(): CodexMeta {
  try {
    return JSON.parse(document.getElementById('codex-meta')?.textContent ?? '[]');
  } catch {
    return [];
  }
}

export function progress(state = load()) {
  const all = meta();
  const studied = all.filter((p) => state.visited.includes(p.slug)).length;
  return { studied, total: all.length, rank: rankFor(studied, all.length), state };
}

function earned(state: State, all: CodexMeta) {
  const seen = (slug: string) => state.visited.includes(slug);
  return seals
    .filter(({ rule }) => {
      switch (rule.kind) {
        case 'any':
          return state.visited.length > 0;
        case 'event':
          return state.events.includes(rule.event);
        case 'capolavoro':
          return all.some((p) => p.capolavoro && seen(p.slug));
        case 'all':
          return all.length > 0 && all.every((p) => seen(p.slug));
        case 'domain': {
          const inDomain = all.filter((p) => p.domain === rule.domain);
          return inDomain.length > 0 && inDomain.every((p) => seen(p.slug));
        }
      }
    })
    .map((s) => s.id);
}

function commit(next: State) {
  const before = progress();
  const all = meta();
  const newSeals = earned(next, all).filter((id) => !next.seals.includes(id));
  next.seals = [...next.seals, ...newSeals];
  save(next);
  const after = progress(next);

  for (const id of newSeals) {
    const seal = seals.find((s) => s.id === id)!;
    toast(seal.glyph, seal.name, seal.hint);
  }
  if (after.rank.id !== before.rank.id) {
    toast('✦', `You are now ${after.rank.name}`, `${after.rank.english} of the workshop.`);
  }
  document.dispatchEvent(new CustomEvent('codex:change', { detail: { newSeals, ...after } }));
}

export function visit(slug: string) {
  const state = load();
  if (state.visited.includes(slug)) return false;
  state.visited.push(slug);
  commit(state);
  return true;
}

export function record(event: string) {
  const state = load();
  if (state.events.includes(event)) return;
  state.events.push(event);
  commit(state);
}

export function reset() {
  save(empty());
  document.dispatchEvent(new CustomEvent('codex:change', { detail: { newSeals: [], ...progress() } }));
}

function toast(glyph: string, title: string, body: string) {
  const host = document.getElementById('toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<span class="wax" aria-hidden="true"></span><span><strong></strong><small></small></span>`;
  el.querySelector('.wax')!.textContent = glyph;
  el.querySelector('strong')!.textContent = title;
  el.querySelector('small')!.textContent = body;
  host.append(el);
  setTimeout(() => el.classList.add('out'), 4200);
  setTimeout(() => el.remove(), 4800);
}

// Mirror notes flip on hover, focus or tap. Reading one earns a seal.
document.addEventListener('click', (e) => {
  const note = (e.target as Element).closest('.mirror');
  if (!note) return;
  note.classList.toggle('is-read');
  record('mirror');
});
document.addEventListener('pointerover', (e) => {
  if ((e.target as Element).closest?.('.mirror')) setTimeout(() => record('mirror'), 600);
});

