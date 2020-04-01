import { Injectable, Inject } from '@angular/core';
import { ServiceModule, API_CONFIG } from './service.module';
import { Observable } from 'rxjs';
import { Banner } from './data-types/common.types';
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
}
