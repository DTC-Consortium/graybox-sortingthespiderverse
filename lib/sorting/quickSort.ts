import type { SortArray, SortGenerator, SortStep } from './types'

function* partition(arr: SortArray, lo: number, hi: number): Generator<SortStep, number, unknown> {
  yield { line: 6, action: 'setline', i: hi }
  const pivot = arr[hi]
  let i = lo - 1
  for (let j = lo; j < hi; j++) {
    yield { line: 7, action: 'setline', i: j }
    yield { line: 8, action: 'compare', i: j, j: hi }
    if (arr[j].worldwideGross < pivot.worldwideGross) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      yield { line: 8, action: 'swap', i, j }
    }
  }
  ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
  yield { line: 9, action: 'swap', i: i + 1, j: hi }
  yield { line: 10, action: 'markSorted', i: i + 1 }
  return i + 1
}

function* quickSort(arr: SortArray, lo: number, hi: number): SortGenerator {
  if (lo < hi) {
    yield { line: 1, action: 'setline', i: lo, j: hi }
    const p = yield* partition(arr, lo, hi)
    yield { line: 2, action: 'setline', i: p }
    yield { line: 3, action: 'setline' }
    yield* quickSort(arr, lo, p - 1)
    yield { line: 4, action: 'setline' }
    yield* quickSort(arr, p + 1, hi)
  } else if (lo === hi && lo >= 0) {
    yield { line: 1, action: 'markSorted', i: lo }
  }
}

export function* quickSortSteps(arr: SortArray): SortGenerator {
  yield { line: 0, action: 'setline' }
  yield* quickSort(arr, 0, arr.length - 1)
  yield { line: 4, action: 'done' }
}

export const quickSortLines = [
  'quickSort(A, lo, hi):',
  '  if lo < hi',
  '    p ← partition(A, lo, hi)',
  '    quickSort(A, lo, p − 1)',
  '    quickSort(A, p + 1, hi)',
  'partition(A, lo, hi):',
  '  pivot ← A[hi]; i ← lo − 1',
  '  for j ← lo to hi − 1',
  '    if A[j] < pivot: i ← i + 1; swap A[i], A[j]',
  '  swap A[i + 1], A[hi]',
  '  return i + 1',
]
