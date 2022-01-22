import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BarRatingModule } from 'ngx-bar-rating';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faGithubAlt, faTwitter } from '@fortawesome/free-brands-svg-icons';

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
    BarRatingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTwitter,
      faGithub,
      faGithubAlt,
      faStar,
      faStarHalfAlt,
      farStar,
      faTimesCircle
    );
  }
}
