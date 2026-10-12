---
title: Greek Text Tools
motto: La penna e l'alfabeto
domain: studi
status: non-finito
size: small
folio: 7
summary: Utilities for Greek text, including accent stripping, Greeklish ↔ Greek conversion and URL slugs, for the everyday problems of Greek web projects.
role: Author
stack: [JavaScript, npm]
sketch: quill
desk: { x: 450, y: 1340, size: 230 }
related: [ocr-invoice-reader]
note: Άλφα to alpha, and back again.
plan:
  - Accent and diacritic stripping
  - Greeklish ↔ Greek conversion
  - URL slug generation for Greek titles
  - Publish to npm, with a live demo page
---

## The idea

Every Greek web project runs into the same small problems: search that fails because of accents, URLs full of percent-encoding, users who type in Greeklish. This package solves them once, properly, and ships with a demo page you can try right here.
