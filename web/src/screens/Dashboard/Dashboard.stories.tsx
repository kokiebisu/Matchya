import { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Component from './Dashboard';

import { Header } from '@/components/ui/Header/Header';

const meta: Meta<typeof Component> = {
  title: 'Template',
  component: Component,
  decorators: [
    Story => (
      <Router>
        <Story />
      </Router>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Component>;

export const Dashboard: Story = {
  render: () => {
    return (
      <>
        <Header authenticated={true} />
        <Component />
      </>
    );
  },
};
