---
layout: page
title: DreamCatcher Earable Wearer-Aware Benchmark
description: Benchmarking lightweight classifiers for on-device sleep-event detection (quiet/breathe/snore) on earables, using CBAM attention and knowledge distillation
img: assets/img/projects/12_project/cover.png
importance: 0.5
category: Wearable Sensing & Human Activity Recognition
related_publications: false
---

### ✨ Motivation

Most people who snore have no idea they do, and by the time a sleep disorder is caught it has often gone unnoticed for years. Clinical diagnosis typically requires an overnight lab study, which is expensive, intrusive, and impractical for routine screening. Earables (lightweight in-ear devices) could make sleep-event screening continuous and private, but only if the model running on them is small enough for on-device inference without giving up much classification quality.

This project benchmarks lightweight classifiers on three sleep-relevant sound events — **quiet**, **breathe**, **snore** — using the [DreamCatcher dataset (NeurIPS 2024)](https://dl.acm.org/doi/10.5555/3737916.3740620), focusing on the trade-off between model size and accuracy through attention (CBAM) and knowledge distillation.

---

### 📊 Results at a Glance

| Stage | Params | Test Macro-F1 | Test Acc. |
|---|---:|---:|---:|
| CRNN (teacher) | 73,411 | 🧠 **82.82%** | 86.12% |
| TinyCNN baseline | 23,491 | 🪶 76.87% | 80.57% |
| TinyCNN + KD | 23,491 | 78.87% | 82.23% |
| TinyCNN + CBAM | 23,801 | 79.77% | 82.74% |
| TinyCNN + KD + CBAM | 23,801 | 🚀 **81.71%** | 84.95% |

The best compact model (KD + CBAM) is **~3.08x smaller** than the CRNN teacher it learns from, yet lands within **1.11%** test macro-F1 of it — down from a 5.95% gap at the TinyCNN baseline. Getting there takes more than one training run: the teacher is trained first, then a knowledge-distillation sweep across α (loss weight) × τ (softmax temperature) is run on top of it, 18 combinations in total.

---

### 🧠 Approach

- **Teacher / student pair:** `CRNN` (teacher) → `TinyCNN` (compact student) via knowledge distillation.
- **Attention ablation:** CBAM is added only to the small model (`TinyCNN_CBAM`); the CRNN teacher does not use it.
- **KD gating:** distillation only starts once the teacher's validation macro-F1 exceeds the best student's by at least 0.03 — otherwise the teacher is tuned further first.
- **Class imbalance:** fixed class weights (`1.0 / 1.5 / 5.5`) validated against the actual quiet/breathe/snore distribution.
- **Input representation:** 64-band log-mel spectrograms at 16 kHz.

---

### 🔁 Reproducibility

The full pipeline is manifest-driven rather than run ad hoc:

- `experiments/manifest_repro_v1.json` pins the canonical experiment policy (11 Phase-1 runs, 18 KD runs, one seed).
- `scripts/run_experiment_manifest.py` replays it end to end, with `--dry-run`, `--resume`, and `--fresh-start` modes.
- `scripts/check_consistency.py --strict` is the pre-push gate, checking that manifest, docs, and results stay in sync.
- Every run emits a mandatory artifact set (`metrics.json`, confusion matrix, leaderboard row) under an enforced schema.
- Dominated or negative results are documented in `docs/negative_results.md` instead of being left out.

---

### ⚙️ Technical Stack
- **Dataset**: [DreamCatcher (THU-PI-Sensing)](https://huggingface.co/datasets/THU-PI-Sensing/DreamCatcher) via Hugging Face, filtered to a 3-class subset
- **Models**: `TinyCNN`, `TinyCNN` + CBAM, `CRNN` (teacher), PyTorch
- **Training**: class-weighted loss, early stopping, knowledge distillation (α × τ sweep)
- **Device support**: CUDA → MPS → CPU auto-selection
- **Tooling**: manifest-driven experiment runner, automated consistency checks, results leaderboard, GitHub Actions

---

### 🔗 Links
- [Project on GitHub](https://github.com/sumeyye-agac/dreamcatcher-earable-wearer-aware-benchmark)
- [DreamCatcher dataset](https://huggingface.co/datasets/THU-PI-Sensing/DreamCatcher)
