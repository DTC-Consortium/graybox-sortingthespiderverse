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
    history:
      'First described in a 1956 ACM paper by actuary E. H. Friend; the name itself didn\'t appear until 1962. Rarely used in production, but it\'s the standard first algorithm taught to explain what a comparison sort is.',
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
    history:
      'Among the oldest sorting techniques in computing, discussed in John Mauchly\'s 1946 lectures. It never went away — Timsort (Python, Java) and Introsort still switch to it for small sub-arrays, where it has almost no overhead.',
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
    history:
      'Invented in 1964 by J. W. J. Williams, whose paper also introduced the binary heap; Robert Floyd improved it the same year. The first comparison sort to guarantee O(n log n) time in O(1) space — still the pick when worst-case performance matters most.',
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
    history:
      'Devised by Tony Hoare in 1959, sorting dictionary words for a Moscow machine-translation project, then implemented in 1960 to win a sixpence bet with his boss. Published in 1962, it\'s still the default general-purpose sort in many standard libraries.',
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
