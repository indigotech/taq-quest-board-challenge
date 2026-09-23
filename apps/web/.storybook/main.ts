export default {
  stories: ['../src/atomic/**/*.mdx', '../src/atomic/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: true,
  },
};
