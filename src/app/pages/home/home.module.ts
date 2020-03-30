import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    HomeRoutingModule,
    ShareModule
  ]
})
export class HomeModule { }
