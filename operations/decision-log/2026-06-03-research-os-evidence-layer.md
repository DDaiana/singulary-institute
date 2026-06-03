# Decision Log: Research OS, Execution OS, and Evidence Layer

Date: 2026-06-03

## Decision

Implement the Research OS, Execution OS, and Evidence Layer to complete the institutional operating model.

## Rationale

The governance and lifecycle layers define decision control and maturity. The repository also needs a formal separation between strategic research responsibilities and Codex execution responsibilities, plus explicit evidence safeguards.

## Operating Model

You -> ChatGPT Research OS -> Codex Execution OS -> Singulary Institute.

## Evidence Safeguard

Evidence identification is distinct from evidence generation.

ChatGPT assists in identifying, organizing, reviewing, extracting, and synthesizing evidence from traceable sources provided through research workflows.

ChatGPT does not generate evidence, fabricate observations, fabricate source material, fabricate findings, fabricate datasets, or create unsupported factual claims.

## Affected Layers

- operations/operating-system
- operations/evidence
- operations/governance-index
- operations/programme-registry
- operations/project-registry
- operations/publication-registry
- content/content-registry.json

## Next Required Action

Future repository changes must enter through Research OS assessment and produce an implementation package before Codex execution.

