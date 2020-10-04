import {Component} from '@angular/core';

@Component({
  selector: 'bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent {

  horiRate = 7;
  vertRate = 1;
  squareRate;
  movieRate = 2;
  customRate = 2;
  starRate = 4;

}
