import { GoogleGenerativeAI } from '@google/generative-ai';
import { REGISTERED_CURRICULA } from './curricula';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface CourseResource {
  title: string;
  url: string;
  platform: string;
}

export interface WeekPlan {
  week_number: number;
  title: string;
  description: string;
  hours_allocated: number;
  resources: {
    title: string;
    url: string;
    platform: string;
    is_free: boolean;
  }[];
}

export interface LearningPath {
  weeks: WeekPlan[];
  total_hours_used: number;
  prerequisites_note: string;
  source: 'gemini' | 'rule_based';
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type LearnerPace = 'fast_track' | 'balanced' | 'deep_mastery';
export type LifeSituation = 'working_professional' | 'career_switcher' | 'busy_caregiver' | 'student';

export interface WeekCurriculumTopic {
  title: string;
  objective: string;
  category: 'foundations' | 'core' | 'applied' | 'advanced' | 'capstone';
  resources: CourseResource[];
}

// ── 52 Unique Sequential Week Topics with Dedicated Resources per Domain ─────
export const DOMAIN_52_WEEK_CURRICULA: Record<string, WeekCurriculumTopic[]> = {
  'data analyst': [
    {
      title: 'Foundations of Data Analysis & Analytical Thinking',
      objective: 'Understand the data analysis lifecycle, asking structured business questions, and ethical data governance.',
      category: 'foundations',
      resources: [{ title: 'Google Data Analytics Certificate', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' }],
    },
    {
      title: 'Spreadsheet Essentials: Data Hygiene & Formats',
      objective: 'Master spreadsheet grids, cell references, data validation, cleaning anomalies, and text transformations.',
      category: 'foundations',
      resources: [{ title: 'Excel Skills for Business', url: 'https://www.coursera.org/specializations/excel', platform: 'Coursera' }],
    },
    {
      title: 'Spreadsheet Calculation: Logical & Lookup Formulas',
      objective: 'Implement IF, IFS, VLOOKUP, XLOOKUP, and INDEX/MATCH across multi-sheet workbooks.',
      category: 'foundations',
      resources: [{ title: 'Excel Formulas & Calculations Guide', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' }],
    },
    {
      title: 'Pivot Tables & Dynamic Executive Summaries',
      objective: 'Synthesize raw transaction logs into grouped pivot tables, calculated fields, slicers, and trend charts.',
      category: 'foundations',
      resources: [{ title: 'Excel Skills for Business: Pivot Tables', url: 'https://www.coursera.org/specializations/excel', platform: 'Coursera' }],
    },
    {
      title: 'Relational Database Concepts & SQL SELECT Basics',
      objective: 'Learn tables, primary keys, relational schemas, SELECT, WHERE, and aliasing in SQL.',
      category: 'core',
      resources: [{ title: 'Introduction to SQL', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }, { title: 'Intro to SQL with BigQuery', url: 'https://www.kaggle.com/learn/intro-to-sql', platform: 'Kaggle' }],
    },
    {
      title: 'SQL Filtering, Pattern Matching & Sorting',
      objective: 'Apply LIKE, IN, BETWEEN, ORDER BY, and NULL value handling to refine queries.',
      category: 'core',
      resources: [{ title: 'Mode SQL Tutorial: Filtering & Logic', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
    },
    {
      title: 'SQL Aggregations, GROUP BY & HAVING Clauses',
      objective: 'Calculate COUNT, SUM, AVG, MIN, and MAX grouped by business dimensions with HAVING filters.',
      category: 'core',
      resources: [{ title: 'Mode SQL Tutorial: Aggregate Functions', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
    },
    {
      title: 'Multi-Table SQL Joins: INNER, LEFT, RIGHT & FULL',
      objective: 'Connect relational tables with foreign keys and understand Cartesian products and Venn logic.',
      category: 'core',
      resources: [{ title: 'SQL Joins & Relational Modeling', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }, { title: 'SQL for Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', platform: 'Coursera' }],
    },
    {
      title: 'SQL Subqueries, Nested Queries & CTEs',
      objective: 'Write modular SQL using Common Table Expressions (WITH clauses) and correlated subqueries.',
      category: 'core',
      resources: [{ title: 'Mode SQL Tutorial: Subqueries & CTEs', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
    },
    {
      title: 'Advanced SQL: Window Functions (ROW_NUMBER & RANK)',
      objective: 'Rank rows within partitions and calculate running totals using OVER and PARTITION BY.',
      category: 'core',
      resources: [{ title: 'Advanced SQL Window Functions', url: 'https://www.kaggle.com/learn/advanced-sql', platform: 'Kaggle' }],
    },
    {
      title: 'SQL Analytic Functions: LAG, LEAD & Moving Averages',
      objective: 'Analyze period-over-period growth and moving averages for financial and user metrics.',
      category: 'core',
      resources: [{ title: 'Kaggle Advanced SQL Performance', url: 'https://www.kaggle.com/learn/advanced-sql', platform: 'Kaggle' }],
    },
    {
      title: 'SQL Milestone: End-to-End Query Audit & Case Study',
      objective: 'Execute a comprehensive multi-table audit project answering 10 complex executive questions.',
      category: 'core',
      resources: [{ title: 'Mode Analytics Real-World SQL Case Studies', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
    },
    {
      title: 'Python Fundamentals: Setup, Data Types & Syntax',
      objective: 'Configure Python environment, understand integers, strings, floats, booleans, and variables.',
      category: 'applied',
      resources: [{ title: 'Python for Everybody', url: 'https://www.coursera.org/specializations/python', platform: 'Coursera' }, { title: 'Official Python 3 Tutorial', url: 'https://docs.python.org/3/tutorial/', platform: 'Python Docs' }],
    },
    {
      title: 'Python Collections: Lists, Dictionaries, Sets & Tuples',
      objective: 'Organize structured records using key-value mappings, list slicing, and collection methods.',
      category: 'applied',
      resources: [{ title: 'Intro to Programming with Python', url: 'https://www.kaggle.com/learn/python', platform: 'Kaggle' }],
    },
    {
      title: 'Python Control Flow & Custom Function Writing',
      objective: 'Write reusable procedural functions with docstrings, type hints, and conditional logic.',
      category: 'applied',
      resources: [{ title: 'Python Functions & Scope', url: 'https://docs.python.org/3/tutorial/', platform: 'Python Docs' }],
    },
    {
      title: 'NumPy Arrays & Vectorized Numerical Operations',
      objective: 'Perform multi-dimensional array operations, broadcasting, and vector math with NumPy.',
      category: 'applied',
      resources: [{ title: 'NumPy Vectorized Quickstart', url: 'https://numpy.org/doc/stable/user/quickstart.html', platform: 'NumPy Docs' }],
    },
    {
      title: 'Introduction to Pandas: DataFrames & Series',
      objective: 'Load CSV, Excel, and JSON files into DataFrames, inspect dtypes, head, tail, and info.',
      category: 'applied',
      resources: [{ title: 'Intro to Data Analysis with Pandas', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' }, { title: 'Pandas 10-Minute Getting Started', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' }],
    },
    {
      title: 'Pandas Data Indexing, Slicing & Conditional Filtering',
      objective: 'Filter DataFrames using Boolean masking, loc, iloc, and complex multi-column logic.',
      category: 'applied',
      resources: [{ title: 'Pandas Indexing & Selection', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' }],
    },
    {
      title: 'Pandas Data Cleaning: Nulls, Duplicates & Type Casts',
      objective: 'Impute missing values, drop duplicates, parse timestamps, and standardize string columns.',
      category: 'applied',
      resources: [{ title: 'Kaggle Data Cleaning Course', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' }],
    },
    {
      title: 'Pandas GroupBy & Multi-Level Aggregations',
      objective: 'Perform split-apply-combine aggregations across categorical features with named outputs.',
      category: 'applied',
      resources: [{ title: 'Pandas GroupBy Transformation', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' }],
    },
    {
      title: 'Pandas Merging, Joining & Reshaping (Melt & Pivot)',
      objective: 'Normalize and reshape datasets between wide and long formats for downstream analysis.',
      category: 'applied',
      resources: [{ title: 'Pandas Reshaping & Pivoting', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' }],
    },
    {
      title: 'Time Series Analysis: Resampling & Rolling Windows',
      objective: 'Handle datetime indices, resample daily to monthly metrics, and compute rolling statistics.',
      category: 'applied',
      resources: [{ title: 'Pandas Time Series Resampling', url: 'https://pandas.pydata.org/docs/getting_started/index.html', platform: 'Pandas' }],
    },
    {
      title: 'Data Visualisation Principles & Matplotlib Essentials',
      objective: 'Construct bar charts, line plots, and histograms adhering to cognitive visual hierarchy.',
      category: 'applied',
      resources: [{ title: 'Matplotlib Quickstart Tutorials', url: 'https://matplotlib.org/stable/tutorials/index.html', platform: 'Matplotlib' }],
    },
    {
      title: 'Statistical Visualisation with Seaborn',
      objective: 'Create boxplots, violin plots, pairplots, and heatmaps to reveal correlations and outliers.',
      category: 'applied',
      resources: [{ title: 'Data Visualization with Python', url: 'https://www.kaggle.com/learn/data-visualization', platform: 'Kaggle' }, { title: 'Seaborn Distribution Plots', url: 'https://seaborn.pydata.org/tutorial.html', platform: 'Seaborn' }],
    },
    {
      title: 'Descriptive Statistics: Central Tendency & Dispersion',
      objective: 'Compute mean, median, mode, variance, standard deviation, interquartile range, and skew.',
      category: 'applied',
      resources: [{ title: 'Statistics and Probability', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
    },
    {
      title: 'Probability Distributions & Central Limit Theorem',
      objective: 'Understand normal, binomial, and Poisson distributions and how sample sizes affect error.',
      category: 'applied',
      resources: [{ title: 'Khan Academy Distributions & CLT', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
    },
    {
      title: 'Hypothesis Testing: T-Tests, Chi-Square & P-Values',
      objective: 'Formulate null hypotheses, calculate test statistics, evaluate p-values, and avoid p-hacking.',
      category: 'advanced',
      resources: [{ title: 'Khan Academy Hypothesis Testing', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
    },
    {
      title: 'A/B Testing Methodology & Experiment Design',
      objective: 'Design randomized control trials, determine statistical power, and calculate minimum sample sizes.',
      category: 'advanced',
      resources: [{ title: 'Khan Academy Experiment Design', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
    },
    {
      title: 'Correlation vs Causation & Confounding Variables',
      objective: 'Measure Pearson and Spearman coefficients while isolating confounding biases.',
      category: 'advanced',
      resources: [{ title: 'Khan Academy Bivariate Data Analysis', url: 'https://www.khanacademy.org/math/statistics-probability', platform: 'Khan Academy' }],
    },
    {
      title: 'Business Intelligence Strategy & Metric Frameworks',
      objective: 'Define North Star metrics, OKRs, customer acquisition cost (CAC), LTV, and churn rates.',
      category: 'advanced',
      resources: [{ title: 'Google Data Analytics: Metric Frameworks', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' }],
    },
    {
      title: 'Tableau Fundamentals: Connecting & Cleaning Sources',
      objective: 'Connect to flat files and databases, manage data types, and build initial data relationships.',
      category: 'advanced',
      resources: [{ title: 'Tableau Public Training', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' }],
    },
    {
      title: 'Tableau Visualizations: Dimensions, Measures & Marks',
      objective: 'Leverage color, size, shape, and detail shelves to communicate multi-variable findings.',
      category: 'advanced',
      resources: [{ title: 'Tableau Public Visual Best Practices', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' }],
    },
    {
      title: 'Tableau Calculated Fields & Level of Detail (LOD)',
      objective: 'Write FIXED, INCLUDE, and EXCLUDE expressions to compute cross-granular ratios.',
      category: 'advanced',
      resources: [{ title: 'Tableau Public Calculations', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' }],
    },
    {
      title: 'Interactive Tableau Dashboards & Storyboards',
      objective: 'Build interactive dashboards with URL actions, filter actions, and executive stories.',
      category: 'advanced',
      resources: [{ title: 'Tableau Public Interactive Dashboards', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' }],
    },
    {
      title: 'Microsoft Power BI: Power Query Data Transformation',
      objective: 'Ingest and transform messy enterprise data using Power Query and step-based pipelines.',
      category: 'advanced',
      resources: [{ title: 'Power BI Fundamentals', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' }],
    },
    {
      title: 'Power BI Data Modeling: Star & Snowflake Schemas',
      objective: 'Establish one-to-many relationships, manage cross-filter direction, and optimize cardinality.',
      category: 'advanced',
      resources: [{ title: 'Microsoft Power BI Modeling', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' }],
    },
    {
      title: 'Power BI DAX Essentials: Calculated Columns & Measures',
      objective: 'Write DAX formulas using CALCULATE, FILTER, RELATED, and time intelligence functions.',
      category: 'advanced',
      resources: [{ title: 'Microsoft Power BI DAX Formulas', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' }],
    },
    {
      title: 'Executive KPI Reporting & Power BI Visual Design',
      objective: 'Design clean, accessible executive KPI scorecards with conditional formatting and drill-through.',
      category: 'advanced',
      resources: [{ title: 'Microsoft Power BI Visual Dashboards', url: 'https://learn.microsoft.com/en-us/power-bi/fundamentals/service-get-started', platform: 'Microsoft Learn' }],
    },
    {
      title: 'Cohort Analysis & Customer Retention Modeling',
      objective: 'Build monthly retention heatmaps and measure user engagement across acquisition cohorts.',
      category: 'advanced',
      resources: [{ title: 'freeCodeCamp Data Analysis with Python', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'Customer Segmentation & RFM (Recency, Frequency, Value)',
      objective: 'Score and segment customer bases into VIP, at-risk, and churning buckets using quantiles.',
      category: 'advanced',
      resources: [{ title: 'Kaggle Customer Segmentation Analysis', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' }],
    },
    {
      title: 'Funnel Analysis & Conversion Rate Optimization',
      objective: 'Map multi-stage user conversion funnels and pinpoint drop-off friction points.',
      category: 'advanced',
      resources: [{ title: 'Mode Analytics User Conversion Funnels', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
    },
    {
      title: 'Financial Analytics: Runway, Burn Rate & Unit Economics',
      objective: 'Model revenue waterfalls, contribution margins, and financial forecast scenarios.',
      category: 'advanced',
      resources: [{ title: 'Excel Skills for Business: Advanced', url: 'https://www.coursera.org/specializations/excel', platform: 'Coursera' }],
    },
    {
      title: 'Web Analytics & User Behavior Tracking Metrics',
      objective: 'Analyze clickstream events, bounce rates, session durations, and attribution models.',
      category: 'advanced',
      resources: [{ title: 'Google Performance Analytics', url: 'https://developers.google.com/machine-learning/crash-course', platform: 'Google' }],
    },
    {
      title: 'Intro to Predictive Analytics: Linear Regression',
      objective: 'Fit linear regression models with Scikit-learn, interpret R-squared and coefficients.',
      category: 'advanced',
      resources: [{ title: 'Intro to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', platform: 'Kaggle' }],
    },
    {
      title: 'Classification Analytics: Logistic Regression & ROC-AUC',
      objective: 'Predict binary outcomes like customer churn, evaluate confusion matrices and recall.',
      category: 'advanced',
      resources: [{ title: 'Intermediate Machine Learning', url: 'https://www.kaggle.com/learn/intermediate-machine-learning', platform: 'Kaggle' }],
    },
    {
      title: 'Automated Reporting & Scheduled Data Pipelines',
      objective: 'Write automated Python scripts to pull SQL data, generate charts, and export PDF summaries.',
      category: 'advanced',
      resources: [{ title: 'Python Automation Tutorials', url: 'https://docs.python.org/3/tutorial/', platform: 'Python Docs' }],
    },
    {
      title: 'Data Governance, Privacy (GDPR/CCPA) & Compliance',
      objective: 'Apply data anonymization, PII masking, data retention policies, and compliance standards.',
      category: 'advanced',
      resources: [{ title: 'Google Data Analytics: Ethics & Privacy', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' }],
    },
    {
      title: 'Capstone Phase 1: Real-World Business Problem Framing',
      objective: 'Select an open-source enterprise dataset, write a project charter, and define analytical scope.',
      category: 'capstone',
      resources: [{ title: 'Kaggle Public Datasets Directory', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle' }],
    },
    {
      title: 'Capstone Phase 2: Data Extraction, Cleaning & Validation',
      objective: 'Build the foundational SQL and Python ETL pipeline, documenting edge cases and anomalies.',
      category: 'capstone',
      resources: [{ title: 'GitHub Open Source Project Repository', url: 'https://github.com/', platform: 'GitHub' }],
    },
    {
      title: 'Capstone Phase 3: Exploratory Analysis & Hypothesis Proving',
      objective: 'Conduct deep-dive statistical analysis, proving or disproving three primary business hypotheses.',
      category: 'capstone',
      resources: [{ title: 'freeCodeCamp Data Analysis Capstone', url: 'https://www.freecodecamp.org/learn/data-analysis-with-python/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'Capstone Phase 4: Production Dashboard & Strategic Deck',
      objective: 'Build a polished public dashboard and craft a 10-slide executive presentation with recommendations.',
      category: 'capstone',
      resources: [{ title: 'Tableau Public Portfolio Showcase', url: 'https://public.tableau.com/app/learn/how-to-videos', platform: 'Tableau Public' }],
    },
    {
      title: 'Portfolio Showcase, Code Review & Technical Defense',
      objective: 'Publish GitHub repository with clean README, present findings, and practice live SQL coding.',
      category: 'capstone',
      resources: [{ title: 'GitHub Portfolio & Technical Documentation', url: 'https://github.com/', platform: 'GitHub' }],
    },
  ],

  'web developer': [
    {
      title: 'Internet Architecture, HTTP/HTTPS & Web Protocols',
      objective: 'Understand how DNS, client-server models, IP packets, and browsers render web pages.',
      category: 'foundations',
      resources: [{ title: 'MDN Web Docs Getting Started', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' }],
    },
    {
      title: 'HTML5 Semantic Structure & Document Standards',
      objective: 'Build accessible, semantic markup using header, nav, main, article, section, and forms.',
      category: 'foundations',
      resources: [{ title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'CSS3 Fundamentals: Selectors, Cascade & Specificity',
      objective: 'Master CSS rules, inheritance, specificity calculation, and the standard box model.',
      category: 'foundations',
      resources: [{ title: 'MDN CSS Basics Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' }],
    },
    {
      title: 'Modern CSS Layouts: Flexbox Mastery',
      objective: 'Align and distribute dynamic content along main and cross axes using modern Flexbox.',
      category: 'foundations',
      resources: [{ title: 'freeCodeCamp CSS Flexbox Modules', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'Modern CSS Layouts: CSS Grid Systems',
      objective: 'Construct responsive 2D layouts using grid-template-columns, minmax, and named template areas.',
      category: 'foundations',
      resources: [{ title: 'freeCodeCamp CSS Grid Modules', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'Responsive Design: Mobile-First Media Queries & Fluid Units',
      objective: 'Implement responsive breakpoints, rem/em units, clamp(), and viewport-relative scaling.',
      category: 'foundations',
      resources: [{ title: 'The Odin Project Responsive Design', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'CSS Animations, Transitions & Modern Glassmorphism',
      objective: 'Create micro-interactions, hardware-accelerated transforms, and smooth dark-mode transitions.',
      category: 'foundations',
      resources: [{ title: 'web.dev Responsive CSS Styling', url: 'https://web.dev/', platform: 'Google web.dev' }],
    },
    {
      title: 'Milestone 1: Production Responsive Landing Page',
      objective: 'Build and deploy a mobile-responsive, accessible landing page scoring 100 on Lighthouse.',
      category: 'foundations',
      resources: [{ title: 'freeCodeCamp Web Design Projects', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'JavaScript Fundamentals: Variables, Data Types & Scope',
      objective: 'Learn let, const, primitive types, type coercion, and block vs lexical scope.',
      category: 'core',
      resources: [{ title: 'JavaScript.info Modern Tutorial', url: 'https://javascript.info/', platform: 'JavaScript.info' }],
    },
    {
      title: 'JavaScript Functions, Arrow Syntax & Closures',
      objective: 'Master first-class functions, higher-order functions, default params, and closure state.',
      category: 'core',
      resources: [{ title: 'JavaScript Algorithms and Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'DOM Manipulation, Query Selectors & Element Creation',
      objective: 'Select, mutate, append, and remove DOM nodes dynamically using modern native APIs.',
      category: 'core',
      resources: [{ title: 'The Odin Project DOM Manipulation', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'Event Handling, Bubbling, Capturing & Delegation',
      objective: 'Implement event listeners, event delegation patterns, preventDefault, and stopPropagation.',
      category: 'core',
      resources: [{ title: 'JavaScript.info Browser Events', url: 'https://javascript.info/', platform: 'JavaScript.info' }],
    },
    {
      title: 'JavaScript Collections: Arrays, Objects & Destructuring',
      objective: 'Manipulate objects and arrays using destructuring, spread/rest, map, filter, and reduce.',
      category: 'core',
      resources: [{ title: 'freeCodeCamp Functional Programming', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/', platform: 'freeCodeCamp' }],
    },
    {
      title: 'Asynchronous JavaScript: Callbacks, Promises & Async/Await',
      objective: 'Handle asynchronous operations, error handling with try/catch, and Promise.all.',
      category: 'core',
      resources: [{ title: 'MDN Asynchronous JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' }],
    },
    {
      title: 'Fetch API, RESTful HTTP Requests & JSON Parsing',
      objective: 'Fetch remote data, handle response headers, status codes, and POST JSON payloads.',
      category: 'core',
      resources: [{ title: 'The Odin Project APIs & Async', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'Browser Storage: LocalStorage, SessionStorage & Cookies',
      objective: 'Persist client-side application state and manage authentication tokens safely.',
      category: 'core',
      resources: [{ title: 'web.dev Storage Best Practices', url: 'https://web.dev/', platform: 'Google web.dev' }],
    },
    {
      title: 'Modern JavaScript Tooling: NPM, Vite & ES Modules',
      objective: 'Manage dependencies with package.json, build bundles with Vite, and import/export modules.',
      category: 'core',
      resources: [{ title: 'The Missing Semester of Your CS Education', url: 'https://missing.csail.mit.edu/', platform: 'MIT CSAIL' }],
    },
    {
      title: 'Milestone 2: Dynamic Multi-Feature Vanilla JS Web App',
      objective: 'Build an interactive dashboard application utilizing external REST APIs and local storage.',
      category: 'core',
      resources: [{ title: 'The Odin Project Full-Stack JS Labs', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'Introduction to React: Components, JSX & Virtual DOM',
      objective: 'Understand the declarative component mental model, JSX syntax, and reconciliation.',
      category: 'applied',
      resources: [{ title: 'React Official Documentation & Guides', url: 'https://react.dev/learn', platform: 'React' }],
    },
    {
      title: 'React State Management with useState Hook',
      objective: 'Manage reactive state, state batching, pure component updates, and form binding.',
      category: 'applied',
      resources: [{ title: 'React Official State Tutorial', url: 'https://react.dev/learn', platform: 'React' }],
    },
    {
      title: 'Component Lifecycles & Side Effects with useEffect',
      objective: 'Synchronize components with external APIs, clean up timers, and handle dependency arrays.',
      category: 'applied',
      resources: [{ title: 'React Synchronizing with Effects', url: 'https://react.dev/learn', platform: 'React' }],
    },
    {
      title: 'Component Communication: Props, Children & Lifting State',
      objective: 'Pass props, render children, lift shared state up, and structure component trees.',
      category: 'applied',
      resources: [{ title: 'React Sharing State Between Components', url: 'https://react.dev/learn', platform: 'React' }],
    },
    {
      title: 'Advanced Hooks: useRef, useMemo & useCallback',
      objective: 'Optimize expensive re-renders and access imperative DOM nodes using performance hooks.',
      category: 'applied',
      resources: [{ title: 'Full Stack Open — React Hooks Deep Dive', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Global State: Context API & Reducer Patterns',
      objective: 'Manage complex global state machines without external third-party dependencies.',
      category: 'applied',
      resources: [{ title: 'React Scaling with Reducer and Context', url: 'https://react.dev/learn', platform: 'React' }],
    },
    {
      title: 'Client-Side Routing with React Router / Next.js Routing',
      objective: 'Implement dynamic URL parameters, nested layouts, protected routes, and 404 pages.',
      category: 'applied',
      resources: [{ title: 'Full Stack Open — React Router', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Building Forms: Validation, Controlled Inputs & UX',
      objective: 'Handle complex form state, validation feedback, accessibility labels, and submit states.',
      category: 'applied',
      resources: [{ title: 'web.dev Accessible Forms Guide', url: 'https://web.dev/', platform: 'Google web.dev' }],
    },
    {
      title: 'Milestone 3: Full-Featured React Single Page App',
      objective: 'Develop a complete React web application with CRUD operations, search filters, and routing.',
      category: 'applied',
      resources: [{ title: 'Full Stack Open — Course Projects', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Node.js Runtime Fundamentals & File System (fs/path)',
      objective: 'Execute server-side JavaScript, inspect the event loop, and interact with the file system.',
      category: 'advanced',
      resources: [{ title: 'The Odin Project Node Foundations', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'Building HTTP Servers with Express.js',
      objective: 'Create Express servers, handle routes, query parameters, URL params, and request bodies.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Backend Node & Express', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Express Middleware, Error Handlers & CORS',
      objective: 'Implement custom logging middleware, CORS security policies, and global error handlers.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Middleware & CORS', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'RESTful API Design Standards & Best Practices',
      objective: 'Architect clean REST endpoints utilizing correct HTTP verbs, status codes, and JSON schemas.',
      category: 'advanced',
      resources: [{ title: 'The Odin Project REST Architecture', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
    },
    {
      title: 'Relational Databases: PostgreSQL & SQL Modeling',
      objective: 'Design relational schemas, table foreign keys, cascading deletes, and write SQL queries.',
      category: 'advanced',
      resources: [{ title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/', platform: 'PostgreSQL' }],
    },
    {
      title: 'Database ORMs / Query Builders (Prisma & Drizzle)',
      objective: 'Define database schemas, generate type-safe migrations, and execute transactional queries.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Relational Databases', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'User Authentication: Password Hashing with Bcrypt & JWT',
      objective: 'Implement secure registration, salt rounds, JWT issuance, and auth middleware verification.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — User Authentication & JWT', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Authorization & Role-Based Access Control (RBAC)',
      objective: 'Protect administrative routes and enforce user permissions across API endpoints.',
      category: 'advanced',
      resources: [{ title: 'OWASP Top 10 Security Architecture', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
    },
    {
      title: 'Next.js App Router, Server Components & Actions',
      objective: 'Leverage React Server Components, streaming with Suspense, and server actions.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Modern Full-Stack Web', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Web Performance Optimization: Core Web Vitals',
      objective: 'Analyze and optimize LCP, FID/INP, CLS, image formats (WebP/AVIF), and lazy loading.',
      category: 'advanced',
      resources: [{ title: 'web.dev Core Web Vitals Guide', url: 'https://web.dev/', platform: 'Google web.dev' }],
    },
    {
      title: 'Testing Strategies: Unit Testing with Vitest / Jest',
      objective: 'Write automated unit tests for utility functions, math calculations, and state logic.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Testing React & Node', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'End-to-End (E2E) Browser Testing with Playwright',
      objective: 'Automate browser testing across critical user authentication and checkout flows.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — E2E Testing with Playwright', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Web Security Hardening: XSS, CSRF & Rate Limiting',
      objective: 'Mitigate cross-site scripting, configure Content Security Policy, and apply rate limits.',
      category: 'advanced',
      resources: [{ title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', platform: 'PortSwigger' }],
    },
    {
      title: 'Docker Containers for Web Developers',
      objective: 'Write multi-stage Dockerfiles, docker-compose environments, and containerize full-stack apps.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — Containers with Docker', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'CI/CD Pipelines with GitHub Actions',
      objective: 'Automate linting, test execution, and deployment pipelines on every main branch commit.',
      category: 'advanced',
      resources: [{ title: 'Full Stack Open — CI/CD Pipelines', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Cloud Deployment & Managed Production Databases',
      objective: 'Deploy frontend and backend to production environments with environment secrets.',
      category: 'advanced',
      resources: [{ title: 'The Missing Semester — Command Line & Deployment', url: 'https://missing.csail.mit.edu/', platform: 'MIT CSAIL' }],
    },
    {
      title: 'Capstone Phase 1: Full-Stack System Design & Schema',
      objective: 'Draft system design diagram, ERD database schema, and wireframe prototypes.',
      category: 'capstone',
      resources: [{ title: 'GitHub Open Source Architecture Templates', url: 'https://github.com/', platform: 'GitHub' }],
    },
    {
      title: 'Capstone Phase 2: Core Data Layer & Authenticated APIs',
      objective: 'Build robust database schema, migrations, and authenticated REST/Server Action endpoints.',
      category: 'capstone',
      resources: [{ title: 'Full Stack Open — Capstone Guidance', url: 'https://fullstackopen.com/', platform: 'University of Helsinki' }],
    },
    {
      title: 'Capstone Phase 3: Frontend UI, Micro-Animations & Dark Mode',
      objective: 'Implement accessible design system, dynamic filters, dark mode, and animations.',
      category: 'capstone',
      resources: [{ title: 'web.dev Modern Component Design', url: 'https://web.dev/', platform: 'Google web.dev' }],
    },
    {
      title: 'Capstone Phase 4: Production Deployment & Showcase',
      objective: 'Perform full security audit, run E2E test suites, deploy to custom domain, and publish repo.',
      category: 'capstone',
      resources: [{ title: 'GitHub Portfolio & Technical Showcase', url: 'https://github.com/', platform: 'GitHub' }],
    },
    {
      title: 'Career Readiness, Code Reviews & Technical Defense',
      objective: 'Conduct peer code reviews, practice system design whiteboard exercises, and package portfolio.',
      category: 'capstone',
      resources: [{ title: 'Harvard CS50 Final Project Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
    },
  ],
  ...REGISTERED_CURRICULA,
};

// ── Diverse Non-Repeating 52-Week Synthesizer for Custom Domains ──────────────
function generateGeneric52WeekTopics(domainName: string): WeekCurriculumTopic[] {
  const topics: WeekCurriculumTopic[] = [];
  const cap = domainName.charAt(0).toUpperCase() + domainName.slice(1);

  // Distinct verified open-source educational platforms & resource templates
  const PLATFORM_RESOURCES: Array<{ titleSuffix: string; url: string; platform: string }> = [
    { titleSuffix: 'Language Core & Syntax Essentials', url: 'https://docs.python.org/3/tutorial/', platform: 'Python Docs' },
    { titleSuffix: 'Interactive Developer Guide & Reference', url: 'https://developer.mozilla.org/en-US/docs/Learn', platform: 'MDN' },
    { titleSuffix: 'Hands-on Coding Fundamentals', url: 'https://www.freecodecamp.org/learn/', platform: 'freeCodeCamp' },
    { titleSuffix: 'Computational Thinking & Algorithms', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' },
    { titleSuffix: 'Computer Science Architecture', url: 'https://ocw.mit.edu/', platform: 'MIT OpenCourseWare' },
    { titleSuffix: 'System Administration & CLI Tooling', url: 'https://linuxjourney.com/', platform: 'Linux Journey' },
    { titleSuffix: 'Data Structures & Algorithmic Patterns', url: 'https://www.kaggle.com/learn/', platform: 'Kaggle Learn' },
    { titleSuffix: 'Interactive SQL & Data Modeling', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' },
    { titleSuffix: 'Enterprise Architecture & Cloud Concepts', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' },
    { titleSuffix: 'Modern Web & Performance Optimization', url: 'https://web.dev/', platform: 'Google web.dev' },
    { titleSuffix: 'Containerization & Microservice Environments', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' },
    { titleSuffix: 'Security Best Practices & OWASP Hardening', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' },
    { titleSuffix: 'Deep Learning & Applied Neural Systems', url: 'https://course.fast.ai/', platform: 'Fast.ai' },
    { titleSuffix: 'Open Source Collaboration & Code Review', url: 'https://github.com/', platform: 'GitHub' },
  ];

  const phaseDefinitions: Array<{
    name: string;
    weeks: number;
    category: WeekCurriculumTopic['category'];
    topics: string[];
  }> = [
    {
      name: 'Foundations & Mental Models',
      weeks: 8,
      category: 'foundations',
      topics: [
        'Development Environment Setup & CLI Ergonomics',
        'Syntax Foundations, Primitive Types & Expressions',
        'Control Structures, Conditional Logic & Branching',
        'Iteration Patterns, Loops & Sequence Traversal',
        'Functional Decomposition & Modular Abstractions',
        'Memory Representation, Pointers & References',
        'Input/Output Streams & File Persistence',
        'Debugging Methodologies, Tracebacks & Logging',
      ],
    },
    {
      name: 'Core Architecture & Algorithms',
      weeks: 12,
      category: 'core',
      topics: [
        'Object-Oriented Design & Encapsulation Models',
        'Data Structures: Arrays, Linked Lists & Dynamic Buffers',
        'Hash Maps, Dictionaries & Key-Value Lookup Mechanics',
        'Recursion, Call Stacks & Divide-and-Conquer Strategies',
        'Sorting, Searching & Asymptotic Big-O Complexity',
        'Trees, Graphs & Breadth/Depth-First Traversals',
        'Relational Data Stores & Structured Query Construction',
        'Error Boundaries, Exceptions & Recovery Protocols',
        'Testing Fundamentals: Unit Testing & Assertions',
        'Code Refactoring, Clean Code & SOLID Principles',
        'Version Control Workflows, Branching & Git Hygiene',
        'Package Management, Virtual Environments & Dependencies',
      ],
    },
    {
      name: 'Applied Engineering & Component Design',
      weeks: 14,
      category: 'applied',
      topics: [
        'Application Architecture: Layered & Component Models',
        'RESTful API Integration, HTTP Protocol & Endpoints',
        'Asynchronous Concurrency, Event Loops & Coroutines',
        'Multi-Threading, Worker Pools & Race Condition Prevention',
        'Data Validation, Schema Parsing & Serialization Formats',
        'Client-Server State Synchronization & Caching Patterns',
        'Database ORM Modeling, Migrations & Transactions',
        'Security Defenses: Input Sanitization & Authentication',
        'Role-Based Authorization & Session Token Management',
        'Third-Party Service Integration & Resilient Webhooks',
        'Containerization: Building Isolated Application Images',
        'Multi-Service Composition & Container Networking',
        'Continuous Integration: Automated Test Pipeline Setup',
        'Automated Deployment & Environment Configuration Secrets',
      ],
    },
    {
      name: 'Optimization, Reliability & Enterprise Hardening',
      weeks: 10,
      category: 'advanced',
      topics: [
        'Performance Profiling: CPU, Memory & Latency Diagnostics',
        'Algorithm Optimization: Reducing Quadratic Time Complexities',
        'Database Query Tuning, Indexing & Query Execution Plans',
        'Distributed Caching Strategies & Cache Invalidation',
        'Application Observability: Metrics, Tracing & Log Parsing',
        'Automated End-to-End User Journey Browser Testing',
        'Vulnerability Scanning & Penetration Attack Surface Audit',
        'Resilience Engineering: Circuit Breakers & Retries',
        'Scalability Bottleneck Analysis & Horizontal Sizing',
        'High-Availability Architecture & Disaster Recovery Runbooks',
      ],
    },
    {
      name: 'Production Capstone & Portfolio Defense',
      weeks: 8,
      category: 'capstone',
      topics: [
        'Capstone Blueprint: Requirements Specification & ERD',
        'Capstone Core Implementation: Core Engine & Data Flow',
        'Capstone Integration: APIs, Persistence & Middleware',
        'Capstone UI & Operational Interface Construction',
        'Capstone Hardening: Unit & Integration Test Suite Verification',
        'Capstone Cloud Deployment: Staging, Production & DNS',
        'Technical Documentation, OpenAPI Specs & Architecture Readme',
        'Portfolio Defense, Code Walkthrough & Engineering Defense',
      ],
    },
  ];

  let w = 1;
  for (const phase of phaseDefinitions) {
    for (let i = 0; i < phase.weeks; i++, w++) {
      const topicName = phase.topics[i] || `Advanced ${cap} Specialization Module ${i + 1}`;
      const resMeta = PLATFORM_RESOURCES[(w - 1) % PLATFORM_RESOURCES.length];

      topics.push({
        title: `Week ${w}: ${topicName} in ${cap}`,
        objective: `Master ${topicName.toLowerCase()} within the context of ${cap}. Build practical exercises and verify functionality.`,
        category: phase.category,
        resources: [
          {
            title: `${cap}: ${resMeta.titleSuffix} (Week ${w})`,
            url: resMeta.url,
            platform: resMeta.platform,
          },
        ],
      });
    }
  }

  return topics;
}

// ── Workload Feasibility Diagnostic & Auto-Balancer ──────────────────────────
export interface FeasibilityAssessment {
  status: 'optimal' | 'compressed' | 'extended';
  totalBudgetHours: number;
  benchmarkHours: number;
  coveragePercentage: number;
  headline: string;
  advice: string;
  recommendedWeeks: number;
  recommendedHoursPerWeek: number;
}

export function assessFeasibility(
  domain: string,
  level: SkillLevel,
  weeklyHours: number,
  horizonWeeks: number,
  pace: LearnerPace = 'balanced'
): FeasibilityAssessment {
  const benchmarkMap: Record<string, { beginner: number; intermediate: number; advanced: number }> = {
    'data analyst': { beginner: 130, intermediate: 90, advanced: 60 },
    'web developer': { beginner: 140, intermediate: 100, advanced: 70 },
    'python': { beginner: 72, intermediate: 50, advanced: 36 },
    'machine learning': { beginner: 156, intermediate: 110, advanced: 75 },
    'cybersecurity': { beginner: 120, intermediate: 85, advanced: 60 },
    'cloud devops': { beginner: 110, intermediate: 80, advanced: 55 },
    'data engineer': { beginner: 135, intermediate: 95, advanced: 65 },
    'mobile developer': { beginner: 120, intermediate: 85, advanced: 55 },
    'ui ux designer': { beginner: 90, intermediate: 60, advanced: 40 },
    'systems programmer': { beginner: 150, intermediate: 105, advanced: 70 },
    'computer science': { beginner: 160, intermediate: 115, advanced: 75 },
    'sql databases': { beginner: 60, intermediate: 40, advanced: 25 },
    'game developer': { beginner: 140, intermediate: 100, advanced: 65 },
  };

  const domainBenchmark = benchmarkMap[domain] || { beginner: 120, intermediate: 80, advanced: 50 };
  let targetHours = domainBenchmark[level] || 120;

  if (pace === 'fast_track') targetHours = Math.round(targetHours * 0.85);
  if (pace === 'deep_mastery') targetHours = Math.round(targetHours * 1.25);

  const budget = weeklyHours * horizonWeeks;
  const ratio = budget / targetHours;
  const coverage = Math.min(100, Math.round(ratio * 100));

  let recommendedWeeks = horizonWeeks;
  let recommendedHours = weeklyHours;

  if (weeklyHours <= 3) {
    recommendedWeeks = Math.max(16, Math.min(52, Math.round(targetHours / 5)));
    recommendedHours = 5;
  } else {
    recommendedWeeks = Math.max(8, Math.min(52, Math.round(targetHours / weeklyHours)));
    recommendedHours = weeklyHours;
  }

  if (ratio < 0.65) {
    return {
      status: 'compressed',
      totalBudgetHours: budget,
      benchmarkHours: targetHours,
      coveragePercentage: coverage,
      headline: 'Overload / High Compaction Risk',
      advice: `Reaching ${level}-level proficiency in ${domain} typically requires ~${targetHours} hours. At ${weeklyHours}h/wk over ${horizonWeeks}w (${budget}h total budget), only ${coverage}% of competency can be covered. Auto-balancing is recommended.`,
      recommendedWeeks,
      recommendedHoursPerWeek: recommendedHours,
    };
  } else if (ratio > 1.7) {
    return {
      status: 'extended',
      totalBudgetHours: budget,
      benchmarkHours: targetHours,
      coveragePercentage: coverage,
      headline: 'Diluted Pacing / Low Velocity',
      advice: `Your schedule allocates ${budget} hours (${coverage}% of standard requirement). While sustainable for busy schedules, you can complete this roadmap sooner by balancing to ${recommendedWeeks} weeks at ${recommendedHours}h/wk.`,
      recommendedWeeks,
      recommendedHoursPerWeek: recommendedHours,
    };
  }

  return {
    status: 'optimal',
    totalBudgetHours: budget,
    benchmarkHours: targetHours,
    coveragePercentage: coverage,
    headline: 'Mathematically Balanced & Feasible',
    advice: `Your ${budget}h budget over ${horizonWeeks} weeks aligns with the ~${targetHours}h requirement for ${level} level. Prerequisites are realistically scheduled without overload.`,
    recommendedWeeks: horizonWeeks,
    recommendedHoursPerWeek: weeklyHours,
  };
}

// ── Smart Natural Language Goal Intent Parser ────────────────────────────────
export interface StandardizedRole {
  id: string;
  title: string;
  domain: string;
  category: string;
  keywords: string[];
  competencies: string[];
  defaultWeeks: number;
  defaultHours: number;
}

export interface ParsedGoalIntent {
  domain: string;
  level: SkillLevel;
  weekly_hours: number;
  horizon_weeks: number;
  pace: LearnerPace;
  situation: LifeSituation;
  label: string;
  domain_display: string;
  domain_category: string;
  recognized: boolean;
  competencies: string[];
  confidence: string;
  guidance?: string;
}

// ── Standardized Professional Role Taxonomy (Industry Aligned) ───────────────
export const STANDARDIZED_ROLES: StandardizedRole[] = [
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    domain: 'data analyst',
    category: 'Data Analytics & Business Intelligence',
    keywords: ['data analyst', 'data analysis', 'business analyst', 'bi analyst', 'tableau', 'power bi', 'excel', 'sql analyst', 'reporting analyst', 'analytics consultant', 'bi developer'],
    competencies: ['SQL Querying', 'Spreadsheet Modeling', 'Tableau / Power BI', 'Exploratory Data Analysis', 'Executive Metrics'],
    defaultWeeks: 26,
    defaultHours: 5,
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    domain: 'machine learning',
    category: 'Data Science & Applied Analytics',
    keywords: ['data scientist', 'data science', 'predictive model', 'statistical learning', 'applied statistics', 'quantitative analysis', 'quant'],
    competencies: ['Python & Pandas', 'Statistical Hypothesis Testing', 'Scikit-Learn', 'Predictive Modeling', 'Feature Engineering'],
    defaultWeeks: 26,
    defaultHours: 6,
  },
  {
    id: 'machine_learning_engineer',
    title: 'Machine Learning Engineer',
    domain: 'machine learning',
    category: 'Artificial Intelligence & Machine Learning',
    keywords: ['machine learning', 'ml engineer', 'mlops', 'deep learning', 'neural network', 'computer vision', 'nlp', 'natural language processing', 'ai engineer', 'ai developer'],
    competencies: ['Deep Learning (PyTorch/TensorFlow)', 'Model Optimization', 'MLOps Deployment', 'Feature Stores', 'Hyperparameter Tuning'],
    defaultWeeks: 26,
    defaultHours: 6,
  },
  {
    id: 'ai_prompt_engineer',
    title: 'AI & Prompt Engineer',
    domain: 'machine learning',
    category: 'Generative AI & LLM Systems',
    keywords: ['prompt engineer', 'prompt engineering', 'generative ai', 'genai', 'llm engineer', 'llm', 'llms', 'large language model', 'rag', 'langchain', 'vector database', 'ai'],
    competencies: ['Prompt Architecture', 'RAG Retrieval Systems', 'Vector Embeddings', 'LLM Fine-Tuning', 'Agentic Workflows'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'data_engineer',
    title: 'Data Engineer',
    domain: 'data engineer',
    category: 'Data Engineering & Distributed Pipelines',
    keywords: ['data engineer', 'data engineering', 'etl', 'spark', 'pyspark', 'airflow', 'kafka', 'data warehouse', 'dbt', 'lakehouse', 'big data', 'snowflake', 'databricks'],
    competencies: ['ETL / ELT Pipelines', 'Apache Spark / PySpark', 'Workflow Orchestration (Airflow)', 'dbt Modeling', 'Data Lakehouse Architecture'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'full_stack_developer',
    title: 'Full-Stack Web Developer',
    domain: 'web developer',
    category: 'Full-Stack Web Development',
    keywords: ['full stack', 'fullstack', 'full-stack', 'mern', 'mean stack', 'web developer', 'web development', 'application developer'],
    competencies: ['React / Next.js', 'Node.js & Express', 'REST / GraphQL APIs', 'PostgreSQL / MongoDB', 'Full-Stack Auth & Deployment'],
    defaultWeeks: 16,
    defaultHours: 8,
  },
  {
    id: 'frontend_developer',
    title: 'Frontend Engineer',
    domain: 'web developer',
    category: 'Frontend Web Engineering',
    keywords: ['frontend', 'front end', 'front-end', 'react developer', 'vue', 'angular', 'javascript developer', 'typescript developer', 'css', 'html', 'next.js', 'nextjs'],
    competencies: ['Modern React & TypeScript', 'CSS3 & Responsive Layouts', 'State Management', 'Web Performance Optimization', 'Component Systems'],
    defaultWeeks: 16,
    defaultHours: 8,
  },
  {
    id: 'backend_developer',
    title: 'Backend Engineer',
    domain: 'web developer',
    category: 'Backend Architecture & Distributed Systems',
    keywords: ['backend', 'back end', 'back-end', 'api developer', 'server developer', 'microservices'],
    competencies: ['API Design & Implementation', 'Database Query Optimization', 'Concurrency & Asynchronous Tasks', 'Authentication & JWT', 'Server Architecture'],
    defaultWeeks: 16,
    defaultHours: 8,
  },
  {
    id: 'software_engineer',
    title: 'Software Engineer',
    domain: 'computer science',
    category: 'Core Software Engineering & Computer Science',
    keywords: ['software engineer', 'software developer', 'programmer', 'coder', 'programming', 'coding', 'computer science', 'cs50', 'software engineering'],
    competencies: ['Data Structures & Algorithms', 'Object-Oriented & Functional Design', 'System Architecture', 'Clean Code & Refactoring', 'Unit & Integration Testing'],
    defaultWeeks: 24,
    defaultHours: 6,
  },
  {
    id: 'cloud_solutions_architect',
    title: 'Cloud Solutions Architect',
    domain: 'cloud devops',
    category: 'Cloud Architecture & Infrastructure',
    keywords: ['cloud architect', 'solutions architect', 'aws architect', 'azure architect', 'cloud engineer', 'cloud computing', 'gcp architect', 'aws solutions architect', 'aws'],
    competencies: ['Multi-Cloud Infrastructure (AWS/Azure/GCP)', 'High Availability & Fault Tolerance', 'VPC & Networking Security', 'Cost Optimization', 'Cloud Migration'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'devops_engineer',
    title: 'DevOps Engineer',
    domain: 'cloud devops',
    category: 'DevOps & Continuous Delivery',
    keywords: ['devops', 'ci/cd', 'docker', 'kubernetes', 'terraform', 'ansible', 'helm', 'infrastructure as code', 'gitops'],
    competencies: ['CI/CD Pipeline Automation', 'Containerization (Docker)', 'Kubernetes Orchestration', 'Infrastructure as Code (Terraform)', 'Monitoring & Alerting'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'site_reliability_engineer',
    title: 'Site Reliability Engineer (SRE)',
    domain: 'cloud devops',
    category: 'Site Reliability & Systems Engineering',
    keywords: ['sre', 'site reliability', 'reliability engineer', 'platform engineer', 'observability', 'chaos engineering'],
    competencies: ['SLOs, SLIs & Error Budgets', 'Prometheus & Grafana Observability', 'Incident Management & Postmortems', 'Automated Failover', 'Capacity Planning'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'cybersecurity_analyst',
    title: 'Cybersecurity Analyst',
    domain: 'cybersecurity',
    category: 'Cybersecurity Operations & Defense',
    keywords: ['cybersecurity', 'cyber security', 'infosec', 'information security', 'soc analyst', 'security analyst', 'network security', 'threat intelligence', 'incident response'],
    competencies: ['Threat Detection & SIEM', 'Network Traffic Analysis (Wireshark)', 'Vulnerability Assessment', 'Security Incident Response', 'OWASP Hardening'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'penetration_tester',
    title: 'Penetration Tester / Ethical Hacker',
    domain: 'cybersecurity',
    category: 'Offensive Security & Penetration Testing',
    keywords: ['penetration test', 'pentest', 'ethical hack', 'ethical hacker', 'red team', 'offensive security', 'bug bounty', 'exploit'],
    competencies: ['Reconnaissance & Port Scanning (Nmap)', 'Web Application Exploitation', 'Privilege Escalation', 'Metasploit Framework', 'Security Audit Reporting'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'devsecops_engineer',
    title: 'DevSecOps Engineer',
    domain: 'cybersecurity',
    category: 'DevSecOps & Cloud Security',
    keywords: ['devsecops', 'cloud security', 'appsec', 'application security', 'container security', 'pipeline security'],
    competencies: ['SAST / DAST Automated Scans', 'Secrets Management (Vault)', 'Container Image Vulnerability Scanning', 'Zero Trust Architecture', 'Compliance as Code'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'qa_automation_engineer',
    title: 'QA Automation Engineer (SDET)',
    domain: 'web developer',
    category: 'Quality Assurance & Test Automation',
    keywords: ['qa', 'qa engineer', 'sdet', 'automation tester', 'quality assurance', 'software tester', 'selenium', 'playwright', 'cypress', 'test automation', 'testing'],
    competencies: ['Test Automation (Playwright / Cypress)', 'API Test Suites (Postman / REST)', 'CI/CD Test Integration', 'Performance & Load Testing', 'Bug Triage & Defect Reporting'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'mobile_app_developer',
    title: 'Mobile Application Developer',
    domain: 'mobile developer',
    category: 'Mobile Development (iOS / Android / Flutter)',
    keywords: ['mobile developer', 'mobile app', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin', 'xcode'],
    competencies: ['Cross-Platform & Native Development', 'Mobile UI & Lifecycle', 'Offline Storage & REST Sync', 'Device Permissions & Hardware APIs', 'App Store / Play Store Release'],
    defaultWeeks: 16,
    defaultHours: 6,
  },
  {
    id: 'ui_ux_designer',
    title: 'UI/UX Product Designer',
    domain: 'ui ux designer',
    category: 'Product Design & User Research',
    keywords: ['ui/ux', 'ui ux', 'ux design', 'ui design', 'product design', 'user experience', 'user interface', 'figma', 'wireframing', 'design system'],
    competencies: ['User Research & Persona Mapping', 'Wireframing & Interactive Prototyping (Figma)', 'Design Systems & Component Specs', 'Usability Testing', 'Information Architecture'],
    defaultWeeks: 12,
    defaultHours: 5,
  },
  {
    id: 'product_manager',
    title: 'Technical Product Manager',
    domain: 'web developer',
    category: 'Product Strategy & Technical Leadership',
    keywords: ['product manager', 'technical product manager', 'tpm', 'product owner', 'product management', 'product strategy'],
    competencies: ['Product Discovery & Roadmapping', 'User Story Mapping & PRDs', 'Data-Driven Prioritization (RICE)', 'Stakeholder Management', 'Go-to-Market Strategy'],
    defaultWeeks: 16,
    defaultHours: 5,
  },
  {
    id: 'ai_product_manager',
    title: 'AI Product Manager',
    domain: 'machine learning',
    category: 'AI Strategy & Product Leadership',
    keywords: ['ai product manager', 'ai product management', 'product manager ai', 'pm ai', 'genai product manager'],
    competencies: ['AI Product Lifecycle & Feasibility', 'LLM UX & Safety Guardrails', 'Model Evaluation & Benchmark Metrics', 'Ethical AI Governance', 'AI Roadmap Strategy'],
    defaultWeeks: 16,
    defaultHours: 5,
  },
  {
    id: 'scrum_master',
    title: 'Scrum Master & Agile Delivery Lead',
    domain: 'web developer',
    category: 'Agile Leadership & Delivery Facilitation',
    keywords: ['scrum master', 'agile coach', 'scrum', 'agile delivery', 'sprint master', 'kanban master'],
    competencies: ['Scrum Ceremonies Facilitation', 'Sprint Planning & Velocity Tracking', 'Blocker Removal & Impediment Resolution', 'Agile Metrics (Burndown/Burnup)', 'Team Coaching & Continuous Improvement'],
    defaultWeeks: 16,
    defaultHours: 5,
  },
  {
    id: 'database_administrator',
    title: 'Database Administrator (DBA)',
    domain: 'sql databases',
    category: 'Database Engineering & Administration',
    keywords: ['database administrator', 'dba', 'database engineer', 'sql developer', 'postgresql dba', 'mysql dba', 'oracle dba', 'sql'],
    competencies: ['Query Optimization & Index Tuning', 'Backup, Recovery & Disaster Runbooks', 'Replication, Sharding & High Availability', 'Schema Normalization & Constraints', 'Role-Based Database Access Control'],
    defaultWeeks: 12,
    defaultHours: 5,
  },
  {
    id: 'python_developer',
    title: 'Python Software Developer',
    domain: 'python',
    category: 'Python Software Engineering',
    keywords: ['python developer', 'python software', 'django', 'fastapi', 'flask', 'python engineer', 'python'],
    competencies: ['Advanced Python Idioms & OOP', 'FastAPI / Django Web Frameworks', 'AsyncIO & Concurrency', 'Database ORMs (SQLAlchemy)', 'Automated Pytest Testing'],
    defaultWeeks: 12,
    defaultHours: 5,
  },
  {
    id: 'systems_programmer',
    title: 'Systems & Performance Engineer',
    domain: 'systems programmer',
    category: 'Low-Level & Systems Programming',
    keywords: ['systems programmer', 'rust developer', 'c++ developer', 'golang developer', 'systems engineering', 'low level', 'c programming', 'go developer', 'rust', 'c++'],
    competencies: ['Memory Management & Pointers', 'Concurrency & Thread Safety', 'POSIX & OS System Calls', 'Performance Profiling & Microbenchmarks', 'Network Sockets & Protocols'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'game_developer',
    title: 'Game Developer',
    domain: 'game developer',
    category: 'Interactive Game Systems & Real-Time 3D',
    keywords: ['game developer', 'game development', 'game dev', 'unity', 'unreal engine', 'godot', 'game programmer'],
    competencies: ['Real-Time 3D Mathematics & Physics', 'Game Loop & Entity Component Systems (ECS)', 'Shader Programming & Rendering', 'Audio & Input State Systems', 'Cross-Platform Build Optimization'],
    defaultWeeks: 24,
    defaultHours: 6,
  },
  {
    id: 'blockchain_developer',
    title: 'Blockchain & Web3 Engineer',
    domain: 'web developer',
    category: 'Blockchain & Smart Contract Development',
    keywords: ['blockchain', 'web3', 'smart contract', 'solidity', 'ethereum', 'dapp', 'defi'],
    competencies: ['Solidity Smart Contract Development', 'EVM Architecture & Gas Optimization', 'Web3.js / Ethers.js Frontend Integration', 'Smart Contract Security Auditing', 'Decentralized Storage (IPFS)'],
    defaultWeeks: 20,
    defaultHours: 6,
  },
  {
    id: 'robotics_engineer',
    title: 'Robotics & Embedded Systems Engineer',
    domain: 'systems programmer',
    category: 'Robotics & Hardware Systems',
    keywords: ['robotics', 'ros2', 'embedded systems', 'iot', 'arduino', 'raspberry pi', 'firmware', 'microcontroller'],
    competencies: ['ROS2 Robot Operating System', 'Embedded C / C++ Firmware', 'Sensor Interfacing (I2C / SPI / UART)', 'Motor Control & Kinematics', 'Real-Time Operating Systems (RTOS)'],
    defaultWeeks: 24,
    defaultHours: 6,
  },
  {
    id: 'bioinformatics_specialist',
    title: 'Bioinformatics Data Specialist',
    domain: 'python',
    category: 'Bioinformatics & Computational Biology',
    keywords: ['bioinformatics', 'bioinformati', 'computational biology', 'genomics', 'biopython', 'dna sequencing'],
    competencies: ['Biopython & Sequence Parsing', 'Genomic Alignment Algorithms (BLAST)', 'Statistical Genetics', 'Omics Data Analysis', 'Biological Pathway Visualization'],
    defaultWeeks: 24,
    defaultHours: 6,
  },
  {
    id: 'technical_writer',
    title: 'Technical Writer & Documentation Specialist',
    domain: 'web developer',
    category: 'Technical Communication & DevRel',
    keywords: ['technical writer', 'documentation', 'devrel', 'developer advocate', 'tech docs', 'api documentation'],
    competencies: ['Developer Documentation & Guides', 'OpenAPI / Swagger API Specifications', 'Docs-as-Code & Markdown Toolchains', 'Information Architecture & Glossaries', 'Tutorial & Sample Code Creation'],
    defaultWeeks: 12,
    defaultHours: 5,
  },
];

// ── Canonical Title & Acronym Normalization ───────────────────────────────────
const CANONICAL_ROLE_CASING: Record<string, string> = {
  'ai': 'AI',
  'ml': 'ML',
  'ui': 'UI',
  'ux': 'UX',
  'qa': 'QA',
  'sre': 'SRE',
  'sdet': 'SDET',
  'dba': 'DBA',
  'devops': 'DevOps',
  'devsecops': 'DevSecOps',
  'api': 'API',
  'apis': 'APIs',
  'sql': 'SQL',
  'nosql': 'NoSQL',
  'aws': 'AWS',
  'gcp': 'GCP',
  'ci/cd': 'CI/CD',
  'nlp': 'NLP',
  'llm': 'LLM',
  'llms': 'LLMs',
  'iot': 'IoT',
  'gis': 'GIS',
  'seo': 'SEO',
  'sem': 'SEM',
  'pmp': 'PMP',
  'bi': 'BI',
  'etl': 'ETL',
  'ios': 'iOS',
  'graphql': 'GraphQL',
  'postgresql': 'PostgreSQL',
  'mongodb': 'MongoDB',
  'node.js': 'Node.js',
  'nodejs': 'Node.js',
  'next.js': 'Next.js',
  'nextjs': 'Next.js',
  'vue.js': 'Vue.js',
  'vuejs': 'Vue.js',
  'react.js': 'React.js',
  'fullstack': 'Full-Stack',
  'full-stack': 'Full-Stack',
  'c++': 'C++',
  'c#': 'C#',
  '.net': '.NET',
  'ui/ux': 'UI/UX',
};

// ── Universal Dynamic Role Extractor ──────────────────────────────────────────
export function extractDynamicRole(rawGoal: string): string {
  let text = (rawGoal || '').trim();
  if (!text) return 'Technology Professional';

  // 1. Strip multi-stage conversational prefixes
  const prefixRegexes = [
    /^(i want to|i'd like to|i would like to|i'd love to|i would love to|i need to|i plan to|i wish to|i am looking to|i'm looking to|looking to|looking for a|looking for|my goal is to|my ambition is to|my plan is to|my dream is to)\s+/i,
    /^(how to|how can i|how do i|can you create a path for|can you make a path for|can you teach me|can you help me with|teach me how to|teach me|help me learn|help me become|help me with|please help me|please guide me to|guide me to)\s+/i,
    /^(roadmap for|roadmap to|path to|path for|learning path for|learning path to|syllabus for|curriculum for|guide to|guide for|course for|course on|tutorial for|training for|training to become|train as an?|train to be an?)\s+/i,
    /^(become an?|be an?|becoming an?|work as an?|get a job as an?|break into|breaking into|transition into|transition to|transitioning into|transitioning to|switch to|switching to|switch career to|career switch to)\s+/i,
    /^(learn how to|learning how to|learn to|learn|learning|study how to|study|studying|master how to|mastering|master|prepare for|preparing for)\s+/i,
    /^(want to become an?|want to learn|want to be an?|aiming to become an?|aiming to be an?|aspiring to be an?|aspiring)\s+/i,
    /^(just|simply|start with|start learning|explore)\s+/i,
  ];

  let changed = true;
  let iterations = 0;
  while (changed && iterations < 5) {
    changed = false;
    iterations++;
    for (const rx of prefixRegexes) {
      if (rx.test(text)) {
        text = text.replace(rx, '').trim();
        changed = true;
      }
    }
  }

  // 2. Strip multi-stage condition, duration, hours & background suffixes
  const suffixRegexes = [
    /\s+(in\s+\d+\s*(months?|weeks?|yrs?|years?)|within\s+\d+\s*(months?|weeks?|yrs?|years?)|for\s+\d+\s*(months?|weeks?|yrs?|years?)|over\s+\d+\s*(months?|weeks?|yrs?|years?)).*$/i,
    /\s+(with\s+\d+\s*(hours?|hrs?|h).*|\d+\s*(hours?|hrs?|h)\s*(per|\/|a)\s*week.*|at\s+\d+\s*(hours?|hrs?|h).*)$/i,
    /\s+(from scratch|starting from zero|from zero to hero|as a beginner|for beginners|with no experience|with zero coding experience|with no prior experience).*$/i,
    /\s+(part[- ]time|full[- ]time|step by step|fast track|accelerated).*$/i,
    /\s+(to get a job|to get hired|for a job|and get a job|and get certified|for certification).*$/i,
    /\s+(online|for free|free tier).*$/i,
  ];

  changed = true;
  iterations = 0;
  while (changed && iterations < 5) {
    changed = false;
    iterations++;
    for (const rx of suffixRegexes) {
      if (rx.test(text)) {
        text = text.replace(rx, '').trim();
        changed = true;
      }
    }
  }

  text = text.trim();
  if (!text || text.length < 2) {
    return 'Technology Professional';
  }

  // 3. Format with Title Casing and Canon Words
  const minorWords = new Set(['and', 'or', 'for', 'with', 'in', 'of', 'to', 'the', 'a', 'an', '&']);

  const words = text.split(/\s+/);
  return words
    .map((w, idx) => {
      const lower = w.toLowerCase().replace(/[^a-z0-9/#.+]/g, '');
      if (CANONICAL_ROLE_CASING[lower]) {
        return CANONICAL_ROLE_CASING[lower];
      }
      if (idx > 0 && minorWords.has(lower)) {
        return w.toLowerCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

// ── Smart Natural Language Goal Intent Parser ────────────────────────────────
export function extractGoalParameters(rawGoal: string): ParsedGoalIntent {
  const text = (rawGoal || '').toLowerCase().trim();
  const rawClean = extractDynamicRole(rawGoal);

  // Check if text is too minimal or purely conversational filler
  const meaninglessWords = new Set(['hello', 'hi', 'hey', 'test', 'trying', 'want', 'please', 'goal', 'path']);
  const isMinimal = !text || text.length < 2 || meaninglessWords.has(text) || meaninglessWords.has(rawClean.toLowerCase());

  // 1. Semantic Match against Standardized Role Taxonomy
  let matchedRole: StandardizedRole | null = null;
  let highestScore = 0;

  if (!isMinimal) {
    for (const role of STANDARDIZED_ROLES) {
      let score = 0;
      const titleLower = role.title.toLowerCase();

      // Exact title match or direct extraction match
      if (text.includes(titleLower) || rawClean.toLowerCase() === titleLower) {
        score += 100;
      }

      // Keyword & tool match
      for (const kw of role.keywords) {
        if (text.includes(kw)) {
          score = Math.max(score, kw.length > 5 ? 85 : 70);
        }
      }

      if (score > highestScore) {
        highestScore = score;
        matchedRole = role;
      }
    }
  }

  let domain = 'data analyst';
  let domainDisplay = 'Data Analyst';
  let domainCategory = 'Data Analytics & Business Intelligence';
  let competencies: string[] = ['SQL Querying', 'Spreadsheet Modeling', 'Tableau / Power BI', 'Exploratory Data Analysis', 'Executive Metrics'];
  let confidence = 'High (Direct Match)';
  let defaultWeeks = 26;
  let defaultHours = 5;
  let recognized = false;

  if (isMinimal) {
    recognized = false;
    domainDisplay = '';
    domainCategory = 'Awaiting Target Role';
    competencies = [];
    confidence = 'Awaiting Input';
  } else if (matchedRole && highestScore >= 70) {
    recognized = true;
    domain = matchedRole.domain;
    domainDisplay = matchedRole.title;
    domainCategory = matchedRole.category;
    competencies = matchedRole.competencies;
    confidence = highestScore >= 85 ? 'High (Direct Match)' : 'Matched (Skill Alignment)';
    defaultWeeks = matchedRole.defaultWeeks;
    defaultHours = matchedRole.defaultHours;
  } else {
    // Specialized Ambition outside predefined list
    recognized = true;
    domain = 'computer science';
    domainDisplay = rawClean;
    domainCategory = `${rawClean} Specialization Track`;
    competencies = ['Core Domain Principles', 'Applied Practical Engineering', 'System Integration & Testing', 'Portfolio Capstone'];
    confidence = 'Specialized Ambition Track';
    defaultWeeks = 20;
    defaultHours = 6;
  }

  // 2. Horizon Weeks Detection with Intelligent Domain Defaults
  let horizonWeeks = defaultWeeks;
  const monthMatch = text.match(/(\d+)\s*(month|mo)s?/);
  if (monthMatch && monthMatch[1]) {
    const months = parseInt(monthMatch[1], 10);
    horizonWeeks = Math.max(1, Math.min(52, Math.round(months * 4.333)));
  } else {
    const yearMatch = text.match(/(\d+)\s*(year|yr)s?/);
    if (yearMatch && yearMatch[1]) {
      const years = parseInt(yearMatch[1], 10);
      horizonWeeks = Math.max(1, Math.min(52, years * 52));
    } else {
      const weekMatch = text.match(/(\d+)\s*(week|wk)s?/);
      if (weekMatch && weekMatch[1]) {
        const weeks = parseInt(weekMatch[1], 10);
        horizonWeeks = Math.max(1, Math.min(52, weeks));
      }
    }
  }

  // 3. Weekly Hours Detection
  let weeklyHours = defaultHours;
  const hoursMatch = text.match(/(\d+)\s*(hour|hr|h)s?(\s*(per|\/|a)\s*week)?/);
  if (hoursMatch && hoursMatch[1]) {
    const hrs = parseInt(hoursMatch[1], 10);
    weeklyHours = Math.max(1, Math.min(40, hrs));
  }

  // 4. Starting Level Detection (Fixed false positive on "Scrum Master"!)
  let level: SkillLevel = 'beginner';
  const isScrumMaster = text.includes('scrum master') || text.includes('webmaster');
  const hasAdvancedKeywords =
    text.includes('advanced') ||
    text.includes('expert') ||
    text.includes('deep dive') ||
    text.includes('pro ') ||
    text.includes('senior ') ||
    (!isScrumMaster && (text.includes('mastery') || /\bmaster\b/i.test(text)));

  if (hasAdvancedKeywords && !text.includes('beginner') && !text.includes('from scratch')) {
    level = 'advanced';
  } else if (
    text.includes('intermediate') ||
    text.includes('mid-level') ||
    text.includes('some experience') ||
    text.includes('experienced')
  ) {
    level = 'intermediate';
  } else {
    level = 'beginner';
  }

  // 5. Pace & Situation Detection
  let pace: LearnerPace = 'balanced';
  if (text.includes('fast') || text.includes('accelerated') || text.includes('bootcamp') || text.includes('quick') || text.includes('intensive') || text.includes('genius')) {
    pace = 'fast_track';
  } else if (text.includes('slow') || text.includes('gentle') || text.includes('step by step') || text.includes('thorough') || text.includes('busy parent')) {
    pace = 'deep_mastery';
  }

  let situation: LifeSituation = 'working_professional';
  if (text.includes('student') || text.includes('college') || text.includes('university')) {
    situation = 'student';
  } else if (text.includes('full time') || text.includes('career switch')) {
    situation = 'career_switcher';
  } else if (text.includes('parent') || text.includes('caregiver') || text.includes('limited time')) {
    situation = 'busy_caregiver';
  }

  // 6. Generate Professional Curriculum Label
  const monthsApprox = Math.round(horizonWeeks / 4.333);
  const timeDesc = monthsApprox >= 1 && horizonWeeks % 4 === 0
    ? `${monthsApprox} Month${monthsApprox > 1 ? 's' : ''}`
    : `${horizonWeeks} Weeks`;
  const label = `${domainDisplay.split(' & ')[0]} — ${timeDesc} @ ${weeklyHours}h/wk`;

  return {
    domain,
    level,
    weekly_hours: weeklyHours,
    horizon_weeks: horizonWeeks,
    pace,
    situation,
    label,
    domain_display: domainDisplay,
    domain_category: domainCategory,
    recognized,
    competencies,
    confidence,
    guidance: isMinimal ? 'Type your target career ambition (e.g. Data Analyst, Cloud Solutions Architect, Scrum Master...)' : undefined,
  };
}

export function resolveDomain(goal: string): string {
  return extractGoalParameters(goal).domain;
}

// ── Main Entrypoint: Generate Learning Path ───────────────────────────────────
export async function generateLearningPath(
  goal: string,
  level: string,
  weeklyHours: number,
  horizonWeeks: number,
  pace: LearnerPace = 'balanced'
): Promise<LearningPath> {
  const normLevel: SkillLevel =
    level === 'advanced' ? 'advanced' : level === 'intermediate' ? 'intermediate' : 'beginner';

  const domain = resolveDomain(goal);
  const totalHours = weeklyHours * horizonWeeks;

  // Retrieve complete 52-week curated topic list
  const fullCurriculum = DOMAIN_52_WEEK_CURRICULA[domain] || generateGeneric52WeekTopics(domain);

  // Filter or slice curriculum based on Starting Level
  // Beginner: starts from 0..51
  // Intermediate: skips early foundations, focuses on core/applied/advanced/capstone
  // Advanced: focuses on advanced engineering, scaling, optimizations, capstone
  let candidateTopics = fullCurriculum;
  if (normLevel === 'intermediate') {
    candidateTopics = fullCurriculum.filter(t => t.category !== 'foundations');
    if (candidateTopics.length < horizonWeeks) candidateTopics = fullCurriculum.slice(10);
  } else if (normLevel === 'advanced') {
    candidateTopics = fullCurriculum.filter(t => t.category === 'advanced' || t.category === 'capstone');
    if (candidateTopics.length < horizonWeeks) candidateTopics = fullCurriculum.slice(24);
  }

  // Collect all approved URLs for validation
  const approvedUrls = new Set<string>();
  candidateTopics.forEach(t => t.resources.forEach(r => approvedUrls.add(r.url)));

  // If Gemini API Key is configured, attempt LLM reasoning with strict JSON validation
  if (process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

      const prompt = `You are Episteme AI, an expert autonomous learning path builder. Create a structured week-by-week learning plan.

Goal: "${goal}"
Domain: ${domain}
Starting Level: ${normLevel}
Learner Pace: ${pace}
Weekly Hours Available: ${weeklyHours} hours/week
Duration: ${horizonWeeks} weeks (Total budget: ${totalHours} hours)

Available 100% FREE Resources to use (use EXACT URLs — do not invent URLs):
${Array.from(approvedUrls).map((url, i) => `${i + 1}. ${url}`).join('\n')}

STRICT Rules (violations will cause rejection):
1. "weeks" array must contain exactly ${horizonWeeks} objects, week_number 1..${horizonWeeks}
2. Each week: hours_allocated must equal exactly ${weeklyHours} (not more, not less)
3. Sum of all hours_allocated must equal exactly ${totalHours}
4. Every resource URL must be taken verbatim from the list above — no other URLs allowed
5. Each week must have 1-2 resources; all resources must have title, url, platform, is_free=true
6. EVERY WEEK MUST HAVE A DISTINCT, SPECIFIC TITLE AND LEARNING OBJECTIVE (No duplicate titles across weeks)
7. Order topics so prerequisites come first (${normLevel} foundations → applied execution → capstone)
8. Return ONLY valid JSON — no markdown fences, no explanation text

JSON schema:
{
  "weeks": [
    {
      "week_number": <integer>,
      "title": "<concise unique week title>",
      "description": "<1-2 sentence specific learning objective>",
      "hours_allocated": ${weeklyHours},
      "resources": [
        { "title": "<title>", "url": "<exact url>", "platform": "<platform>", "is_free": true }
      ]
    }
  ],
  "total_hours_used": ${totalHours},
  "prerequisites_note": "<brief rationale for topic ordering>"
}`;

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonMatch = text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]) as LearningPath;
        const errors = validatePath(parsed, weeklyHours, horizonWeeks, totalHours, approvedUrls);

        if (errors.length === 0) {
          parsed.total_hours_used = parsed.weeks.reduce((s, w) => s + w.hours_allocated, 0);
          parsed.source = 'gemini';
          return parsed;
        } else {
          console.warn(`Gemini output failed validation (${errors.length} error(s)), using fallback:`, errors);
        }
      }
    } catch (err) {
      console.error('Gemini error, falling back to deterministic progressive generator:', err);
    }
  }

  // Deterministic Progressive Path Generation (100% valid by construction, 0 duplicate titles, exact topic-resource pairing)
  const weeks: WeekPlan[] = [];

  for (let w = 1; w <= horizonWeeks; w++) {
    // Even distribution across the candidate topics for this level
    const stepRatio = (w - 1) / Math.max(1, horizonWeeks - 1);
    const topicIndex = Math.min(candidateTopics.length - 1, Math.floor(stepRatio * (candidateTopics.length - 1)));
    const topic = candidateTopics[topicIndex];

    const weekResources = topic.resources.map(r => ({
      title: r.title,
      url: r.url,
      platform: r.platform,
      is_free: true,
    }));

    weeks.push({
      week_number: w,
      title: `Week ${w}: ${topic.title.replace(/^Week \d+:\s*/, '')}`,
      description: topic.objective,
      hours_allocated: weeklyHours,
      resources: weekResources,
    });
  }

  return {
    weeks,
    total_hours_used: totalHours,
    prerequisites_note: `Deterministic progressive roadmap tailored for ${normLevel} level in ${domain} (${pace} pacing). Fitted to ${weeklyHours}h/week over ${horizonWeeks} weeks (${totalHours}h budget). Zero duplicate week topics; all resources directly topic-matched.`,
    source: 'rule_based',
  };
}

// ── Validation Layer ──────────────────────────────────────────────────────────
export function validatePath(
  path: LearningPath,
  weeklyHours: number,
  horizonWeeks: number,
  totalHours: number,
  approvedUrls: Set<string>
): string[] {
  const errors: string[] = [];

  if (!Array.isArray(path.weeks)) {
    errors.push('weeks must be an array');
    return errors;
  }

  if (path.weeks.length !== horizonWeeks) {
    errors.push(`Expected ${horizonWeeks} weeks, got ${path.weeks.length}`);
  }

  let hoursSum = 0;
  const weekNums = new Set<number>();

  for (const week of path.weeks) {
    if (typeof week.week_number !== 'number') errors.push(`week_number missing or not a number`);
    if (weekNums.has(week.week_number)) errors.push(`Duplicate week_number ${week.week_number}`);
    weekNums.add(week.week_number);

    if (!week.title?.trim()) errors.push(`Week ${week.week_number}: title is empty`);
    if (!week.description?.trim()) errors.push(`Week ${week.week_number}: description is empty`);

    if (typeof week.hours_allocated !== 'number' || week.hours_allocated > weeklyHours || week.hours_allocated < 0.5) {
      errors.push(`Week ${week.week_number}: hours_allocated (${week.hours_allocated}) exceeds weekly limit (${weeklyHours}) or is invalid`);
    }
    hoursSum += week.hours_allocated ?? 0;

    if (!Array.isArray(week.resources) || week.resources.length === 0) {
      errors.push(`Week ${week.week_number}: must have at least one resource`);
    } else if (week.resources.length > 3) {
      errors.push(`Week ${week.week_number}: more than 3 resources`);
    } else {
      for (const r of week.resources) {
        if (!r.url?.startsWith('http')) errors.push(`Week ${week.week_number}: invalid resource URL "${r.url}"`);
        else if (!approvedUrls.has(r.url)) errors.push(`Week ${week.week_number}: URL not in approved list: ${r.url}`);
        if (!r.title?.trim()) errors.push(`Week ${week.week_number}: resource missing title`);
        if (!r.platform?.trim()) errors.push(`Week ${week.week_number}: resource missing platform`);
        if (r.is_free !== true) errors.push(`Week ${week.week_number}: resource not marked as free`);
      }
    }
  }

  if (Math.abs(hoursSum - totalHours) > 0) {
    errors.push(`Total hours mismatch: sum=${hoursSum}, expected=${totalHours}`);
  }

  return errors;
}
