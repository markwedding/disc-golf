export interface Hole {
  par: number
  score: number
  toPar: number
}

export interface Round {
  par: number
  score: number
  toPar: number
  course: string
  layout: string
  player: string
  date: Date
  holes: Hole[]
}

export type ParsedRecord = {
  courseName: string
  date: string
  layoutName: string
  playerName: string
  toPar: number | null
  total: number
} & {
  [key: string]: number
}
