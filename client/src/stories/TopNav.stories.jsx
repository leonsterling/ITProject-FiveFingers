import React from 'react';
import TopNav from './TopNav-stories';

export default {
    title: 'Component/TopNav',
    component: TopNav,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
};

const Template = (args) => <TopNav {...args} />;

export const Primary = Template.bind({});
