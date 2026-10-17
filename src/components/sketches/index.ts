import {
  circle, gear, hatchCircle, hatchRect, label, leaf, line, path, rect, spokes, ticks, wave, wheel, writing,
} from './draw';

// Laurel leaves in pairs along each branch, angled to the curve.
type Pt = [number, number];
const quad = (a: Pt, b: Pt, c: Pt, t: number): { p: Pt; angle: number } => {
  const u = 1 - t;
  const p: Pt = [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]];
  const dx = 2 * u * (b[0] - a[0]) + 2 * t * (c[0] - b[0]);
  const dy = 2 * u * (b[1] - a[1]) + 2 * t * (c[1] - b[1]);
  return { p, angle: Math.atan2(dy, dx) };
};
const laurelBranch = (side: 1 | -1) => {
  const x = (v: number) => 100 + side * (v - 100);
  const segments: [Pt, Pt, Pt][] = [
    [[x(100), 176], [x(160), 160], [x(162), 100]],
    [[x(162), 100], [x(160), 52], [x(130), 28]],
  ];
  let out = path(segments.map(([a, b, c], i) => `${i ? '' : `M${a[0]} ${a[1]}`}Q${b[0]} ${b[1]} ${c[0]} ${c[1]}`).join(''));
  segments.forEach(([a, b, c]) => {
    for (const t of [0.2, 0.45, 0.7, 0.95]) {
      const { p, angle } = quad(a, b, c, t);
      for (const turn of [0.65, -0.65]) {
        const ang = angle + turn;
        out += leaf(p[0] + Math.cos(ang) * 8, p[1] + Math.sin(ang) * 8, ang, 16, 5);
      }
    }
  });
  return out;
};

// Early universe sound: the simulator's own harmonics of 55 Hz, as cycles across the plate.
const universe: [number, number][] = [[1, 1], [2, 0.7], [3, 0.5], [4, 0.3], [5, 0.2], [6, 0.1]];

