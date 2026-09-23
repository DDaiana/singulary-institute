# Content Model Specification

The public website is driven by `content/content-registry.json`.

## Top-Level Collections

- `researchAreas`
- `publicationCategories`
- `publications`

## Public Publication Fields

Each website-visible publication should include:

- `title`
- `slug`
- `type`
- `researchArea`
- `summary`
- `public`
- `visibility`
- `websiteStatus`
- `purpose`
- `coverage`
- `currentScope`

The website renders only records where:

- `public` is `true`
- `visibility` is `public`
- `websiteStatus` is `visible`

Working drafts and non-public preparation materials are not rendered by the website.
