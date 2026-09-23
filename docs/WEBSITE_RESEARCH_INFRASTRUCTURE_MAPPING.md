# Website Research Infrastructure Mapping

The website is the public interface. It renders public-safe content from `content/content-registry.json`.

```text
content/content-registry.json
      ↓ rendered by
apps/website/src/main.jsx
      ↓ published as
GitHub Pages
```

## Public Routes

- Home
- Publications
- Research Areas
- About

## Core Rule

The website shows research areas and public outputs. It does not expose internal projects, proposal-stage work, or duplicate publication scaffolding.
