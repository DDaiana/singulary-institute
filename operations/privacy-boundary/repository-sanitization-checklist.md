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
- no `_private/` folder tracked
- no implementation packages exposed
- no strategic assessments exposed
- no internal prompts exposed
- no unpublished evidence notes exposed
- no internal audits exposed
- no opportunity assessments exposed
- no grant strategy exposed

## Search Terms

Check for sensitive words or local-only markers before pushing:

- `_private`
- `private`
- `internal`
- `sensitive`
- `budget`
- `rejected`
- `do-not-publish`
- `implementation package`
- `strategic assessment`
- `opportunity assessment`
- `private prompt`

The presence of a term does not automatically mean a leak, but it must be reviewed before push.
