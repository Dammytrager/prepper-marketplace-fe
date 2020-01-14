import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppState} from '../system/interfaces/state/plm.interface';
import {SITE} from '../system/state/actions/site.action';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {Title} from '@angular/platform-browser';
import {
  faArrowCircleRight, faAsterisk,
  faBars,
  faBook, faCalendar, faCaretDown, faCaretUp, faCheck, faChevronDown, faChevronUp, faEdit, faExclamationTriangle, faFlag, faHeart, faPlus,
  faSearch,
  faSignOutAlt, faSpinner, faStarHalf, faSyncAlt,
  faTachometerAlt,
  faTimes, faUser,
  faWallet, faWrench
} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt, faCheckCircle, faCircle, faStar} from '@fortawesome/free-regular-svg-icons';

library.add(
  faSearch,
  faTachometerAlt,
  faBook,
  faWallet,
  faSignOutAlt,
  faBars,
  faTimes,
  faArrowCircleRight,
  faSyncAlt,
  faChevronUp,
  faChevronDown,
  faWrench,
  faCaretUp,
  faCaretDown,
  faHeart,
  faPlus,
  faStar,
  faStarHalf,
  faCheckCircle,
  faSpinner,
  faCheck,
  faCircle,
  faCalendarAlt,
  faUser,
  faFlag,
  faExclamationTriangle,
  faEdit,
  faAsterisk
);

dom.watch();


@Component({
  selector: 'plm-root',
  templateUrl: './plm.html'
})
export class PlmComponent implements OnInit {
  constructor(
    private _router: Router,
    private _ngRedux: NgRedux<AppState>,
    private _title: Title,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setRoute();
  }

  setRoute() {
    this._router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        let title;
        let child = this._route.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          title = child.snapshot.data['title'];
          this._title.setTitle(title);
          this._ngRedux.dispatch({
            type: SITE.CHANGE_TITLE,
            title: title
          });
        }
        if (child.snapshot.data['pageInfo']) {
          this._ngRedux.dispatch({
            type: SITE.CHANGE_EXTRA_INFO,
            extraInfo: child.snapshot.data['pageInfo']
          });
        }
        this._ngRedux.dispatch({
          type: SITE.CHANGE_URL,
          url: data.urlAfterRedirects
        });
      }
    });
  }
}
