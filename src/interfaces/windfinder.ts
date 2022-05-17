export interface WindfinderData {
  spot: string
  days: WindfinderDataDay[]
}

export interface WindfinderDataDay {
  date: string
  hours: WindfinderDataHour[]
}

export interface WindfinderDataHour {
  hour: number
  windspeed: number
  windgust: number
  winddirectionDegrees: number
  winddirectionLetters: string
  temperature: number
  wavedirection: number
  waveheight: number
  waveinterval: number
}


export interface ExtractedWindfinderData extends WindfinderBase {
  name: string
  spot: string
  date: string[]
}


export interface ParsedWindfinderDay extends WindfinderBase {
  date: string
}

interface WindfinderBase {
  time: number[]
  windspeed: number[]
  windgust: number[]
  winddirectionDegrees: number[]
  winddirectionLetters: string[]
  temperature: number[]
  wavedirection: number[]
  waveheight: number[]
  waveinterval: number[]
}