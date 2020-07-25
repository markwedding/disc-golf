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
  id: string
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

export interface PlayerStats {
  rounds: number
  average: number
  best: number
}

export interface Courses {
  [key: string]: string[]
}

export interface BirdieRun {
  round: Round
  birdies: number
  holes: number
  start: number
  end: number
  run: boolean[]
}

export interface Streak {
  birdies: number
  misses: number
}

export type PotentialRun = Omit<BirdieRun, 'round' | 'run'>
