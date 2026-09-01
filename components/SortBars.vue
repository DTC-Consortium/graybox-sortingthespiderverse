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
    <TransitionGroup name="bar" tag="div" class="bar-track-list">
      <div
        v-for="(item, index) in items"
        :key="item.title"
        class="bar-item"
        :class="stateFor(index)"
      >
        <div v-if="orientation === 'horizontal' && !compact" class="bar-label">{{ item.shortTitle }}</div>
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="
              orientation === 'vertical'
                ? { height: pct(item.worldwideGross) + '%' }
                : { width: pct(item.worldwideGross) + '%' }
            "
          >
            <span v-if="!compact && orientation === 'horizontal'" class="bar-value">{{ fmt(item.worldwideGross) }}</span>
          </div>
        </div>
        <div v-if="orientation === 'vertical' && !compact" class="bar-label vertical">{{ item.shortTitle }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.sort-bars {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}
.bar-track-list {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}
.sort-bars.vertical .bar-track-list {
  flex-direction: row;
  align-items: flex-end;
  gap: 6px;
}
.sort-bars.horizontal .bar-track-list {
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  overflow-y: auto;
}

.bar-item {
  display: flex;
  min-width: 0;
  transition: transform 0.35s ease;
}
.sort-bars.vertical .bar-item {
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-width: 0;
}
.sort-bars.horizontal .bar-item {
  flex-direction: row;
  align-items: center;
  gap: 0.6em;
  min-width: 0;
  flex: 0 0 auto;
}

.bar-track {
  background: #1b1b1f14;
  border: 1.5px solid #1b1b1f40;
  border-radius: 3px;
  position: relative;
  overflow: hidden;
  min-width: 0;
}
.sort-bars.vertical .bar-track {
  width: 100%;
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: flex-end;
}
.sort-bars.horizontal .bar-track {
  flex: 1 1 auto;
  min-width: 0;
  height: 1.5em;
}
.sort-bars.horizontal.compact .bar-track {
  height: 1.15em;
}

.bar-fill {
  background: var(--web-blue, #2b5dae);
  border-radius: 2px;
  transition: background-color 0.15s ease, box-shadow 0.15s ease, width 0.3s ease, height 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 6px;
}
.sort-bars.vertical .bar-fill {
  width: 100%;
}
.sort-bars.horizontal .bar-fill {
  height: 100%;
  position: absolute;
  inset: 0 auto 0 0;
}

.bar-item.compare .bar-fill {
  background: var(--amber, #f2b705) !important;
}
.bar-item.compare .bar-track {
  border-color: var(--amber, #f2b705);
  box-shadow: 0 0 0 2px #f2b70559;
}
.bar-item.swap .bar-fill {
  background: var(--spider-red, #d6273c) !important;
}
.bar-item.swap .bar-track {
  border-color: var(--spider-red, #d6273c);
  box-shadow: 0 0 0 3px #d6273c66;
}
.bar-item.sorted .bar-fill {
  background: var(--web-green, #2f8f5b) !important;
}
.bar-item.sorted .bar-track {
  border-color: var(--web-green, #2f8f5b);
}

.bar-value {
  font-size: 0.62em;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 1px #00000059;
  white-space: nowrap;
}

.bar-label {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  color: var(--ink, #1b1b1f);
  font-size: 0.7em;
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sort-bars.horizontal .bar-label {
  flex: 0 0 auto;
  width: 9em;
  text-align: right;
}
.bar-label.vertical {
  width: 100%;
  text-align: center;
  margin-top: 4px;
  font-size: 0.62em;
  line-height: 1.1;
}

.compact .bar-value,
.compact .bar-label {
  display: none;
}

.bar-move {
  transition: transform 0.35s ease;
}
</style>
