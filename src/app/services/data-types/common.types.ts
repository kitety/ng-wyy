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
  tracks: Song[]
}
// 歌手
export type Singer = {
  id: number
  name: string
  picUrl: string
  albumSize: number
}
// 歌曲
export type Song = {
  id: number
  name: string
  url: string
  // 歌手的数组
  ar: Singer[]
  // 这首歌的专辑的信息
  al: {
    id: number
    name: string
    picUrl: string
  }
  dt: number//时间
}
// 歌曲地址
export type SongUrl = {
  id: number
  url: string

}
