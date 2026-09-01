import type { SpiderManMovie } from '../../data/spiderman-movies'

export type StepAction =
  | 'start'
  | 'setline'
  | 'compare'
  | 'swap'
  | 'overwrite'
  | 'markSorted'
  | 'done'

export interface SortStep {
  line: number
  action: StepAction
  i?: number
  j?: number
  value?: SpiderManMovie
}

export type SortArray = SpiderManMovie[]

export type SortGenerator = Generator<SortStep, void, unknown>
export type SortFn = (arr: SortArray) => SortGenerator

export interface AlgoMeta {
  id: 'bubble' | 'insertion' | 'heap' | 'quick'
  name: string
  summary: string
  history: string
  time: { best: string; average: string; worst: string }
  space: string
}
