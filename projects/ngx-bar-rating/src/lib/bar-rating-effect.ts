import { Directive, inject, } from '@angular/core';
import { BarRating } from './bar-rating';

@Directive({
  selector: 'bar-rating[effect]',
})
export class BarRatingEffect {

  private barRating: BarRating = inject(BarRating, {
    host: true,
    self: true
  });

  constructor() {
    // Save the original handleClick method
    const originalHandleClick = this.barRating.handleClick.bind(this.barRating);

    // Override the handleClick method
    this.barRating.handleClick = (event: MouseEvent) => {
      // Call the original handleClick logic
      originalHandleClick(event);

      // Add custom effect logic
      this.handleClickWithEffect(event);
    };
  }

  handleClickWithEffect(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const unitElement = target.closest('.br-unit') as HTMLElement;

    const clone = unitElement.cloneNode(true) as HTMLElement;
    const rect: DOMRect = unitElement.getBoundingClientRect();
    const parentRect: DOMRect = (event.currentTarget as HTMLElement).getBoundingClientRect();

    clone.classList.add('br-unit-clone');
    clone.style.left = `${ rect.left - parentRect.left }px`;
    clone.style.top = `${ rect.top - parentRect.top }px`;
    clone.style.width = `${ rect.width }px`;
    clone.style.height = `${ rect.height }px`;

    const parentElement = event.currentTarget as HTMLElement;
    parentElement.appendChild(clone);

    clone.addEventListener('animationend', () => {
      parentElement.removeChild(clone);
    });
  }
}
