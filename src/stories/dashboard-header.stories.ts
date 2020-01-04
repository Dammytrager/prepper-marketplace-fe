import {moduleMetadata, storiesOf} from '@storybook/angular';
import {DashboardHeaderComponent} from '../components/dashboard-header/dashboard-header.component';

storiesOf('Dashboard Header', module)
  .addDecorator(
    moduleMetadata({
      declarations: [DashboardHeaderComponent],
    }),
  )
  .add(
    'With Big Header and Small Header',
    () => ({
      template: `<plm-dashboard-header [data]="data"></plm-dashboard-header>`,
      props: {
        data: {
          bigHeader: 'Coursepacks',
          smallHeader: '16 Coursepacks | 4 Approved'
        }
      }
    }),
    { notes: 'With Big Header and Small Header, default background is blue'}
  ).add(
    'With Big Header and Small Header and white background',
    () => ({
      template: `<plm-dashboard-header [data]="data"></plm-dashboard-header>`,
      props: {
        data: {
            bigHeader: 'Creative Thinking',
            smallHeader: '3 Lessons',
            bgColor: 'white',
            additionalContent: false
        }
      }
    }),
    { notes: 'With Big Header and Small Header and white background'}
  ).add(
    'With Big Header, Small Header and additional contents',
    () => ({
      template: `
                  <plm-dashboard-header [data]="data">
                      <ng-container class="additional-content">
                        <div>
                          Additional Html Data
                        </div>
                      </ng-container>
                  </plm-dashboard-header>
                `,
      props: {
        data: {
          bigHeader: 'Prepare for the workforce',
          smallHeader: '6 courses',
          bgColor: 'white',
          additionalContent: true
        }
      }
    }),
    { notes: 'With Big Header. Small Header and additional html data, background color is white' }
  );
