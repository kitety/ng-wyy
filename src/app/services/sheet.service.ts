import { ServiceModule, API_CONFIG } from './service.module'
import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { SongSheet, Song } from './data-types/common.types'
import { Observable } from 'rxjs'
import { map, pluck, switchMap } from 'rxjs/internal/operators'
import { SongService } from './song.service'

@Injectable({
  // providedIn: 'root'
  providedIn: ServiceModule
})
export class SheetService {

  constructor(
    private http: HttpClient,
    private songServer: SongService,
    @Inject(API_CONFIG) private uri: string) { }
  // 获取歌单详情
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString())
    return this.http.get(this.uri + '/playlist/detail', { params }).pipe(map((res: { playlist: SongSheet }) => res.playlist))
  }
  playSheet(id: number): Observable<Song[]> {
    // playlist->tracks
    // 1.获取歌单详情
    // 2.获取url
    return this.getSongSheetDetail(id).pipe(pluck('tracks'), switchMap(track => this.songServer.getSongList(track)))
  }

}
