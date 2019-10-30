import {Component, Input, OnInit} from '@angular/core';
import {faStar as faRegularStar} from '@fortawesome/free-regular-svg-icons';
import {faStarHalf, faStar as faSolidStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'plm-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent {
  @Input() ratings;
  faRegularStar = faRegularStar;
  faSolidStar = faSolidStar;
  faStarHalfAlt = faStarHalfAlt;

   constructor() {}
}
