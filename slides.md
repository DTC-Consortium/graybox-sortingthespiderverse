---
theme: default
title: Sorting the Spider-Verse
base: /graybox-sortingthespiderverse/
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

<div class="title-footer">
<div class="nav-hint">Press → to move forward through the deck</div>
<div class="credit">Chad Jenkins (ocj@umich.edu) · ocj-dev.github.io/sortingthespiderverse</div>
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

---
layout: default
---

# Try this yourself

<div class="content-body">
<div class="panel prompt-panel">

This entire deck — data research, the sorting engine, the visualizations, the styling, and the
GitHub Pages deployment — was generated by <b>Claude Code, AWS PartyRock, and Claude.ai</b> from
a single prompt. Here it is, verbatim:

<div class="prompt-text">

Hello Claude Code. Could you create a sorting visualization presentation that can be served as static HTML5/Javascript from GitHub pages? The working directory for this project must be /ai/development/sorting/sortingthespiderverse. Please create a public repository in GitHub that can serve the pages for this project through GitHub Pages. Please use the PAT in the file /ai/development/patai for the GitHub account ocj-dev. The data for this source should be complied as all movies that feature Spiderman as the main protagonist. The data will be sorted based on the total revenue generated by each film. This presentation should be created using the Slidev framework presentation framework. The presentation should first explain the process used for compiling the data and sorting algorithms used. The presentation should then show an animation all the sorting algorithms working simultaneously. This sorting visualization should show the execution of 4 sorting algorithms in a 2-by-2 grid. The sorting algorithms to use are Bubble Sort, Insertion Sort, Heap Sort, and Quick Sort. This visualization should allow the user to start, pause, reset, and randomize the sorting process. The sorting visualization slide should be then followed a set of slides that each focus on one of the sorting algorithms. For each sorting algorithm, a visualization of the sort should be shown alongside the pseudocode for the sorting algorithm. The visualization should highlight the current line of pseudocode being performed as the sorting is being executed. Swap and comparison operations should highlight the two data entries in the sorting visualization and the corresponding line in the pseudocode. The core idea of the sorting algorithm should be summarized and its asymptotic running given. The presentation should end with picture of Spiderman swinging through Michigan Stadium ("the Big House"). Thank you.

</div>
</div>
</div>

---
layout: default
class: text-center
---

<div class="content-body image-slide">
<img src="/images/big-house-spiderman.png" class="hero-image" alt="Spider-Man leaping over Michigan Stadium, the Big House" />
<div class="image-caption">Go Blue!</div>
<div class="image-credit">Image credit: Amazon PartyRock (partyrock.aws)</div>
</div>
