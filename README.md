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
- `docs`: architecture notes and templates.
- `.github/workflows`: GitHub Pages deployment.

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
