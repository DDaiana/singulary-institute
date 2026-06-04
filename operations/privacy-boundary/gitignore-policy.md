# Gitignore Policy

The repository `.gitignore` must exclude local-only private operating brain files and folders.

Required local-only patterns:

- `_private/`
- `private/`
- `.local-brain/`
- `.local-research/`
- `internal-notes/`
- `sensitive/`
- `*.private.md`
- `*.internal.md`
- `*.draft-private.md`
- `.env`
- `.env.local`

## Enforcement

Before each push, run repository sanitization checks for private folders, private note patterns, sensitive funding details, and non-public source material.

