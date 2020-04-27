import { Observable } from 'rxjs'

export type WySliderStyle = {
  width?: string | null
  height?: string | null
  left?: string | null
  bottom?: string | null
}
export type SliderEventObserverConfig = {
  start: string
  move: string
  end: string
  pluckKey: string[]
  filter: (e: Event) => boolean
  startPlucked$?: Observable<number>
  moveResolved$?: Observable<number>
  end$?: Observable<Event>
}
