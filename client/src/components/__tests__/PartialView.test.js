import React from "react";
import PartialView from "../src/pages/Dashboard/PartialView";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

// Snapshot test to account for changes to the UI, whether expected or unexpected
test("Partial View renders correctly", () => {
    const args = { 
        title: "StoryBook Test",
        image: "https://www.ecosia.org/images?q=drop%20down%20like%20google%20images%20html%20css#id=8313FFDF3E9CDBC97F9A27492E8C441675DF2EF5",
        desc: "testing if storybook is working and if partial view is working",
        date: "12/02/02",
        _id: "/6325c0d2c579241489ad0bd0"
    };
    const partialView = renderer.create(<MemoryRouter><PartialView {...args}/></MemoryRouter>).toJSON();
    expect(partialView).toMatchSnapshot();
});