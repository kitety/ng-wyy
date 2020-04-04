import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { Banner, HotTag, SongSheet, Singer } from './data-types/common.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/internal/operators'
import queryString from 'query-string'


type SingerParams = {
  offset: number
  limit: number
  cat?: string
}
const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'

}
// 这个service是哪个提供的 root-appModule
// 这样写aot优化 会被tree-shake优化掉
@Injectable({
  // providedIn: 'root'
  providedIn: ServiceModule
})
export class SingerService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }
  getEnterSingers(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: queryString.stringify(args) })
    // map 返回数组
    return this.http.get(this.uri + '/artist/list', { params }).pipe(map((res: { artists: Singer[] }) => res.artists))
  }

}
