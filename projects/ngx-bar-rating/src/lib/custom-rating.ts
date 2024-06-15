import { Directive, TemplateRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ratingActive]'
})
export class ActiveRating {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  standalone: true,
  selector: '[ratingInactive]'
})
export class InactiveRating {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  standalone: true,
  selector: '[ratingFraction]'
})
export class FractionRating {
  constructor(public template: TemplateRef<any>) {
  }
}
