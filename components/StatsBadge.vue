<script setup lang="ts">
withDefaults(
  defineProps<{
    comparisons: number
    swaps: number
    label?: string
    status?: 'idle' | 'running' | 'paused' | 'done'
  }>(),
  { status: undefined },
)
</script>

<template>
  <div class="stats">
    <span v-if="label" class="algo-label">{{ label }}</span>
    <span class="stat">cmp <b>{{ comparisons }}</b></span>
    <span class="stat">swp <b>{{ swaps }}</b></span>
    <span v-if="status" class="status" :class="status">{{ status }}</span>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  gap: 0.8em;
  align-items: center;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.72em;
  color: var(--ink, #1b1b1f);
}
.algo-label {
  font-weight: 700;
}
.stat b {
  color: var(--spider-red, #d6273c);
}
.status {
  border: 1.5px solid var(--ink, #1b1b1f);
  text-transform: uppercase;
  border-radius: 10px;
  padding: 0.1em 0.6em;
  font-size: 0.85em;
  font-weight: 700;
}
.status.running {
  background: var(--amber, #f2b705);
}
.status.done {
  background: var(--web-green, #2f8f5b);
  color: white;
}
</style>
