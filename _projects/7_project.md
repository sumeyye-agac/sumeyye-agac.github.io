---
layout: page
title: Feature Engineering for Wrist-Based Activity Recognition
description: Analysis of motion, orientation, and rotation features extracted from wrist accelerometer data to classify complex activities
img: assets/img/projects/7_project/cover.png
importance: 9
category: Wearable Sensing & Human Activity Recognition
related_publications: false
---

### ✨ Motivation

This project explored how different sets of features extracted from wrist-worn accelerometer data can improve activity recognition performance. Unlike studies focusing only on simple locomotion (walking, running), this work investigated complex activities such as eating, smoking, and typing. The aim was to identify which features, such as motion, orientation, or rotation, provide the best discriminative power and whether combining them improves accuracy.

---

### 🧭 Experimental Setup

**Dataset Overview:**
- **Participants:** 10 volunteers (ages 23–35)
- **Device:** Samsung Galaxy S2 emulating a smartwatch, worn on the right wrist
- **Sampling Rate:** 50 Hz
- **Activities (13):**  
  - Eating  
  - Typing  
  - Writing  
  - Drinking coffee  
  - Smoking  
  - Giving a talk  
  - Walking  
  - Jogging  
  - Biking  
  - Walking upstairs  
  - Walking downstairs  
  - Sitting  
  - Standing  

**Protocols:**
- Most activities lasted 3–6 minutes per participant.
- Each time window was 20 seconds.
- Labels were manually annotated.

---

### 🛠️ Feature Extraction

Features were grouped into **three categories**:

**M: Motion Features** (from acceleration magnitude):
- Mean
- Variance
- RMS
- Zero-Crossing Rate
- Absolute Difference
- First 5 FFT Coefficients
- Spectral Energy

**O: Orientation Features** (from each axis separately):
- Standard Deviation
- RMS
- Zero-Crossing Rate
- Absolute Difference

**R: Rotation Features** (pitch and roll computed from acceleration):
- Mean
- Standard Deviation
- RMS
- Zero-Crossing Rate
- Absolute Difference
- Spectral Energy

In total, **35 features** were extracted per window.

---

### 🧪 Results and Insights

Classification was performed using **Decision Tree**, **Naive Bayes**, and **Random Forest** classifiers with 10-fold cross-validation.

---

**Classifier Comparison:**

<div class="text-center my-4">
  <img src="/assets/img/projects/7_project/cover.png" alt="Classifier Comparison" class="img-fluid rounded z-depth-1" style="max-width:800px;">
  <p class="mt-2"><em>Figure 4: Average accuracy of classifiers across feature combinations</em></p>
</div>

- Random Forest consistently outperformed the others, achieving up to **89% accuracy**.
- Naive Bayes performed surprisingly well on walking-related activities.
- Decision Tree had lower accuracy but remained interpretable.

---

**Feature Combination Analysis:**

- **Orientation features alone achieved the highest individual accuracy (78%).**
- **Combining motion and orientation features yielded the best overall results (up to 89%).**
- Adding rotation features did not consistently improve performance and sometimes increased confusion among similar activities.

---

**Gyroscope Comparison:**

- Rotation features extracted from gyroscope data were also evaluated.
- While gyroscope provided more precise rotation information, it did not substantially outperform pitch and roll derived from the accelerometer.
- Considering battery consumption, an **accelerometer-only solution remains practical**.

---

### 📝 Key Insights

- **Orientation features are most discriminative** among wrist-worn signals.
- Combining motion and orientation consistently improved accuracy.
- Using only accelerometer data was nearly as effective as adding gyroscope data while consuming less power.
- Activities involving similar hand positions (e.g., sitting vs. standing) remained challenging.

---

### ⚙️ Technical Stack

- **Language:** Python
- **Libraries:** Scikit-learn
- **Sensors:** 3-axis accelerometer (and gyroscope for comparison)
- **Classifier Algorithms:** Decision Tree, Naive Bayes, Random Forest

---

### 🔗 Links

- [Publication](https://www.researchgate.net/publication/307879621_Feature_Engineering_for_Activity_Recognition_from_Wrist-worn_Motion_Sensors)

