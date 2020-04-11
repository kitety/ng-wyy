import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // 这样才能对组件里面的样式生效
  // 默认只进不出，全进样式能进来，全局样式出不去
  // None 不对样式进行封装 angular 会把样式作为全局样式
  encapsulation: ViewEncapsulation.None
})
export class WySliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
