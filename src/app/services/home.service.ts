import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators'

// 这个service是哪个提供的 root-appModule
// 这样写aot优化 会被tree-shake优化掉
@Injectable({
  // providedIn: 'root'
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http: HttpClient, @Inject(API_CONFIG) private uri: string) { }
  getBanners(): Observable<Banner[]> {
    // map 返回数组
    return this.http.get(this.uri + '/banner').pipe(map((res: { banners: Banner[] }) => res.banners))
  }
  // 热门标签
  getHotTags(): Observable<HotTag[]> {
    return this.http.get(this.uri + '/playlist/hot').pipe(map((res: { tags: HotTag[] }) => {
      return res.tags.sort((x: HotTag, y: HotTag) => x.position - y.position).slice(0, 5)
    }))
  }
  // 推荐歌单
  getPersonalSheetList(): Observable<SongSheet[]> {
    // map 返回数组
    return this.http.get(this.uri + '/personalized').pipe(map((res: { result: SongSheet[] }) => res.result.slice(0, 16)))
  }
}
