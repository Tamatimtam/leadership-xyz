---
trigger: always_on
---

When making CSS HTML or JS. please account for DX. the main rule is never allow a file to become bloated.

Keep the codebase modular and maintainable. Never create bloated or monolithic files.

Rules:
- Max 500 lines per HTML, CSS, or JS file.
- If a file approaches 500 lines, refactor it before adding more.
- Split large files into logical components/modules/folder with clear responsibilities.
- Avoid duplicated code, giant functions, and deeply nested logic.
- Prefer small, reusable components and utilities.
- Keep HTML, CSS, and JS separated by responsibility.
- NEVER use eyebrow labels, kickers, overlines, leading-dash uppercase labels (`── LABEL`), dot-status pills (`• WIP`, `◉ TAG`), or floating pill badges overlaid on images/posters. Let headings speak on their own and render necessary metadata as quiet, unboxed sentence-case text below the heading.
- Prioritize radical simplicity and uncluttered UI: one focal point per card/modal/section. Never over-design simple dialogs or WIP notices with multi-row lists, badges, or extra chrome.
