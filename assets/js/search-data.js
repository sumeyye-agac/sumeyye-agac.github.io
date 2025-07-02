// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-ml-projects",
          title: "ML Projects",
          description: "🌿 Hi, and thanks for visiting!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "Link to my Google Scholar profile&lt;/",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-resume",
          title: "Resume",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-biosignal-based-stress-detection",
          title: 'Biosignal-Based Stress Detection',
          description: "Detecting stress states from ECG, GSR, and heart rate signals using machine learning",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-who-s-wearing-the-glasses",
          title: 'Who’s Wearing the Glasses?',
          description: "Behavioral biometrics to identify users by analyzing head gestures",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-how-does-a-cnn-learn",
          title: 'How Does a CNN Learn?',
          description: "In-depth analysis of image classification using convolutional networks, architecture variations, and training dynamics",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-next-word-prediction-from-scratch",
          title: 'Next-Word Prediction from Scratch',
          description: "Sequence modeling of text data with a custom multi-layer perceptron built entirely from scratch (only NumPy)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-expectation-maximization-for-gmm-from-scratch",
          title: 'Expectation-Maximization for GMM from Scratch',
          description: "Unsupervised clustering and density estimation using a Gaussian Mixture Model (GMM) built entirely from scratch (only NumPy)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-image-stitching-panoramic-from-scratch",
          title: 'Image Stitching (Panoramic) from Scratch',
          description: "Homography estimation and panoramic reconstruction combining SVD, backward warping, and image blending (no built-in libraries like OpenCV)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-variational-autoencoder-for-mnist-digits",
          title: 'Variational Autoencoder for MNIST Digits',
          description: "Generative modeling of handwritten digits using a variational autoencoder (VAE) combining an LSTM encoder and CNN decoder",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-feature-engineering-for-wrist-based-activity-recognition",
          title: 'Feature Engineering for Wrist-Based Activity Recognition',
          description: "Analysis of motion, orientation, and rotation features extracted from wrist accelerometer data to classify complex activities",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-context-aware-dynamic-activity-recognition-on-wearables",
          title: 'Context-Aware Dynamic Activity Recognition on Wearables',
          description: "Adaptive recognition system dynamically adjusting sampling rates, sensors, and feature complexity to recognize smoking-related and daily activities from wrist-worn motion sensors",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-attention-based-knowledge-distillation-for-har",
          title: 'Attention-Based Knowledge Distillation for HAR',
          description: "Lightweight human activity recognition (HAR) combining knowledge distillation and attention modules to improve performance on wearable sensor data",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
