import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { WyUiModule } from './wy-ui/wy-ui.module';


// 全局经常用的组件 指令 模块
// 引入了还要导出
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,//全局的UI组件
    FormsModule,//全局经常用到
    WyUiModule
  ], exports: [
    CommonModule,
    NgZorroAntdModule,//全局的UI组件
    FormsModule,//全局经常用到
    WyUiModule,//全局
  ]
})
export class ShareModule { }
