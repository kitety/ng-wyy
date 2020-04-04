import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';
import { Banner, HotTag, Singer, SongSheet } from 'src/app/services/data-types/common.types';
import { take, first } from 'rxjs/internal/operators';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]]
// resolve 守卫
@Injectable()
export class HomeResolveService implements Resolve<HomeDataType> {
  constructor(private homeService: HomeService, private singerService: SingerService) { }
  // take first只取第一个流
  resolve(): Observable<HomeDataType> {
    // promise all 类似
    return forkJoin([
      this.homeService.getBanners(),
      this.homeService.getHotTags(),
      this.homeService.getPersonalSheetList(),
      this.singerService.getEnterSingers()
    ]).pipe(first())
  }
}
