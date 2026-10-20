import { WeekCurriculumTopic } from '../pathGenerator';

export const WEB_DEV_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Foundations (Weeks 1 - 8) ──────────────────────────────────────────────
  {
    title: 'Web Architecture, HTTP Protocol & Browser Rendering',
    objective: 'Understand client-server architecture, DNS resolution, HTTP request/response cycles, and the Critical Rendering Path.',
    category: 'foundations',
    resources: [{ title: 'MDN Web Architecture & How the Web Works', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web', platform: 'MDN' }],
  },
  {
    title: 'Semantic HTML5 & Accessible Document Structures',
    objective: 'Construct accessible, semantic HTML5 page hierarchies utilizing header, nav, main, section, article, and ARIA landmarks.',
    category: 'foundations',
    resources: [{ title: 'MDN HTML Structuring the Web', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML', platform: 'MDN' }],
  },
  {
    title: 'CSS3 Core: Box Model, Specificity & Cascade',
    objective: 'Master margin collapsing, border-box sizing, CSS specificity calculations, and stylesheet inheritance hierarchy.',
    category: 'foundations',
    resources: [{ title: 'MDN CSS First Steps & The Box Model', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS', platform: 'MDN' }],
  },
  {
    title: 'Modern Layouts: CSS Flexbox Architecture',
    objective: 'Build dynamic responsive single-axis layouts using flex-direction, justify-content, align-items, and flex-grow properties.',
    category: 'foundations',
    resources: [{ title: 'freeCodeCamp Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', platform: 'freeCodeCamp' }],
  },
  {
    title: 'Two-Dimensional Layouts: CSS Grid Systems',
    objective: 'Design responsive grid layouts using fr units, repeat(), minmax(), grid-template-areas, and auto-placement.',
    category: 'foundations',
    resources: [{ title: 'MDN CSS Grid Layout Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids', platform: 'MDN' }],
  },
  {
    title: 'Responsive Design & Media Queries',
    objective: 'Implement mobile-first fluid breakpoints, clamped typography (clamp()), and modern aspect-ratio CSS rules.',
    category: 'foundations',
    resources: [{ title: 'web.dev Responsive Web Design Fundamentals', url: 'https://web.dev/learn/design/', platform: 'Google web.dev' }],
  },
  {
    title: 'JavaScript Core: Variables, Types & Control Flow',
    objective: 'Master const/let scoping, primitive vs reference types, truthy/falsy evaluation, and iterative control loops.',
    category: 'foundations',
    resources: [{ title: 'MDN JavaScript First Steps', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps', platform: 'MDN' }],
  },
  {
    title: 'JavaScript Functions, Lexical Scope & Closures',
    objective: 'Implement pure functions, arrow syntax, lexical scoping, closures, and higher-order function composition.',
    category: 'foundations',
    resources: [{ title: 'MDN JavaScript Functions & Scope', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', platform: 'MDN' }],
  },

  // ── Core Programming & DOM (Weeks 9 - 20) ──────────────────────────────────
  {
    title: 'JavaScript Data Structures: Arrays & Objects',
    objective: 'Manipulate arrays using map(), filter(), reduce(), slice(), splice(), and destructuring syntax with spread/rest.',
    category: 'core',
    resources: [{ title: 'freeCodeCamp JavaScript Algorithms & Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/', platform: 'freeCodeCamp' }],
  },
  {
    title: 'DOM Querying, Traversal & Element Manipulation',
    objective: 'Query DOM elements using querySelectorAll, create elements dynamically, and update attributes and styles safely.',
    category: 'core',
    resources: [{ title: 'MDN Introduction to the DOM', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', platform: 'MDN' }],
  },
  {
    title: 'Event-Driven Programming: Listeners & Bubbling',
    objective: 'Harness addEventListener, handle bubbling and capturing phases, and implement efficient event delegation.',
    category: 'core',
    resources: [{ title: 'MDN Handling DOM Events', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events', platform: 'MDN' }],
  },
  {
    title: 'Asynchronous JavaScript: Promises & Async/Await',
    objective: 'Handle asynchronous concurrency using Promises, Promise.all, try/catch blocks, and the browser Microtask queue.',
    category: 'core',
    resources: [{ title: 'MDN Asynchronous JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous', platform: 'MDN' }],
  },
  {
    title: 'Fetch API, RESTful Endpoints & Error Handling',
    objective: 'Execute HTTP GET, POST, PUT, and DELETE calls with fetch(), parse JSON payloads, and manage network errors.',
    category: 'core',
    resources: [{ title: 'MDN Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', platform: 'MDN' }],
  },
  {
    title: 'Modern Tooling: ES Modules, Vite & NPM',
    objective: 'Set up modern development environments with npm scripts, Vite bundling, and ES module import/export trees.',
    category: 'core',
    resources: [{ title: 'The Odin Project JavaScript Tooling', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
  },
  {
    title: 'Version Control: Git Branching & GitHub PRs',
    objective: 'Execute git branch, checkout, rebase, merge conflict resolution, and create pull requests with CI status checks.',
    category: 'core',
    resources: [{ title: 'Git Official Documentation & Pro Git Book', url: 'https://git-scm.com/doc', platform: 'Git SCM' }],
  },
  {
    title: 'Web Accessibility: WCAG 2.1 AA Compliance',
    objective: 'Audit keyboard navigability, color contrast ratios, screen reader compatibility, and ARIA live regions.',
    category: 'core',
    resources: [{ title: 'MDN Web Accessibility Overview', url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility', platform: 'MDN' }],
  },
  {
    title: 'React Fundamentals: JSX & Functional Components',
    objective: 'Understand JSX compilation, component composition, prop drilling, and unidirectional data flow.',
    category: 'core',
    resources: [{ title: 'React Official Documentation: Quick Start', url: 'https://react.dev/learn', platform: 'React Docs' }],
  },
  {
    title: 'React State Management with useState Hook',
    objective: 'Manage mutable local component state, controlled form inputs, and state updates with immutable immutability patterns.',
    category: 'core',
    resources: [{ title: 'React Docs: Managing State with useState', url: 'https://react.dev/learn/state-a-components-memory', platform: 'React Docs' }],
  },
  {
    title: 'React Side Effects & Lifecycle with useEffect',
    objective: 'Synchronize components with external browser APIs, manage cleanup functions, and control dependency arrays.',
    category: 'core',
    resources: [{ title: 'React Docs: Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects', platform: 'React Docs' }],
  },
  {
    title: 'Custom React Hooks & Logic Encapsulation',
    objective: 'Extract reusable stateful logic into custom hooks (useFetch, useDebounce, useLocalStorage) cleanly.',
    category: 'core',
    resources: [{ title: 'React Docs: Reusing Logic with Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', platform: 'React Docs' }],
  },

  // ── Intermediate & Backend Architecture (Weeks 21 - 34) ────────────────────
  {
    title: 'React Global State: Context API & Reducers',
    objective: 'Avoid prop drilling using createContext, useContext, and complex state dispatching via useReducer.',
    category: 'applied',
    resources: [{ title: 'React Docs: Passing Data Deeply with Context', url: 'https://react.dev/learn/passing-data-deeply-with-context', platform: 'React Docs' }],
  },
  {
    title: 'Next.js App Router, SSR & Client Boundaries',
    objective: 'Build modern server-side rendered applications with the App Router, layouts, server components, and client hydration.',
    category: 'applied',
    resources: [{ title: 'Full Stack Open: Modern Web Development', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'Tailwind CSS & Design System Architecture',
    objective: 'Build design token systems with Tailwind utilities, responsive modifiers, and consistent typography scales.',
    category: 'applied',
    resources: [{ title: 'web.dev Modern Component Styling', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },
  {
    title: 'Node.js Runtime: Event Loop, Buffer & Modules',
    objective: 'Deepen understanding of non-blocking I/O, Node.js event loops, path manipulation, and filesystem operations.',
    category: 'applied',
    resources: [{ title: 'The Odin Project Node.js Course', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
  },
  {
    title: 'Express.js Framework & Middleware Pipelines',
    objective: 'Construct modular REST backends with Express routers, request body parsers, logging, and error-handling middleware.',
    category: 'applied',
    resources: [{ title: 'Full Stack Open: Express Backend Routing', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'RESTful API Engineering: CRUD & Status Codes',
    objective: 'Design robust REST endpoints with standard status codes, input parameter validation, and resource filtering.',
    category: 'applied',
    resources: [{ title: 'MDN HTTP Status Codes & REST Design', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status', platform: 'MDN' }],
  },
  {
    title: 'Relational Database Design with PostgreSQL',
    objective: 'Design normalized tables (3NF), primary/foreign keys, unique constraints, and schema indexes.',
    category: 'applied',
    resources: [{ title: 'PostgreSQL Official Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'SQL Operations in Node.js & Connection Pooling',
    objective: 'Execute parameterized SQL queries from Node.js using pg pool, preventing SQL injection vulnerabilities.',
    category: 'applied',
    resources: [{ title: 'PostgreSQL Interactive Client Guide', url: 'https://www.postgresql.org/docs/current/', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Prisma ORM: Schema Modeling & Migrations',
    objective: 'Define data models in Prisma schema, generate type-safe database queries, and run declarative migrations.',
    category: 'applied',
    resources: [{ title: 'Full Stack Open: Database Modeling', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'User Authentication: Password Hashing & JWTs',
    objective: 'Implement secure password hashing with bcrypt, issue and verify JSON Web Tokens, and protect routes.',
    category: 'applied',
    resources: [{ title: 'OWASP Authentication Verification Standard', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'OAuth 2.0 & Third-Party Social Sign-In',
    objective: 'Implement federated social authentication flows using GitHub and Google OAuth token exchanges.',
    category: 'applied',
    resources: [{ title: 'web.dev Identity & Authentication Best Practices', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },
  {
    title: 'API Security: CORS, Rate Limiting & Helmet',
    objective: 'Configure CORS origins, rate limiters, HTTP security headers (Helmet), and sanitize user inputs.',
    category: 'applied',
    resources: [{ title: 'OWASP Node.js Security Cheat Sheet', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'WebSockets & Real-Time Event Communication',
    objective: 'Implement real-time bidirectional communication using WebSocket connections and event listeners.',
    category: 'applied',
    resources: [{ title: 'MDN WebSockets API Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', platform: 'MDN' }],
  },
  {
    title: 'Stateful Caching with Redis & In-Memory Stores',
    objective: 'Accelerate API response times with in-memory caching patterns, TTL expiration, and cache invalidation.',
    category: 'applied',
    resources: [{ title: 'web.dev Caching Strategies & Performance', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },

  // ── Advanced Engineering & Testing (Weeks 35 - 44) ─────────────────────────
  {
    title: 'Frontend Testing: Vitest & React Testing Library',
    objective: 'Write resilient unit tests verifying user interactions, accessibility roles, and mock async API responses.',
    category: 'advanced',
    resources: [{ title: 'Full Stack Open: Testing React Applications', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'End-to-End Browser Testing with Playwright',
    objective: 'Automate multi-page user journeys, authentication flows, and regression testing using Playwright.',
    category: 'advanced',
    resources: [{ title: 'Full Stack Open: End-to-End Testing', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'Backend Integration Testing with Supertest',
    objective: 'Test Express route handlers, database persistence, status codes, and error payloads using automated test suites.',
    category: 'advanced',
    resources: [{ title: 'The Odin Project Testing APIs', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
  },
  {
    title: 'Performance Optimization: Core Web Vitals (LCP, CLS)',
    objective: 'Profile rendering bottlenecks using Chrome DevTools Lighthouse, optimize bundle sizes, and eliminate layout shifts.',
    category: 'advanced',
    resources: [{ title: 'web.dev Optimize Core Web Vitals', url: 'https://web.dev/explore/fast', platform: 'Google web.dev' }],
  },
  {
    title: 'Asset Optimization: Image Formats & Code Splitting',
    objective: 'Implement WebP/AVIF formats, next/image optimization, responsive srcset, and dynamic component imports.',
    category: 'advanced',
    resources: [{ title: 'web.dev Image Optimization Guide', url: 'https://web.dev/learn/images/', platform: 'Google web.dev' }],
  },
  {
    title: 'Dockerizing Web Applications: Multi-Stage Builds',
    objective: 'Write multi-stage Dockerfiles for Next.js and Node backends to create lightweight, production-ready images.',
    category: 'advanced',
    resources: [{ title: 'Docker Official Getting Started Guide', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },
  {
    title: 'CI/CD Automation with GitHub Actions',
    objective: 'Construct automated CI/CD pipelines that run linting, typechecks, test suites, and build verification on push.',
    category: 'advanced',
    resources: [{ title: 'GitHub Skills: Continuous Integration Pipeline', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Cloud Edge Deployment: Vercel & Supabase',
    objective: 'Deploy serverless frontends and relational databases to global edge infrastructure with environment secrets.',
    category: 'advanced',
    resources: [{ title: 'Full Stack Open: Deployment to Cloud Services', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'Progressive Web Apps (PWA) & Service Workers',
    objective: 'Implement offline caching strategies, web app manifests, and service worker background sync.',
    category: 'advanced',
    resources: [{ title: 'web.dev Progressive Web Apps Guide', url: 'https://web.dev/explore/progressive-web-apps', platform: 'Google web.dev' }],
  },
  {
    title: 'System Design: Microservices vs Modular Monolith',
    objective: 'Analyze architectural tradeoffs in distributed microservices, message queues, and modular monolithic codebases.',
    category: 'advanced',
    resources: [{ title: 'Harvard CS50 Web Programming with Python and JavaScript', url: 'https://cs50.harvard.edu/web/', platform: 'Harvard University' }],
  },

  // ── Production Capstone & Enterprise Defense (Weeks 45 - 52) ───────────────
  {
    title: 'Full-Stack Capstone: System Design & Schema Architecture',
    objective: 'Architect full-stack platform requirements, database entity relationship diagrams, and API specifications.',
    category: 'capstone',
    resources: [{ title: 'Full Stack Open Capstone Project Guide', url: 'https://fullstackopen.com/en/', platform: 'Full Stack Open' }],
  },
  {
    title: 'Capstone Backend: Scalable APIs & Relational Persistence',
    objective: 'Implement production CRUD routes with validation, JWT authentication, and optimized SQL transactions.',
    category: 'capstone',
    resources: [{ title: 'The Odin Project Final Portfolio Project', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
  },
  {
    title: 'Capstone Frontend: Responsive UI, Dark Mode & Micro-Interactions',
    objective: 'Build polished responsive user interfaces with accessible navigation, dark mode toggle, and micro-interactions.',
    category: 'capstone',
    resources: [{ title: 'React Official Documentation & Best Practices', url: 'https://react.dev/', platform: 'React Docs' }],
  },
  {
    title: 'Payment Integration & Webhook Lifecycle Security',
    objective: 'Integrate checkout flows with signed webhook listeners and idempotent database balance adjustments.',
    category: 'capstone',
    resources: [{ title: 'web.dev Payment Request & Security', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },
  {
    title: 'End-to-End Security Audit & Penetration Hardening',
    objective: 'Conduct comprehensive vulnerability scans, verify rate limits, prevent XSS/CSRF, and sanitize inputs.',
    category: 'capstone',
    resources: [{ title: 'OWASP Top 10 Security Checklist', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Production Deployment, Custom Domain & SSL Setup',
    objective: 'Deploy production build to cloud infrastructure with custom domain DNS, automated SSL, and health checks.',
    category: 'capstone',
    resources: [{ title: 'GitHub Portfolio & Technical Showcase Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Technical Documentation: OpenAPI Spec & Architecture Docs',
    objective: 'Author interactive OpenAPI/Swagger endpoint documentation, architecture diagrams, and installation runbooks.',
    category: 'capstone',
    resources: [{ title: 'MDN Web Developer Documentation Guide', url: 'https://developer.mozilla.org/en-US/', platform: 'MDN' }],
  },
  {
    title: 'Portfolio Showcase, Code Review & Engineering Interview Defense',
    objective: 'Conduct peer code reviews, practice whiteboard data structure problems, and present completed capstone defense.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50x Capstone Project Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
];
