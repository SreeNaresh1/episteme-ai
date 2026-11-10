# Accessibility Statement — Episteme AI

> **Episteme AI** is committed to making autonomous learning path generation accessible to as wide an audience as possible.

---

## Our Commitment

We believe that access to high-quality, verified, free education should be universal. Episteme AI is designed to be usable by people with a wide range of abilities and assistive technologies.

We are actively working toward conformance with the [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/WAI/standards-guidelines/wcag/) at **Level AA**.

---

## Supported Environments

| Environment | Support Level |
|-------------|--------------|
| Modern Browsers (Chrome 110+, Firefox 110+, Edge 110+, Safari 16+) | ✅ Full |
| Screen readers (NVDA, JAWS, VoiceOver) | 🔄 Partial (improving) |
| Keyboard-only navigation | ✅ Full (tab order enforced) |
| High-contrast / forced-colors mode | ✅ Supported |
| Reduced motion preference | ✅ `prefers-reduced-motion` respected |
| Mobile browsers (iOS Safari, Android Chrome) | ✅ Responsive layout |

---

## Known Limitations

We are transparent about current accessibility gaps:

- **Complex data tables** (scorecard, audit results): Screen reader column association may be inconsistent in some older AT software. We are adding `scope` and `aria-describedby` attributes.
- **Dynamic progress updates**: Live region (`aria-live`) announcements for streaming progress are under active development.
- **SVG architecture diagram**: Currently lacks full text alternative. A plain-text equivalent is available in the `README.md` ASCII diagram.
- **Keyboard focus on modals**: The HITL approval dialog uses a focus trap; some AT combinations may not announce it correctly. We are testing and improving this.

---

## Reporting Accessibility Barriers

If you encounter an accessibility barrier while using Episteme AI, we want to know:

1. **Open an Issue** on GitHub: [https://github.com/SreeNaresh1/episteme-ai/issues](https://github.com/SreeNaresh1/episteme-ai/issues)
   - Use the title prefix: `[A11Y]`
2. **Describe the barrier** as specifically as possible:
   - What were you trying to do?
   - What assistive technology (screen reader, switch, etc.) and browser were you using?
   - What happened vs. what you expected?

We aim to acknowledge accessibility reports within **48 hours** and resolve them with high priority.

---

## Technical Approach

Episteme AI is built with accessibility in mind at the component level:

- Semantic HTML5 elements (`<main>`, `<nav>`, `<section>`, `<article>`)
- ARIA attributes for interactive components (buttons, dialogs, live regions)
- Color contrast ratios meeting WCAG 2.1 AA (minimum 4.5:1 for normal text)
- Focus-visible styles for all interactive elements
- No reliance on color alone to convey information
- Form labels associated with inputs via `htmlFor`/`id` pairs

---

## Feedback & Contact

Your feedback helps us improve. Please don't hesitate to reach out via [GitHub Discussions](https://github.com/SreeNaresh1/episteme-ai/discussions) or file an [Issue](https://github.com/SreeNaresh1/episteme-ai/issues).

---

*Last updated: November 2026*  
*Maintainer: [SreeNaresh1](https://github.com/SreeNaresh1)*

