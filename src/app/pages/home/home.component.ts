import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, HotTag, SongSheet } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0
  banners: Banner[]
  hotTags: HotTag[]
  songSheetList: SongSheet[]
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarsousel: NzCarouselComponent
  constructor(private homeService: HomeService) {
    this.getBanners()
    this.getHotTags()
    this.getPersonalizedSheetList()
  }
  private getBanners() {
    this.homeService.getBanners().subscribe(banners => {
      this.banners = banners
    })
  }
  private getHotTags() {
    this.homeService.getHotTags().subscribe(hotTags => {
      this.hotTags = hotTags
    })
  }
  private getPersonalizedSheetList() {
    this.homeService.getPersonalSheetList().subscribe(songSheetList => {
      this.songSheetList = songSheetList
    })
  }
  onNzBeforeChange({ to }) {
    this.carouselActiveIndex = to
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarsousel[type]()
  }
  ngOnInit(): void {
  }

}
