import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ratingActive]'
})
export class ActiveRating {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[ratingInactive]'
})
export class InactiveRating {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[ratingFraction]'
})
export class FractionRating {
  constructor(public template: TemplateRef<any>) {
  }
}
