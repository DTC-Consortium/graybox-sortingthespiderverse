<script setup lang="ts">
defineProps<{
  comparisons: number
  swaps: number
  label?: string
}>()
</script>

<template>
  <div class="stats">
    <span v-if="label" class="algo-label">{{ label }}</span>
    <span class="stat"><b>{{ comparisons }}</b> compares</span>
    <span class="stat"><b>{{ swaps }}</b> swaps</span>
  </div>
</template>

<style scoped>
.stats {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 0.72rem;
  color: #475569;
}
.algo-label {
  font-weight: 700;
  color: #1e3a8a;
}
.stat b {
  color: #e03131;
}
</style>
