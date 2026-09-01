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
      :class="{ active: i === activeLine }"
    >
      <span class="pc-num">{{ i }}</span>
      <span class="pc-text">{{ line || ' ' }}</span>
    </div>
  </div>
</template>

<style scoped>
.pseudocode {
  font-family: 'Fira Code', 'JetBrains Mono', ui-monospace, monospace;
  font-size: 0.82rem;
  background: #0f172a;
  color: #cbd5e1;
  border-radius: 8px;
  padding: 10px 0;
  line-height: 1.65;
  overflow: auto;
}
.pc-line {
  display: flex;
  padding: 1px 12px;
  white-space: pre;
  border-left: 3px solid transparent;
}
.pc-num {
  width: 1.6em;
  flex: 0 0 auto;
  color: #64748b;
  margin-right: 10px;
  text-align: right;
  user-select: none;
}
.pc-text {
  white-space: pre;
}
.pc-line.active {
  background: rgba(245, 159, 0, 0.18);
  border-left-color: #f59f00;
  color: #ffe8a3;
}
.pc-line.active .pc-num {
  color: #f59f00;
}
</style>
