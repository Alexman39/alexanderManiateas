/** Prefix a site path with the deploy base (`/alexanderManiateas`). */
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

export const site = {
  name: 'Alexander Maniateas',
  role: 'Software Developer',
  city: 'Athens',
  email: 'maniateas52@gmail.com',
  description:
    'Alexander Maniateas: software developer and Computer Science student in Athens. A notebook of projects, studies and machines in the spirit of Leonardo.',
};

/** Fill these in and they appear in the footer and on About. Empty ones are hidden. */
export const socials: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/Alexman39' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alexander-maniateas/' },
].filter((s) => s.href);

export const nav = [
  { label: 'Home', href: url('') },
  { label: 'Projects', href: url('projects') },
  { label: 'About', href: url('about') },
  { label: 'Articles', href: url('articles') },
];

export const experience = [
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
];

export const languages = [
  { name: 'Greek', level: 'Native' },
  { name: 'English', level: 'Proficiency' },
  { name: 'Russian', level: 'Learning' },
];
