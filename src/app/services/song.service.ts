import { ServiceModule, API_CONFIG } from './service.module'
import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { SongUrl, Song } from './data-types/common.types'
import { Observable } from 'rxjs'
import { map } from 'rxjs/internal/operators'

@Injectable({
  // providedIn: 'root'
  providedIn: ServiceModule
})
export class SongService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }
  // 获取歌曲详情
  getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids)
    return this.http.get(this.uri + '/song/url', { params }).pipe(map((res: { data: SongUrl[] }) => res.data))
  }
  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs]
    // 通过歌曲找到ids
    const ids = songArr.map(item => item.id).join(',')
    return Observable.create(observer => {
      // 找到urls
      this.getSongUrl(ids).subscribe(urls => {
        // 拼接+封装为observerable对象
        return observer.next(this.generateSongList(songArr, urls))
      })
    })
  }
  // 跟song做拼接
  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result = []
    songs.forEach(song => {
      const url = urls.find(url => url.id === song.id).url
      if (url) {
        result.push({ ...song, url })
      }
    });
    return result
  }



}
