import { ServiceModule, API_CONFIG } from './service.module'
import { Injectable, Inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { SongUrl } from './data-types/common.types'
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
  playSheet(id: number) {

  }

}
