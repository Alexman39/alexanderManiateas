---
title: Nutrition Plan Builder
motto: Il pane e la misura
domain: anatomia
status: live
folio: 17
summary: An internal tool for FlexPro Coaching that turns a coach's raw Greek nutrition text, pasted from a chat or SMS, into a clean, branded one-page plan you can export as an image or PDF.
role: Designer & developer
years: '2026'
stack: [HTML, CSS, JavaScript, html2canvas, GitHub Pages]
links:
  live: https://alexman39.github.io/nutrition_tool/
  repo: https://github.com/Alexman39/nutrition_tool
embed: https://alexman39.github.io/nutrition_tool/
sketch: mortar
desk: { x: 1360, y: 1110, size: 230 }
related: [flexpro]
note: The coach writes freely, and the plan comes out tidy.
highlights:
  - { value: '1', label: 'click from raw text to a finished plan' }
  - { value: '2', label: 'modes: parse pasted text, or build the plan by hand' }
  - { value: '0', label: 'servers, because everything is saved in your browser' }
features:
  - title: Parser mode
    text: Paste a plan as it was written, in Greek. The parser finds each meal ("Γεύμα 1", "Γεύμα 2", even several on one line), its options, and the notes at the end.
  - title: Manual mode
    text: Build a plan meal by meal when there's no text to start from.
  - title: Smart fit
    text: The preview scales itself to fit on a single page, however long the plan is.
  - title: Export
    text: Download the plan as a PNG for the client's phone, or print it to PDF. Your work is saved in the browser as you go.
gallery:
  - { src: ../../assets/projects/nutrition-builder/parsed.jpg, caption: "The example plan, parsed: athlete, goal, duration and each meal laid out" }
  - { src: ../../assets/projects/nutrition-builder/phone.jpg, caption: 'Parser mode on a phone', phone: true }
  - { src: ../../assets/projects/nutrition-builder/export.jpg, caption: 'Export to PNG or PDF, and the plan as structured JSON' }
---

## The brief

Coaches write nutrition plans the way they talk: quickly, in Greek, in a chat window. Turning that into something a client is proud to keep on their phone took time for every single plan.

## The work

The builder reads the raw text and recognises its structure: numbered meals, inline meals, food options and a closing notes section. It renders all of it as a branded FlexPro plan. A smart fit step scales the preview so it always fits on one page, and the result exports as a PNG or a PDF.

It's a static tool with no backend, and it saves your work in the browser. Press "Load Example", then "Parse Plan", to try it right here.
