export const domains = {
  anatomia: { name: 'Anatomia', english: 'Body & discipline', blurb: 'Where training and software meet.' },
  commissioni: { name: 'Commissioni', english: 'Commissions', blurb: 'Freelance work for patrons, since 2020.' },
  studi: { name: 'Studi', english: 'Studies', blurb: 'Tools for learning, and for language.' },
  macchine: { name: 'Macchine', english: 'Machines', blurb: 'Small, sharp tools that do one job well.' },
} as const;

export type Domain = keyof typeof domains;

export const statuses = {
  live: 'Live',
  alpha: 'In development',
  shipped: 'Completed',
  'non-finito': 'Non finito',
} as const;

/** Workshop ranks, as in Verrocchio's bottega. `at` is the share of folios studied. */
export const ranks = [
  { id: 'garzone', name: 'Garzone', english: 'Shop boy', at: 0 },
  { id: 'apprendista', name: 'Apprendista', english: 'Apprentice', at: 0.25 },
  { id: 'lavorante', name: 'Lavorante', english: 'Journeyman', at: 0.6 },
  { id: 'maestro', name: 'Maestro', english: 'Master', at: 1 },
] as const;

export const rankFor = (studied: number, total: number) =>
  [...ranks].reverse().find((r) => total > 0 && studied / total >= r.at) ?? ranks[0];

export type SealRule =
  | { kind: 'any' }
  | { kind: 'domain'; domain: Domain }
  | { kind: 'capolavoro' }
  | { kind: 'all' }
  | { kind: 'event'; event: string };

/** Wax seals the visitor can earn. */
export const seals: { id: string; name: string; hint: string; glyph: string; rule: SealRule }[] = [
  { id: 'primo', name: 'Primo sguardo', hint: 'Open your first folio.', glyph: 'I', rule: { kind: 'any' } },
  { id: 'specchio', name: 'Lo specchio', hint: 'Read a note written in mirror script.', glyph: 'Я', rule: { kind: 'event', event: 'mirror' } },
  { id: 'cartografo', name: 'Il cartografo', hint: 'Find your way with the map.', glyph: '✣', rule: { kind: 'event', event: 'map' } },
  { id: 'mecenate', name: 'Il mecenate', hint: 'Study every commission.', glyph: 'C', rule: { kind: 'domain', domain: 'commissioni' } },
  { id: 'studioso', name: 'Lo studioso', hint: 'Study every study.', glyph: 'S', rule: { kind: 'domain', domain: 'studi' } },
  { id: 'ingegnere', name: "L'ingegnere", hint: 'Study every machine.', glyph: 'M', rule: { kind: 'domain', domain: 'macchine' } },
  { id: 'capolavoro', name: 'Il capolavoro', hint: 'Find the masterpiece.', glyph: '★', rule: { kind: 'capolavoro' } },
  { id: 'maestro', name: 'Maestro', hint: 'Study every folio in the codex.', glyph: 'Ω', rule: { kind: 'all' } },
];

/** What the browser needs to evaluate progress; embedded on every page. */
export type CodexMeta = { slug: string; title: string; domain: Domain; capolavoro: boolean }[];
