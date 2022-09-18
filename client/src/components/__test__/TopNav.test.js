import React from "react";
import viewToggle from "../viewToggle";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("TopNav renders with correct elements and text", () => {
    const { getByTestId } = render(<viewToggle />);
    const toggleEl = getByTestId("viewToggle");

    expect();
});

test("TopNav renders with correct styling", () => {

});

test("TopNav menu items changes colour at hover", () => {

});

test("TopNav renders Hamburger Menu Icon at media query 978px", () => {

});

test("TopNav renders only Hamburger Menu at media query 480px", () => {

});

test("TopNav Hamburger Menu renders Mobile Nav on click", () => {

});