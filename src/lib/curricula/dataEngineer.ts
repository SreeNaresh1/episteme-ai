import { WeekCurriculumTopic } from '../pathGenerator';

export const DATA_ENGINEER_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Foundations & Relational Data Modeling (Weeks 1 - 10) ──────────────────
  {
    title: 'Data Engineering Architecture & The Modern Data Stack',
    objective: 'Understand data ingestion, storage, transformation, orchestration, and consumption layers across OLTP vs OLAP.',
    category: 'foundations',
    resources: [{ title: 'Mode SQL Tutorial: Database Concepts', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
  },
  {
    title: 'Relational Database Internals: Indexes, B-Trees & WAL',
    objective: 'Explore storage engines, row-oriented vs columnar storage, write-ahead logs, and B-Tree index traversal.',
    category: 'foundations',
    resources: [{ title: 'PostgreSQL Official Documentation: Architecture & Internals', url: 'https://www.postgresql.org/docs/current/', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Data Modeling: 3NF Relational vs Dimensional Modeling',
    objective: 'Design transactional normalized schemas (3NF) and compare with denormalized reporting architectures.',
    category: 'foundations',
    resources: [{ title: 'Mode Analytics SQL Joins & Schema Design', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
  },
  {
    title: 'Dimensional Modeling: Star Schemas & Fact / Dimension Tables',
    objective: 'Construct Star and Snowflake schemas, differentiate additive/semi-additive facts, and define conformed dimensions.',
    category: 'foundations',
    resources: [{ title: 'Kaggle Intro to SQL: BigQuery Tables', url: 'https://www.kaggle.com/learn/intro-to-sql', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Slowly Changing Dimensions (SCD Type 0, 1, 2, 3)',
    objective: 'Implement SCD Type 1 (overwrite) and SCD Type 2 (historical tracking with valid_from/valid_to timestamps).',
    category: 'foundations',
    resources: [{ title: 'PostgreSQL Advanced Modeling & Timestamp Queries', url: 'https://www.postgresql.org/docs/current/tutorial.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Advanced SQL: Window Functions, CTEs & Recursive Queries',
    objective: 'Master RANK, DENSE_RANK, ROW_NUMBER, LAG, LEAD, and recursive Common Table Expressions for hierarchical data.',
    category: 'foundations',
    resources: [{ title: 'Mode SQL Tutorial: Advanced Window Functions', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
  },
  {
    title: 'Query Optimization & EXPLAIN ANALYZE Execution Plans',
    objective: 'Diagnose slow queries using EXPLAIN (ANALYZE, BUFFERS), eliminate sequential scans, and tune query planners.',
    category: 'foundations',
    resources: [{ title: 'PostgreSQL Performance Optimization Guide', url: 'https://www.postgresql.org/docs/current/performance-tips.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Table Partitioning: Range, List & Hash Strategies',
    objective: 'Partition massive multi-million row tables by date range to enable fast partition pruning during queries.',
    category: 'foundations',
    resources: [{ title: 'PostgreSQL Table Partitioning Documentation', url: 'https://www.postgresql.org/docs/current/ddl-partitioning.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Python for Data Pipelines: High-Throughput I/O & Memory Management',
    objective: 'Ingest and stream massive data files without out-of-memory errors using generators and chunked reading.',
    category: 'foundations',
    resources: [{ title: 'Python Official Tutorial: Input and Output', url: 'https://docs.python.org/3/tutorial/inputoutput.html', platform: 'Python Docs' }],
  },
  {
    title: 'Data Formats for Big Data: CSV, JSON, Parquet & Avro',
    objective: 'Analyze row-oriented (Avro/CSV) vs columnar (Parquet) formats, snappy compression, and schema evolution.',
    category: 'foundations',
    resources: [{ title: 'Kaggle Pandas Course: Data Formats', url: 'https://www.kaggle.com/learn/pandas', platform: 'Kaggle Learn' }],
  },

  // ── Distributed Computing & Big Data with Spark (Weeks 11 - 22) ─────────────
  {
    title: 'Distributed Systems: CAP Theorem & Parallel Compute Concepts',
    objective: 'Understand consistency, availability, partition tolerance, and horizontal scaling in distributed clusters.',
    category: 'core',
    resources: [{ title: 'MIT OpenCourseWare: Distributed Systems Architecture', url: 'https://ocw.mit.edu/', platform: 'MIT OpenCourseWare' }],
  },
  {
    title: 'Apache Spark Architecture: Driver, Executors & Cluster Managers',
    objective: 'Understand the Spark driver program, worker nodes, executors, task scheduling, and lazy evaluation DAGs.',
    category: 'core',
    resources: [{ title: 'Apache Spark Official Overview & Architecture', url: 'https://spark.apache.org/docs/latest/', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'PySpark Fundamentals: SparkSession & DataFrame Operations',
    objective: 'Initialize SparkSessions, read Parquet datasets into PySpark DataFrames, and execute filter and select operations.',
    category: 'core',
    resources: [{ title: 'Apache Spark Quick Start with Python', url: 'https://spark.apache.org/docs/latest/quick-start.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'PySpark Transformations vs Actions & Catalyst Optimizer',
    objective: 'Trace narrow vs wide transformations, analyze physical query plans, and explore the Catalyst Optimizer.',
    category: 'core',
    resources: [{ title: 'Apache Spark SQL and DataFrames Guide', url: 'https://spark.apache.org/docs/latest/sql-programming-guide.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Distributed Joins in Spark: Broadcast Joins & Shuffle Hash Joins',
    objective: 'Optimize large-to-small table joins with Broadcast Hash Joins to eliminate expensive network shuffles.',
    category: 'core',
    resources: [{ title: 'Apache Spark Performance Tuning Guide', url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Data Partitioning, Bucketing & Skew Mitigation in Spark',
    objective: 'Repartitions DataFrames by business keys, configure bucketing, and mitigate data skew bottlenecks.',
    category: 'core',
    resources: [{ title: 'Apache Spark Tuning & Memory Management', url: 'https://spark.apache.org/docs/latest/tuning.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Spark SQL & User Defined Functions (UDFs & Vectorized UDFs)',
    objective: 'Execute ANSI SQL queries directly on Spark DataFrames and author high-speed vectorized Pandas UDFs.',
    category: 'core',
    resources: [{ title: 'Apache Spark SQL Programming Guide', url: 'https://spark.apache.org/docs/latest/sql-ref.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Cloud Data Lakes: AWS S3 & Azure Blob Storage Architecture',
    objective: 'Design Medallion architecture (Bronze raw, Silver cleaned, Gold aggregated) on cloud object storage.',
    category: 'core',
    resources: [{ title: 'Microsoft Learn Azure Data Lake Architecture', url: 'https://learn.microsoft.com/en-us/training/paths/build-data-lake-azure/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Open Table Formats: Delta Lake ACID Transactions',
    objective: 'Implement ACID transactions, time travel queries, and schema enforcement on data lakes using Delta Lake.',
    category: 'core',
    resources: [{ title: 'Kaggle BigQuery & Cloud Storage Integration', url: 'https://www.kaggle.com/learn/intro-to-sql', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Data Quality & Validation with Great Expectations',
    objective: 'Author declarative data quality suites, automate schema validation, and catch null/out-of-range anomalies.',
    category: 'core',
    resources: [{ title: 'Kaggle Data Cleaning Course', url: 'https://www.kaggle.com/learn/data-cleaning', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Data Ingestion: REST APIs, Webhooks & Database CDC',
    objective: 'Extract data from third-party REST endpoints with pagination, exponential backoff, and change data capture (CDC).',
    category: 'core',
    resources: [{ title: 'Python Standard Library: urllib and http', url: 'https://docs.python.org/3/library/urllib.request.html', platform: 'Python Docs' }],
  },
  {
    title: 'Containerizing Big Data Jobs with Docker',
    objective: 'Package PySpark scripts, dependencies, and database drivers into repeatable, portable container environments.',
    category: 'core',
    resources: [{ title: 'Docker Official Getting Started Guide', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },

  // ── Workflow Orchestration & Data Warehousing (Weeks 23 - 34) ───────────────
  {
    title: 'Workflow Orchestration: Apache Airflow Architecture',
    objective: 'Understand the Airflow Webserver, Scheduler, Metadata Database, and Celery/Kubernetes Executors.',
    category: 'applied',
    resources: [{ title: 'Apache Spark & Data Pipeline Orchestration', url: 'https://spark.apache.org/docs/latest/', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Authoring Airflow DAGs: Tasks, Dependencies & Operators',
    objective: 'Define Directed Acyclic Graphs (DAGs) in Python using PythonOperator, BashOperator, and bitshift >> syntax.',
    category: 'applied',
    resources: [{ title: 'GitHub Skills: Automating Data Tasks', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Airflow Scheduling, Catchup, Backfills & Sensors',
    objective: 'Configure CRON schedules, manage backfills safely with catchup=False, and wait for upstream dependencies with Sensors.',
    category: 'applied',
    resources: [{ title: 'Linux Journey: Cron Jobs & Scheduled Tasks', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Airflow Variables, Connections & Secrets Backend',
    objective: 'Decouple database passwords and API tokens from code using encrypted Airflow Connections and Secrets backends.',
    category: 'applied',
    resources: [{ title: 'OWASP Configuration & Credential Safety', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Data Transformation with dbt (Data Build Tool)',
    objective: 'Implement modular SQL data transformations, manage dependencies through ref() functions, and run tests.',
    category: 'applied',
    resources: [{ title: 'Mode Analytics: Data Transformation with SQL', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
  },
  {
    title: 'dbt Models, Materializations & Jinja Macros',
    objective: 'Configure views, tables, and incremental materializations with Jinja dynamic templating macros.',
    category: 'applied',
    resources: [{ title: 'Kaggle Advanced SQL: Analytical Transformations', url: 'https://www.kaggle.com/learn/advanced-sql', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Cloud Data Warehouses: BigQuery Architecture & Slot Pricing',
    objective: 'Query massive datasets in Google BigQuery, analyze partition filters, and cluster keys to minimize query costs.',
    category: 'applied',
    resources: [{ title: 'Kaggle BigQuery Advanced Queries', url: 'https://www.kaggle.com/learn/advanced-sql', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Cloud Data Warehouses: Snowflake Virtual Warehouses & Micro-Partitions',
    objective: 'Explore Snowflake multi-cluster shared data architecture, virtual warehouses, and zero-copy cloning.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Azure Synapse & Warehousing', url: 'https://learn.microsoft.com/en-us/training/paths/implement-data-warehouse-azure-synapse-analytics/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Data Governance, Data Cataloging & Lineage Tracking',
    objective: 'Track data provenance from source ingest to executive dashboard, manage metadata, and enforce GDPR compliance.',
    category: 'applied',
    resources: [{ title: 'Google Data Analytics: Data Ethics and Privacy', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', platform: 'Coursera' }],
  },
  {
    title: 'Data Observability: Tracking Freshness, Volume & Schema Drift',
    objective: 'Monitor pipeline health with automated SLA alerts on data delivery delays, volume anomalies, and schema changes.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Data Engineering Monitoring', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Reverse ETL: Syncing Data Warehouse Insights to Operational Tools',
    objective: 'Sync enriched customer and transactional aggregations back to CRMs and operational databases.',
    category: 'applied',
    resources: [{ title: 'PostgreSQL Operational Sync Guide', url: 'https://www.postgresql.org/docs/current/', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'CI/CD for Data Pipelines: Automated SQL Testing & Deployment',
    objective: 'Automate dbt testing and pipeline regression validation in GitHub Actions before deploying to production.',
    category: 'applied',
    resources: [{ title: 'GitHub Skills: Continuous Integration Pipeline', url: 'https://github.com/', platform: 'GitHub' }],
  },

  // ── Real-Time Streaming & Event-Driven Architecture (Weeks 35 - 44) ─────────
  {
    title: 'Streaming Concepts: Batch vs Event-Driven Streaming Architectures',
    objective: 'Differentiate bounded vs unbounded data streams, event time vs processing time, and watermarking.',
    category: 'advanced',
    resources: [{ title: 'Apache Spark Streaming Documentation', url: 'https://spark.apache.org/docs/latest/streaming-programming-guide.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Apache Kafka Architecture: Topics, Partitions & Brokers',
    objective: 'Understand Kafka distributed commit logs, topic partitioning, replication factors, and controller brokers.',
    category: 'advanced',
    resources: [{ title: 'Linux Journey: Network Sockets & Data Buffers', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Kafka Producers: Partitioners, ACKs & Delivery Guarantees',
    objective: 'Publish events to Kafka topics, tune acks=all for durability, and ensure at-least-once message delivery.',
    category: 'advanced',
    resources: [{ title: 'Python Standard Library: socket and network', url: 'https://docs.python.org/3/library/socket.html', platform: 'Python Docs' }],
  },
  {
    title: 'Kafka Consumers: Consumer Groups & Offset Management',
    objective: 'Scale consumer read throughput across partition groups and handle rebalances and manual offset commits.',
    category: 'advanced',
    resources: [{ title: 'Apache Spark Structured Streaming Guide', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Schema Registry & Apache Avro Schema Evolution',
    objective: 'Enforce strict message schemas across streaming producers and consumers with backward/forward compatibility.',
    category: 'advanced',
    resources: [{ title: 'PostgreSQL Data Types & Schemas', url: 'https://www.postgresql.org/docs/current/datatype.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Spark Structured Streaming: Streaming DataFrames',
    objective: 'Process live Kafka event streams using PySpark Structured Streaming with micro-batch trigger intervals.',
    category: 'advanced',
    resources: [{ title: 'Apache Spark Structured Streaming Kafka Integration', url: 'https://spark.apache.org/docs/latest/structured-streaming-kafka-integration.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Windowing Operations on Streams: Tumbling, Sliding & Session Windows',
    objective: 'Aggregate streaming metrics over tumbling and sliding time windows with watermarks to handle late data.',
    category: 'advanced',
    resources: [{ title: 'Apache Spark Streaming Window Operations', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#window-operations-on-event-time', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Stream-to-Table Storage: Streaming Sinks to Delta Lake / S3',
    objective: 'Write streaming output reliably to cloud data lakehouse storage with checkpointing to prevent duplicate writes.',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Azure Streaming Architecture', url: 'https://learn.microsoft.com/en-us/training/paths/implement-stream-processing-azure-stream-analytics/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'NoSQL Systems for Real-Time Serving: Redis & Cassandra',
    objective: 'Serve sub-millisecond analytical aggregations using distributed wide-column stores and in-memory key-value caches.',
    category: 'advanced',
    resources: [{ title: 'PostgreSQL Key-Value (JSONB) Store Operations', url: 'https://www.postgresql.org/docs/current/datatype-json.html', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Data Security: Encryption at Rest, In-Transit & Column-Level Masking',
    objective: 'Configure TLS encryption for streaming buses, KMS bucket encryption, and mask sensitive PII fields.',
    category: 'advanced',
    resources: [{ title: 'OWASP Data Privacy & Security Architecture', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },

  // ── Capstone Modern Data Lakehouse Platform (Weeks 45 - 52) ─────────────────
  {
    title: 'Capstone Phase 1: Architecture Blueprint & Source Sizing',
    objective: 'Design complete end-to-end data pipeline architecture: sources, ingest, storage, transform, and consumption.',
    category: 'capstone',
    resources: [{ title: 'Microsoft Learn Data Engineering Best Practices', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Capstone Phase 2: Ingestion Engine & Change Data Capture',
    objective: 'Build ingestion scripts that pull real-world API data and database transaction logs into the Bronze raw lake.',
    category: 'capstone',
    resources: [{ title: 'Python Official Tutorial: Modules and Data Pipelines', url: 'https://docs.python.org/3/tutorial/modules.html', platform: 'Python Docs' }],
  },
  {
    title: 'Capstone Phase 3: Distributed PySpark Cleaning to Silver Layer',
    objective: 'Implement distributed PySpark transformations that clean anomalies, deduplicate records, and enforce schemas.',
    category: 'capstone',
    resources: [{ title: 'Apache Spark Standalone Cluster Deployment', url: 'https://spark.apache.org/docs/latest/spark-standalone.html', platform: 'Apache Spark Docs' }],
  },
  {
    title: 'Capstone Phase 4: Dimensional Gold Layer & dbt Modeling',
    objective: 'Model business dimensional Star schemas in the Gold layer with automated dbt tests and documentation.',
    category: 'capstone',
    resources: [{ title: 'Mode Analytics: Advanced Reporting Models', url: 'https://mode.com/sql-tutorial/', platform: 'Mode Analytics' }],
  },
  {
    title: 'Capstone Phase 5: Airflow DAG Scheduling & Failure Alerts',
    objective: 'Orchestrate all pipeline stages into a master Airflow DAG with automated Slack/email failure notifications.',
    category: 'capstone',
    resources: [{ title: 'GitHub Skills: Continuous Workflow Execution', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Capstone Phase 6: Streaming Ingestion & Real-Time Dashboard Integration',
    objective: 'Stream real-time events into the pipeline, update rolling aggregations, and feed a live dashboard.',
    category: 'capstone',
    resources: [{ title: 'Kaggle Data Visualization: Real-Time Dashboards', url: 'https://www.kaggle.com/learn/data-visualization', platform: 'Kaggle Learn' }],
  },
  {
    title: 'Data Pipeline Cost Analysis & SLA Performance Audit',
    objective: 'Profile pipeline execution runtime, optimize cluster resource sizing, and document 99.9% pipeline SLA uptime.',
    category: 'capstone',
    resources: [{ title: 'GitHub Open Source Data Engineering Portfolio Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Data Engineering Portfolio Defense & Architecture Walkthrough',
    objective: 'Package GitHub repository with architecture diagrams, data lineage graphs, runbooks, and present defense.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50 Final Technical Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
];
