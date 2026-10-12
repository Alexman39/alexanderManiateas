---
title: PDF Toolkit
motto: Il torchio digitale
domain: macchine
status: live
folio: 8
summary: Merge, split, rotate and compress PDFs entirely in your browser. There's no server, so your files never leave your device, and after the first visit it works offline.
role: Designer & developer
years: '2026'
stack: [JavaScript, Vite, pdf-lib, pdf.js, fflate, Web Workers, Vitest, Playwright]
links:
  live: https://alexman39.github.io/PDF-Toolkit/
  repo: https://github.com/Alexman39/PDF-Toolkit
embed: https://alexman39.github.io/PDF-Toolkit/
sketch: press
desk: { x: 1900, y: 360, size: 240 }
related: [metadata-extractor]
note: Your files never leave your desk.
highlights:
  - { value: '0', label: 'network requests once the page has loaded' }
  - { value: '4', label: 'tools: merge, split, rotate and compress' }
  - { value: '192', label: 'automated tests, run on every push' }
  - { value: 'Offline', label: 'works without a connection after the first visit' }
features:
  - title: Merge
    text: Combine several PDFs into one. Set the order by dragging, with mouse or touch, or with the arrow buttons.
  - title: Split
    text: Four modes, including page ranges like `1-3, 5, 8-`, every N pages, picking pages from thumbnails, or one file per page. Several outputs download as a single zip.
  - title: Rotate
    text: Turn single pages or the whole document by ±90° or 180°. Lossless, because only the page orientation changes.
  - title: Compress
    text: Lossless optimisation keeps text selectable. Strong mode turns each page into a JPEG, which shrinks scans a lot, and warns you first.
gallery:
  - { src: ../../assets/projects/pdf-toolkit/home-light.png, caption: 'The home screen: four tools, and how your files stay private' }
  - { src: ../../assets/projects/pdf-toolkit/merge.png, caption: 'Merge: drag the files, or use the arrows, to set the order' }
  - { src: ../../assets/projects/pdf-toolkit/split-phone.png, caption: 'Split on a phone, picking pages from thumbnails', phone: true }
  - { src: ../../assets/projects/pdf-toolkit/rotate.png, caption: 'Rotate: one page or all of them, previewed as thumbnails' }
  - { src: ../../assets/projects/pdf-toolkit/compress.png, caption: 'Compress in strong mode, with the size before and after' }
  - { src: ../../assets/projects/pdf-toolkit/home-dark.png, caption: 'The dark theme, which follows your system setting' }
plan:
  - Install it as an app, with a web manifest and icons
  - Reorder or delete pages inside a single PDF
  - Images to PDF, and PDF to images
  - Page numbers and watermarks
---

## The brief

Most free PDF websites upload your documents to a server. For contracts, payslips or medical letters, that's a real privacy cost for a simple job. I wanted a toolkit that needs no trust at all, because there's nowhere for a file to go.

## The work

Every operation runs in JavaScript on your own device. The PDF operations are pure functions, bytes in and bytes out, running inside a Web Worker, so the page never freezes on a large file, and Cancel frees the memory at once. pdf-lib writes the PDFs, and pdf.js renders the thumbnails and the pages for strong compression.

It checks the `%PDF-` header instead of trusting the file extension, so damaged and password-protected files get a clear message rather than broken output.

## Privacy you can check

"We don't upload your files" is easy to claim, so the app doesn't ask you to take it on trust:

- **There is no backend.** The site is a set of static files on GitHub Pages.
- **The browser blocks every connection.** A Content Security Policy with `connect-src 'none'` makes it refuse any request, even if some code tried one.
- **Every library is bundled**, with no CDNs and no third parties.
- **A test enforces it.** An end-to-end test runs every tool in a real browser and fails if the page makes a single network request after loading.

After your first visit, a service worker keeps a copy of the app, so it still works with the Wi-Fi switched off.

## Built with care

It works with the keyboard alone, with screen readers and with touch, and it follows your system's light or dark theme. There are no accounts, ads or analytics.
