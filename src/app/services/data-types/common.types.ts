export type Banner = {
  url: string
  imageUrl: string
  targetId: number
}
export type HotTag = {
  id: number
  name: string
  position: number
}
// 歌单
export type SongSheet = {
  id: number
  name: string
  picUrl: string
  playCount: number
}
// 歌手
export type Singer = {
  id: number
  name: string
  picUrl: string
  albumSize: number
}
