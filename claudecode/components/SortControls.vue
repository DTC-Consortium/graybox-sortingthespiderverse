<script setup lang="ts">
defineProps<{
  isRunning: boolean
  isDone?: boolean
}>()

const emit = defineEmits<{
  play: []
  pause: []
  reset: []
  randomize: []
}>()
</script>

<template>
  <div class="sort-controls">
    <button v-if="!isRunning" class="btn primary" :disabled="isDone" @click="emit('play')">
      ▶ Start
    </button>
    <button v-else class="btn primary" @click="emit('pause')">⏸ Pause</button>
    <button class="btn" @click="emit('reset')">⟲ Reset</button>
    <button class="btn" @click="emit('randomize')">🔀 Randomize</button>
    <slot />
  </div>
</template>

<style scoped>
.sort-controls {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}
.btn {
  font-family: inherit;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 999px;
  border: 2px solid #1e3a8a;
  background: white;
  color: #1e3a8a;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.15s ease;
}
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(30, 58, 138, 0.25);
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.btn.primary {
  background: #e03131;
  border-color: #e03131;
  color: white;
}
.btn.primary:hover:not(:disabled) {
  box-shadow: 0 3px 10px rgba(224, 49, 49, 0.4);
}
</style>
