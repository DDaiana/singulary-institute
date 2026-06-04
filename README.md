# Singulary Institute

Singulary Institute is a public research interface backed by a local private operating brain.

The GitHub repository is the Public Delivery Layer. It contains public-safe website, content, methodology, governance summaries, and publication materials.

The local Private Operating Brain is the institutional source of truth. It holds internal research logic, strategic assessments, evidence notes, opportunity review, grant strategy, implementation packages, and private governance materials.

## Architecture

```text
Private Operating Brain
└── Public Export Package
    └── Public Repository
        └── Website
```

## Repository Structure

- `apps/website`: Vite and React public website.
- `research-infrastructure`: public identity, governance summaries, intelligence taxonomy, theory, publication, and programme materials.
- `content`: programmes, publications, research areas, methodology, archive policy, and `content-registry.json`.
- `operations`: public-safe governance summaries and public/private boundary policies.
- `docs`: architecture notes and templates.
- `.github/workflows`: GitHub Pages deployment.

## Public / Private Boundary

Before future public repository modifications, work should pass through the private operating brain and then be exported as a public-safe package.

Private Operating Brain -> Public Export Package -> Public Repository -> Website.

GitHub is not the source of truth.

The public repository must not contain private prompts, strategic assessments, opportunity scoring, grant strategy, private decision records, internal research notes, private evidence notes, implementation packages, or internal audits.

## Public Governance

Public governance materials explain high-level principles only. Internal operating logic remains local-only.

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
