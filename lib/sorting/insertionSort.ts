import type { SortArray, SortGenerator } from './types'

export function* insertionSortSteps(arr: SortArray): SortGenerator {
  const n = arr.length
  for (let i = 1; i < n; i++) {
    yield { line: 0, action: 'setline', i }
    const key = arr[i]
    let j = i - 1
    yield { line: 1, action: 'setline', i, j }
    while (j >= 0) {
      yield { line: 2, action: 'compare', i: j, j: j + 1 }
      if (arr[j].worldwideGross <= key.worldwideGross) break
      yield { line: 3, action: 'overwrite', i: j + 1, j, value: arr[j] }
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
    yield { line: 4, action: 'overwrite', i: j + 1, value: key }
  }
  yield { line: 5, action: 'done' }
}

export const insertionSortLines = [
  'for i ← 1 to n − 1',
  '  key ← A[i]; j ← i − 1',
  '  while j ≥ 0 and A[j] > key',
  '    A[j + 1] ← A[j]; j ← j − 1',
  '  A[j + 1] ← key',
  'return A',
]
