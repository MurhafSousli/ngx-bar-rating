import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ratingActive]'
})
export class ActiveRating {
  template: TemplateRef<any> = inject(TemplateRef);
}

@Directive({
  selector: '[ratingInactive]'
})
export class InactiveRating {
  template: TemplateRef<any> = inject(TemplateRef);
}

@Directive({
  selector: '[ratingFraction]'
})
export class FractionRating {
  template: TemplateRef<any> = inject(TemplateRef);
}
