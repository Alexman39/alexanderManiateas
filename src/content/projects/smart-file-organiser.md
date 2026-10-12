---
title: Smart File Organiser
motto: L'archivio ordinato
domain: macchine
status: non-finito
size: small
folio: 9
summary: A Java command-line tool that renames and sorts messy folders by date, file type or name pattern, with a dry-run preview before anything moves.
role: Author
stack: [Java, JUnit]
sketch: cabinet
desk: { x: 2350, y: 390, size: 240 }
related: [metadata-extractor]
note: Preview first. Then move.
plan:
  - Sort by date, file type or name pattern
  - Rename rules
  - Dry-run preview of every change
  - JUnit test suite
---

## The idea

A Downloads folder is a small act of chaos. This tool brings order with clear rules, and because moving files is destructive, it always shows a dry-run preview of exactly what will change before it touches anything.

It's also an exercise in clean object-oriented Java: file I/O, strategy objects for each sorting rule, and tests to prove it.
