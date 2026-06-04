# Public / Private Classification System

## Classification Levels

### PRIVATE

Private assets are institutional source-of-truth materials that must remain local-only.

Examples:

- Strategic Assessment
- Implementation Package
- Opportunity Assessment
- Grant Strategy
- private prompts
- source notes
- unpublished research notes

Action: `MOVE_PRIVATE`.

### INTERNAL

Internal assets may describe process, audit, or review material. They may become public only after summarization and clearance.

Examples:

- Internal Audit
- Evidence Synthesis
- Publication Draft
- internal decision records

Action: `SUMMARIZE_PUBLIC` or `MOVE_PRIVATE`.

### PUBLIC

Public assets are safe for GitHub and the website.

Examples:

- Programme Registry Summary
- Project Summary
- Publication
- Website Content
- Public Governance Overview
- Public Methodology Summary

Action: `KEEP_PUBLIC`.

## Default Classification Rules

Strategic Assessment -> PRIVATE

Implementation Package -> PRIVATE

Opportunity Assessment -> PRIVATE

Grant Strategy -> PRIVATE

Internal Audit -> INTERNAL

Programme Registry Summary -> PUBLIC

Project Summary -> PUBLIC

Publication -> PUBLIC

Website Content -> PUBLIC

