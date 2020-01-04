import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SubheaderComponent} from '../components/subheader/subheader.component';
import {SALES} from '../static/dummy/sales';

storiesOf('Subheader', module)
  .addDecorator(
    moduleMetadata({
      declarations: [SubheaderComponent],
      imports: [FontAwesomeModule],
    }),
  )
  .add(
    'Title and Action button (with icon)',
    () => ({
      template: `<plm-subheader [data]="data"></plm-subheader>`,
      props: {
        data: {
          title: {
            text: 'Courses(6)'
          },
          action: {
            text: 'Add Course',
            color: 'primary',
            icon: ['fas', 'plus']
          }
        }
      }
    }),
    { notes: 'Title and Action button (with icon), button color is primary' }
  ).add(
    'Title (with icon) and Action button (with icon)',
  () => ({
    template: `<plm-subheader [data]="data"></plm-subheader>`,
    props: {
      data: {
        title: {
          icon: ['fas', 'book'],
          text: 'Coursepacks'
        },
        action: {
          icon: ['fas', 'plus'],
          text: 'Create Coursepack',
          color: 'primary'
        }
      }
    }
  }),
  {notes: 'Title (with icon) and Action button (with icon), button color is primary'}
).add(
    'Title (with icon) and Action button',
  () => ({
    template: `<plm-subheader [data]="data"></plm-subheader>`,
    props: {
      data: {
        title: {
          icon: ['far', 'check-circle'],
          text: 'Approved Coursepacks'
        },
        action: {
          icon: false,
          text: 'View More...',
          color: 'secondary'
        }
      }
    }
  }),
  {notes: 'Title (with icon) and Action button, button color is secondary'}
).add(
    'Title',
  () => ({
    template: `<plm-subheader [data]="data"></plm-subheader>`,
    props: {
      data: {
        title: {
          text: `Sales (${SALES.length})`,
          icon: false
        },
        action: false
      }
    }
  }),
  {notes: 'Title with no action button'}
).add(
    'Title and template',
  () => ({
    template: `
                <plm-subheader [data]="data">
                  <ng-container class="action-template">
                    <div class="text-alt-info font-w600">Template here</div>
                  </ng-container>
                </plm-subheader>`,
    props: {
      data: {
        title: {
          text: `Payments (7)`,
          icon: false
        },
        action: {
          template: true
        }
      }
    }
  }),
  {notes: 'Title with a template instead of action button'}
);
