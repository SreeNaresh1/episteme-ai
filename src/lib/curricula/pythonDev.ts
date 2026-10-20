import { WeekCurriculumTopic } from '../pathGenerator';

export const PYTHON_DEV_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Foundations & Syntax (Weeks 1 - 8) ────────────────────────────────────
  {
    title: 'Python Environment, Virtualenvs & The REPL',
    objective: 'Set up Python 3.12+, understand bytecode compilation (.pyc), virtual environments (venv), and pip packages.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Using the Python Interpreter', url: 'https://docs.python.org/3/tutorial/interpreter.html', platform: 'Python Docs' }],
  },
  {
    title: 'Variables, Dynamic Typing & Numeric Types',
    objective: 'Master integers, floats, booleans, type casting, mathematical operators, and arbitrary-precision integer arithmetic.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: An Informal Introduction to Python', url: 'https://docs.python.org/3/tutorial/introduction.html', platform: 'Python Docs' }],
  },
  {
    title: 'Strings, Slicing & Modern Formatted Literals (f-strings)',
    objective: 'Manipulate text with slice notation [start:stop:step], string methods (strip, split, join), and f-string formatting.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Text & Strings', url: 'https://docs.python.org/3/tutorial/introduction.html#text', platform: 'Python Docs' }],
  },
  {
    title: 'Control Flow: Conditionals & Match-Case Pattern Matching',
    objective: 'Implement if-elif-else branching, logical expressions, and structural pattern matching introduced in Python 3.10+.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Control Flow Tools', url: 'https://docs.python.org/3/tutorial/controlflow.html', platform: 'Python Docs' }],
  },
  {
    title: 'Iteration: While Loops, For-In & Range Sequences',
    objective: 'Iterate sequences using for loops, range() generators, break, continue, and loop-else clauses cleanly.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: For Statements & range()', url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements', platform: 'Python Docs' }],
  },
  {
    title: 'Function Definitions, Parameters & Return Values',
    objective: 'Write modular functions with positional arguments, default keyword arguments, and early return patterns.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Defining Functions', url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', platform: 'Python Docs' }],
  },
  {
    title: 'Arbitrary Argument Lists: *args & **kwargs',
    objective: 'Design flexible interfaces accepting variable positional (*args) and keyword (**kwargs) argument dictionaries.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Special Parameters & Keyword Arguments', url: 'https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions', platform: 'Python Docs' }],
  },
  {
    title: 'Type Hints & Static Type Checking with Mypy',
    objective: 'Annotate codebases with PEP 484 type hints (Union, Optional, Callable, Generic) and verify correctness with Mypy.',
    category: 'foundations',
    resources: [{ title: 'Python Standard Library: typing Module Reference', url: 'https://docs.python.org/3/library/typing.html', platform: 'Python Docs' }],
  },

  // ── Core Data Structures & Functional Patterns (Weeks 9 - 18) ──────────────
  {
    title: 'Lists: Slicing, Mutability & In-Place Methods',
    objective: 'Manipulate lists using append, extend, insert, pop, sort, and understand shallow vs deep copy semantics.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: More on Lists', url: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', platform: 'Python Docs' }],
  },
  {
    title: 'List Comprehensions & Conditional Projections',
    objective: 'Write clean, idiomatic list comprehensions with conditional filters and nested multi-variable loops.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: List Comprehensions', url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions', platform: 'Python Docs' }],
  },
  {
    title: 'Tuples, Sequence Unpacking & Immutability Guarantees',
    objective: 'Utilize immutable tuples for record integrity, multi-value return unpacking, and hashable dictionary keys.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: Tuples and Sequences', url: 'https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences', platform: 'Python Docs' }],
  },
  {
    title: 'Sets: Hash Sets, Mathematical Unions & Intersections',
    objective: 'Eliminate duplicates with hash sets, and compute mathematical set unions, intersections, and symmetric differences.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: Sets', url: 'https://docs.python.org/3/tutorial/datastructures.html#sets', platform: 'Python Docs' }],
  },
  {
    title: 'Dictionaries: Hash Maps, Lookups & Dict Comprehensions',
    objective: 'Master dictionary lookups, get() with default fallbacks, keys/values/items views, and dict comprehensions.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: Dictionaries', url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries', platform: 'Python Docs' }],
  },
  {
    title: 'Collections Module: DefaultDict, Counter & Deque',
    objective: 'Use specialized container data structures: Counter for tallies, defaultdict for grouping, and deque for O(1) pops.',
    category: 'core',
    resources: [{ title: 'Python Standard Library: collections Module', url: 'https://docs.python.org/3/library/collections.html', platform: 'Python Docs' }],
  },
  {
    title: 'Iterators, Iterables & The Iteration Protocol',
    objective: 'Understand iter() and next() protocols, StopIteration exceptions, and build custom iterable classes.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: Iterators', url: 'https://docs.python.org/3/tutorial/classes.html#iterators', platform: 'Python Docs' }],
  },
  {
    title: 'Generators & Memory-Efficient Streaming with Yield',
    objective: 'Stream infinite or massive datasets memory-efficiently using yield generator functions and expressions.',
    category: 'core',
    resources: [{ title: 'Python Official Tutorial: Generators', url: 'https://docs.python.org/3/tutorial/classes.html#generators', platform: 'Python Docs' }],
  },
  {
    title: 'Functional Tools: Map, Filter, Reduce & Lambda Functions',
    objective: 'Apply functional paradigms with lambda expressions, functools.partial, and functools.reduce.',
    category: 'core',
    resources: [{ title: 'Python Standard Library: functools Module', url: 'https://docs.python.org/3/library/functools.html', platform: 'Python Docs' }],
  },
  {
    title: 'Itertools Module: Infinite, Terminating & Combinatoric Iterators',
    objective: 'Compose complex iterative algorithms with cycle, chain, islice, permutations, and product from itertools.',
    category: 'core',
    resources: [{ title: 'Python Standard Library: itertools Module', url: 'https://docs.python.org/3/library/itertools.html', platform: 'Python Docs' }],
  },

  // ── Object-Oriented Architecture & Pythonic Design (Weeks 19 - 30) ──────────
  {
    title: 'Object-Oriented Programming: Classes, Instances & __init__',
    objective: 'Model real-world entities with classes, instance attributes in __init__, and method encapsulation.',
    category: 'applied',
    resources: [{ title: 'Python Official Tutorial: Classes & OOP', url: 'https://docs.python.org/3/tutorial/classes.html', platform: 'Python Docs' }],
  },
  {
    title: 'Class Attributes, Instance Attributes & Methods (@classmethod, @staticmethod)',
    objective: 'Differentiate instance methods from @classmethod alternative constructors and utility @staticmethod functions.',
    category: 'applied',
    resources: [{ title: 'Python Official Tutorial: Class and Instance Variables', url: 'https://docs.python.org/3/tutorial/classes.html#class-and-instance-variables', platform: 'Python Docs' }],
  },
  {
    title: 'Inheritance, Method Overriding & super() Resolution',
    objective: 'Implement single and multiple inheritance, understand the Method Resolution Order (MRO), and call super().',
    category: 'applied',
    resources: [{ title: 'Python Official Tutorial: Inheritance', url: 'https://docs.python.org/3/tutorial/classes.html#inheritance', platform: 'Python Docs' }],
  },
  {
    title: 'Encapsulation, Name Mangling & @property Decorators',
    objective: 'Manage private attributes with double underscores and create elegant getter/setter APIs with @property.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: Built-in Functions - property', url: 'https://docs.python.org/3/library/functions.html#property', platform: 'Python Docs' }],
  },
  {
    title: 'Special Magic (Dunder) Methods: String Representations & Equality',
    objective: 'Customize object behavior by implementing __repr__, __str__, __eq__, and __hash__ for hashability.',
    category: 'applied',
    resources: [{ title: 'Python Language Reference: Special Method Names', url: 'https://docs.python.org/3/reference/datamodel.html#special-method-names', platform: 'Python Docs' }],
  },
  {
    title: 'Operator Overloading: Arithmetic, Sequence & Context Protocols',
    objective: 'Overload mathematical operators (__add__, __mul__) and sequence indexing (__getitem__, __len__).',
    category: 'applied',
    resources: [{ title: 'Python Language Reference: Emulating Numeric Types', url: 'https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types', platform: 'Python Docs' }],
  },
  {
    title: 'Dataclasses: Automatic Dunder Generation in Python',
    objective: 'Construct concise data containers using the @dataclass decorator with auto-generated equality and immutability.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: dataclasses Module', url: 'https://docs.python.org/3/library/dataclasses.html', platform: 'Python Docs' }],
  },
  {
    title: 'Exception Handling: Try-Except-Else-Finally & Custom Exceptions',
    objective: 'Handle runtime errors gracefully, define custom exception classes, and utilize else/finally cleanup blocks.',
    category: 'applied',
    resources: [{ title: 'Python Official Tutorial: Errors and Exceptions', url: 'https://docs.python.org/3/tutorial/errors.html', platform: 'Python Docs' }],
  },
  {
    title: 'Context Managers: The with Statement & __enter__ / __exit__',
    objective: 'Guarantee resource cleanup with context managers, write custom context classes and contextlib @contextmanager.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: contextlib Utilities', url: 'https://docs.python.org/3/library/contextlib.html', platform: 'Python Docs' }],
  },
  {
    title: 'First-Class Decorators: Function & Class Wrappers',
    objective: 'Write higher-order decorator functions for logging, caching with functools.lru_cache, and timing executions.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: functools.lru_cache', url: 'https://docs.python.org/3/library/functools.html#functools.lru_cache', platform: 'Python Docs' }],
  },
  {
    title: 'File System Operations: Modern Path Manipulation with Pathlib',
    objective: 'Read and write binary and text files, navigate directory trees, and parse file metadata cleanly with pathlib.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: pathlib Module', url: 'https://docs.python.org/3/library/pathlib.html', platform: 'Python Docs' }],
  },
  {
    title: 'Data Serialization: JSON, CSV & Pickle Formats',
    objective: 'Serialize structured data to JSON and CSV, handle datetime serialization, and understand pickle security risks.',
    category: 'applied',
    resources: [{ title: 'Python Standard Library: json Module Reference', url: 'https://docs.python.org/3/library/json.html', platform: 'Python Docs' }],
  },

  // ── Testing, Concurrency & Backend Engineering (Weeks 31 - 42) ──────────────
  {
    title: 'Unit Testing with Pytest: Test Discovery & Assertions',
    objective: 'Write clean, automated test suites with Pytest, using simple assert statements and parameterized test cases.',
    category: 'advanced',
    resources: [{ title: 'freeCodeCamp Scientific Computing with Python', url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/', platform: 'freeCodeCamp' }],
  },
  {
    title: 'Advanced Pytest: Fixtures, Scopes & Mocking with unittest.mock',
    objective: 'Manage test state with modular Pytest fixtures, mock external network calls, and assert side effects.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: unittest.mock Guide', url: 'https://docs.python.org/3/library/unittest.mock.html', platform: 'Python Docs' }],
  },
  {
    title: 'Logging Architecture: Python logging Module & Log Rotations',
    objective: 'Configure hierarchical loggers with formatters, handlers, log levels (DEBUG to CRITICAL), and rotation files.',
    category: 'advanced',
    resources: [{ title: 'Python Official Logging Tutorial', url: 'https://docs.python.org/3/howto/logging.html', platform: 'Python Docs' }],
  },
  {
    title: 'Concurrency: Multi-Threading, I/O Bound Tasks & The GIL',
    objective: 'Understand the Global Interpreter Lock (GIL), utilize ThreadPoolExecutor for I/O bound tasks, and avoid race conditions.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: concurrent.futures', url: 'https://docs.python.org/3/library/concurrent.futures.html', platform: 'Python Docs' }],
  },
  {
    title: 'Multi-Processing: Parallel CPU-Bound Compute & Inter-Process Comm',
    objective: 'Bypass the GIL using the multiprocessing module, utilize process pools, Queues, and SharedMemory.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: multiprocessing Module', url: 'https://docs.python.org/3/library/multiprocessing.html', platform: 'Python Docs' }],
  },
  {
    title: 'Asynchronous Programming with Asyncio: Event Loops & Coroutines',
    objective: 'Write non-blocking asynchronous Python code using async/await, create tasks, and run tasks concurrently with asyncio.gather.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: asyncio Overview', url: 'https://docs.python.org/3/library/asyncio.html', platform: 'Python Docs' }],
  },
  {
    title: 'Asynchronous HTTP & Web Scraping with Aiohttp & BeautifulSoup',
    objective: 'Execute high-throughput asynchronous web requests, parse HTML DOM structures, and extract structured datasets.',
    category: 'advanced',
    resources: [{ title: 'Python Official Tutorial: Modules and Packages', url: 'https://docs.python.org/3/tutorial/modules.html', platform: 'Python Docs' }],
  },
  {
    title: 'Modern Web APIs with FastAPI: Endpoints & Pydantic Validation',
    objective: 'Build high-performance REST APIs with automatic OpenAPI docs, Pydantic type validation, and route dependencies.',
    category: 'advanced',
    resources: [{ title: 'FastAPI Interactive Tutorial & User Guide', url: 'https://fastapi.tiangolo.com/tutorial/', platform: 'FastAPI' }],
  },
  {
    title: 'FastAPI Dependency Injection & Security Middleware',
    objective: 'Implement reusable dependency injection for database sessions, JWT authentication, and request middleware.',
    category: 'advanced',
    resources: [{ title: 'FastAPI Security & Authentication Guide', url: 'https://fastapi.tiangolo.com/tutorial/security/', platform: 'FastAPI' }],
  },
  {
    title: 'Relational Database Integration with SQLAlchemy ORM',
    objective: 'Define declarative models, execute relationships (one-to-many, many-to-many), and run optimized queries.',
    category: 'advanced',
    resources: [{ title: 'PostgreSQL Official Tutorial & Python Integration', url: 'https://www.postgresql.org/docs/current/tutorial.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Database Migrations with Alembic & Async Sessions',
    objective: 'Generate declarative schema migration revisions with Alembic and manage asynchronous database sessions.',
    category: 'advanced',
    resources: [{ title: 'PostgreSQL Advanced Query Guide', url: 'https://www.postgresql.org/docs/current/', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Background Task Processing with Celery & Redis Queues',
    objective: 'Offload long-running computations from web threads to asynchronous distributed Celery worker queues.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: queue & threading', url: 'https://docs.python.org/3/library/queue.html', platform: 'Python Docs' }],
  },

  // ── Enterprise Packaging & Capstone (Weeks 43 - 52) ─────────────────────────
  {
    title: 'Python Packaging & Distribution: Pyproject.toml & Poetry',
    objective: 'Structure modular Python packages using pyproject.toml, manage locked dependencies with Poetry, and publish wheels.',
    category: 'capstone',
    resources: [{ title: 'Python Packaging User Guide (PyPA)', url: 'https://docs.python.org/3/tutorial/modules.html#packages', platform: 'Python Docs' }],
  },
  {
    title: 'Software Design Patterns in Python: Creational & Structural',
    objective: 'Implement Factory, Singleton, Adapter, and Decorator architectural patterns idiomatic to Python.',
    category: 'capstone',
    resources: [{ title: 'The Odin Project Software Architecture Concepts', url: 'https://www.theodinproject.com/', platform: 'The Odin Project' }],
  },
  {
    title: 'Behavioral Patterns: Strategy, Observer & State Machines',
    objective: 'Decouple business logic with Strategy and Observer patterns, and build deterministic state machines.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50x Software Architecture Overview', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
  {
    title: 'Containerizing Python Microservices with Docker',
    objective: 'Write multi-stage Dockerfiles for Python, run as non-root user, optimize wheels, and minimize image sizes.',
    category: 'capstone',
    resources: [{ title: 'Docker Official Getting Started Guide', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },
  {
    title: 'Capstone Phase 1: Distributed Service Architecture & API Spec',
    objective: 'Design microservice domain models, specify OpenAPI endpoints, and create entity relationship diagrams.',
    category: 'capstone',
    resources: [{ title: 'FastAPI Advanced Project Structure Guide', url: 'https://fastapi.tiangolo.com/tutorial/bigger-applications/', platform: 'FastAPI' }],
  },
  {
    title: 'Capstone Phase 2: Asynchronous Core Engine Implementation',
    objective: 'Implement core business logic using Asyncio, custom context managers, and validated Pydantic data schemas.',
    category: 'capstone',
    resources: [{ title: 'Python Standard Library: Comprehensive Reference', url: 'https://docs.python.org/3/library/', platform: 'Python Docs' }],
  },
  {
    title: 'Capstone Phase 3: PostgreSQL Persistence, Cache & Auth Layer',
    objective: 'Integrate SQLAlchemy persistence, Redis query caching, and secure JWT authentication middleware.',
    category: 'capstone',
    resources: [{ title: 'OWASP Python Security Best Practices', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Capstone Phase 4: Full Pytest Test Suite & 90%+ Code Coverage',
    objective: 'Author comprehensive unit and integration tests with Pytest, using fixtures and mocks to hit 90%+ coverage.',
    category: 'capstone',
    resources: [{ title: 'GitHub Skills: Continuous Integration with Pytest', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Capstone Phase 5: Production Deployment, CI/CD & Documentation',
    objective: 'Deploy containerized Python service to cloud infrastructure with automated GitHub Actions CI/CD.',
    category: 'capstone',
    resources: [{ title: 'GitHub Open Source Python Portfolio Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Code Review Defense, Architecture Walkthrough & Portfolio Presentation',
    objective: 'Present completed codebase, conduct peer architectural reviews, and defend system design decisions.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50 Final Technical Capstone Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
];
