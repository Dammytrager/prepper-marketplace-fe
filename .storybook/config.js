import { configure, addParameters } from '@storybook/angular';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faBook, faPlus} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import theme from './theme.js';

const req = require.context('../src/stories', true, /.stories.ts$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    theme: theme
  }
});

configure(loadStories, module);

library.add(faPlus, faBook, faCheckCircle,);
