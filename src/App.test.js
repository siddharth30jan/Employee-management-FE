import { testing, screen, cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("Should render employee table component", () => {
  render(
    <App />
  );
  const element = screen.queryByTestId("app");
  
  expect(element).toBeInTheDocument();
  
});
