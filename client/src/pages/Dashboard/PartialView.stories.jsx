import PartialView

from "./PartialView";

//👇 This default export determines where your story goes in the story list
export default {
    /* 👇 The title prop is optional.
    * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    * to learn how to generate automatic titles
    */
    title: 'PartialView',
    component: PartialView,
  };
  
  //👇 We create a “template” of how args map to rendering
  const Template = (args) => <PartialView {...args} />;
  
  export const FirstStory = {
    args: {
        title: "StoryBook Test",
        image: "https://www.ecosia.org/images?q=drop%20down%20like%20google%20images%20html%20css#id=8313FFDF3E9CDBC97F9A27492E8C441675DF2EF5",
        desc: "testing if storybook is working and if partial view is working",
        date: "12/02/02",
        _id: "/6325c0d2c579241489ad0bd0"
      //👇 The args you need here will depend on your component
    },
  };