---
layout: page
title: Expectation-Maximization for GMM from Scratch
description: Unsupervised clustering and density estimation using a Gaussian Mixture Model (GMM) built entirely from scratch (only NumPy)
img: assets/img/projects/4_project/cover.png
importance: 4
category: Sequence & Pattern Learning
related_publications: false
---

### ✨ Motivation

This project demonstrates how the **Expectation-Maximization (EM)** algorithm can be used to fit a **Gaussian Mixture Model (GMM)** to unlabeled data. Unlike K-means, GMM with EM models data as a combination of probabilistic clusters with soft assignments, providing more flexible and realistic representations of real-world data.

The implementation was built **from scratch** in Python, with custom logic for the E-step and M-step. Visualizations of how cluster assignments evolve over iterations provide valuable intuition on the convergence behavior and sensitivity to initialization.

---

### 🧩 Algorithm Summary

We aim to fit the data with $$K = 3$$ Gaussian components. The EM algorithm proceeds iteratively with the following two steps:

1. **E-step**: Compute soft cluster assignments (responsibilities) for each point using current estimates of means, covariances, and mixture weights.
2. **M-step**: Update the parameters (means, covariances, and weights) by maximizing the expected log-likelihood based on current responsibilities.

Convergence is detected when the increase in log-likelihood falls below a defined threshold (e.g., $$\epsilon = 10^{-4}$$).

---

### 📊 Iterative Clustering Process

We tracked the cluster assignment evolution visually across several EM steps, revealing how the model gradually finds the optimal Gaussian boundaries.

<div class="row">
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-00.png" title="Iteration 0" caption="Random initialization — no separation" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-05.png" title="Iteration 5" caption="Soft cluster formation starts" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-10.png" title="Iteration 10" caption="Clear cluster identities begin to emerge" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-15.png" title="Iteration 15" caption="Almost converged" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-19.png" title="Iteration 19" caption="Final stage before stabilization" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm-4">
    {% include figure.liquid path="assets/img/projects/4_project/em-iteration-21.png" title="Iteration 21" caption="Converged clusters" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### 🧮 Mathematical Formulation

Let $$\mathbf{x}_i \in \mathbb{R}^d$$ be the input data point, and let $$\pi_k$$, $$\mu_k$$, and $$ \Sigma_k$$ be the weight, mean, and covariance matrix for component $$k$$.

#### Gaussian PDF

The likelihood of point $$\mathbf{x}_i$$ under component $$k$$ is given by:

$$
\mathcal{N}(\mathbf{x}_i \mid \mu_k, \Sigma_k) = \frac{1}{(2\pi)^{d/2} |\Sigma_k|^{1/2}} \exp\left(-\frac{1}{2} (\mathbf{x}_i - \mu_k)^\top \Sigma_k^{-1} (\mathbf{x}_i - \mu_k)\right)
$$

#### E-step: Responsibility Calculation

Soft assignment $$\gamma_{ik}$$ of point $$i$$ to cluster $$k$$:

$$
\gamma_{ik} = \frac{\pi_k \, \mathcal{N}(\mathbf{x}_i \mid \mu_k, \Sigma_k)}{\sum_{j=1}^K \pi_j \, \mathcal{N}(\mathbf{x}_i \mid \mu_j, \Sigma_j)}
$$

#### M-step: Parameter Updates

Weighted sums:

$$
N_k = \sum_{i=1}^n \gamma_{ik}
$$

Updated mean:

$$
\mu_k = \frac{1}{N_k} \sum_{i=1}^n \gamma_{ik} \mathbf{x}_i
$$

Updated covariance:

$$
\Sigma_k = \frac{1}{N_k} \sum_{i=1}^n \gamma_{ik} (\mathbf{x}_i - \mu_k)(\mathbf{x}_i - \mu_k)^\top
$$

Updated mixture weight:

$$
\pi_k = \frac{N_k}{n}
$$

#### Log-Likelihood

To track convergence:

$$
\log p(X) = \sum_{i=1}^n \log \left( \sum_{k=1}^K \pi_k \, \mathcal{N}(\mathbf{x}_i \mid \mu_k, \Sigma_k) \right)
$$

---

### 📈 Sensitivity to Initialization

Different random initializations lead to different convergence paths. Below are examples starting from various initial guesses for means:

<div class="row">
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/4_project/em-init1-iteration1.png" title="Init 1" caption="Initial means close together" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/4_project/em-init2-iteration1.png" title="Init 2" caption="Initial means spread" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

<div class="row mt-3">
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/4_project/em-init2-iteration8.png" title="Init 3" caption="Mid-run refinement" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/4_project/em-init3-iteration14.png" title="Init 4" caption="Difficult start but convergence" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### 🧪 Additional Explorations

- Tracked log-likelihood evolution across iterations  
- Explored different covariance strategies (diagonal vs. full)  
- Compared soft vs. hard assignments (vs. K-means)  
- Visualized 2D projections of posterior probabilities  
- Confirmed convergence stability and repeatability

---

### ⚙️ Technical Stack

- **Language**: Python (NumPy, Matplotlib, Seaborn)
- **Algorithm**: Expectation-Maximization for Gaussian Mixture Models
- **Visualization**: Iterative clustering, posterior surfaces, convergence curves
- **Evaluation**: Log-likelihood trends, cluster interpretability, sensitivity analysis

---

### 🔗 Links  
- [Project on GitHub](https://github.com/sumeyye-agac/logistic-regression-from-scratch)


