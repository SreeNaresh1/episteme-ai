import { WeekCurriculumTopic } from '../pathGenerator';

export const CYBERSECURITY_52_WEEKS: WeekCurriculumTopic[] = [
  // ── Foundations & Systems (Weeks 1 - 10) ──────────────────────────────────
  {
    title: 'Cybersecurity Fundamentals & The CIA Triad',
    objective: 'Understand confidentiality, integrity, availability, defense-in-depth, threat actors, and attack surfaces.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Getting Started with Linux Systems', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Linux Command Line Navigation & File System Hierarchy',
    objective: 'Navigate Linux directory structures (/etc, /var/log, /bin), manipulate files, and manage standard I/O redirection.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Command Line Navigation', url: 'https://linuxjourney.com/lesson/the-shell', platform: 'Linux Journey' }],
  },
  {
    title: 'Linux Permissions, Users & Access Control Lists',
    objective: 'Audit and modify chmod octal permissions, chown ownership, SUID/SGID bits, and sticky bit configurations.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: File Permissions & SUID', url: 'https://linuxjourney.com/lesson/file-permissions', platform: 'Linux Journey' }],
  },
  {
    title: 'Linux Process Management & Systemd Service Auditing',
    objective: 'Monitor running processes with ps, top, htop, investigate background daemon services, and inspect systemd units.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Processes & Monitoring', url: 'https://linuxjourney.com/lesson/monitor-processes-ps-top', platform: 'Linux Journey' }],
  },
  {
    title: 'Bash Shell Scripting for Security Automation',
    objective: 'Write modular Bash scripts for automated log parsing, IP extraction, and scheduled cron security health checks.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Shell Scripting Basics', url: 'https://linuxjourney.com/lesson/bash-scripting', platform: 'Linux Journey' }],
  },
  {
    title: 'Computer Networking: The OSI & TCP/IP Reference Models',
    objective: 'Analyze layer interactions from physical bits up to application payloads (Ethernet, IP, TCP/UDP, HTTP).',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Subnetting & Network Routing', url: 'https://linuxjourney.com/lesson/routing-and-subnets', platform: 'Linux Journey' }],
  },
  {
    title: 'IPv4 Addressing, Subnet Masks & CIDR Calculations',
    objective: 'Calculate network addresses, broadcast boundaries, usable host ranges, and VLSM variable-length subnet masks.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: Network Addressing & Masks', url: 'https://linuxjourney.com/lesson/ip-addresses', platform: 'Linux Journey' }],
  },
  {
    title: 'TCP Handshakes, Flags & Connection State Machines',
    objective: 'Deconstruct SYN, SYN-ACK, ACK 3-way handshakes, sequence numbers, window sizing, and connection teardown.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: TCP vs UDP Transport Protocols', url: 'https://linuxjourney.com/lesson/tcp-and-udp', platform: 'Linux Journey' }],
  },
  {
    title: 'DNS Protocol: Zones, Record Types & Cache Poisoning',
    objective: 'Inspect A, AAAA, CNAME, MX, TXT records, iterative/recursive resolution, and analyze DNS spoofing risks.',
    category: 'foundations',
    resources: [{ title: 'Linux Journey: DNS Resolution & Lookup', url: 'https://linuxjourney.com/lesson/domain-name-system', platform: 'Linux Journey' }],
  },
  {
    title: 'Packet Sniffing & Traffic Analysis with Wireshark',
    objective: 'Capture live network traffic, apply Berkeley Packet Filters (BPF), and reconstruct cleartext HTTP and FTP sessions.',
    category: 'foundations',
    resources: [{ title: 'OverTheWire Bandit: Basic Security Challenges (Level 0-5)', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },

  // ── Cryptography & Identity Defense (Weeks 11 - 18) ────────────────────────
  {
    title: 'Symmetric Cryptography: AES & Block Cipher Modes',
    objective: 'Understand symmetric encryption principles, AES key schedules, and ECB vs CBC vs GCM authenticated modes.',
    category: 'core',
    resources: [{ title: 'Khan Academy Cryptography: Modern Ciphers', url: 'https://www.khanacademy.org/computing/computer-science/cryptography', platform: 'Khan Academy' }],
  },
  {
    title: 'Asymmetric Cryptography: RSA & Diffie-Hellman Key Exchange',
    objective: 'Deconstruct public-private keypairs, discrete logarithm math, modular arithmetic, and secure key exchanges.',
    category: 'core',
    resources: [{ title: 'Khan Academy Cryptography: Public Key Systems', url: 'https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt', platform: 'Khan Academy' }],
  },
  {
    title: 'Cryptographic Hashing: SHA-256 & Message Integrity',
    objective: 'Analyze collision resistance, avalanche effect, HMAC authentication codes, and rainbow table salt protection.',
    category: 'core',
    resources: [{ title: 'Khan Academy Cryptography: Cryptographic Hash Functions', url: 'https://www.khanacademy.org/computing/computer-science/cryptography', platform: 'Khan Academy' }],
  },
  {
    title: 'Public Key Infrastructure (PKI) & TLS 1.3 Handshake',
    objective: 'Audit X.509 digital certificates, Certificate Authorities (CA), trust chains, OCSP revocation, and TLS 1.3.',
    category: 'core',
    resources: [{ title: 'PortSwigger Web Security: TLS and Protocol Security', url: 'https://portswigger.net/web-security', platform: 'PortSwigger' }],
  },
  {
    title: 'Identity & Access Management (IAM): RBAC & Principle of Least Privilege',
    objective: 'Design Role-Based Access Control matrix, multi-factor authentication (MFA/FIDO2), and privilege separation.',
    category: 'core',
    resources: [{ title: 'OWASP Authentication Verification Standard', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Active Directory Core: Kerberos, LDAP & Domain Architecture',
    objective: 'Understand Windows domain controllers, LDAP queries, Kerberos ticket granting (TGT/TGS), and Group Policy Objects.',
    category: 'core',
    resources: [{ title: 'Microsoft Learn Security Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/describe-security-concepts-methodologies/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Secure Shell (SSH) Protocol Hardening & Key Management',
    objective: 'Configure sshd_config, disable password auth, generate Ed25519 keys, and set up jump hosts.',
    category: 'core',
    resources: [{ title: 'OverTheWire Bandit: SSH & Remote Access (Level 6-12)', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Host Hardening & Endpoint Security Baselines',
    objective: 'Implement CIS benchmarks, disable unnecessary kernel modules, configure sysctl parameters, and audit umask.',
    category: 'core',
    resources: [{ title: 'Linux Journey: System Hardening & Security', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },

  // ── Web Application Security & Vulnerability Assessment (Weeks 19 - 30) ────
  {
    title: 'The OWASP Top 10 Web Vulnerabilities Overview',
    objective: 'Examine root causes, CVSS severity metrics, and architectural remediations for modern web application attacks.',
    category: 'applied',
    resources: [{ title: 'OWASP Top 10 Web Application Security Risks', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'SQL Injection (SQLi): In-Band, Blind & Time-Based',
    objective: 'Exploit unsanitized database queries with UNION SELECT, boolean condition extraction, and implement parameterized queries.',
    category: 'applied',
    resources: [{ title: 'PortSwigger Web Security Academy: SQL Injection', url: 'https://portswigger.net/web-security/sql-injection', platform: 'PortSwigger' }],
  },
  {
    title: 'Cross-Site Scripting (XSS): Reflected, Stored & DOM-Based',
    objective: 'Inject malicious payloads to hijack session cookies, bypass naive filters, and implement strict Content Security Policy (CSP).',
    category: 'applied',
    resources: [{ title: 'PortSwigger Web Security Academy: Cross-Site Scripting', url: 'https://portswigger.net/web-security/cross-site-scripting', platform: 'PortSwigger' }],
  },
  {
    title: 'Cross-Site Request Forgery (CSRF) & SameSite Cookie Protection',
    objective: 'Force state-changing actions across origins and implement anti-CSRF tokens and SameSite=Strict cookies.',
    category: 'applied',
    resources: [{ title: 'PortSwigger Web Security Academy: CSRF Attacks', url: 'https://portswigger.net/web-security/csrf', platform: 'PortSwigger' }],
  },
  {
    title: 'Server-Side Request Forgery (SSRF) & Cloud Metadata Exploitation',
    objective: 'Induce backend servers to query internal loopback addresses and cloud instance metadata endpoints (169.254.169.254).',
    category: 'applied',
    resources: [{ title: 'PortSwigger Web Security Academy: SSRF', url: 'https://portswigger.net/web-security/ssrf', platform: 'PortSwigger' }],
  },
  {
    title: 'Insecure Direct Object References (IDOR) & Broken Access Controls',
    objective: 'Bypass authorization checks by altering user ID parameters, and enforce server-side ownership validations.',
    category: 'applied',
    resources: [{ title: 'PortSwigger Web Security Academy: Access Control', url: 'https://portswigger.net/web-security/access-control', platform: 'PortSwigger' }],
  },
  {
    title: 'Network Scanning & Port Enumeration with Nmap',
    objective: 'Execute SYN stealth scans (-sS), service versioning (-sV), default NSE scripts (-sC), and evade firewalls.',
    category: 'applied',
    resources: [{ title: 'OverTheWire Bandit: Network Services (Level 13-18)', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Web Application Proxying with Burp Suite Community',
    objective: 'Intercept HTTP requests, manipulate headers in Repeater, decode payloads in Decoder, and map target site trees.',
    category: 'applied',
    resources: [{ title: 'PortSwigger Burp Suite Getting Started', url: 'https://portswigger.net/burp/documentation/desktop/getting-started', platform: 'PortSwigger' }],
  },
  {
    title: 'Automated Vulnerability Scanning & Risk Scoring',
    objective: 'Run automated vulnerability scans, assess CVSS v3.1 vector strings, and eliminate false positive findings.',
    category: 'applied',
    resources: [{ title: 'OWASP Vulnerability Assessment Guide', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Authentication Bypasses & Password Cracking with Hashcat',
    objective: 'Crack salted hashes using dictionary attacks, rule-based mutations, and analyze password policy resilience.',
    category: 'applied',
    resources: [{ title: 'OverTheWire Bandit: Hash Decryption (Level 19-24)', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Privilege Escalation on Linux: Sudo, Cron & Kernel Exploits',
    objective: 'Enumerate sudo -l privileges, writable cron jobs, unquoted path binaries, and dirty COW kernel exploits.',
    category: 'applied',
    resources: [{ title: 'Linux Journey: Advanced Process Permissions', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Privilege Escalation on Windows: Token Impersonation & Unquoted Services',
    objective: 'Audit AlwaysInstallElevated registry keys, unquoted service binary paths, and SeImpersonatePrivilege potato exploits.',
    category: 'applied',
    resources: [{ title: 'Microsoft Learn Security Architecture', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-security-compliance-identity-fundamentals/', platform: 'Microsoft Learn' }],
  },

  // ── Defensive Security, SOC & Incident Response (Weeks 31 - 44) ─────────────
  {
    title: 'Firewall Architecture: Iptables, UFW & Stateful Packet Inspection',
    objective: 'Configure stateful firewall rules with iptables/nftables, manage default DROP policies, and log dropped packets.',
    category: 'advanced',
    resources: [{ title: 'Linux Journey: Firewalls & Network Defense', url: 'https://linuxjourney.com/', platform: 'Linux Journey' }],
  },
  {
    title: 'Intrusion Detection & Prevention Systems (Snort & Suricata)',
    objective: 'Write Snort rule signatures, detect port scans, alert on malformed TCP flags, and evaluate false alarm rates.',
    category: 'advanced',
    resources: [{ title: 'PortSwigger Web Security: Network Defenses', url: 'https://portswigger.net/web-security', platform: 'PortSwigger' }],
  },
  {
    title: 'Security Information and Event Management (SIEM) Architecture',
    objective: 'Centralize audit logs via rsyslog, configure indexing with Wazuh/Elasticsearch, and parse unstructured logs.',
    category: 'advanced',
    resources: [{ title: 'OWASP Security Logging & Auditing Guide', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Log Analysis & Threat Detection with Splunk / Elastic',
    objective: 'Write SIEM query searches, correlate multi-source authentication events, and detect brute-force attempts.',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Threat Management & SIEM', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'MITRE ATT&CK Framework: Tactics, Techniques & Procedures (TTPs)',
    objective: 'Map observed adversarial activity across Initial Access, Execution, Persistence, and Lateral Movement stages.',
    category: 'advanced',
    resources: [{ title: 'PortSwigger Web Security: Advanced Vulnerability Concepts', url: 'https://portswigger.net/web-security', platform: 'PortSwigger' }],
  },
  {
    title: 'Digital Forensics: Evidence Acquisition & Chain of Custody',
    objective: 'Perform bit-stream disk imaging with dd, verify SHA-256 image hashes, and preserve forensic admissibility.',
    category: 'advanced',
    resources: [{ title: 'Linux Journey: Disk Management & Filesystems', url: 'https://linuxjourney.com/lesson/disk-partitioning', platform: 'Linux Journey' }],
  },
  {
    title: 'Memory Forensics & Volatility Analysis',
    objective: 'Analyze RAM memory dumps using Volatility, identify injected DLLs, hollowed processes, and rootkits.',
    category: 'advanced',
    resources: [{ title: 'OverTheWire Bandit: Advanced Linux Forensics', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Malware Analysis Foundations: Static & Dynamic Triage',
    objective: 'Extract strings, calculate import hashes (imphash), analyze PE headers, and inspect behavior in isolated sandboxes.',
    category: 'advanced',
    resources: [{ title: 'OWASP Reverse Engineering & Binaries Guide', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Incident Response Lifecycle: NIST SP 800-61 Rev. 2',
    objective: 'Execute Preparation, Detection & Analysis, Containment, Eradication, Recovery, and Post-Incident Lessons Learned.',
    category: 'advanced',
    resources: [{ title: 'OWASP Incident Response Guide', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Cloud Security: AWS/Azure Shared Responsibility Model',
    objective: 'Secure cloud storage buckets (S3 public exposure), configure CloudTrail audit logging, and audit IAM roles.',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Azure Security Fundamentals', url: 'https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Container & Kubernetes Security Hardening',
    objective: 'Eliminate root containers, audit capability drops, scan container images with Trivy, and set NetworkPolicies.',
    category: 'advanced',
    resources: [{ title: 'Docker Official Security Best Practices', url: 'https://docs.docker.com/get-started/', platform: 'Docker Docs' }],
  },
  {
    title: 'Zero Trust Architecture & Micro-Segmentation',
    objective: 'Implement continuous authentication, explicit verification, assumed breach mindset, and micro-perimeter firewalls.',
    category: 'advanced',
    resources: [{ title: 'Microsoft Learn Zero Trust Security Model', url: 'https://learn.microsoft.com/en-us/training/', platform: 'Microsoft Learn' }],
  },
  {
    title: 'Threat Hunting & Adversary Emulation',
    objective: 'Proactively search for undetected threats in network endpoints and telemetry without relying on known IOC alerts.',
    category: 'advanced',
    resources: [{ title: 'OverTheWire Bandit: System Compromise Challenges', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Security Compliance & Risk Management (ISO 27001, SOC 2)',
    objective: 'Interpret regulatory standards (GDPR, HIPAA, PCI-DSS), create risk matrices, and audit security control effectiveness.',
    category: 'advanced',
    resources: [{ title: 'OWASP Risk Rating Methodology Guide', url: 'https://owasp.org/', platform: 'OWASP' }],
  },

  // ── Capstone Penetration Test & Blue Team Defense (Weeks 45 - 52) ───────────
  {
    title: 'Capstone Phase 1: Threat Modeling & Scope Definition',
    objective: 'Define penetration testing rules of engagement, threat model application data flows (STRIDE), and plan vectors.',
    category: 'capstone',
    resources: [{ title: 'OWASP Threat Modeling Project Guide', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Capstone Phase 2: Reconnaissance & Attack Surface Mapping',
    objective: 'Perform OSINT investigations, enumerate subdomains, scan open ports, and fingerprint network service versions.',
    category: 'capstone',
    resources: [{ title: 'OverTheWire Bandit: Reconnaissance Practice', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Capstone Phase 3: Exploitation & Proof-of-Concept Execution',
    objective: 'Execute controlled, non-destructive exploits for discovered vulnerabilities (SQLi, IDOR, SSRF) with documentation.',
    category: 'capstone',
    resources: [{ title: 'PortSwigger Web Security Academy: Real-World Scenarios', url: 'https://portswigger.net/web-security', platform: 'PortSwigger' }],
  },
  {
    title: 'Capstone Phase 4: Lateral Movement & Privilege Escalation',
    objective: 'Document pivot routes, enumerate internal credentials, and demonstrate high-privilege administrative access.',
    category: 'capstone',
    resources: [{ title: 'OverTheWire Bandit: Advanced Privilege Exploits', url: 'https://overthewire.org/wargames/bandit/', platform: 'OverTheWire' }],
  },
  {
    title: 'Capstone Phase 5: Blue Team Detection & SIEM Rule Creation',
    objective: 'Author SIEM detection queries and IDS alert rules that successfully flag the capstone exploit activity.',
    category: 'capstone',
    resources: [{ title: 'OWASP Defensive SIEM Strategy', url: 'https://owasp.org/www-project-top-ten/', platform: 'OWASP' }],
  },
  {
    title: 'Capstone Phase 6: Remediation & Patch Hardening Verification',
    objective: 'Implement code-level remediations, configure firewall rules, re-test vulnerabilities to verify remediation.',
    category: 'capstone',
    resources: [{ title: 'OWASP Proactive Controls for Developers', url: 'https://owasp.org/', platform: 'OWASP' }],
  },
  {
    title: 'Comprehensive Penetration Testing & Audit Report',
    objective: 'Author an executive summary, technical vulnerability findings with CVSS scores, remediation runbooks, and timeline.',
    category: 'capstone',
    resources: [{ title: 'GitHub Technical Security Report Guide', url: 'https://github.com/', platform: 'GitHub' }],
  },
  {
    title: 'Security Portfolio Showcase, Defense & Interview Prep',
    objective: 'Package security portfolio, review common SOC / penetration testing technical questions, and present findings.',
    category: 'capstone',
    resources: [{ title: 'Harvard CS50 Final Technical Presentation Showcase', url: 'https://cs50.harvard.edu/x/', platform: 'Harvard University' }],
  },
];
