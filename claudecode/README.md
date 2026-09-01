# Sorting the Spider-Verse (frozen "initial" snapshot)

A [Slidev](https://sli.dev) presentation that teaches Bubble Sort, Insertion Sort, Heap Sort,
and Quick Sort by racing them against each other on real Spider-Man box-office data.

This directory is a frozen snapshot of the deck as it stood at the `initial` git tag, kept
side by side with the restyled version at the repository root. It is not actively maintained.

Live site: https://ocj-dev.github.io/sortingthespiderverse/claudecode/

## What's inside

- `data/spiderman-movies.ts` — worldwide box-office gross for every film where Spider-Man is
  the lead protagonist (see the deck's "Compiling the data" slide for sourcing/inclusion rules).
- `lib/sorting/` — each algorithm is a JS generator that yields one step (`compare`, `swap`,
  `overwrite`, `markSorted`, `done`) at a time, tagged with the pseudocode line it corresponds to.
  A shared `useSorter` composable drives the generator on a timer and exposes reactive state for
  the UI, so the bar-chart highlight and the pseudocode highlight always come from the same event.
- `components/` — `SortBars`, `SortControls`, `PseudocodeView`, `StatsBadge`, `AlgoPanel` (single
  algorithm + pseudocode), and `MultiSortGrid` (all four running simultaneously in a 2×2 grid).
- `public/big-house-swing.svg` — original stylized illustration for the closing slide.

## Local development

```bash
npm install
npm run dev      # http://localhost:3030
npm run build    # static site in dist/, base path set for GitHub Pages
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the deck and publishes
it via GitHub Pages (Actions-based deployment).
