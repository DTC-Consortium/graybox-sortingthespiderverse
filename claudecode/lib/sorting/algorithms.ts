import type { AlgoMeta, SortArray, SortFn } from './types'
import { bubbleSortSteps, bubbleSortLines } from './bubbleSort'
import { insertionSortSteps, insertionSortLines } from './insertionSort'
import { heapSortSteps, heapSortLines } from './heapSort'
import { quickSortSteps, quickSortLines } from './quickSort'

export interface AlgoDef extends AlgoMeta {
  steps: SortFn
  lines: string[]
}

export const algorithms: AlgoDef[] = [
  {
    id: 'bubble',
    name: 'Bubble Sort',
    summary:
      'Repeatedly walks the array, swapping any neighboring pair that is out of order. Each full pass "bubbles" the largest remaining value to its final position.',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    steps: bubbleSortSteps,
    lines: bubbleSortLines,
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    summary:
      'Grows a sorted prefix one element at a time, shifting larger elements right to open a slot for the next value — like sorting a hand of playing cards.',
    time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    space: 'O(1)',
    steps: insertionSortSteps,
    lines: insertionSortLines,
  },
  {
    id: 'heap',
    name: 'Heap Sort',
    summary:
      'Builds a max-heap from the array, then repeatedly swaps the heap\'s maximum (the root) to the end and re-heapifies the shrinking heap.',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    space: 'O(1)',
    steps: heapSortSteps,
    lines: heapSortLines,
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    summary:
      'Picks a pivot, partitions the array so smaller elements land left and larger ones right, then recursively sorts each side (Lomuto partition scheme, pivot = last element).',
    time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    space: 'O(log n)',
    steps: quickSortSteps,
    lines: quickSortLines,
  },
]

export function shuffled(arr: SortArray): SortArray {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
