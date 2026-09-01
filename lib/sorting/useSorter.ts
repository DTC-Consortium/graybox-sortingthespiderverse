import { reactive, ref, computed, onBeforeUnmount, type Ref } from 'vue'
import type { AlgoDef } from './algorithms'
import { shuffled } from './algorithms'
import type { SpiderManMovie } from '../../data/spiderman-movies'
import type { SortStep } from './types'

interface TraceEntry {
  step: SortStep
  array: SpiderManMovie[]
  sortedIndices: Set<number>
  comparisons: number
  swaps: number
}

function buildTrace(algo: AlgoDef, order: SpiderManMovie[]): TraceEntry[] {
  const work = [...order]
  const gen = algo.steps(work)
  const trace: TraceEntry[] = []
  let comparisons = 0
  let swaps = 0
  let sortedIndices = new Set<number>()
  for (const step of gen) {
    if (step.action === 'compare') comparisons++
    if (step.action === 'swap' || step.action === 'overwrite') swaps++
    if (step.action === 'markSorted' && step.i !== undefined) {
      sortedIndices = new Set([...sortedIndices, step.i])
    }
    if (step.action === 'done') sortedIndices = new Set(work.map((_, idx) => idx))
    trace.push({ step, array: [...work], sortedIndices, comparisons, swaps })
  }
  return trace
}

// Every algorithm is precomputed into a full trace (array snapshot + running
// stats after each step) against the small 11-film dataset, so Step
// Forward/Back and Play/Pause are all just index navigation over an array
// that already exists - no re-running or reversing a generator mid-flight.
export function useSorter(algo: AlgoDef, initial: SpiderManMovie[], speedMs: Ref<number> = ref(220)) {
  const array = reactive<SpiderManMovie[]>([])
  const activeLine = ref(-1)
  const highlightIndices = ref<number[]>([])
  const highlightKind = ref<'compare' | 'swap' | null>(null)
  const sortedIndices = ref<Set<number>>(new Set())
  const comparisons = ref(0)
  const swaps = ref(0)
  const isRunning = ref(false)
  const pos = ref(-1)

  let baseOrder: SpiderManMovie[] = shuffled(initial)
  let trace: TraceEntry[] = []
  let timer: ReturnType<typeof setTimeout> | null = null

  const isDone = computed(() => trace.length > 0 && pos.value >= trace.length - 1)
  const isAtStart = computed(() => pos.value <= -1)

  function applyPos(p: number) {
    pos.value = p
    if (p < 0) {
      array.splice(0, array.length, ...baseOrder)
      activeLine.value = -1
      highlightIndices.value = []
      highlightKind.value = null
      sortedIndices.value = new Set()
      comparisons.value = 0
      swaps.value = 0
      return
    }
    const entry = trace[p]
    array.splice(0, array.length, ...entry.array)
    activeLine.value = entry.step.line
    const idx = [entry.step.i, entry.step.j].filter((x): x is number => x !== undefined)
    if (entry.step.action === 'compare') {
      highlightIndices.value = idx
      highlightKind.value = 'compare'
    } else if (entry.step.action === 'swap' || entry.step.action === 'overwrite') {
      highlightIndices.value = idx
      highlightKind.value = 'swap'
    } else {
      highlightIndices.value = idx
      highlightKind.value = null
    }
    sortedIndices.value = entry.sortedIndices
    comparisons.value = entry.comparisons
    swaps.value = entry.swaps
  }

  function setArray(order: SpiderManMovie[]) {
    baseOrder = order
    trace = buildTrace(algo, order)
    applyPos(-1)
  }

  function setBaseOrder(order: SpiderManMovie[]) {
    pause()
    setArray(order)
  }

  function reset() {
    pause()
    applyPos(-1)
  }

  function randomize() {
    setBaseOrder(shuffled(initial))
  }

  function stepForward(): boolean {
    if (pos.value >= trace.length - 1) return false
    applyPos(pos.value + 1)
    return pos.value < trace.length - 1
  }

  function stepBack() {
    if (pos.value <= -1) return
    applyPos(pos.value - 1)
  }

  function scheduleNext() {
    timer = setTimeout(() => {
      const canContinue = stepForward()
      if (canContinue && isRunning.value) scheduleNext()
      else pause()
    }, speedMs.value)
  }

  function play() {
    if (isRunning.value || isDone.value) return
    isRunning.value = true
    scheduleNext()
  }

  function pause() {
    isRunning.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  setArray(baseOrder)
  onBeforeUnmount(() => pause())

  return {
    array,
    activeLine,
    highlightIndices,
    highlightKind,
    sortedIndices,
    comparisons,
    swaps,
    isRunning,
    isDone,
    isAtStart,
    pos,
    play,
    pause,
    reset,
    randomize,
    setBaseOrder,
    stepForward,
    stepBack,
  }
}
