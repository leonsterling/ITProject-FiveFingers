import React from "react";
import LogInForm from "../src/pages/Login/LoginForm";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

// Snapshot test to account for changes to the UI, whether expected or unexpected
test("Login Form renders correctly", () => {
    const loginForm = renderer.create(<MemoryRouter><LogInForm /></MemoryRouter>).toJSON();
    expect(loginForm).toMatchSnapshot();
});

// Unit Testing
test("Username and Password input field initially empty", () => {
    const { getByTestId } = render(<MemoryRouter><LogInForm /></MemoryRouter>);
    const usernameField = getByTestId("userField");
    const passwordField = getByTestId("passwordField");

    expect(usernameField.textContent).toBe("");
    expect(passwordField.textContent).toBe("");
});

test("Username input field changes correctly", () => {
    const { getByTestId } = render(<MemoryRouter><LogInForm /></MemoryRouter>);
    const usernameField = getByTestId("userField");
    const passwordField = getByTestId("passwordField");

    fireEvent.change(usernameField, {
        target: {
            value: "username"
        }
    });

    fireEvent.change(passwordField, {
        target: {
            value: "password"
        }
    });

    expect(usernameField.value).toBe("username");
    expect(passwordField.value).toBe("password");
});

test("Sign In Button submits form", () => {
    
});

test("Returned feedback is correct", () => {
    
});

