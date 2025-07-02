---
layout: page
title: How Does a CNN Learn?
description: In-depth analysis of image classification using convolutional networks, architecture variations, and training dynamics
img: assets/img/projects/2_project/cover.png
importance: 5
category: Computer Vision & Image Modeling
related_publications: false
---

### ✨ Motivation

In this project, I built and analyzed a convolutional neural network (CNN) in TensorFlow to investigate the impact of architectural and training hyperparameters on model performance. While most deep learning pipelines focus solely on accuracy, this work emphasizes systematic experimentation and interpretability, examining how design decisions affect convergence, generalization, and representation learning.

Using the CIFAR-10 benchmark dataset, I ran over 30 comparative experiments, isolating variables such as activation functions, filter sizes, kernel initializations, batch normalization, dropout, data augmentation, and optimization strategies. My goal was to draw reliable conclusions about which choices are critical under real-world constraints like limited training time, computational budget, and risk of overfitting.

---

### 🧩 Architecture Overview

The final CNN model consists of three convolutional layers with ReLU activation and He initialization, followed by a dense layer. Max pooling and batch normalization were applied, but dropout was intentionally omitted after experimental comparison. Input data was normalized and augmented with horizontal flips and random crops.

Key configuration:
- Conv layers: 3x3 filters with 32–64–128 feature maps  
- Dense layer: 512 units  
- Batch norm (pre-activation), no dropout  
- Optimizer: Adam, batch size: 32  
- Early stopping based on validation loss  
- 83%+ test accuracy achieved after ~100 epochs

This architecture was chosen not for complexity, but for the ability to clearly isolate and interpret the effect of each modification.

---

### 📊 Parameter Impact

Each parameter was varied in isolation and evaluated using held-out test performance. Key findings:

- ReLU consistently outperformed sigmoid/tanh in both convergence and generalization  
- Batch normalization (BN) yielded significant gains when applied before activation  
- Smaller filters (3x3) provided optimal trade-off between spatial resolution and compute  
- Dropout slowed convergence and underperformed in this architecture  
- Adam was the most robust optimizer across experiments

<div class="d-flex justify-content-center">
  <div class="col-md-6">
    {% include figure.liquid path="assets/img/projects/2_project/effect-batchnorm.png" title="Effect of Batch Normalization" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### 🔬 Feature Representation Analysis

To inspect how feature representations evolve across training, I extracted the latent space from the final dense layer and visualized it using t-SNE. Over 100 epochs, the learned space became more structured and separable, especially for well-represented classes.

<div class="d-flex justify-content-center">
  <div class="col-md-6">
    {% include figure.liquid path="assets/img/projects/2_project/tsne-epoch100.png" title="t-SNE of final feature representations (Epoch 100)" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

---

### 📈 Optimizer Comparison

The model was trained using several optimization strategies including SGD, RMSProp, Adagrad, and Adam. Results showed that adaptive optimizers—particularly Adam—consistently provided the best convergence and final accuracy.

<div class="row">
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/2_project/optimizer-train-accuracy.png" title="Training Accuracy per Optimizer" class="img-fluid rounded z-depth-1" %}
  </div>
  <div class="col-sm">
    {% include figure.liquid path="assets/img/projects/2_project/optimizer-validation-accuracy.png" title="Validation Accuracy per Optimizer" class="img-fluid rounded z-depth-1" %}
  </div>
</div>

#### 🔍 Experiment Summary

This project involved extensive experimentation to understand the impact of different hyperparameters and architectural choices on CNN performance. Each category below was systematically explored through isolated tests:

| Category             | Variants Explored                         |
|----------------------|--------------------------------------------|
| Activation Functions | ReLU, Sigmoid, Tanh                        |
| Filter Sizes         | 3×3, 5×5, 7×7                              |
| Feature Maps         | 32–64–128, 32–32–64, 64–128–256            |
| Fully Connected Layers | 1 layer, 2 layers, 3 layers              |
| Pooling Methods      | Max pooling, Average pooling              |
| Initialization Schemes | He, Xavier, Random Normal               |
| Data Augmentation    | Horizontal flip, Random crop, Combined (S3) |
| Dropout Rates        | 0.3, 0.5, No dropout                       |
| Batch Normalization  | With batch norm, Without batch norm       |
| Batch Sizes          | 16, 32, 64                                 |
| Optimizers           | Adam, SGD, RMSProp, Adagrad, Adadelta     |

Each configuration was logged, visualized, and interpreted to understand not just what works, but why it works. This deliberate process informed the final model design.


### ⚙️ Technical Stack
- **Framework**: TensorFlow 
- **Dataset**: CIFAR-10  
- **Architecture**: 3-layer CNN  
- **Visualization**: t-SNE, Matplotlib, comparative charts   
- **Training**: Manual tuning, early stopping, augmentation

---

### 🔗 Links  
- [Project on GitHub](https://github.com/sumeyye-agac/object-classification-CIFAR10-tensorflow)
