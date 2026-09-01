import { reactive, ref, onBeforeUnmount, type Ref } from 'vue'
import type { AlgoDef } from './algorithms'
import { shuffled } from './algorithms'
import type { SpiderManMovie } from '../../data/spiderman-movies'
import type { SortStep } from './types'

export function useSorter(algo: AlgoDef, initial: SpiderManMovie[], speedMs: Ref<number> = ref(220)) {
  const array = reactive<SpiderManMovie[]>([])
  const activeLine = ref(-1)
  const highlightIndices = ref<number[]>([])
  const highlightKind = ref<'compare' | 'swap' | null>(null)
  const sortedIndices = ref<Set<number>>(new Set())
  const comparisons = ref(0)
  const swaps = ref(0)
  const isRunning = ref(false)
  const isDone = ref(false)

  let baseOrder: SpiderManMovie[] = shuffled(initial)
  let generator: Generator<SortStep, void, unknown> | null = null
  let timer: ReturnType<typeof setTimeout> | null = null

  function resetState() {
    activeLine.value = -1
    highlightIndices.value = []
    highlightKind.value = null
    sortedIndices.value = new Set()
    comparisons.value = 0
    swaps.value = 0
    isDone.value = false
  }

  function setArray(next: SpiderManMovie[]) {
    array.splice(0, array.length, ...next)
    resetState()
    generator = algo.steps(array)
  }

  function setBaseOrder(order: SpiderManMovie[]) {
    pause()
    baseOrder = order
    setArray([...baseOrder])
  }

  function reset() {
    pause()
    setArray([...baseOrder])
  }

  function randomize() {
    setBaseOrder(shuffled(initial))
  }

  function applyStep(step: SortStep) {
    activeLine.value = step.line
    const idx = [step.i, step.j].filter((x): x is number => x !== undefined)
    switch (step.action) {
      case 'compare':
        highlightIndices.value = idx
        highlightKind.value = 'compare'
        comparisons.value++
        break
      case 'swap':
        highlightIndices.value = idx
        highlightKind.value = 'swap'
        swaps.value++
        break
      case 'overwrite':
        highlightIndices.value = idx
        highlightKind.value = 'swap'
        swaps.value++
        break
      case 'markSorted':
        if (step.i !== undefined) {
          sortedIndices.value = new Set([...sortedIndices.value, step.i])
        }
        highlightIndices.value = []
        highlightKind.value = null
        break
      case 'setline':
        highlightIndices.value = idx
        highlightKind.value = null
        break
      case 'done':
        isDone.value = true
        sortedIndices.value = new Set(array.map((_, i) => i))
        highlightIndices.value = []
        highlightKind.value = null
        break
    }
  }

  function step(): boolean {
    if (!generator) generator = algo.steps(array)
    const { value, done } = generator.next()
    if (done || !value) {
      isDone.value = true
      sortedIndices.value = new Set(array.map((_, i) => i))
      return false
    }
    applyStep(value)
    return true
  }

  function scheduleNext() {
    timer = setTimeout(() => {
      const cont = step()
      if (cont && isRunning.value) scheduleNext()
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

  setArray([...baseOrder])
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
    play,
    pause,
    reset,
    randomize,
    setBaseOrder,
    step,
  }
}
