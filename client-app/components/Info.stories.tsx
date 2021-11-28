/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { withDesign } from 'storybook-addon-designs';
import Info from './Info';

export default {
  title: 'Info',
  component: Info,
  decorators: [withDesign],
} as Meta;

export const infoStory: Story = () => <Info />;

infoStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
  },
};
