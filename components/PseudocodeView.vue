<script setup lang="ts">
defineProps<{
  lines: string[]
  activeLine: number
}>()
</script>

<template>
  <div class="pseudocode">
    <div
      v-for="(line, i) in lines"
      :key="i"
      class="pc-line"
      :class="{ active: i === activeLine, blank: !line }"
    >
      <span class="pc-num">{{ i }}</span>
      <span class="pc-text">{{ line || ' ' }}</span>
    </div>
  </div>
</template>

<style scoped>
.pseudocode {
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 0.6em;
  background: var(--ink, #1b1b1f);
  color: #e9e4d6;
  border: 2px solid var(--ink, #1b1b1f);
  border-radius: 6px;
  padding: 0.4em 0.7em;
  line-height: 1.2;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.pc-line {
  display: grid;
  grid-template-columns: 1.4em 1fr;
  column-gap: 0.7em;
  padding: 0 0.4em;
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: 3px;
}
.pc-num {
  color: #6b6b74;
  text-align: right;
  user-select: none;
}
.pc-text {
  white-space: pre-wrap;
  word-break: break-word;
  min-width: 0;
}
.pc-line.active {
  background: var(--amber, #f2b705);
  color: var(--ink, #1b1b1f);
  font-weight: 700;
}
.pc-line.active .pc-num {
  color: var(--ink, #1b1b1f);
  opacity: 0.6;
}
</style>
