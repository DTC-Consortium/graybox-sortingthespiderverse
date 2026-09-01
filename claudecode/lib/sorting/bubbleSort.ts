import type { SortArray, SortGenerator } from './types'

export function* bubbleSortSteps(arr: SortArray): SortGenerator {
  const n = arr.length
  for (let i = 0; i < n - 1; i++) {
    yield { line: 0, action: 'setline', i }
    for (let j = 0; j < n - 1 - i; j++) {
      yield { line: 1, action: 'setline', i: j }
      yield { line: 2, action: 'compare', i: j, j: j + 1 }
      if (arr[j].worldwideGross > arr[j + 1].worldwideGross) {
        yield { line: 3, action: 'swap', i: j, j: j + 1 }
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    yield { line: 4, action: 'markSorted', i: n - 1 - i }
  }
  if (n > 0) yield { line: 4, action: 'markSorted', i: 0 }
  yield { line: 5, action: 'done' }
}

export const bubbleSortLines = [
  'for i ← 0 to n − 2',
  '  for j ← 0 to n − 2 − i',
  '    if A[j] > A[j + 1]',
  '      swap A[j], A[j + 1]',
  '  // A[n − 1 − i] is now in final position',
  'return A',
]
