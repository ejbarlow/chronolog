import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the header", () => {
  render(<App />);
  const headerElement = screen.getByRole(/banner/i);
  expect(headerElement).toBeInTheDocument();
});

test("Renders the main content area", () => {
  render(<App />);
  const mainElement = screen.getByRole(/main/i);
  expect(mainElement).toBeInTheDocument();
});

test("Renders the navigation", () => {
  render(<App />);
  const navElement = screen.getByRole(/navigation/i);
  expect(navElement).toBeInTheDocument();
});

export {};
