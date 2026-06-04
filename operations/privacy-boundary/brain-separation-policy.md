# Brain Separation Policy

## Architecture

Singulary Institute operates through two separated layers:

1. Private Operating Brain
2. Public Institute Repository

GitHub is the public delivery layer. It is not the institutional source of truth.

The local private operating brain is the institutional source of truth. It contains strategy, internal governance, assessments, evidence notes, opportunity review, implementation planning, and unpublished research logic.

## Private Layer: Singulary Brain

Recommended local-only structure:

```text
_private/
  research-os/
  governance-os/
  evidence-os/
  grant-engine/
  decision-engine/
  implementation-packages/
  strategic-assessments/
  opportunity-assessments/
  private-prompts/
  internal-audits/
  source-notes/
  unpublished-research/
```

This folder is local only.

It must never be committed, exported, or published.

## Public Layer: Singulary Institute

The public repository contains only:

- website files
- public research areas
- public programme summaries
- public project descriptions
- public publications
- public archive entries
- public methodology summaries
- public governance overview
- public-safe privacy-boundary policies

The public repository must not contain:

- operating logic
- internal governance logic
- internal prompts
- strategic assessments
- opportunity scoring
- grant strategy
- private decision records
- internal research notes
- private evidence notes
- implementation packages
- internal audits

## Source Of Truth

The Private Operating Brain is the institutional source of truth.

The GitHub repository is the Public Delivery Layer.

## Export Rule

Only approved public export packages may move from the private brain into the public repository.

