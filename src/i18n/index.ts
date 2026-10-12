export const langs = ['en', 'el'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'en';

/** Native names, shown in the language switch. */
export const langNames: Record<Lang, { short: string; long: string; locale: string }> = {
  en: { short: 'EN', long: 'English', locale: 'en-GB' },
  el: { short: 'ΕΛ', long: 'Ελληνικά', locale: 'el-GR' },
};

const base = () => import.meta.env.BASE_URL.replace(/\/$/, '');

/** Site path for a language: url('projects', 'el') → /alexanderManiateas/el/projects. */
export function url(path = '', lang: Lang = defaultLang) {
  const clean = path.replace(/^\//, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${base()}${prefix}/${clean}`.replace(/\/$/, '') || '/';
}

/** Split a pathname into its language and the language-neutral rest. */
export function splitPath(pathname: string): { lang: Lang; rest: string } {
  let rest = pathname.slice(base().length).replace(/^\//, '').replace(/\.html$/, '');
  if (rest === 'index') rest = '';
  const [first, ...tail] = rest.split('/');
  if ((langs as readonly string[]).includes(first) && first !== defaultLang) {
    return { lang: first as Lang, rest: tail.join('/').replace(/^index$/, '') };
  }
  return { lang: defaultLang, rest };
}

/** Params for `getStaticPaths` in src/pages/[...lang]: undefined builds the default language at the root. */
export const langParams = () => langs.map((l) => ({ params: { lang: l === defaultLang ? undefined : l } }));
export const langFromParam = (param: string | undefined): Lang => (param as Lang) ?? defaultLang;

export function formatDate(date: Date, lang: Lang) {
  return new Intl.DateTimeFormat(langNames[lang].locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

/** Interface strings. Content lives in src/content; this is everything around it. */
const en = {
    'site.name': 'Alexander Maniateas',
    'site.role': 'Software Developer',
    'site.city': 'Athens',
    'site.description':
      'Alexander Maniateas: software developer and Computer Science student in Athens. A notebook of projects, studies and machines in the spirit of Leonardo.',
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.articles': 'Articles',
    'nav.main': 'Main',
    'nav.menu': 'Menu',
    'nav.skip': 'Skip to content',
    'nav.homeAria': 'Alexander Maniateas, home',
    'theme.toggle': 'Toggle night study',
    'lang.switch': 'Διαβάστε στα ελληνικά',
    'rank.title': 'Your rank in the workshop',

    'footer.quote': 'Poor is the pupil who does not surpass his master · Leonardo, notebooks',
    'footer.mirror': 'Written right to left, read left to right',
    'footer.nav': 'Footer',

    'home.title': 'Software Developer',
    'home.eyebrow': 'Software developer · Athens · est. MMXX',
    'home.first': 'Alexander',
    'home.last': 'Maniateas',
    'home.lead':
      "I build web apps and small, sharp tools for people and businesses. I'm studying Computer Science at Metropolitan College, I've freelanced since 2020, and when I'm not at the keyboard, I'm training.",
    'home.cta': 'Open the codex →',
    'home.about': 'About me',
    'home.quote': 'First study the science, then follow the practice · Leonardo',
    'home.bench': 'On the workbench',
    'home.benchSub': "What I'm building now",
    'home.inviteTitle': 'Every project is a folio. Study them all and become <em>Maestro</em>.',
    'home.inviteText':
      "My portfolio is a notebook you explore: drag across the desk, open each drawing, earn the workshop's seals. {finished} works finished, {wip} still on the bench, {seals} seals to earn.",
    'home.inviteCta': 'Enter the codex →',
    'home.writing': 'From the notebook',
    'home.allArticles': 'All articles →',
    'portrait.alt': 'Portrait of Alexander Maniateas',

    'codex.title': 'Projects · Il Codice',
    'codex.description':
      "Alexander Maniateas's projects, laid out as a Leonardo-style codex you can explore: client work, studies and machines.",
    'codex.eyebrow': 'Il Codice · The Codex',
    'codex.h1': "Things I've made, kept the way <em>Leonardo</em> kept his notebooks.",
    'codex.intro':
      "Every project is a folio. Pencil sketches are waiting to be studied; open one and it's inked into your copy of the codex. Half-drawn ones are <em class=\"italian\">non finito</em>, still on the workbench. {finished} finished, {wip} in the workshop.",
    'codex.view': 'View',
    'codex.desk': 'Desk',
    'codex.index': 'Index',
    'desk.aria':
      'The codex desk. Drag or use the arrow keys to move, scroll or press plus and minus to zoom. Tab to move between folios.',
    'desk.sub': 'projects · studies · machines · MMXX –',
    'desk.hint': 'Drag to explore · scroll to zoom · click a sketch to study it',
    'desk.studiedOf': '{studied} of {total} folios studied',
    'desk.zoomIn': 'Zoom in',
    'desk.zoomOut': 'Zoom out',
    'desk.fit': 'Show the whole desk',
    'desk.seals': 'Seals earned',
    'desk.sealsTitle': 'Seals of the workshop',
    'desk.close': 'Close',
    'desk.reset': 'Burn the notebook (reset progress)',
    'desk.resetConfirm': 'Burn the notebook? Your rank, seals and studied folios will be forgotten.',
    'desk.studied': '(studied)',
    'desk.notStudied': '(not yet studied)',
    'desk.note1': 'Wisdom is the daughter of experience.',
    'desk.note2': 'Tell me if anything was ever finished.',
    'index.studied': 'studied',

    'folio.breadcrumb': 'Breadcrumb',
    'folio.sketchLabel': 'Ink sketch for {title}',
    'folio.noteHint': 'Margin note · hover or tap to read',
    'folio.studied': 'Studied',
    'folio.role': 'Role',
    'folio.years': 'Years',
    'folio.scale': 'Scale',
    'folio.stack': 'Componenti · Stack',
    'folio.visit': 'Visit the site ↗',
    'folio.source': 'Source ↗',
    'folio.mark': 'Mark of the work',
    'folio.logoAlt': '{title} logo',
    'folio.planTitle': 'Next on the bench',
    'folio.planSub': 'What comes next',
    'folio.planUnfinished': 'Workshop plan · not yet built',
    'folio.quote': 'Tell me if anything was ever finished · Leonardo',
    'folio.turn': 'Turn the page',
    'folio.back': 'Back to the codex',
    'scale.small': 'Small',
    'scale.medium': 'Medium',
    'scale.large': 'Large',

    'about.title': 'About',
    'about.description':
      'About Alexander Maniateas: Computer Science student, freelance web developer and Digital Systems Partner at FlexPro Coaching, based in Athens.',
    'about.eyebrow': 'About · Chi sono',
    'about.h1': 'A developer who started in business, learnt on the phones, and never stopped studying.',
    'about.caption': 'Ritratto · Athens',
    'about.timeline': 'Timeline',
    'about.craft': 'Craft',
    'about.languages': 'Languages',
    'about.write': 'Write to me',
    'about.writeText': 'Work, collaboration, or a good book on Leonardo, my inbox is open.',
    'about.codex': 'Or explore the codex →',

    'articles.title': 'Articles',
    'articles.description':
      'Writing by Alexander Maniateas on software development, student life and the road from customer support to code.',
    'articles.eyebrow': 'Quaderno · Notebook',
    'articles.h1': 'Writing on software, study, and the long road into tech.',
    'articles.lead': 'Longer thoughts on coding, education, freelancing and personal growth, newest first.',
    'articles.read': 'Read →',
    'articles.all': '← All articles',
    'notice.englishOnly': '',
} as const;

export type UIKey = keyof typeof en;

/** Every key must be translated; TypeScript fails the build otherwise. */
const el: Record<UIKey, string> = {
    'site.name': 'Αλέξανδρος Μανιατέας',
    'site.role': 'Προγραμματιστής',
    'site.city': 'Αθήνα',
    'site.description':
      'Αλέξανδρος Μανιατέας: προγραμματιστής και φοιτητής Πληροφορικής στην Αθήνα. Ένα σημειωματάριο με έργα, μελέτες και μηχανές, στο πνεύμα του Λεονάρντο.',
    'nav.home': 'Αρχική',
    'nav.projects': 'Έργα',
    'nav.about': 'Σχετικά',
    'nav.articles': 'Άρθρα',
    'nav.main': 'Κύρια πλοήγηση',
    'nav.menu': 'Μενού',
    'nav.skip': 'Μετάβαση στο περιεχόμενο',
    'nav.homeAria': 'Αλέξανδρος Μανιατέας, αρχική σελίδα',
    'theme.toggle': 'Εναλλαγή νυχτερινής μελέτης',
    'lang.switch': 'Read in English',
    'rank.title': 'Ο βαθμός σας στο εργαστήριο',

    'footer.quote': 'Αξιολύπητος ο μαθητής που δεν ξεπερνά τον δάσκαλό του · Λεονάρντο, σημειωματάρια',
    'footer.mirror': 'Γραμμένο από δεξιά προς τα αριστερά, διαβάζεται από αριστερά προς τα δεξιά',
    'footer.nav': 'Υποσέλιδο',

    'home.title': 'Προγραμματιστής',
    'home.eyebrow': 'Προγραμματιστής · Αθήνα · από το MMXX',
    'home.first': 'Αλέξανδρος',
    'home.last': 'Μανιατέας',
    'home.lead':
      'Φτιάχνω web εφαρμογές και μικρά, κοφτερά εργαλεία για ανθρώπους και επιχειρήσεις. Σπουδάζω Πληροφορική στο Metropolitan College, δουλεύω ως freelancer από το 2020, και όταν δεν είμαι στο πληκτρολόγιο, προπονούμαι.',
    'home.cta': 'Ανοίξτε τον κώδικα →',
    'home.about': 'Σχετικά με εμένα',
    'home.quote': 'Μελέτησε πρώτα την επιστήμη, και έπειτα ακολούθησε την πράξη · Λεονάρντο',
    'home.bench': 'Στον πάγκο εργασίας',
    'home.benchSub': 'Τι φτιάχνω τώρα',
    'home.inviteTitle': 'Κάθε έργο είναι ένα φύλλο. Μελετήστε τα όλα και γίνετε <em>Maestro</em>.',
    'home.inviteText':
      'Το portfolio μου είναι ένα σημειωματάριο που εξερευνάτε: σύρετε το γραφείο, ανοίξτε κάθε σχέδιο, κερδίστε τις σφραγίδες του εργαστηρίου. {finished} έργα ολοκληρωμένα, {wip} ακόμη στον πάγκο, {seals} σφραγίδες να κερδίσετε.',
    'home.inviteCta': 'Μπείτε στον κώδικα →',
    'home.writing': 'Από το σημειωματάριο',
    'home.allArticles': 'Όλα τα άρθρα →',
    'portrait.alt': 'Πορτρέτο του Αλέξανδρου Μανιατέα',

    'codex.title': 'Έργα · Il Codice',
    'codex.description':
      'Τα έργα του Αλέξανδρου Μανιατέα, σε έναν κώδικα στο ύφος του Λεονάρντο που μπορείτε να εξερευνήσετε: έργα για πελάτες, μελέτες και μηχανές.',
    'codex.eyebrow': 'Il Codice · Ο Κώδικας',
    'codex.h1': 'Ό,τι έχω φτιάξει, φυλαγμένο όπως ο <em>Λεονάρντο</em> φύλαγε τα σημειωματάριά του.',
    'codex.intro':
      'Κάθε έργο είναι ένα φύλλο. Τα σχέδια με μολύβι περιμένουν να μελετηθούν· ανοίξτε ένα και θα περαστεί με μελάνι στο δικό σας αντίτυπο του κώδικα. Όσα είναι μισοτελειωμένα είναι <em class="italian">non finito</em>, ακόμη στον πάγκο. {finished} ολοκληρωμένα, {wip} στο εργαστήριο.',
    'codex.view': 'Προβολή',
    'codex.desk': 'Γραφείο',
    'codex.index': 'Ευρετήριο',
    'desk.aria':
      'Το γραφείο του κώδικα. Σύρετε ή χρησιμοποιήστε τα βέλη για μετακίνηση, κυλήστε ή πατήστε συν και πλην για μεγέθυνση. Πατήστε Tab για να μετακινηθείτε ανάμεσα στα φύλλα.',
    'desk.sub': 'έργα · μελέτες · μηχανές · MMXX –',
    'desk.hint': 'Σύρετε για εξερεύνηση · κυλήστε για μεγέθυνση · πατήστε ένα σχέδιο για να το μελετήσετε',
    'desk.studiedOf': '{studied} από {total} φύλλα μελετημένα',
    'desk.zoomIn': 'Μεγέθυνση',
    'desk.zoomOut': 'Σμίκρυνση',
    'desk.fit': 'Εμφάνιση ολόκληρου του γραφείου',
    'desk.seals': 'Σφραγίδες',
    'desk.sealsTitle': 'Οι σφραγίδες του εργαστηρίου',
    'desk.close': 'Κλείσιμο',
    'desk.reset': 'Κάψτε το σημειωματάριο (επαναφορά προόδου)',
    'desk.resetConfirm': 'Να καεί το σημειωματάριο; Ο βαθμός, οι σφραγίδες και τα μελετημένα φύλλα σας θα ξεχαστούν.',
    'desk.studied': '(μελετημένο)',
    'desk.notStudied': '(δεν έχει μελετηθεί ακόμη)',
    'desk.note1': 'Η σοφία είναι κόρη της εμπειρίας.',
    'desk.note2': 'Πες μου αν ολοκληρώθηκε ποτέ κάτι.',
    'index.studied': 'μελετημένο',

    'folio.breadcrumb': 'Διαδρομή',
    'folio.sketchLabel': 'Σχέδιο με μελάνι για το {title}',
    'folio.noteHint': 'Σημείωση στο περιθώριο · περάστε τον δείκτη ή πατήστε για να τη διαβάσετε',
    'folio.studied': 'Μελετημένο',
    'folio.role': 'Ρόλος',
    'folio.years': 'Χρονιές',
    'folio.scale': 'Μέγεθος',
    'folio.stack': 'Componenti · Τεχνολογίες',
    'folio.visit': 'Επισκεφθείτε τον ιστότοπο ↗',
    'folio.source': 'Κώδικας ↗',
    'folio.mark': 'Το σήμα του έργου',
    'folio.logoAlt': 'Λογότυπο {title}',
    'folio.planTitle': 'Τα επόμενα στον πάγκο',
    'folio.planSub': 'Τι ακολουθεί',
    'folio.planUnfinished': 'Σχέδιο εργασίας · δεν έχει φτιαχτεί ακόμη',
    'folio.quote': 'Πες μου αν ολοκληρώθηκε ποτέ κάτι · Λεονάρντο',
    'folio.turn': 'Γυρίστε σελίδα',
    'folio.back': 'Πίσω στον κώδικα',
    'scale.small': 'Μικρό',
    'scale.medium': 'Μεσαίο',
    'scale.large': 'Μεγάλο',

    'about.title': 'Σχετικά',
    'about.description':
      'Σχετικά με τον Αλέξανδρο Μανιατέα: φοιτητής Πληροφορικής, freelance web developer και Digital Systems Partner στο FlexPro Coaching, στην Αθήνα.',
    'about.eyebrow': 'Σχετικά · Chi sono',
    'about.h1': 'Ένας προγραμματιστής που ξεκίνησε από τη διοίκηση επιχειρήσεων, έμαθε στα τηλέφωνα, και δεν σταμάτησε ποτέ να μελετά.',
    'about.caption': 'Ritratto · Αθήνα',
    'about.timeline': 'Διαδρομή',
    'about.craft': 'Τέχνη',
    'about.languages': 'Γλώσσες',
    'about.write': 'Γράψτε μου',
    'about.writeText': 'Για δουλειά, συνεργασία ή ένα καλό βιβλίο για τον Λεονάρντο, τα εισερχόμενά μου είναι ανοιχτά.',
    'about.codex': 'Ή εξερευνήστε τον κώδικα →',

    'articles.title': 'Άρθρα',
    'articles.description':
      'Κείμενα του Αλέξανδρου Μανιατέα για την ανάπτυξη λογισμικού, τη φοιτητική ζωή και τη διαδρομή από την εξυπηρέτηση πελατών στον κώδικα.',
    'articles.eyebrow': 'Quaderno · Σημειωματάριο',
    'articles.h1': 'Κείμενα για το λογισμικό, τη μελέτη και τον μακρύ δρόμο προς την τεχνολογία.',
    'articles.lead': 'Σκέψεις για τον κώδικα, τις σπουδές, τη δουλειά ως freelancer και την προσωπική εξέλιξη, με τα νεότερα πρώτα.',
    'articles.read': 'Διαβάστε →',
    'articles.all': '← Όλα τα άρθρα',
    'notice.englishOnly': 'Αυτό το κείμενο είναι προς το παρόν διαθέσιμο μόνο στα αγγλικά.',
};

export const ui: Record<Lang, Record<UIKey, string>> = { en, el };

/** Look up an interface string and fill in {placeholders}. */
export function useT(lang: Lang) {
  return (key: UIKey, vars: Record<string, string | number> = {}) =>
    (ui[lang][key] ?? ui.en[key]).replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
