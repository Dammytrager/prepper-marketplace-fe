import {DashboardInterface} from './dashboard.interface';
import {SiteInterface} from './site.interface';

export interface AppState {
  dashboard: DashboardInterface;
  site: SiteInterface;
}
