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

// represents a record parsed from the CSV file by papaparse
export type Record = {
  courseName: string
  date: string
  layoutName: string
  playerName: string
  toPar: number | null
  total: number
} & {
  [key: string]: number
}
