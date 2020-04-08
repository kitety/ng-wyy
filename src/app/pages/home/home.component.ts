import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Banner, HotTag, SongSheet, Singer } from 'src/app/services/data-types/common.types';
import { NzCarouselComponent } from 'ng-zorro-antd';
import { SingerService } from 'src/app/services/singer.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';
import { SheetService } from 'src/app/services/sheet.service';

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
  singers: Singer[]
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarsousel: NzCarouselComponent
  constructor(private route: ActivatedRoute, private sheetService: SheetService) {
    this.route.data.pipe(map(res => res.homeDatas)).subscribe(res => {
      console.log(res);
      const [banners, hotTags, songSheetList, singers] = res
      this.banners = banners
      this.hotTags = hotTags
      this.songSheetList = songSheetList
      this.singers = singers
    })
  }
  onNzBeforeChange({ to }) {
    this.carouselActiveIndex = to
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarsousel[type]()
  }
  onPlaySheet(id: number) {
    console.log('id: ', id);
    this.sheetService.getSongSheetDetail(id).subscribe(res=>{
      console.log(res);
    })
  }
  ngOnInit(): void {
  }

}
