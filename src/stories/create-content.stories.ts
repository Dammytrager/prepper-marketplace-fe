import {moduleMetadata, storiesOf} from '@storybook/angular';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CreateContentComponent} from '../components/create-content/create-content.component';

storiesOf('Create Content', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CreateContentComponent],
      imports: [FontAwesomeModule],
    }),
  )
  .add(
    'With 1 field',
    () => ({
      template: `<plm-create-content [data]="data"></plm-create-content>`,
      props: {
        data: {
          title: 'Title',
          formFieldsCount: 1,
          formFields: [
            {
              placeholder: 'Placeholder',
              type: 'text'
            }
          ],
          button: {
            text: 'Add',
            icon: ['fas', 'plus']
          }
        }
      }
    }),
    {notes: 'One field and the field type is text'}
  ).add(
    'With 2 fields',
    () => ({
      template: `<plm-create-content [data]="data"></plm-create-content>`,
      props: {
        data: {
          title: 'Title',
          formFieldsCount: 2,
          formFields: [
            {
              type: 'text',
              placeholder: 'Placeholder'
            },
            {
              type: 'select',
              options: [
                {
                  value: '',
                  text: 'Select option'
                },
                {
                  value: '',
                  text: 'option 1'
                },
                {
                  value: '',
                  text: 'option 2'
                },
                {
                  value: '',
                  text: 'option 3'
                }
              ]
            }
          ]
        }
      }
    }),
  {notes: 'with two fields one is text and the other is select'}
  );
