import React from "react";
import ViewToggle from "../viewToggle";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';

// Snapshot test to account for changes to the UI, whether expected or unexpected
test("viewToggle slider renders correctly", () => {
    const viewToggle = renderer.create(<ViewToggle />).toJSON();
    expect(viewToggle).toMatchSnapshot();
});

// Unit Testing
test("viewToggle slider contains initial input value of false", () => {
    const { getByTestId } = render(<ViewToggle />);
    const checkEl = getByTestId("check-viewToggle");
    expect(checkEl.checked).toEqual(false);

});

test("viewToggle slider contains input value of true on click", () => {
    const { getByTestId } = render(<ViewToggle />);
    const checkEl = getByTestId("check-viewToggle");
    const sliderEl = getByTestId("slider-viewToggle");

    fireEvent.click(sliderEl);
    expect(checkEl.checked).toEqual(true);
});