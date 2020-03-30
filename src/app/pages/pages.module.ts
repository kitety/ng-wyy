import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';


// 所有的页面模块
@NgModule({
  declarations: [],
  imports: [
    HomeModule
  ], exports: [HomeModule]
})
export class PagesModule { }
