import {moduleMetadata, storiesOf} from '@storybook/angular';
import {RatingsComponent} from '../components/ratings/ratings.component';
import {PaginationComponent} from '../components/pagination/pagination.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

storiesOf('Pagination', module)
  .addDecorator(
    moduleMetadata({
      declarations: [PaginationComponent],
      imports: [NgbPaginationModule]
    }),
  )
  .add(
    'right aligned pagination',
    () => ({
      template: `<plm-pagination [options]="options"></plm-pagination>`,
      props: {
        options: {
          classNames: 'd-flex justify-content-end',
          size: 'sm'
        }
      }
    }),
  ).add(
    'left aligned pagination',
    () => ({
      template: `<plm-pagination [options]="options"></plm-pagination>`,
      props: {
        options: {
          classNames: 'd-flex justify-content-start',
          size: 'sm'
        }
      }
    }),
  ).add(
    'center aligned pagination',
    () => ({
      template: `<plm-pagination [options]="options"></plm-pagination>`,
      props: {
        options: {
          classNames: 'd-flex justify-content-center',
          size: 'sm'
        }
      }
    }),
  ).add(
    'Large size pagination',
    () => ({
      template: `<plm-pagination [options]="options"></plm-pagination>`,
      props: {
        options: {
          classNames: 'd-flex justify-content-center',
          size: 'lg'
        }
      }
    }),
  ).add(
    'Medium size pagination',
    () => ({
      template: `<plm-pagination [options]="options"></plm-pagination>`,
      props: {
        options: {
          classNames: 'd-flex justify-content-center',
          size: ''
        }
      }
    }),
  );
