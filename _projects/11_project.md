---
layout: page
title: Movesense ECG/HRV Live Dashboard
description: Real-time ECG, HRV, and motion streaming from a chest-worn Movesense sensor to a browser dashboard over Bluetooth
img: assets/img/projects/11_project/cover.png
importance: 11
category: Wearable Sensing & Human Activity Recognition
related_publications: false
---

### ✨ Motivation

Movesense ships a medical-grade chest sensor with ECG, IMU9, heart rate, and temperature channels, but the vendor SDK only targets Android and iOS. There is no first-party way to get live biosignals onto a laptop for quick experimentation, so this project builds that missing path: a Python backend that talks to the sensor directly over Bluetooth Low Energy, and a browser dashboard for watching and recording the streams in real time.

**How do you read a wearable's biosignal streams on a laptop when the vendor never built that path — and how do you trust the decoded values once you have them?** The measurement payloads ride on Movesense's proprietary GSP protocol, whose byte layout isn't published, so decoding it correctly was as much the project as building the dashboard itself.

---

### 🩺 Hardware

<div class="row">
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/11_project/belt-outside.jpg" title="Chest belt with the Movesense MD sensor" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/11_project/belt-inside.jpg" title="ECG electrode pads on the inside" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  A Movesense MD sensor clipped into a certified chest belt; the two electrode pads on the inside pick up the ECG.
</div>

---

### 🖥️ Live Dashboard

<div class="row justify-content-sm-center">
  <div class="col-sm-10 mt-3 mt-md-0">
    {% include figure.liquid path="assets/img/projects/11_project/dashboard.png" title="Live dashboard during a recording" class="img-fluid rounded z-depth-1" %}
  </div>
</div>
<div class="caption">
  Sampling-rate and stream controls, heart rate / HRV / temperature tiles, and live ECG, accelerometer, gyroscope, and magnetometer traces — 15 seconds into a session labeled "jumping." The accelerometer dips mark the jumps.
</div>

---

### 🧊 Architecture Overview

```
Movesense MD sensor  --BLE-->  Python backend (bleak)  --WebSocket-->  Browser dashboard
                                     |
                                     +-- FastAPI serves /ws and /status
```

Two data paths run side by side. Heart rate and RR-intervals arrive over the standard Bluetooth Heart Rate Service, pre-decoded; the backend keeps a rolling window of the last 60 RR-intervals and reports a live SDNN as an HRV indicator. ECG, IMU9, and temperature arrive over GSP, Movesense's own protocol for clients that can't run their mobile SDK - all three share one GATT notify characteristic, distinguished by a reference code chosen at subscribe time, with binary payload layouts that had to be decoded from live captures rather than a published spec. The backend forwards everything over a WebSocket to a single-file HTML/Chart.js frontend, which also drives labeled-session recording: stopping a capture returns a ZIP with one CSV per stream plus a `meta.json` and a per-recording README.

---

### 🔍 Verifying an Undocumented Protocol

Movesense's GSP spec documents the command/response envelope (HELLO, SUBSCRIBE, response codes) but not the byte layout of the measurement payload itself. Guessing at a binary format for a biosignal and trusting it blindly seemed worse than not decoding it at all, so each channel was checked against something independently known to be true rather than assumed correct:

- **Accelerometer:** `sqrt(x²+y²+z²)` should read ~9.8 m/s² on a roughly stationary sensor (Earth's gravity) — confirmed across multiple samples.
- **ECG:** raw int16 samples scaled to mV using Movesense's published conversion factor, checked against the shape of a normal resting ECG trace.
- **Magnetometer:** flagged as **unverified** rather than silently assumed correct — an uncalibrated MEMS magnetometer carries a hard-iron offset that the obvious sanity check (magnitude in Earth's ~25-65 µT field range) can't confirm on a stationary sensor.
- **Sampling-rate safety:** GSP has no GET verb to ask the sensor which rates it supports, and subscribing at an unsupported rate is silently accepted and delivers nothing - so starting a recording resubscribes, waits for packets to actually arrive, and refuses to start (restoring the previous working rate) if none do.

---

### ⚙️ Technical Stack
- **Hardware**: Movesense MD sensor, certified chest belt with ECG electrode pads
- **Protocols**: Bluetooth Low Energy, standard BLE Heart Rate Service, Movesense GSP (reverse-engineered payload decoding)
- **Backend**: Python 3.10+, FastAPI, bleak, WebSocket
- **Frontend**: Single-file HTML dashboard, Chart.js (vendored, no CDN dependency)
- **Data export**: Multi-stream CSV + JSON metadata per recorded session
- **Tests**: `unittest`, run via GitHub Actions on every push

---

### 🔗 Links
- [Project on GitHub](https://github.com/sumeyye-agac/movesense-ecg-hrv-dashboard)
