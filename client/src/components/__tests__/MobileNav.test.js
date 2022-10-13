import React from "react";
import MobileNav from "../MobileNav";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

const resizeWindow = (x) => {
    window.innerWidth = x;
    window.dispatchEvent(new Event('resize'));
};

window.getComputedStyle = window.getComputedStyle || function( element ) {
    return element.currentStyle;
}

// Snapshot test to account for changes to the UI, whether expected or unexpected
test("MobileNav renders correctly", () => {
    const mobileNav= renderer.create(<MemoryRouter><MobileNav /></MemoryRouter>);
    expect(mobileNav).toMatchSnapshot();
});

// Unit Testing
test("MobileNav is rendered only when media query is below 978px", () => {
    const { getByTestId } = render(<MemoryRouter><MobileNav /></MemoryRouter>);
    const mobileNav = getByTestId("mobile-nav");

    // Resize window to media query 978px
    resizeWindow(600);
    expect(mobileNav).toHaveStlye("display: inline");

    // Resize window to desktop view
    resizeWindow(600);
    expect(mobileNav).toHaveStlye("display: none");
});

test("Exit MobileNav button exits correctly", () => {
    const closeMobileNavSpy = jest.fn();
    const { getByTestId } = render(<MemoryRouter><MobileNav closeMobileNav={closeMobileNavSpy}/></MemoryRouter>);
    const exitMobile = getByTestId("mobile-exit");

    fireEvent.click(exitMobile);
    expect(closeMobileNavSpy).toHaveBeenCalled();
});