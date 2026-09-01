---
theme: default
title: Sorting the Spider-Verse
base: /sortingthespiderverse/
info: |
  ## Sorting the Spider-Verse
  Sorting algorithms visualized through Spider-Man box-office data.
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  enabled: false
transition: slide-left
mdc: true
fonts:
  sans: 'Inter'
  mono: 'Fira Code'
---

<div class="text-7xl">🕷️</div>

# Sorting the Spider‑Verse

### Four sorting algorithms, racing to rank every Spider‑Man movie by box office

<div class="pt-10 opacity-60 text-sm">
Bubble Sort · Insertion Sort · Heap Sort · Quick Sort
</div>

<!--
Title slide. Presenter note: the whole deck sorts the same 11-film dataset every time,
so the audience can compare how each algorithm gets to the same answer.
-->

---
layout: default
---

# Compiling the data

<div class="grid grid-cols-2 gap-8 mt-4 text-sm">
<div>

**Inclusion rule**

A film only made the list if **Spider‑Man is the title character and the lead protagonist** —
not a supporting or ensemble role.

- ✅ The Raimi, Garfield, and Holland solo trilogies
- ✅ The animated *Spider‑Verse* films (Miles Morales)
- ❌ *Captain America: Civil War*, the *Avengers* films — Spider‑Man appears, but isn't the protagonist
- ❌ *Venom* — Eddie Brock's story, not Spider-Man's

**Sources**

Worldwide theatrical box‑office gross, compiled from Box Office Mojo, The Numbers,
Variety, and The Hollywood Reporter. Snapshot date: **2026‑08‑31**.
*Spider‑Man: Brand New Day* (2026) is still in release, so its total is a moving target.

</div>
<div>

| Film | Year | Worldwide gross |
|---|---|---|
| Spider-Man | 2002 | $823.9M |
| Spider-Man 2 | 2004 | $797.0M |
| Spider-Man 3 | 2007 | $896.3M |
| The Amazing Spider-Man | 2012 | $757.9M |
| The Amazing Spider-Man 2 | 2014 | $716.9M |
| Homecoming | 2017 | $880.2M |
| Into the Spider-Verse | 2018 | $373.8M |
| Far From Home | 2019 | $1.13B |
| No Way Home | 2021 | $1.92B |
| Across the Spider-Verse | 2023 | $690.8M |
| Brand New Day | 2026 | $2.33B |

</div>
</div>

---
layout: default
---

# The sorting algorithms

Every slide from here on sorts the same 11 films **by worldwide gross, ascending** — the only thing that changes is *how*.

<div class="grid grid-cols-2 gap-4 mt-6 text-sm">
<div class="p-4 rounded-lg bg-blue-50">
<b class="text-blue-800">Bubble Sort</b> — O(n²)<br/>
repeatedly swaps neighboring pairs that are out of order.
</div>
<div class="p-4 rounded-lg bg-blue-50">
<b class="text-blue-800">Insertion Sort</b> — O(n²)<br/>
grows a sorted prefix, inserting one film at a time.
</div>
<div class="p-4 rounded-lg bg-red-50">
<b class="text-red-700">Heap Sort</b> — O(n log n)<br/>
builds a max-heap, then repeatedly extracts the max.
</div>
<div class="p-4 rounded-lg bg-red-50">
<b class="text-red-700">Quick Sort</b> — O(n log n)<br/>
partitions around a pivot, then recurses on each side.
</div>
</div>

<div class="mt-6 text-xs opacity-60">
Two classic O(n²) comparison sorts, paired with two O(n log n) sorts — so the next slide's race
should have a predictable winner. Or will it?
</div>

---
layout: default
---

# All four algorithms, live

<div class="h-full pb-4">
<MultiSortGrid />
</div>

---
layout: default
---

# Bubble Sort

<div class="h-full pb-2">
<AlgoPanel algo-id="bubble" />
</div>

---
layout: default
---

# Insertion Sort

<div class="h-full pb-2">
<AlgoPanel algo-id="insertion" />
</div>

---
layout: default
---

# Heap Sort

<div class="h-full pb-2">
<AlgoPanel algo-id="heap" />
</div>

---
layout: default
---

# Quick Sort

<div class="h-full pb-2">
<AlgoPanel algo-id="quick" />
</div>

---
layout: cover
background: /big-house-swing.svg
class: text-center
---

<div class="pt-40">

# That's a wrap 🕸️

### Thanks for sorting through the Spider‑Verse

<div class="text-sm opacity-90 mt-4">Go Blue 💙💛</div>

</div>
