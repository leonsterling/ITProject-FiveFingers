import React from 'react';

import Slider from '../pages/Dashboard/viewToggle';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/ViewToggle',
  component: Slider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  isToggled: false, 
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  isToggled: true
};
