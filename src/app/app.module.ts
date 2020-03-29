import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';


@NgModule({
  // 注入元数据
  declarations: [
    AppComponent
  ],
  // 引入依赖模块
  imports: [
    CoreModule,
  ],

  // 入口组件
  bootstrap: [AppComponent]
})
// 根模块
export class AppModule { }
