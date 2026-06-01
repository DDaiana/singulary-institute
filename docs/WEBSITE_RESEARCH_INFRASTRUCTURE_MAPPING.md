# Website ↔ Research Infrastructure Mapping

The website is the public interface. The research infrastructure is the source of truth.

```text
research-infrastructure/programmes
      ↓ curated into
content/programmes
      ↓ rendered in
Website / Research
```

```text
research-infrastructure/publication
      ↓ creates
content/publications
      ↓ rendered in
Website / Publications
```

```text
research-infrastructure/archive
      ↓ indexed in
content/archive
      ↓ rendered in
Website / Archive
```

## Core rule

A new research project should be added first to `research-infrastructure`, then exposed publicly through `content`.
