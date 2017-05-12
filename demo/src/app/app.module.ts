import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RatingModule } from './rating';
import { AppComponent } from './app.component';
import { RibbonComponent } from './ribbon/ribbon.component';

@NgModule({
  declarations: [
    AppComponent,
    RibbonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
