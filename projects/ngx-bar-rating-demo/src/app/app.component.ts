import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faGithub, faGithubAlt, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faStar, faStarHalfAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { HeaderComponent } from './header/header.component';
import { BarsComponent } from './bars/bars.component';
import { StarsComponent } from './stars/stars.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    BarsComponent,
    StarsComponent,
    FooterComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faXTwitter,
      faGithub,
      faGithubAlt,
      faStar,
      faStarHalfAlt,
      farStar,
      faTimesCircle
    );
  }
}
