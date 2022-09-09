import { Component } from '@angular/core';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  bootRate = 1;
  faRate = 1;
  cssRate = 1.6;
  faoRate = 5.6;
  faRateWithMax = 5;
  faMaxRate = 5;
  faoRated = false;

  onFaoRate(e) {
    this.faoRated = true;
    this.faoRate = e;
  }

  faoReset() {
    this.faoRated = false;
    this.faoRate = 5.6;
  }

  test() {
    console.log('test');
  }
}
