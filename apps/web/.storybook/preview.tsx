import '../src/assets/css/app.css';

import type { Preview } from '@storybook/react';
import { DarkModeDecorator } from './dark-mode.decorator';

const decorators = [DarkModeDecorator];

const preview: Preview = {
  decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