/** Each sketch is SVG markup for a 200×200 viewBox, drawn in Leonardo's notebook manner. */
export const sketches: Record<string, string> = {
  // FlexPro: the Vitruvian proportions, the body as a machine.
  vitruvian: [
    circle(100, 92, 78, 'c'),
    line(34, 38, 166, 170, 'c'),
    line(166, 38, 34, 170, 'c'),
    line(100, 8, 100, 178, 'c'),
    circle(100, 92, 78),
    rect(34, 38, 132, 132),
    circle(100, 92, 2.2, 'f'),
    // head and neck
    circle(100, 36, 10),
    path('M96 46 L95 52 M104 46 L105 52', 't'),
    // torso: shoulders, chest, waist
    path('M80 56 Q100 50 120 56 Q118 74 113 90 Q110 102 111 114 Q100 120 89 114 Q90 102 87 90 Q82 74 80 56'),
    path('M88 66 Q100 72 112 66 M92 80 Q100 83 108 80 M100 72 L100 106 M93 92 L107 92 M94 100 L106 100', 't'),
    // horizontal arms
    path('M80 57 Q58 60 34 62 M120 57 Q142 60 166 62'),
    // raised arms touching the circle
    path('M82 56 Q62 44 40 30 M118 56 Q138 44 160 30'),
    // standing and spread legs
    path('M91 114 Q92 140 88 168 M109 114 Q108 140 112 168'),
    path('M90 114 Q72 136 54 156 M110 114 Q128 136 146 156'),
    path('M84 168 L94 170 M108 170 L118 168 M50 154 L57 160 M143 160 L150 154', 't'),
    hatchCircle(100, 36, 10, 2.4, 0, 0.35),
    hatchRect(102, 58, 12, 50, 3.2),
    `<circle class="w" cx="100" cy="92" r="78"/>`,
    label(26, 34, 'a'),
    label(170, 176, 'b'),
    label(104, 89, 'c'),
  ].join(''),

  // College Compass: a compass rose with a graduated ring.
  compass: [
    line(100, 18, 100, 182, 'c'),
    line(18, 100, 182, 100, 'c'),
    circle(100, 100, 74, 'c'),
    circle(100, 100, 64),
    circle(100, 100, 56, 't'),
    ticks(100, 100, 64, 48, 3.5),
    // eight-point star
    path('M100 30 L110 90 L170 100 L110 110 L100 170 L90 110 L30 100 L90 90 Z'),
    path('M100 100 L132 68 M100 100 L132 132 M100 100 L68 132 M100 100 L68 68', 't'),
    path('M106 94 L132 68 L94 106 M106 106 L132 132 M94 94 L68 68 M94 106 L68 132', 't'),
    path('M100 30 L100 170 M30 100 L170 100', 't'),
    hatchRect(90, 32, 10, 60, 2.6),
    hatchRect(100, 108, 10, 60, 2.6),
    circle(100, 100, 5),
    `<path class="w" d="M100 30 L110 90 L170 100 L110 110 L100 170 L90 110 L30 100 L90 90 Z"/>`,
    label(96, 14, 'N', 12),
    label(178, 104, 'E', 11),
  ].join(''),

  // C.Strategy: a trebuchet, strategy made mechanical.
  trebuchet: [
    path('M100 80 m-72 -6 a72 72 0 0 1 64 -66', 'c'),
    line(16, 172, 184, 172, 'c'),
    path('M28 160 L172 160 L172 168 L28 168 Z'),
    path('M58 160 L100 78 L142 160'),
    path('M74 160 L100 108 L126 160', 't'),
    line(70, 132, 130, 132, 't'),
    circle(100, 80, 4),
    // throwing arm, sling and stone
    path('M152 106 L36 44'),
    path('M36 44 Q34 76 54 98', 't'),
    circle(58, 103, 6),
    // counterweight
    path('M152 106 L146 118 M152 106 L160 118', 't'),
    rect(138, 118, 30, 24),
    hatchRect(138, 118, 30, 24, 3),
    wheel(46, 172, 12, 6),
    wheel(154, 172, 12, 6, 0.4),
    hatchCircle(58, 103, 6, 2.2, 0.55, 1),
    `<rect class="w" x="138" y="118" width="30" height="24"/>`,
    label(30, 40, 'a'),
    label(172, 132, 'b'),
  ].join(''),

  // Metaforiki Lappas: Leonardo's self-propelled cart.
  cart: [
    line(10, 168, 190, 168, 'c'),
    path('M150 60 L186 60 M178 54 L186 60 L178 66', 'c'),
    path('M30 112 L170 112 L158 98 L42 98 Z'),
    path('M30 112 L30 120 L170 120 L170 112', 't'),
    hatchRect(30, 112, 140, 8, 3),
    // leaf springs
    path('M48 98 Q100 40 152 98'),
    path('M58 98 Q100 54 142 98', 't'),
    // crown gear and axle
    path('M100 98 L100 66', 't'),
    `<ellipse class="m" cx="100" cy="64" rx="30" ry="8"/>`,
    path('M70 64 L70 58 M76 58 L76 52 M85 55 L85 49 M95 54 L95 48 M105 54 L105 48 M115 55 L115 49 M124 58 L124 52 M130 64 L130 58', 't'),
    wheel(62, 142, 26, 8),
    wheel(140, 142, 26, 8, 0.3),
    hatchCircle(62, 142, 26, 3.4, 0.62, 1),
    hatchCircle(140, 142, 26, 3.4, 0.62, 1),
    `<ellipse class="w" cx="100" cy="64" rx="30" ry="8"/>`,
    label(96, 40, 'a'),
    label(176, 108, 'b'),
  ].join(''),

  // SpanishGreco: the Golden Horn bridge, one arch between two shores.
  bridge: [
    path('M30 150 A70 70 0 0 1 170 150', 'c'),
    line(100, 80, 100, 156, 'c'),
    path('M8 112 Q100 58 192 112'),
    path('M14 122 Q100 70 186 122', 't'),
    path('M8 112 L4 152 M192 112 L196 152'),
    path('M30 152 Q100 84 170 152'),
    path('M14 122 L30 152 M186 122 L170 152', 't'),
    path('M0 152 L30 152 M170 152 L200 152'),
    path('M36 164 Q48 160 60 164 T84 164 T108 164 T132 164 T156 164', 't'),
    path('M50 176 Q62 172 74 176 T98 176 T122 176 T146 176', 't'),
    hatchRect(34, 120, 132, 32, 3.2),
    `<path class="w" d="M8 112 Q100 58 192 112 L186 122 Q100 70 14 122 Z"/>`,
    label(10, 100, 'es', 11),
    label(178, 100, 'gr', 11),
  ].join(''),

  // ArduinoLearn: meshing gears and a lit diode.
  clockwork: [
    line(80, 100, 138, 128, 'c'),
    circle(80, 100, 52, 'c'),
    gear(80, 100, 40, 12, 7),
    circle(80, 100, 30, 't'),
    circle(80, 100, 6),
    spokes(80, 100, 6, 30, 5, 0.3, 'm'),
    gear(138, 128, 26, 8, 7, 0.2),
    circle(138, 128, 17, 't'),
    circle(138, 128, 4),
    spokes(138, 128, 4, 17, 4, 0.8, 't'),
    hatchCircle(80, 100, 30, 3, 0.6, 1),
    // LED and its light
    path('M146 70 L146 50 A9 9 0 0 1 164 50 L164 70 Z'),
    path('M150 70 L150 88 M160 70 L160 82 L166 82', 't'),
    path('M155 30 L155 22 M140 38 L134 32 M170 38 L176 32 M174 52 L182 52', 'c'),
    `<path class="w" d="M146 70 L146 50 A9 9 0 0 1 164 50 L164 70 Z"/>`,
    label(26, 52, 'a'),
    label(170, 160, 'b'),
  ].join(''),

  // Greek Text Tools: a quill and two alphabets.
  quill: [
    line(36, 176, 172, 22, 'c'),
    path('M36 176 L60 150'),
    path('M60 150 C64 110 118 52 170 22'),
    path('M60 150 C100 140 152 84 170 22'),
    path('M60 150 L162 36', 't'),
    path('M74 136 L70 116 M86 122 L82 100 M98 108 L96 86 M110 94 L110 72 M122 80 L124 60 M134 66 L138 50 M80 128 L98 132 M92 114 L112 118 M104 100 L126 102 M116 86 L138 86 M128 72 L150 70', 'h'),
    path('M36 176 L32 182 L40 178 Z', 't'),
    path('M30 188 Q34 184 38 188 Q34 192 30 188', 't'),
    `<path class="w" d="M60 150 C64 110 118 52 170 22 C152 84 100 140 60 150 Z"/>`,
    label(112, 160, 'α ⇄ a', 18),
    label(20, 60, 'Ω', 26),
    label(150, 186, 'β · γ', 12),
  ].join(''),

  // PDF Toolkit: a screw press for paper.
  press: [
    line(100, 14, 100, 186, 'c'),
    rect(40, 28, 120, 18),
    hatchRect(40, 28, 120, 18, 3),
    path('M54 46 L54 160 M146 46 L146 160'),
    path('M60 46 L60 160 M140 46 L140 160', 't'),
    rect(34, 160, 132, 14),
    // the screw
    path('M100 46 L100 96 M94 50 L106 56 M94 58 L106 64 M94 66 L106 72 M94 74 L106 80 M94 82 L106 88', 't'),
    path('M62 70 L138 70'),
    circle(60, 70, 4),
    circle(140, 70, 4),
    rect(70, 96, 60, 12),
    hatchRect(70, 96, 60, 12, 3),
    // pages under the platen
    path('M74 152 L126 152 M72 148 L128 148 M76 144 L124 144 M74 140 L126 140'),
    path('M78 124 L122 124 L128 136 L72 136 Z', 't'),
    path('M84 118 L84 126 M100 116 L100 124 M116 118 L116 126', 'c'),
    `<rect class="w" x="72" y="138" width="56" height="16"/>`,
    label(164, 74, 'a'),
    label(130, 130, 'b'),
  ].join(''),

  // Smart File Organiser: a cabinet of labelled drawers.
  cabinet: [
    path('M24 36 Q12 70 40 82 M24 96 Q12 120 40 128', 'c'),
    path('M36 78 L40 82 L34 84 M36 124 L40 128 L34 130', 'c'),
    rect(50, 36, 100, 136),
    path('M150 36 L166 26 L166 162 L150 172 M50 36 L66 26 L166 26', 't'),
    hatchRect(150, 30, 16, 140, 3),
    path('M58 46 L142 46 L142 74 L58 74 Z M58 82 L142 82 L142 110 L58 110 Z M58 154 L142 154 L142 164 L58 164 Z'),
    // the open drawer
    path('M58 118 L142 118 L142 146 L58 146 Z', 't'),
    path('M44 124 L156 124 L156 150 L44 150 Z'),
    path('M50 124 L56 106 L74 106 L70 124 M74 124 L82 102 L98 102 L92 124 M98 124 L108 104 L124 106 L114 124', 't'),
    path('M90 58 L110 58 M90 94 L110 94 M90 136 L110 136'),
    rect(92, 48, 16, 6, 't'),
    rect(92, 84, 16, 6, 't'),
    `<rect class="w" x="44" y="124" width="112" height="26"/>`,
    label(64, 62, 'a'),
    label(64, 98, 'b'),
    label(64, 162, 'c'),
  ].join(''),

  // Document Metadata Extractor: a lens over a page.
  lens: [
    path('M28 40 L132 40 L132 176 L28 176 Z', 't'),
    writing(38, 144, 84, 5, 6),
    path('M38 52 L42 52 M38 58 L42 58 M38 64 L42 64 M38 112 L44 112 M38 118 L48 118 M38 124 L54 124', 't'),
    circle(88, 88, 58, 'c'),
    circle(88, 88, 46),
    circle(88, 88, 41, 't'),
    writing(58, 70, 58, 4, 12, 'm'),
    path('M60 108 L84 108', 't'),
    path('M121 121 L128 128'),
    path('M128 128 L174 174 M136 122 L180 166 M128 128 L136 122 M174 174 L180 166'),
    hatchRect(128, 122, 52, 52, 3),
    path('M140 40 L156 30 M146 70 L166 66 M88 26 L88 14', 'c'),
    hatchCircle(88, 88, 46, 3, 0.86, 1),
    `<circle class="w" cx="88" cy="88" r="41"/>`,
    label(150, 26, 'exif', 11),
    label(30, 190, 'a'),
  ].join(''),

  // OCR Invoice Reader: the eye that reads, after Leonardo's optics.
  eye: [
    path('M100 70 L74 132 M100 70 L126 132 M100 70 L100 120', 'c'),
    path('M24 66 Q100 12 176 66 Q100 118 24 66 Z'),
    path('M34 62 Q100 22 166 62', 't'),
    circle(100, 66, 26),
    circle(100, 66, 11),
    spokes(100, 66, 12, 25, 24, 0, 't'),
    hatchCircle(100, 66, 11, 1.6, 0, 1),
    hatchCircle(100, 66, 26, 3.2, 0.7, 1),
    circle(93, 59, 3, 't'),
    path('M48 50 L42 40 M66 38 L62 28 M86 32 L84 22 M106 31 L107 21 M126 34 L130 24 M146 42 L152 33', 't'),
    // the receipt
    path('M70 132 L130 132 L130 186 L124 192 L118 186 L112 192 L106 186 L100 192 L94 186 L88 192 L82 186 L76 192 L70 186 Z'),
    writing(78, 160, 44, 3, 7),
    path('M78 176 L122 176', 'm'),
    `<path class="w" d="M24 66 Q100 12 176 66 Q100 118 24 66 Z"/>`,
    label(78, 150, 'ΑΦΜ', 10),
    label(16, 96, 'a'),
    label(176, 96, 'b'),
  ].join(''),
  // Clinic Management System: an hourglass, for appointment slots.
  hourglass: [
    line(100, 8, 100, 192, 'c'),
    circle(100, 100, 88, 'c'),
    rect(46, 18, 108, 12),
    rect(46, 170, 108, 12),
    hatchRect(46, 18, 108, 12, 3),
    hatchRect(46, 170, 108, 12, 3),
    path('M56 30 L56 170 M144 30 L144 170'),
    path('M52 50 Q56 46 60 50 M52 150 Q56 154 60 150 M140 50 Q144 46 148 50 M140 150 Q144 154 148 150', 't'),
    path('M70 30 C70 80 96 90 97 100 C96 110 70 120 70 170'),
    path('M130 30 C130 80 104 90 103 100 C104 110 130 120 130 170'),
    path('M77 60 Q100 68 123 60 L103 94 L97 94 Z', 't'),
    path('M100 96 L100 150', 't'),
    path('M74 170 Q100 136 126 170', 't'),
    `<path class="w" d="M74 170 Q100 136 126 170 Z M77 60 Q100 68 123 60 L103 94 L97 94 Z"/>`,
    label(30, 26, 'a'),
    label(164, 186, 'b'),
  ].join(''),

  // Java Mastery: nine steps from novice to pro, and a cup of Java at the top.
  staircase: [
    line(18, 182, 190, 30, 'c'),
    line(10, 178, 194, 178, 'c'),
    path('M24 178' + Array.from({ length: 9 }, () => 'h18v-16').join('') + 'L186 178Z'),
    hatchRect(150, 100, 36, 78, 3.2),
    path('M60 178 L60 154 M96 178 L96 122 M132 178 L132 90', 't'),
    path('M168 34 L170 22 L182 22 L184 34', 't'),
    path('M182 25 Q188 26 183 31', 't'),
    path('M174 18 q-3 -5 0 -10 M179 18 q3 -5 0 -10', 'c'),
    label(28, 172, 'I', 10),
    label(96, 108, 'V', 10),
    label(150, 48, 'IX', 10),
  ].join(''),

  // Networks Study Guide: a router and its hosts, tied like one of Leonardo's knots.
  network: [
    circle(100, 100, 84, 'c'),
    circle(100, 100, 62, 'c'),
    path(Array.from({ length: 6 }, (_, i) => {
      const a = (i * Math.PI) / 3 - Math.PI / 2;
      return `M100 100L${(100 + Math.cos(a) * 62).toFixed(1)} ${(100 + Math.sin(a) * 62).toFixed(1)}`;
    }).join(''), 't'),
    path(Array.from({ length: 7 }, (_, i) => {
      const a = (i * Math.PI) / 3 - Math.PI / 2;
      return `${i ? 'L' : 'M'}${(100 + Math.cos(a) * 62).toFixed(1)} ${(100 + Math.sin(a) * 62).toFixed(1)}`;
    }).join('')),
    ...Array.from({ length: 6 }, (_, i) => {
      const a = (i * Math.PI) / 3 - Math.PI / 2;
      return circle(Math.round(100 + Math.cos(a) * 62), Math.round(100 + Math.sin(a) * 62), 9);
    }),
    circle(100, 100, 15),
    hatchCircle(100, 100, 15, 2.6, 0, 0.6),
    `<circle class="w" cx="100" cy="100" r="62"/>`,
    label(112, 92, '/26', 10),
    label(20, 30, 'a'),
  ].join(''),

  // Early Universe Sound Simulator: the wave itself, and ripples, as Leonardo described sound.
  ripples: [
    line(14, 54, 186, 54, 'c'),
    wave(14, 54, 172, 30, universe),
    ...[12, 26, 42, 60, 80].map((r) => `<ellipse class="${r < 40 ? 'm' : 't'}" cx="100" cy="148" rx="${r}" ry="${(r * 0.32).toFixed(1)}"/>`),
    circle(100, 112, 5),
    path('M100 118 L100 140', 'c'),
    hatchCircle(100, 112, 5, 1.6, 0, 1),
    `<ellipse class="w" cx="100" cy="148" rx="42" ry="13.4"/>`,
    label(16, 20, '55 Hz', 10),
    label(160, 186, 'a'),
  ].join(''),

  // Fitness Tracker: a pulley lifting a stack of weights, measured on a scale.
  pulley: [
    line(100, 14, 100, 186, 'c'),
    rect(30, 14, 140, 10),
    hatchRect(30, 14, 140, 10, 3),
    path('M100 24 L100 42', 't'),
    circle(100, 60, 18),
    spokes(100, 60, 3, 15, 6, 0.3),
    path('M82 60 L82 150 M118 60 L118 112'),
    path('M70 150 L94 150 M70 146 L70 154 M94 146 L94 154', 'm'),
    rect(104, 112, 40, 14),
    rect(104, 126, 40, 14),
    rect(104, 140, 40, 14),
    hatchRect(104, 112, 40, 42, 3),
    path('M160 40 L160 176', 't'),
    path(Array.from({ length: 12 }, (_, i) => `M160 ${44 + i * 12}L${i % 3 === 0 ? 170 : 166} ${44 + i * 12}`).join(''), 't'),
    `<rect class="w" x="104" y="112" width="40" height="42"/>`,
    label(172, 50, 'kg', 10),
    label(24, 170, 'a'),
  ].join(''),

  // Nutrition Plan Builder: a mortar and pestle, with herbs.
  mortar: [
    line(20, 172, 180, 172, 'c'),
    path('M50 108 Q48 168 100 170 Q152 168 150 108'),
    `<ellipse class="m" cx="100" cy="108" rx="50" ry="11"/>`,
    `<ellipse class="t" cx="100" cy="108" rx="42" ry="8"/>`,
    path('M86 108 L146 36 M96 112 L154 44'),
    path('M146 36 Q156 30 154 44', 't'),
    hatchCircle(100, 128, 46, 3.2, 0.62, 1),
    path('M34 96 Q30 60 52 40', 't'),
    leaf(40, 76, -1.2, 18, 6),
    leaf(36, 60, -2.0, 16, 5),
    leaf(48, 50, -0.6, 14, 5),
    `<path class="w" d="M50 108 Q48 168 100 170 Q152 168 150 108 Q100 124 50 108 Z"/>`,
    label(160, 120, 'a'),
    label(20, 36, 'b'),
  ].join(''),

  // Smart Protein Recipes: a steaming bowl and an egg.
  bowl: [
    line(14, 166, 186, 166, 'c'),
    path('M36 104 Q38 156 100 158 Q162 156 164 104'),
    `<ellipse class="m" cx="100" cy="104" rx="64" ry="13"/>`,
    `<ellipse class="t" cx="100" cy="160" rx="24" ry="5"/>`,
    path('M58 100 Q72 88 86 98 Q100 86 116 98 Q130 88 144 100', 't'),
    path('M70 70 q-6 -10 0 -20 q6 -10 0 -20 M100 66 q-6 -10 0 -20 q6 -10 0 -20 M130 70 q-6 -10 0 -20 q6 -10 0 -20', 'c'),
    hatchCircle(100, 126, 60, 3.4, 0.66, 1),
    `<ellipse class="m" cx="178" cy="140" rx="11" ry="14"/>`,
    hatchCircle(178, 140, 11, 2.4, 0.6, 1),
    `<path class="w" d="M36 104 Q38 156 100 158 Q162 156 164 104 Q100 120 36 104 Z"/>`,
    label(16, 60, '34g', 11),
    label(170, 186, 'a'),
  ].join(''),

  // Tasos Misailidis: a laurel wreath around a dumbbell.
  laurel: [
    circle(100, 100, 86, 'c'),
    laurelBranch(1),
    laurelBranch(-1),
    path('M88 182 L100 170 L112 182 M94 186 L100 176 L106 186', 't'),
    path('M70 100 L130 100'),
    rect(62, 86, 8, 28),
    rect(130, 86, 8, 28),
    rect(54, 91, 8, 18),
    rect(138, 91, 8, 18),
    hatchRect(54, 86, 16, 28, 2.6),
    `<rect class="w" x="54" y="86" width="92" height="28"/>`,
    label(94, 70, 'TM', 12),
  ].join(''),
};
