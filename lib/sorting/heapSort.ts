import type { SortArray, SortGenerator } from './types'

function* heapify(arr: SortArray, i: number, size: number): SortGenerator {
  let largest = i
  const l = 2 * i + 1
  const r = 2 * i + 2
  yield { line: 6, action: 'setline', i }
  if (l < size) {
    yield { line: 7, action: 'compare', i: l, j: largest }
    if (arr[l].worldwideGross > arr[largest].worldwideGross) largest = l
  }
  if (r < size) {
    yield { line: 8, action: 'compare', i: r, j: largest }
    if (arr[r].worldwideGross > arr[largest].worldwideGross) largest = r
  }
  yield { line: 9, action: 'setline', i, j: largest }
  if (largest !== i) {
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
    yield { line: 9, action: 'swap', i, j: largest }
    yield* heapify(arr, largest, size)
  }
}

export function* heapSortSteps(arr: SortArray): SortGenerator {
  const n = arr.length
  yield { line: 0, action: 'setline' }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(arr, i, n)
  }
  for (let end = n - 1; end > 0; end--) {
    yield { line: 1, action: 'setline', i: end }
    ;[arr[0], arr[end]] = [arr[end], arr[0]]
    yield { line: 2, action: 'swap', i: 0, j: end }
    yield { line: 3, action: 'setline', i: 0 }
    yield* heapify(arr, 0, end)
    yield { line: 1, action: 'markSorted', i: end }
  }
  if (n > 0) yield { line: 1, action: 'markSorted', i: 0 }
  yield { line: 4, action: 'done' }
}

export const heapSortLines = [
  'buildMaxHeap(A, n)',
  'for end ← n − 1 downto 1',
  '  swap A[0], A[end]',
  '  heapify(A, 0, end)',
  'return A',
  'heapify(A, i, size):',
  '  largest ← i; l ← 2i + 1; r ← 2i + 2',
  '  if A[l] > A[largest]: largest ← l',
  '  if A[r] > A[largest]: largest ← r',
  '  if largest ≠ i: swap A[i], A[largest]; heapify(A, largest, size)',
]
