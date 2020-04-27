import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, tap, pluck, map, distinct, distinctUntilChanged, takeUntil, merge } from 'rxjs/internal/operators';
import { SliderEventObserverConfig } from './wy-slider-types';
import { DOCUMENT } from '@angular/common';
import { sliderEvent, getElementOffset } from './wy-slider-helper';

@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  // 这样才能对组件里面的样式生效
  // 默认只进不出，全进样式能进来，全局样式出不去
  // None 不对样式进行封装 angular 会把样式作为全局样式
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WySliderComponent implements OnInit {

  @Input() wyVertical = false
  @Input() wyMin = 0
  @Input() wyMax = 100
  private dragStart$: Observable<number>
  private dragMove$: Observable<number>
  private dragEnd$: Observable<Event>
  private sliderDom: HTMLDivElement
  // 获取slider的el 
  @ViewChild('wySlider', { static: true }) private wySlider: ElementRef
  // 用ng的，不用原生的不利于服务端渲染
  constructor(@Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    console.log('wySlider: ', this.wySlider);
    this.sliderDom = this.wySlider.nativeElement
    this.createDraggingObservables()
    this.subscribeDrag(['start'])
  }
  /**
   * pc mouseDown mouseMove mouseUp  MouseEvent pageX/Y
   * mobile touchDown touchMove touchEnd TouchEvent touches[0].pagX/Y 
   */
  private createDraggingObservables() {
    const orientField = this.wyVertical ? 'pageY' : 'pageX'
    // mouseEvent
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => event instanceof MouseEvent,
      pluckKey: [orientField]
    };
    // TouchEvent
    const touch: SliderEventObserverConfig = {
      start: 'touchdown',
      move: 'touchmove',
      end: 'touchup',
      filter: (e: TouchEvent) => event instanceof TouchEvent,
      pluckKey: ['touches', '0', orientField]
    };
    [mouse, touch].forEach(source => {
      const { start, move, end, filter: filterFunc, pluckKey } = source
      // 绑定，筛选事件对象
      // tap 调试
      source.startPlucked$ = fromEvent(this.sliderDom, start)
        .pipe(
          filter(filterFunc),
          tap(sliderEvent),
          // 取到位置
          pluck(...pluckKey),
          map((position: number) => this.findClosestValue(position))
        )

      source.end$ = fromEvent(this.doc, end)
      source.moveResolved$ = fromEvent(this.sliderDom, move)
        .pipe(
          filter(filterFunc),
          tap(sliderEvent),
          // 取到位置
          pluck(...pluckKey),
          // 改变了才发射流
          distinctUntilChanged(),
          map((position: number) => this.findClosestValue(position)),
          // 直到结束触发
          takeUntil(source.end$)
        )
    })
    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    // 订阅s事件
    if (events.includes('start') && this.dragStart$) {
      console.log(111111111111);
      this.dragStart$.subscribe(this.onDragStart.bind(this))
    }
    if (events.includes('move') && this.dragMove$) {
      this.dragMove$.subscribe(this.onDragMove.bind(this))
    }
    if (events.includes('end') && this.dragEnd$) {
      this.dragEnd$.subscribe(this.onDragStart.bind(this))
    }
  }
  private onDragStart(value: number) {
    console.log('value: ', value);

  }
  private onDragMove(value: number) {

  }

  private findClosestValue(position: number): number {
    // 获取滑块总长
    const sliderLength = this.getSliderLength()
    // 滑块的左端点 上端点的位置
    const sliderStart = this.getSliderStartPosition()
    // 滑块当前的位置/总长
    const ratio = (position - sliderStart) / sliderLength
    const ratioTrue = this.wyVertical ? 1 - ratio : ratio

    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin
  }

  private getSliderStartPosition(): number {
    const offset = getElementOffset(this.sliderDom)
    return this.wyVertical ? offset.top : offset.left
  }

  private getSliderLength(): number {
    return this.wyVertical ? this.sliderDom.clientHeight : this.sliderDom.clientWidth
  }
}
