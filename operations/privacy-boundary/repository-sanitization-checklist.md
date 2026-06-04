# Repository Sanitization Checklist

Use before every push.

Check:

- `operations/`
- `content/`
- `research-infrastructure/`
- `docs/`
- `archive/`
- website files

Ensure:

- public-safe only
- no private notes
- no sensitive funding details
- no internal reasoning leaks
- no private source material
- no rejected grant details unless intentionally approved for publication
- no private operating brain files
- no private prompts if considered sensitive

## Search Terms

Check for sensitive words or local-only markers before pushing:

- `_private`
- `private`
- `internal`
- `sensitive`
- `budget`
- `rejected`
- `do-not-publish`

The presence of a term does not automatically mean a leak, but it must be reviewed before push.

