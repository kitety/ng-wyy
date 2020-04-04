import { Component, OnInit, TemplateRef, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  // 默认全部，这样的话就只会在输入属性变化的时候才进行变更检测，其他组件渲染，但是输入不变的话就不会渲染
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyCarouselComponent implements OnInit {
  @Input() activeIndex = 0
  @Output() changeSlide = new EventEmitter<'pre' | 'next'>()
  // ng8计算模板的查询时间 static--静态
  // 变更检测前解析还是检测后解析  动态（ng-if等等）就是后，否则即使前
  @ViewChild('dot', { static: true }) dotRef: TemplateRef<any>
  constructor() { }

  ngOnInit(): void {
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.changeSlide.emit(type)
  }

}
