import { url, useT, type Lang } from '../i18n';

export { url };

export const site = {
  email: 'maniateas52@gmail.com',
};

/** Fill these in and they appear in the footer and on About. Empty ones are hidden. */
export const socials: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/Alexman39' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexander-maniateas/' },
].filter((s) => s.href);

export function nav(lang: Lang) {
  const t = useT(lang);
  return [
    { label: t('nav.home'), href: url('', lang) },
    { label: t('nav.projects'), href: url('projects', lang) },
    { label: t('nav.about'), href: url('about', lang) },
    { label: t('nav.articles'), href: url('articles', lang) },
  ];
}

type Entry = { when: string; title: string; where: string; note: string };

export const experience: Record<Lang, Entry[]> = {
  en: [
    {
      when: '2025 –',
      title: 'Digital Systems Partner',
      where: 'FlexPro Coaching by Tasos Misailidis',
      note: 'Co-developing a digital fitness platform for online coaching: site structure, user experience, client journey.',
    },
    {
      when: '2024 –',
      title: 'BSc Computer Science',
      where: 'Metropolitan College, Athens',
      note: 'Java, object-oriented design, systems fundamentals.',
    },
    {
      when: '2020 –',
      title: 'Freelance Web Developer',
      where: 'Self-employed',
      note: 'Custom, mobile-first websites for small businesses, from first conversation to launch.',
    },
    {
      when: '2020 – 2023',
      title: 'Customer Service Agent',
      where: 'Teleperformance · Blu UK project',
      note: 'Technical and service support in a high-demand environment.',
    },
    {
      when: 'Earlier',
      title: 'Business Administration',
      where: 'University of the Aegean, Chios',
      note: 'Four years of study before switching to computer science.',
    },
  ],
  el: [
    {
      when: '2025 –',
      title: 'Digital Systems Partner',
      where: 'FlexPro Coaching by Tasos Misailidis',
      note: 'Συν-ανάπτυξη ψηφιακής πλατφόρμας fitness για online coaching: δομή ιστότοπου, εμπειρία χρήστη, διαδρομή πελάτη.',
    },
    {
      when: '2024 –',
      title: 'BSc Πληροφορικής',
      where: 'Metropolitan College, Αθήνα',
      note: 'Java, αντικειμενοστραφής σχεδίαση, βασικές αρχές συστημάτων.',
    },
    {
      when: '2020 –',
      title: 'Freelance Web Developer',
      where: 'Αυτοαπασχολούμενος',
      note: 'Ιστοσελίδες κατά παραγγελία, mobile-first, για μικρές επιχειρήσεις, από την πρώτη συζήτηση μέχρι την κυκλοφορία.',
    },
    {
      when: '2020 – 2023',
      title: 'Εκπρόσωπος Εξυπηρέτησης Πελατών',
      where: 'Teleperformance · Blu UK project',
      note: 'Τεχνική υποστήριξη και εξυπηρέτηση σε περιβάλλον υψηλού φόρτου.',
    },
    {
      when: 'Νωρίτερα',
      title: 'Διοίκηση Επιχειρήσεων',
      where: 'Πανεπιστήμιο Αιγαίου, Χίος',
      note: 'Τέσσερα χρόνια σπουδών πριν στραφώ στην πληροφορική.',
    },
  ],
};

export const languages: Record<Lang, { name: string; level: string }[]> = {
  en: [
    { name: 'Greek', level: 'Native' },
    { name: 'English', level: 'Proficiency' },
    { name: 'Russian', level: 'Learning' },
  ],
  el: [
    { name: 'Ελληνικά', level: 'Μητρική' },
    { name: 'Αγγλικά', level: 'Proficiency' },
    { name: 'Ρωσικά', level: 'Μαθαίνω' },
  ],
};

export const skills: Record<Lang, { name: string; note: string }[]> = {
  en: [
    { name: 'Java', note: 'Object-oriented programming, application development' },
    { name: 'JavaScript', note: 'Front-end development' },
    { name: 'Responsive web & UI/UX', note: 'Mobile-first interfaces, clean UI' },
    { name: 'System design', note: 'Fundamentals and application logic' },
    { name: 'Debugging & performance', note: 'Finding the slow part, then fixing it' },
    { name: 'Troubleshooting', note: 'Calm problem-solving, learnt on the support line' },
  ],
  el: [
    { name: 'Java', note: 'Αντικειμενοστραφής προγραμματισμός, ανάπτυξη εφαρμογών' },
    { name: 'JavaScript', note: 'Ανάπτυξη frontend' },
    { name: 'Responsive web & UI/UX', note: 'Mobile-first διεπαφές, καθαρό UI' },
    { name: 'Σχεδίαση συστημάτων', note: 'Βασικές αρχές και λογική εφαρμογών' },
    { name: 'Debugging & απόδοση', note: 'Βρίσκω το αργό σημείο, και μετά το διορθώνω' },
    { name: 'Επίλυση προβλημάτων', note: 'Ψύχραιμη αντιμετώπιση, που την έμαθα στη γραμμή υποστήριξης' },
  ],
};
