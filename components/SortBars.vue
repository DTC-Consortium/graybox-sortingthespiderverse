<script setup lang="ts">
import type { SpiderManMovie } from '../data/spiderman-movies'

const props = withDefaults(
  defineProps<{
    items: SpiderManMovie[]
    highlightIndices?: number[]
    highlightKind?: 'compare' | 'swap' | null
    sortedIndices?: Set<number>
    maxValue: number
    orientation?: 'vertical' | 'horizontal'
    compact?: boolean
  }>(),
  {
    highlightIndices: () => [],
    highlightKind: null,
    sortedIndices: () => new Set<number>(),
    orientation: 'vertical',
    compact: false,
  },
)

function pct(gross: number) {
  return Math.max(4, (gross / props.maxValue) * 100)
}

function stateFor(index: number): 'compare' | 'swap' | 'sorted' | 'default' {
  if (props.highlightIndices.includes(index) && props.highlightKind) return props.highlightKind
  if (props.sortedIndices.has(index)) return 'sorted'
  return 'default'
}

function fmt(gross: number) {
  if (gross >= 1_000_000_000) return `$${(gross / 1_000_000_000).toFixed(2)}B`
  return `$${Math.round(gross / 1_000_000)}M`
}
</script>

<template>
  <div class="sort-bars" :class="[orientation, { compact }]">
    <TransitionGroup name="bar" tag="div" class="bar-track">
      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="bar-item"
        :class="stateFor(index)"
      >
        <div
          class="bar"
          :style="
            orientation === 'vertical'
              ? { height: pct(item.worldwideGross) + '%' }
              : { width: pct(item.worldwideGross) + '%' }
          "
        >
          <span v-if="!compact" class="bar-value">{{ fmt(item.worldwideGross) }}</span>
        </div>
        <div v-if="!compact" class="bar-label">{{ item.shortTitle }} <small>'{{ String(item.year).slice(2) }}</small></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.sort-bars {
  width: 100%;
  height: 100%;
}
.bar-track {
  display: flex;
  width: 100%;
  height: 100%;
}
.sort-bars.vertical .bar-track {
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
  height: 100%;
}
.sort-bars.horizontal .bar-track {
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.bar-item {
  display: flex;
  transition: transform 0.35s ease;
}
.sort-bars.vertical .bar-item {
  flex: 1 1 0;
  flex-direction: column-reverse;
  align-items: center;
  height: 100%;
  min-width: 0;
}
.sort-bars.horizontal .bar-item {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.bar {
  border-radius: 4px;
  transition: background-color 0.15s ease, box-shadow 0.15s ease, height 0.15s ease, width 0.15s ease;
  background: linear-gradient(180deg, #3b5bdb, #1e3a8a);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}
.sort-bars.vertical .bar {
  width: 100%;
  background: linear-gradient(180deg, #3b5bdb, #1e3a8a);
}
.sort-bars.horizontal .bar {
  height: 20px;
  min-height: 16px;
  background: linear-gradient(90deg, #1e3a8a, #3b5bdb);
}

.bar-item.compare .bar {
  background: linear-gradient(180deg, #ffd43b, #f59f00) !important;
  box-shadow: 0 0 14px 2px rgba(245, 159, 0, 0.7);
}
.bar-item.swap .bar {
  background: linear-gradient(180deg, #ff6b6b, #e03131) !important;
  box-shadow: 0 0 14px 2px rgba(224, 49, 49, 0.75);
  animation: pulse 0.3s ease;
}
.bar-item.sorted .bar {
  background: linear-gradient(180deg, #51cf66, #2f9e44) !important;
}

@keyframes pulse {
  0% { transform: scale(1); }
  40% { transform: scale(1.06); }
  100% { transform: scale(1); }
}

.bar-value {
  font-size: 0.62rem;
  font-weight: 600;
  color: white;
  margin-top: 2px;
  white-space: nowrap;
}
.sort-bars.horizontal .bar-value {
  margin: 0 0 0 8px;
  position: absolute;
  left: 100%;
  color: #1e293b;
}
.bar-label {
  font-size: 0.6rem;
  text-align: center;
  line-height: 1.1;
  margin-top: 4px;
  color: var(--slidev-code-foreground, #334155);
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sort-bars.horizontal .bar-label {
  width: 150px;
  flex: 0 0 auto;
  text-align: right;
  font-size: 0.72rem;
}

.compact .bar-value,
.compact .bar-label {
  display: none;
}

.bar-move {
  transition: transform 0.35s ease;
}
</style>
