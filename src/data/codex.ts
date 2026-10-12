import type { Lang } from '../i18n';

type L = Record<Lang, string>;

export const domains = {
  anatomia: {
    name: 'Anatomia',
    gloss: { en: 'Body & discipline', el: 'Σώμα & πειθαρχία' },
    blurb: { en: 'Where training and software meet.', el: 'Εκεί όπου η προπόνηση συναντά το λογισμικό.' },
  },
  commissioni: {
    name: 'Commissioni',
    gloss: { en: 'Commissions', el: 'Παραγγελίες' },
    blurb: { en: 'Freelance work for patrons, since 2020.', el: 'Freelance δουλειά για πελάτες, από το 2020.' },
  },
  studi: {
    name: 'Studi',
    gloss: { en: 'Studies', el: 'Μελέτες' },
    blurb: { en: 'Tools for learning, and for language.', el: 'Εργαλεία για τη μάθηση και για τη γλώσσα.' },
  },
  macchine: {
    name: 'Macchine',
    gloss: { en: 'Machines', el: 'Μηχανές' },
    blurb: { en: 'Small, sharp tools that do one job well.', el: 'Μικρά, κοφτερά εργαλεία που κάνουν μία δουλειά καλά.' },
  },
} satisfies Record<string, { name: string; gloss: L; blurb: L }>;

export type Domain = keyof typeof domains;

export const statuses = {
  live: { en: 'Live', el: 'Σε λειτουργία' },
  alpha: { en: 'In development', el: 'Σε ανάπτυξη' },
  shipped: { en: 'Completed', el: 'Ολοκληρωμένο' },
  'non-finito': { en: 'Non finito', el: 'Non finito' },
} satisfies Record<string, L>;

export type Status = keyof typeof statuses;

/** Workshop ranks, as in Verrocchio's bottega. `at` is the share of folios studied. */
export const ranks = [
  { id: 'garzone', name: 'Garzone', gloss: { en: 'Shop boy', el: 'Παραγιός' }, at: 0 },
  { id: 'apprendista', name: 'Apprendista', gloss: { en: 'Apprentice', el: 'Μαθητευόμενος' }, at: 0.25 },
  { id: 'lavorante', name: 'Lavorante', gloss: { en: 'Journeyman', el: 'Τεχνίτης' }, at: 0.6 },
  { id: 'maestro', name: 'Maestro', gloss: { en: 'Master', el: 'Μάστορας' }, at: 1 },
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
export const seals: { id: string; name: string; hint: L; glyph: string; rule: SealRule }[] = [
  { id: 'primo', name: 'Primo sguardo', hint: { en: 'Open your first folio.', el: 'Ανοίξτε το πρώτο σας φύλλο.' }, glyph: 'I', rule: { kind: 'any' } },
  { id: 'specchio', name: 'Lo specchio', hint: { en: 'Read a note written in mirror script.', el: 'Διαβάστε μια σημείωση σε κατοπτρική γραφή.' }, glyph: 'Я', rule: { kind: 'event', event: 'mirror' } },
  { id: 'cartografo', name: 'Il cartografo', hint: { en: 'Find your way with the map.', el: 'Βρείτε τον δρόμο σας με τον χάρτη.' }, glyph: '✣', rule: { kind: 'event', event: 'map' } },
  { id: 'prova', name: 'La prova', hint: { en: 'Set a working machine running.', el: 'Θέστε σε λειτουργία μια μηχανή που δουλεύει.' }, glyph: '⚙', rule: { kind: 'event', event: 'demo' } },
  { id: 'mecenate', name: 'Il mecenate', hint: { en: 'Study every commission.', el: 'Μελετήστε όλες τις παραγγελίες.' }, glyph: 'C', rule: { kind: 'domain', domain: 'commissioni' } },
  { id: 'studioso', name: 'Lo studioso', hint: { en: 'Study every study.', el: 'Μελετήστε όλες τις μελέτες.' }, glyph: 'S', rule: { kind: 'domain', domain: 'studi' } },
  { id: 'ingegnere', name: "L'ingegnere", hint: { en: 'Study every machine.', el: 'Μελετήστε όλες τις μηχανές.' }, glyph: 'M', rule: { kind: 'domain', domain: 'macchine' } },
  { id: 'capolavoro', name: 'Il capolavoro', hint: { en: 'Find the masterpiece.', el: 'Βρείτε το αριστούργημα.' }, glyph: '★', rule: { kind: 'capolavoro' } },
  { id: 'maestro', name: 'Maestro', hint: { en: 'Study every folio in the codex.', el: 'Μελετήστε κάθε φύλλο του κώδικα.' }, glyph: 'Ω', rule: { kind: 'all' } },
];

/** What the browser needs to evaluate progress; embedded on every page. */
export type CodexMeta = { slug: string; title: string; domain: Domain; capolavoro: boolean }[];
