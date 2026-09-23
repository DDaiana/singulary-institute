# Singulary Institute

Singulary Institute is the public delivery layer for structured research outputs on AI, institutions, risk, and decision-making.

The website is driven by a public-safe content registry. Private planning, unpublished analysis, sensitive opportunity notes, internal prompts, and project-development material do not belong in this repository layer.

## Repository Structure

- `apps/website`: Vite and React public website.
- `content/content-registry.json`: public research areas, publication categories, and visible publication summaries.
- `content`: public support pages for research areas, methodology, archive policy, and publication indexing.
- `research-infrastructure`: public institutional positioning, governance principles, and publication standards.
- `operations`: concise public-safe operating summaries, privacy-boundary rules, public governance principles, knowledge-asset summaries, and public-output summaries.
- `docs`: public architecture notes for the content model, publication pipeline, and website mapping.
- `.github/workflows`: deployment workflow.

## Public Content Rule

The public website renders only registry items where:

- `public` is `true`
- `visibility` is `public`
- `websiteStatus` is `visible`

Working drafts, private projects, proposal-stage material, funding notes, and internal operating records are not rendered by the website.

## Publication Model

Public outputs are organised as frameworks, research briefs, explainers, and methodology notes. Each output is linked to a public research area and written in restrained public-facing language.

## Local Development

```bash
npm install
npm run build
npm run dev
```

The Vite base path is configured for GitHub Pages at `/singulary-institute/`.
