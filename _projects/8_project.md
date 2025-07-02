---
layout: page
title: Context-Aware Dynamic Activity Recognition on Wearables
description: Adaptive recognition system dynamically adjusting sampling rates, sensors, and feature complexity to recognize smoking-related and daily activities from wrist-worn motion sensors
img: assets/img/projects/8_project/cover.png
importance: 7
category: Wearable Sensing & Human Activity Recognition
related_publications: false
---

### ✨ Motivation

This project investigates how dynamic, context-aware adaptation can improve human activity recognition (HAR) on wrist-worn devices. Unlike static pipelines with fixed sampling and feature extraction, this system adjusts configurations at runtime based on activity complexity to balance recognition accuracy, battery consumption, and computational cost.

To better address public health concerns related to smoking, the dataset was carefully designed to include smoking gestures as well as other daily wrist-to-mouth movements like eating and drinking. This approach helps the recognition system distinguish smoking from similar actions and can support applications for tracking smoking behavior and encouraging healthier habits.

---

### 📘 Method Overview

The architecture includes **three main modules**, illustrated in the flowchart below:

<div class="row mt-3">
  <div class="col-sm-12 text-center">
    <img src="/assets/img/projects/8_project/system-flowchart.png" alt="System Flowchart" class="img-fluid rounded z-depth-1">
    <p class="mt-2"><em>System Flowchart – State Detection, Session Management, and Classification Modules</em></p>
  </div>
</div>

---

### 📊 Dataset and Activities

Data were collected over **three months** from **11 participants** (ages 20–45) using:

- ⌚**Smartwatches:** LG Watch R, Urbane, Sony Watch 3
- 📱**Smartphones:** Samsung Galaxy S2/S3

**Sensors:**
- 3-axis accelerometer
- 3-axis gyroscope

**Recognized Activities (10 classes):**
- Smoking (standing, sitting, walking, group conversation)
- Drinking (sitting, standing)
- Eating
- Walking
- Standing
- Sitting

**Sampling:** All data were collected at **50 Hz**, then downsampled to 1–25 Hz for evaluation.

To simulate real-world use, scenarios combined multiple activities performed naturally in sequence.

---

#### 🚦 1. State Detection Module
- **Purpose:** Identify if the current activity is *simple* or *complex*.
- **How it works:**
  - Reads accelerometer (ACC) data in sliding windows.
  - If the last detected state was complex, gyroscope (GYR) data are also read.
  - Uses a **rule-based algorithm** (JRIP) to decide state transitions.
  - If an activity persists for >60 seconds, it triggers classification.

---

#### 🗂️ 2. Session Module
- **Purpose:** Track sessions of the same activity over time.
- **Functionality:**
  - Checks whether the activity exists in a session dictionary.
  - Updates average F1-score and count.
  - Prepares context for classification.

---

#### 🧩 3. Classification Module
- **Purpose:** Classify the detected session with an appropriate model.
- **Dynamic configuration:**
  - *Simple Session:*
    - Low-frequency sampling
    - Lightweight features
    - ACC data only
  - *Complex Session:*
    - High-frequency sampling
    - Richer features
    - ACC + GYR data
  - Computes F1-score and updates session metrics.

---

### ⚙️ Technical Highlights

**Sensor and Data Configurations:**
- **Sampling Rates:** 1, 2, 5, 10, 25, 50 Hz
- **Window Sizes:** 5–30 seconds
- **Feature Types:**
  - Statistical (mean, std, range)
  - Frequency domain (energy, entropy)

**Dynamic Adaptation:**
- Reduces sampling when the user is static.
- Switches to richer features and higher sampling when complex motion is detected.
- Enables **energy savings without compromising classification performance**.

---

### 🧪 Results and Insights

**Performance Comparison:**

- **Static:** Always uses full sensors and highest sampling.
- **Semi-Dynamic:** Varies sampling rate.
- **Dynamic:** Varies sampling, feature set, and sensors.

**Key Findings:**
- Dynamic configuration improved **overall F1-score from 0.72 to 0.78**.
- Complex activities (e.g., smoking in a group) achieved **up to 20% higher recognition**.
- CPU time reduced by ~15%.
- Energy consumption reduced by ~38%.

---

**Resource vs. Accuracy Trade-offs:**

<div class="text-center my-4">
  <img src="/assets/img/projects/8_project/resource-accuracy-tradeoff.png" alt="Resource vs F1 Score" class="img-fluid rounded z-depth-1" style="max-width:500px;">
  <p class="mt-2"><em>Resource Consumption and Accuracy Trade-off</em></p>
</div>

---

**Efficiency Trends:**

<div class="row mt-3">
  <div class="col-sm-6">
    <img src="/assets/img/projects/8_project/cpu-consumption.png" alt="CPU Time" class="img-fluid rounded z-depth-1">
  </div>
  <div class="col-sm-6">
    <img src="/assets/img/projects/8_project/energy-consumption.png" alt="Energy Consumption" class="img-fluid rounded z-depth-1">
  </div>
</div>

- Static configurations consumed significantly more CPU and energy.
- Dynamic sampling and feature selection kept resource use low without harming accuracy.

---

### ✨ Key Contributions

✅ **Context-Aware HAR Pipeline:**
First system dynamically switching sampling rate, feature complexity, and sensor set on wearables.

✅ **Rule-Based State Detection:**
Lightweight detection of simple vs. complex activities.

✅ **Resource Profiling:**
Detailed measurements of CPU time, energy, and memory.

✅ **Improved Recognition:**
Dynamic adaptation boosted recognition performance for smoking-related activities.

---

### 📝 Reflections

- Dynamic configurations **outperformed static baselines** in both recognition and resource use.
- Rule-based state detection was accurate and computationally lightweight.
- This work demonstrates that **context-aware HAR is feasible on low-power devices**.

---

### ⚙️ Technical Stack

- **Languages:** Python
- **Devices:** Wrist-worn IMU sensors
- **Techniques:** Dynamic configuration switching, adaptive feature extraction, energy profiling

---

### 🔗 Links

- [Publication](https://doi.org/10.1016/j.compeleceng.2020.106949)
