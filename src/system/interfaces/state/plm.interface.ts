import {DashboardInterface} from './dashboard.interface';
import {SiteInterface} from './site.interface';
import {UserInterface} from './user.interface';

export interface AppState {
  dashboard: DashboardInterface;
  site: SiteInterface;
  user: UserInterface;
}
