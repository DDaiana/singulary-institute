# Singulary Institute

Singulary Institute is a repository-backed research institution. The public website is only the interface; the repository holds the research infrastructure, content model, publication pipeline, contributor system, governance, and deployable website.

## Architecture

```text
Singulary Institute
├── Research Infrastructure
├── Content System
├── Publication System
├── Contributor System
├── Governance System
└── Public Website
```

## Repository Structure

- `apps/website`: Vite and React public website.
- `research-infrastructure`: identity, governance, intelligence pipeline, theory, operations, publication, and programmes.
- `content`: programmes, publications, research areas, methodology, archive policy, and `content-registry.json`.
- `operations`: AI governance, operating system definitions, lifecycle management, evidence layer, institutional roles, workflows, registries, templates, prompts, audits, decision logs, and implementation packages governing repository changes before Codex execution.
- `docs`: architecture notes and templates.
- `.github/workflows`: GitHub Pages deployment.

## Operations & AI Governance

Before future repository modifications, work should pass through the operations layer:

Research Director -> Programme Architect -> Grant Strategist -> Editorial Director -> Institutional Auditor -> Codex Implementation Package -> Codex Execution -> Repository Update -> Post-Implementation Audit.

Codex is the execution layer. The governance layer is the decision layer.

The completed operating model is:

You -> ChatGPT Research OS -> Codex Execution OS -> Singulary Institute.

The evidence layer distinguishes evidence identification from evidence generation. AI systems may assist interpretation, synthesis, organization, classification, and framework development, but they do not constitute evidence.

The Research Mode Engine classifies each project as either Interpretation of Existing Evidence or Generation of New Evidence before evidence, publication, and trust pathways are selected.

## Content System

The website imports `content/content-registry.json`. Adding a publication to the registry with a programme and research area automatically surfaces it in Publications, Archive, related Programme views, and related Research Area counts.

## Publication Pipeline

Draft -> Review -> Approved -> Website -> LinkedIn -> Archive

## Local Development

```bash
npm install
npm run build
npm run dev
```

The Vite base path is configured for GitHub Pages at `/singulary-institute/`.
