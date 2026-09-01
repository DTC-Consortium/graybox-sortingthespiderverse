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
const speed = ref(320)

const sorter = useSorter(algo, spidermanMovies, speed)

const status = computed<'idle' | 'running' | 'paused' | 'done'>(() => {
  if (sorter.isDone.value) return 'done'
  if (sorter.isRunning.value) return 'running'
  if (sorter.pos.value >= 0) return 'paused'
  return 'idle'
})
</script>

<template>
  <div class="stage">
    <div class="stage-left">
      <div class="summary-card panel">
        <h3>{{ algo.name }}</h3>
        <p class="idea">{{ algo.summary }}</p>
        <div class="complexity">
          <div>
            <span class="k">Best</span>
            <span class="v">{{ algo.time.best }}</span>
          </div>
          <div>
            <span class="k">Average</span>
            <span class="v">{{ algo.time.average }}</span>
          </div>
          <div>
            <span class="k">Worst</span>
            <span class="v">{{ algo.time.worst }}</span>
          </div>
          <div>
            <span class="k">Space</span>
            <span class="v">{{ algo.space }}</span>
          </div>
        </div>
      </div>

      <div class="pseudo-wrap">
        <PseudocodeView :lines="algo.lines" :active-line="sorter.activeLine.value" />
      </div>

      <div class="controls-row">
        <SortControls
          :is-running="sorter.isRunning.value"
          :is-done="sorter.isDone.value"
          :is-at-start="sorter.isAtStart.value"
          show-step-buttons
          compact
          @play="sorter.play"
          @pause="sorter.pause"
          @reset="sorter.reset"
          @randomize="sorter.randomize"
          @step-forward="sorter.stepForward"
          @step-back="sorter.stepBack"
        />
        <StatsBadge :comparisons="sorter.comparisons.value" :swaps="sorter.swaps.value" :status="status" />
      </div>

      <div class="history-note">
        <b>Origins</b>
        {{ algo.history }}
      </div>
    </div>

    <div class="stage-right panel">
      <SortBars
        :items="sorter.array"
        :highlight-indices="sorter.highlightIndices.value"
        :highlight-kind="sorter.highlightKind.value"
        :sorted-indices="sorter.sortedIndices.value"
        :max-value="maxValue"
        orientation="horizontal"
      />
    </div>
  </div>
</template>

<style scoped>
.stage {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 1em;
  height: 100%;
  min-width: 0;
}
.stage-left {
  display: flex;
  flex-direction: column;
  gap: 0.35em;
  height: 100%;
  min-width: 0;
  min-height: 0;
}
.stage-right {
  min-width: 0;
  min-height: 0;
  display: flex;
}

.summary-card {
  flex: 0 0 auto;
  padding: 0.35em 0.6em;
}
.summary-card h3 {
  margin: 0 0 0.05em;
  font-size: 1.05em;
}
.idea {
  margin: 0 0 0.3em;
  font-size: 0.62em;
  line-height: 1.25;
}
.complexity {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25em;
}
.complexity > div {
  background: #fff6;
  border: 1.5px solid #1b1b1f4d;
  border-radius: 5px;
  padding: 0.15em 0.3em;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.complexity .k {
  font-size: 0.52em;
  text-transform: uppercase;
  opacity: 0.65;
  font-weight: 700;
}
.complexity .v {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: var(--web-blue, #2b5dae);
  font-size: 0.72em;
  font-weight: 700;
}

.pseudo-wrap {
  flex: 1 1 auto;
  min-height: 0;
}

.controls-row {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.history-note {
  flex: 0 0 auto;
  font-size: 0.56em;
  line-height: 1.22;
  padding: 0.3em 0.55em;
}
.history-note b {
  font-size: 0.85em;
  margin-bottom: 0.1em;
}
</style>
