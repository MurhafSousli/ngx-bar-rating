import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [FaIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
}
