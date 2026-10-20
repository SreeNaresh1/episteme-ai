import { WeekCurriculumTopic } from '../pathGenerator';

export const CLOUD_DEVOPS_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Linux & Systems Foundations (Weeks 1 - 8) ─────────────────────────────
  {
    title: 'DevOps Principles: The CAMS Model & Culture',
    objective: 'Understand Culture, Automation, Measurement, Sharing (CAMS), CI/CD lifecycles, and Site Reliability Engineering.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Getting Started with Systems', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Linux Systems Administration & Shell Operations',
    objective: 'Master terminal navigation, pipes, filters, redirection, grep/sed/awk data extraction, and user management.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Advanced Shell Commands', url: 'https://linuxjourney.com/lesson/the-shell', platform: 'Linux Journey' }],
  },
  {
    title: 'System Performance Profiling & Resource Management',
    objective: 'Diagnose CPU, memory, and disk I/O bottlenecks with vmstat, iostat, sar, free, top, and journalctl logs.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Process Monitoring & Performance', url: 'https://linuxjourney.com/lesson/monitor-processes-ps-top', platform: 'Linux Journey' }],
  },
  {
    title: 'Bash Scripting for Infrastructure Automation',
    objective: 'Write idempotent bash scripts with error handling (set -euo pipefail), functions, loops, and parameter flags.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Bash Scripting Guide', url: 'https://linuxjourney.com/lesson/bash-scripting', platform: 'Linux Journey' }],
  },
  {
    title: 'Networking for Cloud: TCP/IP, DNS & Load Balancing',
    objective: 'Analyze IP routing, CIDR notation, DNS resolution hierarchy, reverse proxies, and Layer 4 vs Layer 7 load balancing.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Routing & Network Fundamentals', url: 'https://linuxjourney.com/lesson/routing-and-subnets', platform: 'Linux Journey' }],
  },
  {
    title: 'Version Control: Advanced Git Workflow & Branching',
    objective: 'Implement trunk-based development, feature flags, interactive rebasing, merge conflict resolution, and git bisect.',
    category: 'foundations',
    resources: [{ title: 'Git Official Documentation & Pro Git Book', url: 'https://git-scm.com/doc', platform: 'Git SCM' }],
  },
  {
    title: 'SSH Key Management, Bastion Hosts & Tunneling',
    objective: 'Configure sshd hardening, authorized_keys permissions, SSH jump bastions, and port forwarding tunnels.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: SSH Remote Access & Security', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Cloud Foundations: Core Architecture & IaaS vs PaaS',
    objective: 'Evaluate cloud service models (IaaS, PaaS, Serverless), regions, availability zones, and elasticity tradeoffs.',
    category: 'foundations',
    resources: [{ title: 'Microsoft Learn Azure Fundamentals (AZ-900)', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', platform: 'Microsoft Learn' }],
  },

  // ── Containers & Microservices (Weeks 9 - 20) ──────────────────────────────
  {
    title: 'Docker Fundamentals: Namespaces, Cgroups & Images',
    objective: 'Understand Linux kernel isolation (namespaces, control groups) and run interactive container instances.',
    category: 'core',
    resources: [{ title: 'Docker Official Getting Started Guide', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },
  {
    title: 'Dockerfile Optimization & Multi-Stage Builds',
    objective: 'Write lightweight, non-root Dockerfiles utilizing multi-stage builds, layer caching, and .dockerignore rules.',
    category: 'core',
    resources: [{ title: 'Docker Official Build Best Practices Guide', url: 'https://docs.docker.com/build/building/best-practices/', platform: 'Docker Docs' }],
  },
  {
    title: 'Container Storage & Network Configurations',
    objective: 'Mount named volumes, bind mounts, create bridge networks, and link multiple containers with internal DNS.',
    category: 'core',
    resources: [{ title: 'Docker Official Storage & Networking Guide', url: 'https://docs.docker.com/engine/storage/', platform: 'Docker Docs' }],
  },
  {
    title: 'Multi-Container Orchestration with Docker Compose',
    objective: 'Define multi-service stacks (web, database, cache) with declarative docker-compose.yml files and health checks.',
    category: 'core',
    resources: [{ title: 'Docker Compose Official Tutorial', url: 'https://docs.docker.com/compose/', platform: 'Docker Docs' }],
  },
  {
    title: 'Container Registry Management & Vulnerability Scanning',
    objective: 'Publish container images to registries, tag semantic versions, and scan image layers for CVE vulnerabilities.',
    category: 'core',
    resources: [{ title: 'Docker Official Security & Scanning Guide', url: 'https://docs.docker.com/security-best-practices/', platform: 'Docker Docs' }],
  },
  {
    title: 'Kubernetes Architecture: Control Plane & Nodes',
    objective: 'Understand kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, and kube-proxy roles.',
    category: 'core',
    resources: [{ title: 'Kubernetes Interactive Basics & Architecture', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Kubernetes Pods, ReplicaSets & Declarative Deployments',
    objective: 'Deploy and scale stateless workloads using declarative YAML manifests with rolling updates and rollbacks.',
    category: 'core',
    resources: [{ title: 'Kubernetes Workload Deployments Guide', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Kubernetes Networking: ClusterIP, NodePort & Ingress',
    objective: 'Expose internal Pods using ClusterIP, NodePort, LoadBalancer services, and route external HTTP traffic via Ingress.',
    category: 'core',
    resources: [{ title: 'Kubernetes Services, Load Balancing & Networking', url: 'https://kubernetes.io/docs/concepts/services-networking/service/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Kubernetes ConfigMaps, Secrets & Environment Variables',
    objective: 'Decouple configuration parameters from container images using ConfigMaps and base64-encoded Secrets.',
    category: 'core',
    resources: [{ title: 'Kubernetes Configuration & Secrets Guide', url: 'https://kubernetes.io/docs/concepts/configuration/secret/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Kubernetes Persistent Storage: PV, PVC & StorageClasses',
    objective: 'Provision persistent volume claims (PVC) backed by cloud block storage for stateful container workloads.',
    category: 'core',
    resources: [{ title: 'Kubernetes Storage & Persistent Volumes', url: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Kubernetes Resource Limits & Horizontal Pod Autoscaling (HPA)',
    objective: 'Set CPU/memory requests and limits, and automatically scale Pod replicas based on utilization metrics.',
    category: 'core',
    resources: [{ title: 'Kubernetes Autoscaling & Resource Management', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Package Management for Kubernetes with Helm Charts',
    objective: 'Create reusable Helm charts with templated values, manage chart releases, and handle rollbacks.',
    category: 'core',
    resources: [{ title: 'Kubernetes Application Packaging & Management', url: 'https://kubernetes.io/docs/tutorials/', platform: 'Kubernetes Docs' }],
  },

  // ── Infrastructure as Code (IaC) & Cloud Architecture (Weeks 21 - 32) ──────
  {
    title: 'Infrastructure as Code Principles & Declarative State',
    objective: 'Understand immutable infrastructure, declarative vs imperative paradigms, and state drift detection.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Azure Resource Manager & IaC', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Terraform Syntax, Providers & Resource Declarations',
    objective: 'Write HCL (HashiCorp Configuration Language), configure cloud providers, and provision compute/storage resources.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Terraform on Azure Guide', url: 'https://learn.microsoft.com/en-us/azure/developer/terraform/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Terraform State Management & Remote Backends',
    objective: 'Configure remote state storage with object locking (S3/DynamoDB or Azure Blob) to enable concurrent collaboration.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Terraform State Architecture', url: 'https://learn.microsoft.com/en-us/azure/developer/terraform/store-state-in-azure-storage', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Modular Terraform: Creating Reusable Infrastructure Modules',
    objective: 'Package repeatable infrastructure blocks (VPC, EKS/AKS cluster, database) with parameterized inputs and outputs.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Reusable Terraform Modules', url: 'https://learn.microsoft.com/en-us/azure/developer/terraform/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Cloud Virtual Private Clouds (VPC) & Subnet Architecture',
    objective: 'Design isolated cloud networks with public/private subnets, internet gateways, NAT gateways, and route tables.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Virtual Network Architecture', url: 'https://learn.microsoft.com/en-us/training/paths/architect-network-infrastructure/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Cloud Identity, RBAC & Least-Privilege IAM Policies',
    objective: 'Author fine-grained IAM JSON policy documents, assign managed roles to instances, and eliminate hardcoded keys.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Cloud Identity & Access Management', url: 'https://learn.microsoft.com/en-us/training/paths/manage-identity-and-access/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Managed Cloud Databases: RDS, Cloud SQL & High Availability',
    objective: 'Provision managed PostgreSQL instances with multi-AZ failover, read replicas, automated backups, and encryption.',
    category: 'applied',
    resources: [{ title: 'PostgreSQL Official Architecture Guide', url: 'https://www.postgresql.org/docs/current/', platform: 'PostgreSQL Docs' }],
  },
  {
    title: 'Serverless Compute: Functions as a Service & Event Triggers',
    objective: 'Deploy serverless functions (AWS Lambda / Azure Functions) triggered by object uploads, webhooks, and queues.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Serverless Architecture Guide', url: 'https://learn.microsoft.com/en-us/training/paths/create-serverless-applications/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Cloud Storage Lifecycle Management & Tiering',
    objective: 'Configure bucket versioning, cross-region replication, encryption at rest (KMS), and transition lifecycle rules.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Cloud Storage Architecture', url: 'https://learn.microsoft.com/en-us/training/paths/architect-storage-infrastructure/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Cloud Security Groups & Network Access Control Lists (NACLs)',
    objective: 'Implement stateful security groups and stateless subnet NACLs to enforce defense-in-depth perimeter firewalls.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Cloud Security Best Practices', url: 'https://learn.microsoft.com/en-us/training/paths/secure-your-cloud-data/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Infrastructure Cost Optimization & Budget Alerts',
    objective: 'Analyze cloud spend telemetry, configure cost anomaly alerts, right-size instances, and utilize spot pricing.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Cloud Cost Management', url: 'https://learn.microsoft.com/en-us/training/paths/manage-cloud-costs-azure/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Disaster Recovery: RTO, RPO & Multi-Region Failover',
    objective: 'Design Disaster Recovery strategies (Pilot Light, Warm Standby, Active-Active) with measurable RTO and RPO targets.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Cloud Reliability Architecture', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },

  // ── CI/CD Automation & GitOps (Weeks 33 - 42) ───────────────────────────────
  {
    title: 'Continuous Integration: Automated Build & Test Pipelines',
    objective: 'Construct CI workflows that trigger on pull requests, run linting, execute unit test suites, and fail fast.',
    category: 'advanced',
    resources: [{ title: 'GitHub Skills: Continuous Integration Pipeline', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'GitHub Actions: Custom Actions, Workflows & Matrix Builds',
    objective: 'Author multi-platform build matrices, use composite actions, cache dependencies, and manage workflow artifacts.',
    category: 'advanced',
    resources: [{ title: 'GitHub Skills: Automate Workflows with GitHub Actions', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Continuous Delivery: Blue-Green & Canary Deployment Strategies',
    objective: 'Deploy zero-downtime updates using blue-green environments and canary routing with automated traffic shifting.',
    category: 'advanced',
    resources: [{ title: 'Kubernetes Advanced Deployment Strategies', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'GitOps: Declarative Continuous Delivery with ArgoCD',
    objective: 'Implement Git as the single source of truth for Kubernetes state, synchronizing cluster drift automatically.',
    category: 'advanced',
    resources: [{ title: 'Kubernetes Cluster Management & GitOps', url: 'https://kubernetes.io/docs/tutorials/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Secrets Management in CI/CD: Vault & Encrypted Environments',
    objective: 'Eliminate plain-text credentials in pipelines using cloud KMS, dynamic credentials, and OIDC federated auth.',
    category: 'advanced',
    resources: [{ title: 'OWASP Secrets Management Cheat Sheet', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Observability Pillars: Metrics, Logs & Distributed Tracing',
    objective: 'Differentiate blackbox vs whitebox monitoring and capture the four golden signals (Latency, Traffic, Errors, Saturation).',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Monitoring & Diagnostics', url: 'https://learn.microsoft.com/en-us/training/paths/monitor-diagnose-cloud-applications/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Prometheus Architecture: Scraping & PromQL Queries',
    objective: 'Deploy Prometheus, configure service discovery metrics endpoints, and author custom PromQL alert queries.',
    category: 'advanced',
    resources: [{ title: 'Docker Observability & Monitoring Guide', url: 'https://docs.docker.com/', platform: 'Docker Docs' }],
  },
  {
    title: 'Grafana Dashboard Visualizations & Automated Alerting',
    objective: 'Build executive and operational system dashboards, configure threshold alerts, and route alerts to PagerDuty/Slack.',
    category: 'advanced',
    resources: [{ title: 'web.dev Monitoring Web Applications', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },
  {
    title: 'Centralized Logging: Logstash, Fluentd & Elasticsearch',
    objective: 'Aggregate multi-node container logs into structured JSON indices, parse stack traces, and build search views.',
    category: 'advanced',
    resources: [{ title: 'Linux Journey: System Logging with Rsyslog', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Chaos Engineering: Fault Injection & Resilience Testing',
    objective: 'Test infrastructure resilience by injecting network latency, terminating random Pods, and verifying auto-healing.',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Reliability & Fault Injection', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },

  // ── Production Capstone & Platform Engineering (Weeks 43 - 52) ──────────────
  {
    title: 'Platform Engineering: Internal Developer Platform (IDP) Architecture',
    objective: 'Design self-service developer templates, golden paths, and automated environment provisioning.',
    category: 'capstone',
    resources: [{ title: 'GitHub Enterprise Platform Engineering Overview', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Capstone Phase 1: High-Availability Cloud Architecture Blueprint',
    objective: 'Draft multi-region architecture diagrams, compute/network sizing specifications, and security policies.',
    category: 'capstone',
    resources: [{ title: 'Microsoft Learn Cloud Architecture Best Practices', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Capstone Phase 2: Terraform Infrastructure Automation',
    objective: 'Write complete IaC modules to provision VPCs, Kubernetes clusters, managed databases, and cloud storage.',
    category: 'capstone',
    resources: [{ title: 'Microsoft Learn Terraform End-to-End Guide', url: 'https://learn.microsoft.com/en-us/azure/developer/terraform/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Capstone Phase 3: Containerization & Kubernetes Staging',
    objective: 'Package multi-tier application into optimized containers, write Kubernetes manifests, and configure ingress.',
    category: 'capstone',
    resources: [{ title: 'Kubernetes Production Cluster Setup Tutorial', url: 'https://kubernetes.io/docs/tutorials/', platform: 'Kubernetes Docs' }],
  },
  {
    title: 'Capstone Phase 4: Full CI/CD Pipeline & Automated GitOps',
    objective: 'Implement end-to-end GitHub Actions pipeline with unit testing, container build, and automated staging deployment.',
    category: 'capstone',
    resources: [{ title: 'GitHub Skills: Deploying with Continuous Delivery', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Capstone Phase 5: Prometheus, Grafana & Alert Integration',
    objective: 'Set up real-time monitoring dashboards, track request latency, and verify synthetic alert notifications.',
    category: 'capstone',
    resources: [{ title: 'Docker & Kubernetes Monitoring Setup', url: 'https://docs.docker.com/', platform: 'Docker Docs' }],
  },
  {
    title: 'Capstone Phase 6: Chaos & Load Testing Verification',
    objective: 'Simulate peak traffic spikes, test horizontal pod autoscaling, kill worker nodes, and document zero downtime.',
    category: 'capstone',
    resources: [{ title: 'web.dev Performance Testing under Load', url: 'https://web.dev/', platform: 'Google web.dev' }],
  },
  {
    title: 'Site Reliability Engineering: Runbooks, Post-Mortems & SLAs',
    objective: 'Author incident runbooks, disaster recovery runbooks, and a blameless post-mortem for simulated outages.',
    category: 'capstone',
    resources: [{ title: 'GitHub Open Source DevOps Portfolio Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'DevOps Portfolio Defense, Architecture Review & Showcase',
    objective: 'Package infrastructure repository with README architecture diagrams, cost estimates, and present defense.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50 Final Technical Portfolio Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
  {
    title: 'Career Readiness, Systems Design Whiteboarding & Interview Prep',
    objective: 'Practice real-world distributed systems design whiteboard scenarios and technical DevOps interviews.',
    category: 'capstone',
    resources: [{ title: 'Git Official Technical Documentation & Reference', url: 'https://git-scm.com/doc', platform: 'Git SCM' }],
  },
];
