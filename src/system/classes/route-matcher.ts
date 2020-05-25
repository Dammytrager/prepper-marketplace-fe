import {UrlSegment} from '@angular/router';

export class RouteMatcher {
  static subjectsRoute(url) {
    if (url.length === 2 && url[1].path.match(/^[a-f\d]{24}$/i) && url[0].path === 'subjects') {
      return {
        consumed: url,
        posParams: {
          id: new UrlSegment(url[1].path, {})
        }
      };
    }
    return null;
  }

  static lessonsRoute(url) {
    if (url.length === 3 && url[2].path.match(/^[a-f\d]{24}$/i) && url[0].path === 'subjects' && url[1].path === 'topics') {
      return {
        consumed: url,
        posParams: {
          id: new UrlSegment(url[2].path, {})
        }
      };
    }
    return null;
  }
}
