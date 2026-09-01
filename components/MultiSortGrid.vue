<script setup lang="ts">
import { ref, computed } from 'vue'
import { spidermanMovies } from '../data/spiderman-movies'
import { algorithms, shuffled } from '../lib/sorting/algorithms'
import { useSorter } from '../lib/sorting/useSorter'
import SortBars from './SortBars.vue'
import SortControls from './SortControls.vue'
import StatsBadge from './StatsBadge.vue'

const maxValue = Math.max(...spidermanMovies.map((m) => m.worldwideGross))
const speed = ref(140)

const sorters = algorithms.map((algo) => ({ algo, sorter: useSorter(algo, spidermanMovies, speed) }))

const sharedOrder = shuffled(spidermanMovies)
sorters.forEach(({ sorter }) => sorter.setBaseOrder(sharedOrder))

const anyRunning = computed(() => sorters.some(({ sorter }) => sorter.isRunning.value))
const allDone = computed(() => sorters.every(({ sorter }) => sorter.isDone.value))

function playAll() {
  sorters.forEach(({ sorter }) => {
    if (!sorter.isDone.value) sorter.play()
  })
}
function pauseAll() {
  sorters.forEach(({ sorter }) => sorter.pause())
}
function resetAll() {
  sorters.forEach(({ sorter }) => sorter.reset())
}
function randomizeAll() {
  const order = shuffled(spidermanMovies)
  sorters.forEach(({ sorter }) => sorter.setBaseOrder(order))
}
</script>

<template>
  <div class="multi-grid-wrap">
    <SortControls :is-running="anyRunning" :is-done="allDone" @play="playAll" @pause="pauseAll" @reset="resetAll" @randomize="randomizeAll" />
    <div class="grid">
      <div v-for="{ algo, sorter } in sorters" :key="algo.id" class="cell" :class="{ done: sorter.isDone.value }">
        <div class="cell-head">
          <span class="cell-title">{{ algo.name }}</span>
          <StatsBadge :comparisons="sorter.comparisons.value" :swaps="sorter.swaps.value" />
        </div>
        <div class="cell-viz">
          <SortBars
            :items="sorter.array"
            :highlight-indices="sorter.highlightIndices.value"
            :highlight-kind="sorter.highlightKind.value"
            :sorted-indices="sorter.sortedIndices.value"
            :max-value="maxValue"
            orientation="vertical"
            compact
          />
        </div>
        <div v-if="sorter.isDone.value" class="finished-badge">✅ sorted</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multi-grid-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0;
}
.cell {
  border: 2px solid var(--ink, #1b1b1f);
  box-shadow: 3px 3px 0 var(--ink, #1b1b1f);
  border-radius: 8px;
  background: #ffffff8c;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
  position: relative;
  transition: border-color 0.2s ease, background 0.2s ease;
}
.cell.done {
  border-color: var(--web-green, #2f8f5b);
  background: #f1fdf3;
}
.cell-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  min-width: 0;
}
.cell-title {
  font-family: var(--font-display, 'Bangers', sans-serif);
  letter-spacing: 0.02em;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--spider-red, #d6273c);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cell-viz {
  flex: 1;
  min-height: 0;
  min-width: 0;
}
.finished-badge {
  position: absolute;
  top: 6px;
  right: 10px;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.65rem;
  color: var(--web-green, #2f8f5b);
  font-weight: 700;
}
</style>
