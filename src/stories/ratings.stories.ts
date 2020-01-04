import {moduleMetadata, storiesOf} from '@storybook/angular';
import {RatingsComponent} from '../components/ratings/ratings.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

storiesOf('Ratings', module)
  .addDecorator(
      moduleMetadata({
        declarations: [RatingsComponent],
        imports: [FontAwesomeModule],
      }),
    )
  .add(
    'default',
    () => ({
      template: `<plm-ratings [ratings]="ratings"></plm-ratings>`,
      props: {
        ratings: 3
      }
    }),
  );
