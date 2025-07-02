---
layout: page
title: Image Stitching (Panoramic) from Scratch
description: Homography estimation and panoramic reconstruction combining SVD, backward warping, and image blending (no built-in libraries like OpenCV)
img: assets/img/projects/5_project/cover.png
importance: 2
category: Computer Vision & Image Modeling
related_publications: false
---

### ✨ Motivation

This project demonstrates how homography estimation can be used to warp and blend images into panoramic mosaics. Unlike relying on built-in libraries (e.g., OpenCV's `stitcher()`), the entire pipeline was implemented from scratch in Python, providing a clear, step-by-step understanding of projective geometry and image blending.

---

### 🛠️ Pipeline Overview

The process consists of four main modules:

**1. Point Selection**  
Corresponding points were selected manually by clicking on the images. The selection quality is critical because errors often result from:
- The number of points chosen
- Their distribution across the images
- The precise ordering of point pairs

*Examples of selected points on Paris A and Paris B:*

<div class="row mt-3">
  <div class="col-sm-6">
    <img src="/assets/img/projects/5_project/points-paris-a.jpg" alt="Points Paris A" class="img-fluid rounded z-depth-1">
    <p class="mt-2 text-center"><em>Paris A – Selected points corresponding to Paris B</em></p>
  </div>
  <div class="col-sm-6">
    <img src="/assets/img/projects/5_project/points-paris-b.jpg" alt="Points Paris B" class="img-fluid rounded z-depth-1">
    <p class="mt-2 text-center"><em>Paris B – Selected points corresponding to Paris A</em></p>
  </div>
</div>

For more details about point selection, see <a href="https://vision.gel.ulaval.ca/~jflalonde/cours/4105/h14/tps/results/tp4/jingweicao/index.html" target="_blank">this page</a>.

**2. Homography Estimation**  
A homography matrix was computed to map each source image onto the reference plane defined by Paris B.

**3. Image Warping**  
Each image was warped to align with the base image using backward warping. This involves mapping each destination pixel back to its source location.

*Example warped image:*

<div class="row mt-3 justify-content-center">
  <div class="col-sm-6">
    <img src="/assets/img/projects/5_project/warped-paris-a.jpg" alt="Warped Paris A" class="img-fluid rounded z-depth-1">
    <p class="mt-2 text-center"><em>Warped Paris A</em></p>
  </div>
</div>

**4. Blending Images**  
Finally, the warped images were combined with the base image to produce a continuous panorama. Simple pixel replacement was used in overlapping regions.

*Example of a blended result:*

<div class="row mt-3 justify-content-center">
  <div class="col-sm-10">
    <img src="/assets/img/projects/5_project/blended-panorama.jpg" alt="Blended Image" class="img-fluid rounded z-depth-1">
    <p class="mt-2 text-center"><em>Blended Image</em></p>
  </div>
</div>

---

✅ **Summary of Steps**
1. Select corresponding points carefully.
2. Estimate the homography matrix.
3. Warp the images to the same plane.
4. Blend them into a seamless mosaic.

---

### 📝 Reflections

- **Point Selection:** The most critical factor in quality.
- **SVD Stability:** Robust when outliers were minimized.
- **Blending:** Simple merging created visible seams; more advanced blending could improve results.
- **Learning Outcome:** Building the pipeline manually provided an in-depth understanding of homography-based image stitching.

---

### 🔗 Links

- [Project on GitHub](https://github.com/sumeyye-agac/homography-and-image-stitching-from-scratch)

---

Feel free to explore the repository and try stitching your own images!
