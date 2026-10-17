---
title: Early Universe Sound Simulator
motto: Il suono del primo cielo
domain: studi
status: shipped
folio: 15
summary: A short Python simulation of the "sound" of the early universe, built from harmonic waves inspired by the acoustic oscillations in the cosmic microwave background.
role: Author
years: '2025'
stack: [Python, NumPy, Matplotlib, sounddevice]
links:
  repo: https://github.com/Alexman39/early-universe-sound-sim
sketch: ripples
desk: { x: 1230, y: 1500, size: 230 }
note: Sound spreads like circles in water.
sound:
  frequencies: [55, 110, 165, 220, 275, 330]
  amplitudes: [1.0, 0.7, 0.5, 0.3, 0.2, 0.1]
  seconds: 5
---

## The idea

In the young universe, sound waves travelled through hot plasma, and their imprint is still visible in the cosmic microwave background. I wanted to hear an impression of that: not a measurement, but a simple model you can listen to.

## The work

The script builds five seconds of audio at 44.1 kHz from six harmonics of 55 Hz, each one quieter than the last, and normalises the result. It plots the first thousand samples with Matplotlib, then plays the sound through `sounddevice`.

Leonardo wrote that sound spreads through the air the way circles spread on water when a stone is thrown in. This little program is the same thought in NumPy. You can hear it on this page, played by your browser from the same frequencies and amplitudes.
