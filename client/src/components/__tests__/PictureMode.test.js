import React from "react";
import viewToggle from "../viewToggle";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Picture Mode card renders with correct styling", () => {
    const { getByTestId } = render(<viewToggle />);
    const toggleEl = getByTestId("viewToggle");

    expect();
});

test("Picture Mode card renders input data correctly", () => {

});

test("Picture Mode card renders selected field container and kebab menu at hover", () => {

});

test("Picture Mode card renders Partial View on click", () => {

});

test("Picture Mode layout is responsive", () => {

});