# Sorting the Spider-Verse

A [Slidev](https://sli.dev) presentation that teaches Bubble Sort, Insertion Sort, Heap Sort,
and Quick Sort by racing them against each other on real Spider-Man box-office data.

Live site: https://ocj-dev.github.io/sortingthespiderverse/

This repository hosts four versions of the deck, deployed together:

- **/** — the current, actively-maintained deck (this directory), built with Claude Code.
- **/claudecode/** — a frozen snapshot of the deck as it stood at the `initial` git tag.
- **/claude/** — a separately-produced version of the deck built with Claude.ai, kept for comparison.
- **/partyrock/** — a separately-produced version built with AWS PartyRock (a single self-contained
  `index.html`, no build step), also kept for comparison.

## What's inside (root deck)

- `data/spiderman-movies.ts` — worldwide box-office gross for every film where Spider-Man is
  the lead protagonist (see the deck's "Compiling the data" slide for sourcing/inclusion rules).
- `lib/sorting/` — each algorithm is a JS generator that yields one step (`compare`, `swap`,
  `overwrite`, `markSorted`, `done`) at a time, tagged with the pseudocode line it corresponds to.
  `useSorter.ts` runs each generator once to precompute a full trace (array snapshot + running
  stats after every step), so Play/Pause/Step Forward/Step Back/Reset/Randomize are all just
  index navigation over that trace — the bar-chart highlight and the pseudocode highlight always
  come from the same recorded step, and stepping backward is exact rather than reconstructed.
- `components/` — `SortBars`, `SortControls` (Start/Pause/Step Forward/Step Back/Reset/Randomize),
  `PseudocodeView`, `StatsBadge`, `AlgoPanel` (single algorithm + pseudocode + history note), and
  `MultiSortGrid` (all four running simultaneously in a 2×2 grid).
- `style.css` — the comic-panel design system (paper background, Bangers display font, ink/red/
  blue/amber/green palette).

## Local development

```bash
npm install
npm run dev      # http://localhost:3030
npm run build    # static site in dist/, base path set for GitHub Pages
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the root deck and the
`claudecode/` sub-deck, copies the static `claude/` and `partyrock/` builds alongside them, and
publishes the merged output via GitHub Pages (Actions-based deployment).
