import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

window.scrollTo = jest.fn();

test("Renders the header", () => {
  render(<App />);
  userEvent.click(screen.getByText("Dismiss"));
  const headerElement = screen.getByRole(/banner/i);
  expect(headerElement).toBeInTheDocument();
});

test("Renders the main content area", () => {
  render(<App />);
  userEvent.click(screen.getByText("Dismiss"));
  const mainElement = screen.getByRole(/main/i);
  expect(mainElement).toBeInTheDocument();
});

test("Renders the navigation", () => {
  render(<App />);
  userEvent.click(screen.getByText("Dismiss"));
  const navElement = screen.getByRole(/navigation/i);
  expect(navElement).toBeInTheDocument();
});

export {};
