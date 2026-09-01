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
  mono: 'JetBrains Mono'
---

# Sorting the Spider‑Verse

### Ranking every Spider‑Man film by box-office revenue, four algorithms at a time

<div class="pt-8">
<span class="tag">Bubble Sort</span><span class="tag">Insertion Sort</span><span class="tag">Heap Sort</span><span class="tag">Quick Sort</span>
</div>

<!--
Title slide. Presenter note: the whole deck sorts the same 11-film dataset every time,
so the audience can compare how each algorithm gets to the same answer.
-->

---
layout: default
---

# A brief history of sorting

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
<div class="panel">

Sorting is older than electronic computing itself. **Herman Hollerith** built mechanical
card-sorting machines for the 1890 U.S. Census; **John von Neumann** described merge sort
for a stored-program computer in 1945; and **John Mauchly**'s 1946 lectures gave one of the
first published treatments of sorting on a computer. By the time **Donald Knuth** devoted an
entire volume of *The Art of Computer Programming* (1973) to "Sorting and Searching," most of
the algorithms taught today — including the four in this deck — had already been invented,
between roughly 1954 and 1964.

</div>
<div class="panel">

**Why it still matters**

Sorting is one of the most frequently executed operations in all of computing — it underlies
database indexes and `ORDER BY` queries, search-engine ranking, GPS routing, and computer
graphics, and it's the standard example used to teach algorithmic complexity in the first
place. Every mainstream language ships a highly-tuned sort in its standard library (Python and
Java's Timsort, C++'s Introsort) — modern hybrids built directly on the classic ideas this deck
walks through.

</div>
</div>

---
layout: default
---

# Compiling the data

<div class="grid grid-cols-2 gap-6 mt-2 text-xs">
<div class="panel">

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
<div class="panel">

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

# Four ways to sort a list

<div class="grid grid-cols-2 gap-4 mt-4 text-sm">
<div class="panel">
<h3>Bubble Sort</h3>
Repeatedly compare neighbors and swap the ones out of order, letting the largest values
"bubble" to the end one pass at a time.
<div class="mt-2 opacity-60">O(n²) average · O(1) space</div>
</div>
<div class="panel">
<h3>Insertion Sort</h3>
Grow a sorted prefix one film at a time, sliding each new value backward until it lands in
the right spot — like sorting a hand of cards.
<div class="mt-2 opacity-60">O(n²) average · O(1) space</div>
</div>
<div class="panel">
<h3>Heap Sort</h3>
Build a max-heap so the biggest earner is always at the root, then repeatedly move the root
to the end and re-heapify what's left.
<div class="mt-2 opacity-60">O(n log n) average · O(1) space</div>
</div>
<div class="panel">
<h3>Quick Sort</h3>
Partition the list around a pivot so smaller values fall left and larger values fall right,
then recursively sort each side.
<div class="mt-2 opacity-60">O(n log n) average · O(log n) space</div>
</div>
</div>

<div class="mt-4 text-xs opacity-60">
Next: watch all four race side by side on the exact same shuffled dataset.
</div>

---
layout: default
---

# All four, head to head

<div class="content-body">
<MultiSortGrid />
</div>

---
layout: default
---

# Bubble Sort

<div class="content-body">
<AlgoPanel algo-id="bubble" />
</div>

---
layout: default
---

# Insertion Sort

<div class="content-body">
<AlgoPanel algo-id="insertion" />
</div>

---
layout: default
---

# Heap Sort

<div class="content-body">
<AlgoPanel algo-id="heap" />
</div>

---
layout: default
---

# Quick Sort

<div class="content-body">
<AlgoPanel algo-id="quick" />
</div>
