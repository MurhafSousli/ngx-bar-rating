import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { BarRatingModule } from '../../projects/ngx-bar-rating/src/public-api';
// import { BarRatingModule } from 'ngx-bar-rating';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StarsComponent } from './stars/stars.component';
import { FooterComponent } from './footer/footer.component';
import { BarsComponent } from './bars/bars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StarsComponent,
    FooterComponent,
    BarsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
