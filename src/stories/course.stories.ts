import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CourseComponent} from '../components/courses/course.component';
import {RatingsComponent} from '../components/ratings/ratings.component';

storiesOf('Courses', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CourseComponent, RatingsComponent],
      imports: [FontAwesomeModule],
    }),
  )
  .add(
    'With Ratings',
    () => ({
      template: `<plm-course [data]="data"></plm-course>`,
      props: {
        data: {
          price: 10,
          title: 'Marketing Tips 101',
          lessons: 25,
          hours: '17',
          approved: true,
          ratings: 4.5,
          reviews: 325
        }
      }
    })
  ).add(
    'Without Ratings',
    () => ({
      template: `<plm-course [data]="data"></plm-course>`,
      props: {
        data: {
          price: 10,
          title: 'Marketing Tips 101',
          lessons: 25,
          hours: '17',
          approved: true,
          reviews: 325
        }
      }
    })
  );
