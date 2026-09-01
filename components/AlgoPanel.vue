<script setup lang="ts">
import { ref, computed } from 'vue'
import { spidermanMovies } from '../data/spiderman-movies'
import { algorithms } from '../lib/sorting/algorithms'
import { useSorter } from '../lib/sorting/useSorter'
import SortBars from './SortBars.vue'
import SortControls from './SortControls.vue'
import PseudocodeView from './PseudocodeView.vue'
import StatsBadge from './StatsBadge.vue'

const props = defineProps<{
  algoId: 'bubble' | 'insertion' | 'heap' | 'quick'
}>()

const algo = algorithms.find((a) => a.id === props.algoId)!
const maxValue = Math.max(...spidermanMovies.map((m) => m.worldwideGross))
const speed = ref(260)

const sorter = useSorter(algo, spidermanMovies, speed)
</script>

<template>
  <div class="algo-panel">
    <div class="left">
      <div class="viz-wrap">
        <SortBars
          :items="sorter.array"
          :highlight-indices="sorter.highlightIndices.value"
          :highlight-kind="sorter.highlightKind.value"
          :sorted-indices="sorter.sortedIndices.value"
          :max-value="maxValue"
          orientation="horizontal"
        />
      </div>
      <SortControls
        :is-running="sorter.isRunning.value"
        :is-done="sorter.isDone.value"
        @play="sorter.play"
        @pause="sorter.pause"
        @reset="sorter.reset"
        @randomize="sorter.randomize"
      />
      <StatsBadge :comparisons="sorter.comparisons.value" :swaps="sorter.swaps.value" />
    </div>
    <div class="right">
      <h3 class="algo-name">{{ algo.name }}</h3>
      <p class="summary">{{ algo.summary }}</p>
      <PseudocodeView :lines="algo.lines" :active-line="sorter.activeLine.value" />
      <div class="bigo">
        <div><span>Best</span><b>{{ algo.time.best }}</b></div>
        <div><span>Average</span><b>{{ algo.time.average }}</b></div>
        <div><span>Worst</span><b>{{ algo.time.worst }}</b></div>
        <div><span>Space</span><b>{{ algo.space }}</b></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.algo-panel {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
  height: 100%;
  align-items: start;
}
.left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.viz-wrap {
  height: 320px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 46px 12px 12px;
  background: #f8fafc;
}
.algo-name {
  margin: 0 0 4px 0;
  color: #1e3a8a;
}
.summary {
  font-size: 0.85rem;
  color: #334155;
  margin: 0 0 10px 0;
  line-height: 1.4;
}
.bigo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 12px;
}
.bigo div {
  background: #eef2ff;
  border-radius: 8px;
  padding: 6px 8px;
  text-align: center;
}
.bigo span {
  display: block;
  font-size: 0.62rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.bigo b {
  font-size: 0.95rem;
  color: #e03131;
}
</style>
