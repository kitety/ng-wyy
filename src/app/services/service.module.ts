import { NgModule, InjectionToken } from '@angular/core';
import { HomeService } from './home.service';

// 注入常量 令牌
export const API_CONFIG = new InjectionToken('ApiConfigToken')

// 服务模块
// http 服务
@NgModule({
  declarations: [],
  imports: [
  ],
  // 不会被tree-shake优化掉
  // providers: [HomeService]
  providers: [{ provide: API_CONFIG, useValue: 'http://localhost:3000' }]
})
export class ServiceModule { }
