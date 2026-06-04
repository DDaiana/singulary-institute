# Post-Migration Audit

Date: 2026-06-04

## Migration Result

GitHub is now configured as the Public Delivery Layer.

The local Private Operating Brain is designated as the institutional source of truth.

## Public Repository Contents

The public repository now contains:

- website source and assets
- public content registry
- public research area summaries
- public programme summaries
- public project summaries
- public publication drafts/status pages
- public methodology and archive materials
- public governance overview
- public/private boundary policies
- GitHub Pages deployment workflow

## Migrated Local-Only Materials

The following operating-system materials were moved out of tracked Git into `_private/public-repo-migration/`:

- internal role definitions
- internal workflows
- internal prompts
- implementation package templates
- governance-index internals
- lifecycle internals
- evidence registry internals
- project/programme/publication control registries
- internal audits
- decision logs
- internal weekly operating cycle

## Verification

No `_private/` folder is tracked.

No private operating-brain folder is tracked.

No implementation packages remain exposed in the public repository.

No strategic assessments remain exposed in the public repository.

No internal prompts remain exposed in the public repository.

No unpublished evidence notes remain exposed in the public repository.

No internal audits remain exposed in the public repository.

## Remaining Public Governance Material

The public repository keeps only high-level governance and boundary summaries:

- `operations/README.md`
- `operations/public-governance/README.md`
- `operations/privacy-boundary/`

## Status

Migration complete.

