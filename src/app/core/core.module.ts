import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceModule } from '../services/service.module';
import { PagesModule } from '../pages/pages.module';
import { ShareModule } from '../share/share.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';

registerLocaleData(zh);
// app module总经理，这个就类似于副经理
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,// 要在最后，不然路由配置有问题
  ],
  exports: [
    ShareModule,
    AppRoutingModule,// 要在最后，不然路由配置有问题
  ],
  // 存放的服务
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  // 注意无限循环，自己注入自己，要处理
  // 第一次注入CoreModule是没有的 因此可选
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    // 首次运行不回报错，第二次才会
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}
