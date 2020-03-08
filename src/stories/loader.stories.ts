import {moduleMetadata, storiesOf} from '@storybook/angular';
import {RatingsComponent} from '../components/ratings/ratings.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {LoaderComponent} from '../components/loader/loader.component';

storiesOf('Loader', module)
  .addDecorator(
    moduleMetadata({
      declarations: [LoaderComponent]
    }),
  )
  .add(
    'Type 1 loader with color green',
    () => ({
      template: `<plm-loader [data]="data"></plm-loader>`,
      props: {
        data: {
          type: 1,
          color: 'green',
          size: '1x'
        }
      }
    }),
  ).add(
  'Type 2 loader with color blue',
  () => ({
    template: `<plm-loader [data]="data"></plm-loader>`,
    props: {
      data: {
        type: 2,
        color: 'blue',
        size: '1x'
      }
    }
  }),
).add(
  'Type 3 loader with size 2x and color blue',
  () => ({
    template: `<plm-loader [data]="data"></plm-loader>`,
    props: {
      data: {
        type: 3,
        color: 'blue',
        size: '2x'
      }
    }
  }),
);
