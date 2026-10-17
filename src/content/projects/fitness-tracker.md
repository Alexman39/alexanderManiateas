---
title: Fitness Tracker
motto: Il peso misurato
domain: anatomia
status: live
folio: 16
summary: A web app to set a fitness goal, build your own workouts, log what you actually lifted against the plan, and look back at every completed session.
role: Designer & developer
years: '2025'
stack: [React, Vite, Firebase Auth, Cloud Firestore, Tailwind CSS, Radix UI]
links:
  live: https://fitness-tracker-app-80aec.web.app/login
  repo: https://github.com/Alexman39/fitness-tracker-app
sketch: pulley
desk: { x: 1840, y: 1110, size: 230 }
related: [flexpro]
note: Plan the sets, then log what you actually lifted.
features:
  - title: Accounts
    text: Sign up and log in with Firebase Authentication. Every workout belongs to your own account.
  - title: Goals
    text: Choose a goal of cut, bulk or maintain, or write your own.
  - title: Workouts
    text: Build custom workouts from exercises and sets, saved to Cloud Firestore.
  - title: Logging and history
    text: The dashboard shows today's plan. Log the session against it, comparing planned and actual totals, then browse every completed workout.
gallery:
  - { src: ../../assets/projects/fitness-tracker/login.jpg, caption: 'The login screen. Everything else sits behind your account.' }
  - { src: ../../assets/projects/fitness-tracker/phone.jpg, caption: 'Logging in on a phone', phone: true }
---

## The brief

This was my first real web project, and I wanted it to be something I'd use myself: a simple way to plan workouts, log them honestly and see progress over time. I wrote about why I started it in [an article on this site](../articles/fitness-app-first-project).

## The work

It's a React app built with Vite, with Firebase handling accounts and Cloud Firestore storing your custom workouts and completed sessions. You set a goal, build workouts from exercises and sets, and the dashboard shows today's plan. When you train, you log the session against that plan, comparing planned and actual totals, and it joins your history.

The interface is styled with Tailwind CSS and built on Radix UI's accessible primitives for its forms and menus.
