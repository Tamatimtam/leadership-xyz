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
