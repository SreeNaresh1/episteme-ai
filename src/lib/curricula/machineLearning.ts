import { WeekCurriculumTopic } from '../pathGenerator';

export const MACHINE_LEARNING_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Foundations & Mathematics (Weeks 1 - 10) ──────────────────────────────
  {
    title: 'Foundations of Machine Learning & Problem Framing',
    objective: 'Distinguish supervised, unsupervised, and reinforcement learning. Formulate business problems as ML objectives.',
    category: 'foundations',
    resources: [{ title: 'Google Machine Learning Crash Course: Framing', url: 'https://developers.google.com/machine-learning/crash-course/framing', platform: 'Google Developers' }],
  },
  {
    title: 'Linear Algebra for ML: Vectors, Dot Products & Matrices',
    objective: 'Compute vector dot products, matrix multiplications, transpose operations, and linear transformations.',
    category: 'foundations',
    resources: [{ title: 'Khan Academy Linear Algebra Foundations', url: 'https://www.khanacademy.org/math/linear-algebra', platform: 'Khan Academy' }],
  },
  {
    title: 'Matrix Factorization & Eigendecomposition',
    objective: 'Understand eigenvalues, eigenvectors, trace, determinant, and spectral decomposition in data transformations.',
    category: 'foundations',
    resources: [{ title: 'Khan Academy Matrix Transformations', url: 'https://www.khanacademy.org/math/linear-algebra/matrix-transformations', platform: 'Khan Academy' }],
  },
  {
    title: 'Multivariable Calculus: Gradients & Partial Derivatives',
    objective: 'Calculate partial derivatives, gradient vectors, tangent planes, and directional rates of change.',
    category: 'foundations',
    resources: [{ title: 'Khan Academy Multivariable Calculus', url: 'https://www.khanacademy.org/math/multivariable-calculus', platform: 'Khan Academy' }],
  },
  {
    title: 'Optimization Foundations: Gradient Descent Algorithms',
    objective: 'Implement batch gradient descent, stochastic gradient descent (SGD), and learning rate schedules from scratch.',
    category: 'foundations',
    resources: [{ title: 'Google ML Crash Course: Reducing Loss', url: 'https://developers.google.com/machine-learning/crash-course/reducing-loss', platform: 'Google Developers' }],
  },
  {
    title: 'Probability Theory: Distributions & Bayes Rule',
    objective: 'Model discrete/continuous random variables, conditional probability, Bayes theorem, and expectation values.',
    category: 'foundations',
    resources: [{ title: 'Khan Academy Probability and Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
  },
  {
    title: 'Python for Scientific Computing: NumPy Vectorization',
    objective: 'Master N-dimensional array broadcasting, vectorization, boolean masking, and fast linear algebra with NumPy.',
    category: 'foundations',
    resources: [{ title: 'NumPy Official User Guide & Tutorial', url: 'https://numpy.org/doc/stable/user/quickstart.html', platform: 'NumPy Docs' }],
  },
  {
    title: 'Data Wrangling with Pandas for ML Datasets',
    objective: 'Clean messy tabular data, handle missing values with imputation, and transform column types for ML pipelines.',
    category: 'foundations',
    resources: [{ title: 'Kaggle Pandas Course', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Exploratory Data Analysis & Statistical Visualization',
    objective: 'Plot distributions, correlation heatmaps, pairplots, and identify outliers using Seaborn and Matplotlib.',
    category: 'foundations',
    resources: [{ title: 'Kaggle Data Visualization Course', url: 'https://www.kaggle.com/learn/data-visualization', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Feature Engineering: Encoding & Scaling',
    objective: 'Transform raw data with one-hot encoding, target encoding, standard scaling, and log transforms for skewed features.',
    category: 'foundations',
    resources: [{ title: 'Kaggle Feature Engineering Guide', url: 'https://www.kaggle.com/learn/feature-engineering', platform: 'Kaggle Learn' }],
  },

  // ── Classical Supervised Learning (Weeks 11 - 22) ───────────────────────────
  {
    title: 'Linear Regression: Ordinary Least Squares (OLS)',
    objective: 'Fit univariate and multivariate linear regressions, evaluate Mean Squared Error (MSE) and R-squared metrics.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Linear Models Guide', url: 'https://scikit-learn.org/stable/modules/linear_model.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Regularized Regression: Ridge (L2) & Lasso (L1)',
    objective: 'Mitigate collinearity and overfitting using L1 (Lasso) and L2 (Ridge) penalties in cost functions.',
    category: 'core',
    resources: [{ title: 'Google ML Crash Course: Regularization for Simplicity', url: 'https://developers.google.com/machine-learning/crash-course/regularization-for-simplicity', platform: 'Google Developers' }],
  },
  {
    title: 'Logistic Regression & Binary Classification',
    objective: 'Map linear outputs through the sigmoid function, compute binary cross-entropy loss, and set decision boundaries.',
    category: 'core',
    resources: [{ title: 'Google ML Crash Course: Logistic Regression', url: 'https://developers.google.com/machine-learning/crash-course/logistic-regression', platform: 'Google Developers' }],
  },
  {
    title: 'Classification Metrics: ROC-AUC, Precision & Recall',
    objective: 'Evaluate confusion matrices, calculate precision, recall, F1-score, and plot ROC curves across probability thresholds.',
    category: 'core',
    resources: [{ title: 'Google ML Crash Course: Classification', url: 'https://developers.google.com/machine-learning/crash-course/classification', platform: 'Google Developers' }],
  },
  {
    title: 'Decision Trees: Information Gain & Gini Impurity',
    objective: 'Construct classification and regression trees using recursive binary splitting and tree pruning strategies.',
    category: 'core',
    resources: [{ title: 'Kaggle Intro to Machine Learning: Trees', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Ensemble Learning: Random Forests',
    objective: 'Implement bootstrap aggregation (bagging), random feature subsets, and evaluate feature importances.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Forest of Trees Guide', url: 'https://scikit-learn.org/stable/modules/ensemble.html#forests-of-randomized-trees', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Gradient Boosted Decision Trees: XGBoost & LightGBM',
    objective: 'Train sequential boosting models that fit residuals of prior trees, tuning learning rate and max depth.',
    category: 'core',
    resources: [{ title: 'Kaggle Intermediate Machine Learning: XGBoost', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Support Vector Machines (SVM) & Kernel Methods',
    objective: 'Maximize hyperplane margins between classes and map non-linear data via Radial Basis Function (RBF) kernels.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Support Vector Machines', url: 'https://scikit-learn.org/stable/modules/svm.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'K-Nearest Neighbors (KNN) & Distance Metrics',
    objective: 'Classify points using Euclidean, Manhattan, and cosine distance metrics with K-fold neighbor voting.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Nearest Neighbors User Guide', url: 'https://scikit-learn.org/stable/modules/neighbors.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Naive Bayes Classifiers & Text Categorization',
    objective: 'Implement Gaussian and Multinomial Naive Bayes using bag-of-words and TF-IDF term representations.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Naive Bayes Guide', url: 'https://scikit-learn.org/stable/modules/naive_bayes.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Hyperparameter Tuning: Grid Search & Bayesian Optimization',
    objective: 'Systematically optimize model performance using cross-validated GridSearchCV, RandomizedSearchCV, and Optuna.',
    category: 'core',
    resources: [{ title: 'Scikit-Learn Hyper-parameter Tuning', url: 'https://scikit-learn.org/stable/modules/grid_search.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Data Leakage Prevention & Cross-Validation Strategies',
    objective: 'Implement Stratified K-Fold cross-validation and scikit-learn Pipelines to eliminate test set information leakage.',
    category: 'core',
    resources: [{ title: 'Kaggle Intermediate Machine Learning: Cross-Validation', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', platform: 'Kaggle Learn' }],
  },

  // ── Unsupervised Learning & Dimensionality Reduction (Weeks 23 - 28) ────────
  {
    title: 'K-Means Clustering & Voronoi Partitions',
    objective: 'Partition unlabeled data, choose optimal K with the Elbow method and Silhouette coefficients.',
    category: 'applied',
    resources: [{ title: 'Scikit-Learn Clustering Guide', url: 'https://scikit-learn.org/stable/modules/clustering.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Hierarchical Clustering & DBSCAN Density Algorithms',
    objective: 'Construct dendrograms and discover arbitrary-shape clusters with noise filtering via DBSCAN.',
    category: 'applied',
    resources: [{ title: 'Scikit-Learn Density-Based Clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html#dbscan', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Principal Component Analysis (PCA)',
    objective: 'Project high-dimensional feature spaces onto orthogonal principal axes while retaining maximum variance.',
    category: 'applied',
    resources: [{ title: 'Scikit-Learn Dimensionality Reduction: PCA', url: 'https://scikit-learn.org/stable/modules/decomposition.html#pca', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Non-Linear Dimensionality Reduction: t-SNE & UMAP',
    objective: 'Visualize complex high-dimensional datasets in 2D/3D embeddings preserving local manifold neighborhoods.',
    category: 'applied',
    resources: [{ title: 'Scikit-Learn Manifold Learning: t-SNE', url: 'https://scikit-learn.org/stable/modules/manifold.html#t-sne', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Anomaly & Outlier Detection Algorithms',
    objective: 'Identify multivariate anomalies using Isolation Forests, One-Class SVMs, and Local Outlier Factor (LOF).',
    category: 'applied',
    resources: [{ title: 'Scikit-Learn Novelty and Outlier Detection', url: 'https://scikit-learn.org/stable/modules/outlier_detection.html', platform: 'Scikit-Learn' }],
  },
  {
    title: 'Recommendation Systems: Collaborative & Content-Based Filtering',
    objective: 'Build recommendation engines using cosine similarity matrices and Singular Value Decomposition (SVD).',
    category: 'applied',
    resources: [{ title: 'Google Recommendation Systems Course', url: 'https://developers.google.com/machine-learning/recommendation', platform: 'Google Developers' }],
  },

  // ── Deep Learning & Neural Networks (Weeks 29 - 40) ─────────────────────────
  {
    title: 'Neural Networks: Perceptrons & Activation Functions',
    objective: 'Build single-layer perceptrons, understand ReLU, GELU, and Sigmoid activations, and forward propagation.',
    category: 'advanced',
    resources: [{ title: 'Fast.ai Practical Deep Learning: Lesson 1', url: 'https://course.fast.ai/', platform: 'Fast.ai' }],
  },
  {
    title: 'Backpropagation & Computational Graphs in PyTorch',
    objective: 'Trace computational graphs, compute gradients with PyTorch autograd, and optimize weights via Adam.',
    category: 'advanced',
    resources: [{ title: 'PyTorch Official Deep Learning Tutorials', url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', platform: 'PyTorch' }],
  },
  {
    title: 'Deep Multi-Layer Perceptrons (MLPs) & Regularization',
    objective: 'Prevent deep neural network overfitting with Dropout layers, L2 weight decay, and Early Stopping.',
    category: 'advanced',
    resources: [{ title: 'PyTorch Build the Neural Network Tutorial', url: 'https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html', platform: 'PyTorch' }],
  },
  {
    title: 'Convolutional Neural Networks (CNN): Convolutions & Pooling',
    objective: 'Process visual arrays with 2D convolution kernels, stride, padding, and max-pooling operations.',
    category: 'advanced',
    resources: [{ title: 'Fast.ai Computer Vision Fundamentals', url: 'https://course.fast.ai/', platform: 'Fast.ai' }],
  },
  {
    title: 'Computer Vision: Transfer Learning with ResNet & Vision Models',
    objective: 'Fine-tune pre-trained vision backbones on custom image classification datasets with frozen layers.',
    category: 'advanced',
    resources: [{ title: 'PyTorch Transfer Learning for Computer Vision', url: 'https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', platform: 'PyTorch' }],
  },
  {
    title: 'Object Detection & Image Segmentation Architecture',
    objective: 'Understand bounding box regression (IoU, mAP), YOLO anchors, and pixel-level semantic segmentation (U-Net).',
    category: 'advanced',
    resources: [{ title: 'Fast.ai Advanced Vision Architectures', url: 'https://course.fast.ai/', platform: 'Fast.ai' }],
  },
  {
    title: 'Natural Language Processing: Tokenization & Embeddings',
    objective: 'Transform raw text into token IDs using Byte-Pair Encoding (BPE) and train Word2Vec / GloVe semantic vectors.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face NLP Course: Tokenization', url: 'https://huggingface.co/learn/nlp-course/chapter2/1', platform: 'Hugging Face' }],
  },
  {
    title: 'Recurrent Neural Networks (RNN) & LSTMs',
    objective: 'Model temporal sequences using hidden state recurrent loops and gated memory cells in Long Short-Term Memory.',
    category: 'advanced',
    resources: [{ title: 'PyTorch Sequence Modeling with RNNs and LSTMs', url: 'https://pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html', platform: 'PyTorch' }],
  },
  {
    title: 'The Transformer Architecture: Self-Attention Mechanisms',
    objective: 'Compute Scaled Dot-Product Attention, multi-head projections, positional encodings, and feedforward blocks.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face NLP Course: Transformers Inside', url: 'https://huggingface.co/learn/nlp-course/chapter1/1', platform: 'Hugging Face' }],
  },
  {
    title: 'BERT & Masked Language Modeling',
    objective: 'Fine-tune encoder-only Transformer models (BERT/RoBERTa) for sentiment analysis and named entity recognition.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face Fine-Tuning a Pretrained Model', url: 'https://huggingface.co/learn/nlp-course/chapter3/1', platform: 'Hugging Face' }],
  },
  {
    title: 'Generative AI: Autoregressive Decoder Models (GPT)',
    objective: 'Understand causal masking, next-token temperature sampling, top-k/top-p decoding, and context windows.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face Generative Text Modeling', url: 'https://huggingface.co/learn/nlp-course/', platform: 'Hugging Face' }],
  },
  {
    title: 'LLM Adaptation: Parameter-Efficient Fine-Tuning (LoRA & PEFT)',
    objective: 'Adapt large language models using low-rank adapter matrices (LoRA/QLoRA) on single GPUs.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face PEFT Guide for Large Models', url: 'https://huggingface.co/docs/peft/index', platform: 'Hugging Face' }],
  },

  // ── Production MLOps & Capstone (Weeks 41 - 52) ─────────────────────────────
  {
    title: 'Retrieval-Augmented Generation (RAG) Architecture',
    objective: 'Construct vector search pipelines using embeddings, cosine similarity search, and grounding context for LLMs.',
    category: 'advanced',
    resources: [{ title: 'Hugging Face RAG & Semantic Search Tutorials', url: 'https://huggingface.co/learn/', platform: 'Hugging Face' }],
  },
  {
    title: 'Model Evaluation: Bias, Fairness & Robustness Audits',
    objective: 'Evaluate model fairness across demographic subgroups, detect data drift, and calculate calibration curves.',
    category: 'advanced',
    resources: [{ title: 'Google ML Crash Course: Fairness & Bias', url: 'https://developers.google.com/machine-learning/crash-course/fairness', platform: 'Google Developers' }],
  },
  {
    title: 'Model Serialization & ONNX Runtime Optimization',
    objective: 'Export PyTorch and Scikit-Learn weights to portable ONNX format for low-latency CPU and GPU inference.',
    category: 'advanced',
    resources: [{ title: 'PyTorch ONNX Export Documentation', url: 'https://pytorch.org/docs/stable/onnx.html', platform: 'PyTorch' }],
  },
  {
    title: 'ML Serving APIs with FastAPI & Pydantic Validation',
    objective: 'Wrap ML inference pipelines in asynchronous REST endpoints with input validation and batching.',
    category: 'advanced',
    resources: [{ title: 'FastAPI Interactive Tutorial & Deployment', url: 'https://fastapi.tiangolo.com/tutorial/', platform: 'FastAPI' }],
  },
  {
    title: 'Containerizing ML Inference with Docker',
    objective: 'Package model weights, dependencies, and FastAPI server into an isolated, reproducible Docker container.',
    category: 'capstone',
    resources: [{ title: 'Docker Official Getting Started Guide', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },
  {
    title: 'MLOps Pipeline Tracking & Experiment Logging',
    objective: 'Track hyperparameters, loss metrics, and artifact lineage using open-source experiment trackers.',
    category: 'capstone',
    resources: [{ title: 'Kaggle Machine Learning Pipelines', url: 'https://www.kaggle.com/learn/', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Interactive Model Demos with Gradio & Streamlit',
    objective: 'Build web interfaces allowing users to test model predictions live with audio, image, and text inputs.',
    category: 'capstone',
    resources: [{ title: 'Hugging Face Spaces & Gradio Documentation', url: 'https://huggingface.co/docs/hub/spaces', platform: 'Hugging Face' }],
  },
  {
    title: 'Capstone Phase 1: Problem Definition & Data Pipeline',
    objective: 'Collect open dataset, conduct statistical data hygiene, and create automated train/val/test splits.',
    category: 'capstone',
    resources: [{ title: 'Kaggle Datasets & Community Projects', url: 'https://www.kaggle.com/datasets', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Capstone Phase 2: Model Architecture & Baseline Comparison',
    objective: 'Train baseline models, engineer domain-specific features, and systematically outperform naive benchmarks.',
    category: 'capstone',
    resources: [{ title: 'Google Machine Learning Practicum Guide', url: 'https://developers.google.com/machine-learning/', platform: 'Google Developers' }],
  },
  {
    title: 'Capstone Phase 3: Fine-Tuning & Quantization Optimization',
    objective: 'Apply 8-bit/4-bit quantization, prune model parameters, and minimize inference latency without losing accuracy.',
    category: 'capstone',
    resources: [{ title: 'Hugging Face Model Optimization & Quantization', url: 'https://huggingface.co/docs/optimum/', platform: 'Hugging Face' }],
  },
  {
    title: 'Capstone Phase 4: Production Cloud Deployment & Live API',
    objective: 'Deploy containerized model API to cloud endpoint with monitoring and automated health checks.',
    category: 'capstone',
    resources: [{ title: 'GitHub Open Source Machine Learning Portfolio Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Portfolio Showcase, Technical Defense & Research Report',
    objective: 'Author comprehensive technical model cards, error analysis reports, and present capstone project.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50 AI Capstone Project Showcase', url: 'https://cs50.harvard.edu/ai/', platform: 'Harvard University' }],
  },
];
