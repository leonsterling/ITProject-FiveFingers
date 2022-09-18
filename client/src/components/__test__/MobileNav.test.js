import React from "react";
import viewToggle from "../viewToggle";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("MobileNav renders with correct elements and text", () => {
    const { getByTestId } = render(<viewToggle />);
    const toggleEl = getByTestId("viewToggle");

    expect();
});

test("MobileNav renders with dropdown animation", () => {

});

test("MobileNav is rendered only when media query is below 978px", () => {

});

test("MobileNav elements changes color at hover", () => {

});