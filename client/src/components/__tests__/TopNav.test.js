import React from "react";
import TopNav from "../TopNav";
import { render, fireEvent } from "@testing-library/react";
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
test("TopNav renders correctly", () => {
    const topNav = renderer.create(<MemoryRouter><TopNav /></MemoryRouter>).toJSON();
    expect(topNav).toMatchSnapshot();
});

// Unit Testing
test("TopNav renders Hamburger Menu Icon only at window width 978px and below", () => {
    const { getByTestId } = render(<MemoryRouter><TopNav /></MemoryRouter>);
    const hamburgerBtn = getByTestId("hamburger-btn");

    // Resize window to standard Desktop width
    resizeWindow(1080);
    expect(hamburgerBtn).toHaveStyle("display:none");

    // Resize window to media query 978px
    resizeWindow(600);
    expect(hamburgerBtn).toHaveStyle('display:inline');

    // Resize window back to standard Desktop width
    resizeWindow(1080);
    expect(hamburgerBtn).toHaveStyle("display:none");
});

test("TopNav renders only Hamburger Menu at media query 480px", () => {
    const { getByTestId } = render(<MemoryRouter><TopNav /></MemoryRouter>);
    const navLeft = getByTestId("nav-left");
    const navRight = getByTestId("nav-right");
    const hamburgerBtn = getByTestId("hamburger-btn");

    // Resize window to media query 480px
    resizeWindow(1080);
    expect(navLeft).toHaveStyle("display:none");
    expect(navRight).toHaveStyle("display:none");
    expect(hamburgerBtn).toHaveStyle("display:inline");
});

test("TopNav Hamburger Menu renders Mobile Nav on click", () => {
    const openMobileNavSpy = jest.fn();
    const { getByTestId } = render(<MemoryRouter><TopNav openMobileNav={openMobileNavSpy}/></MemoryRouter>);
    const hamburgerBtn = getByTestId("hamburger-btn");

    fireEvent.click(hamburgerBtn);
    expect(openMobileNavSpy).toHaveBeenCalled();
});