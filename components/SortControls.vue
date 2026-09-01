<script setup lang="ts">
withDefaults(
  defineProps<{
    isRunning: boolean
    isDone?: boolean
    showStepButtons?: boolean
    isAtStart?: boolean
    compact?: boolean
  }>(),
  { isDone: false, showStepButtons: false, isAtStart: false, compact: false },
)

const emit = defineEmits<{
  play: []
  pause: []
  reset: []
  randomize: []
  stepForward: []
  stepBack: []
}>()
</script>

<template>
  <div class="sort-controls" :class="{ compact }">
    <button v-if="showStepButtons" class="btn" :disabled="isAtStart" title="Step back" @click="emit('stepBack')">
      « {{ compact ? 'Back' : 'Step Back' }}
    </button>
    <button v-if="!isRunning" class="btn primary" :disabled="isDone" @click="emit('play')">▶ Start</button>
    <button v-else class="btn primary" @click="emit('pause')">⏸ Pause</button>
    <button v-if="showStepButtons" class="btn" :disabled="isDone" title="Step forward" @click="emit('stepForward')">
      {{ compact ? 'Fwd' : 'Step Forward' }} »
    </button>
    <button class="btn" @click="emit('reset')">⟲ Reset</button>
    <button class="btn" @click="emit('randomize')">🔀 {{ compact ? 'Random' : 'Randomize' }}</button>
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
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-weight: 700;
  font-size: 0.8em;
  padding: 0.5em 1em;
  border-radius: 5px;
  border: 2px solid var(--ink, #1b1b1f);
  background: var(--paper, #f1e9d2);
  color: var(--ink, #1b1b1f);
  cursor: pointer;
  box-shadow: 2px 2px 0 var(--ink, #1b1b1f);
  transition: transform 0.1s, box-shadow 0.1s;
  white-space: nowrap;
}
.btn:hover:not(:disabled) {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--ink, #1b1b1f);
}
.btn:active:not(:disabled) {
  transform: translate(1px, 1px);
  box-shadow: 0 0 0 var(--ink, #1b1b1f);
}
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}
.btn.primary {
  background: var(--spider-red, #d6273c);
  color: white;
}

.sort-controls.compact {
  gap: 6px;
}
.sort-controls.compact .btn {
  font-size: 0.66em;
  padding: 0.4em 0.6em;
  box-shadow: 1.5px 1.5px 0 var(--ink, #1b1b1f);
}
.sort-controls.compact .btn:hover:not(:disabled) {
  box-shadow: 2.5px 2.5px 0 var(--ink, #1b1b1f);
}
</style>
