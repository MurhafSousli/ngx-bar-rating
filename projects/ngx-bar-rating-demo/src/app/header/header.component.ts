import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
}
