import {Component, OnInit} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AppState} from '../system/interfaces/state/plm.interface';
import {SITE} from '../system/state/actions/site.action';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import {Title} from '@angular/platform-browser';
import {
  faArrowCircleRight,
  faBars,
  faBook, faCaretDown, faCaretUp, faChevronUp,
  faSearch,
  faSignOutAlt, faSyncAlt,
  faTachometerAlt,
  faTimes,
  faWallet, faWrench
} from '@fortawesome/free-solid-svg-icons';

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
  faWrench,
  faCaretUp,
  faCaretDown
);

dom.watch();


@Component({
  selector: 'plm-root',
  templateUrl: './plm.html',
  styleUrls: ['../static/scss/pages/plm.scss']
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
        let child = this._route.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          const title = child.snapshot.data['title'];
          this._title.setTitle(title);
        }
        this._ngRedux.dispatch({
          type: SITE.CHANGE_ROUTE,
          route: data.urlAfterRedirects
        });
      }
    });
  }
}
