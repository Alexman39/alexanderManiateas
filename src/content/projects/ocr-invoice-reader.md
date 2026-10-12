---
title: OCR Invoice Reader
motto: L'occhio che legge
domain: macchine
status: non-finito
size: medium
capolavoro: true
folio: 11
summary: Upload a scanned invoice or receipt. OCR with Greek language support pulls out the key fields (ΑΦΜ, date, total) as structured JSON for you to review and correct.
role: Author
stack: [Tesseract OCR, Java · Spring Boot, Web UI]
sketch: eye
desk: { x: 2310, y: 1070, size: 340 }
note: Read the ΑΦΜ, the date, the total, then let a human check.
plan:
  - OCR with Greek language support
  - Field extraction for ΑΦΜ, date and total
  - Structured JSON output
  - Review-and-correct interface
---

## The idea

Greek businesses still drown in paper receipts. This reader turns a photo or scan into clean, structured data, with Greek-language OCR and an extraction step tuned to Greek invoices.

OCR is never perfect, so the result isn't final until a person says so. The interface puts the scan and the extracted fields side by side for quick correction.

This is the workshop's *capolavoro*, the masterpiece a journeyman presents to become a master.
