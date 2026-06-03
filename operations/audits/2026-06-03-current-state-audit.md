# Current State Audit

Date: 2026-06-03

## 1. Current State Report

The repository contains a working Vite/React website, GitHub Pages deployment workflow, content registry, research infrastructure, programme folders, governance documents, publication pipeline documents, archive policy, and project/publication content.

The public website now presents the institution through Home, Publications, Research Areas, and About. Supporting routes exist for methodology, archive, governance, research infrastructure, programmes, and projects.

The content registry supports research areas, programmes, projects, and publications. Projects are now separated from publication outputs.

## 2. Missing Layers Report

Before this implementation, the repository did not contain an explicit operations layer governing work before Codex execution.

Missing layers:

- decision roles above Codex
- research request intake workflow
- programme creation workflow
- grant evaluation workflow
- publication workflow
- institutional review workflow
- Codex Implementation Package template
- post-implementation audit template
- recurring repository audit location

## 3. Duplication Report

Potential duplication risk exists between:

- `research-infrastructure/governance/` and the new operations governance layer
- `docs/templates/` and operations templates
- publication content and project content when project pages are treated as outputs

Resolution:

- `research-infrastructure/governance/` remains policy and standards.
- `operations/` governs institutional decisions before repository changes.
- `docs/templates/` remains publication and analysis support.
- `operations/templates/` governs strategic and implementation decisions.
- projects and publications remain separate content models.

## 4. Fragmentation Report

Fragmentation risk exists when new ideas enter the repository through website pages, isolated Markdown files, or grant opportunities without mapping to the core hierarchy.

Required hierarchy:

Research Area -> Programme -> Project / Research in Motion -> Publication / Output

The operations layer is required to prevent disconnected growth and to ensure future changes update registry relationships, archive placement, and public routes coherently.

## 5. Governance Recommendations

1. Require a Strategic Assessment before creating any new project, programme, publication, grant track, or website route.
2. Require Programme Architect review before any content registry relationship changes.
3. Require Grant Strategist review before grant-specific folders, outputs, or claims are added.
4. Require Editorial Director review before public publication status changes.
5. Require Institutional Auditor review after every Codex implementation.
6. Keep Codex as execution layer only.
7. Store post-implementation audits in `operations/audits/`.

## 6. Website Assessment

The website preserves the dark institutional identity and GitHub Pages hash routing. Required corrective changes include removal of excess Home section labels, better Research Areas grid alignment, route scroll reset on navigation, and clearer Publications work-in-progress language.

## 7. Research Infrastructure Assessment

Research infrastructure contains identity, governance, intelligence pipeline, theory, operations, publication, and programme folders. The prior `research-infrastructure/operations` folder describes weekly research cadence, while this new root-level `operations/` folder governs institutional decision-making above implementation.

## 8. Content System Assessment

The content registry is the key integration surface. It must remain the source of truth for relationships among research areas, programmes, projects, and publications.

## 9. Publication Pipeline Assessment

The publication pipeline exists and should remain tied to project, programme, research area, archive placement, and status. Draft outputs must be clearly labelled.

## 10. Archive Assessment

Archive content exists, but future archive entries should be generated only after Editorial Director and Institutional Auditor review.

## 11. GitHub Deployment Assessment

GitHub Pages deployment is configured through `.github/workflows/deploy.yml`, using Node 20, `npm ci`, `npm run build`, and `actions/deploy-pages`.

## 12. Institutional Coherence Assessment

The institution is coherent when repository changes follow the operating model and reinforce the hierarchy. The principal risk is bypassing the operations layer and returning to website-first implementation.

