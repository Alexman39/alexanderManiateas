---
title: Clinic Management System
motto: Il tempo del medico
domain: macchine
status: shipped
folio: 12
summary: A desktop application in Java and JavaFX for running a clinic, covering patients, doctors, working schedules and appointments, with separate views for doctors and for staff.
role: Designer & developer · University assignment, CN5004
years: '2026'
stack: [Java, JavaFX 21, FXML, Maven, CSV files]
links:
  repo: https://github.com/Alexman39/clinic-management-system-javafx
sketch: hourglass
desk: { x: 2330, y: 1180, size: 260 }
note: A slot is only free once the validator agrees.
highlights:
  - { value: '2,600+', label: 'lines of Java across 21 classes' }
  - { value: '6', label: 'screens, each an FXML view with its own controller' }
  - { value: '2', label: 'roles: doctor, and staff or admin' }
  - { value: '2', label: 'double-booking checks, one for the doctor and one for the patient' }
features:
  - title: Patients
    text: Register, edit and remove patients, with their name, date of birth, phone and email.
  - title: Doctors and schedules
    text: Add doctors with their specialty, then give each one working days, with start and end times and a slot length in minutes.
  - title: Appointments
    text: Book a patient into one of the doctor's free slots, then cancel bookings or filter them by date and status.
  - title: Roles
    text: Choose doctor or staff when the app opens. Each role sees the screens it needs, and you can switch at any time.
gallery:
  - { src: ../../assets/projects/clinic/roadmap.jpg, caption: 'The roadmap I built to plan the assignment, with three phases of cards ticked off as each is done' }
---

## The brief

A university assignment for CN5004: build a working management system for a clinic in object-oriented Java, with a real interface and data that survives a restart.

## The work

I structured it the way larger applications are built. Models such as `Patient`, `Doctor`, `Appointment` and `DoctorSchedule` hold the data, and repositories read and write them to CSV files. Each screen is an FXML view with its own controller, and a single `DataStore` keeps the state that every controller shares.

The heart of it is scheduling. `SlotGenerator` works out a doctor's free slots for a day from their working hours and slot length, leaving out anything already booked. Then `Validator` checks every booking before it's saved: the date can't be in the past, the time must fall inside the doctor's hours, and neither the doctor nor the patient can already have an appointment at that time.

## Planning it

Before writing any code, I built a small [kanban roadmap](https://alexman39.github.io/Clinic-Management-System/) for the assignment. It has three phases, from the foundation to the core features to polish, and each card is tagged as OOP logic, JavaFX interface, file I/O or report work.
