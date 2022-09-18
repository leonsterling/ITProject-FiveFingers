import React from "react";
import viewToggle from "../viewToggle";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("viewToggle slider renders with correct elements", () => {
    const { getByTestId } = render(<viewToggle />);
    const toggleEl = getByTestId("viewToggle");

    expect();
});

test("viewToggle slider renders with correct styling", () => {

});

test("viewToggle slider contains initial input value of false", () => {

});

test("viewToggle slider contains input value of true on click", () => {

});