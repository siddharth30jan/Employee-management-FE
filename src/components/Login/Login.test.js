import { testing, screen, cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

test("Should render login component", () => {
  render(
    <MemoryRouter>
      {" "}
      <Login setActiveUser={() => {}} />
    </MemoryRouter>
  );
  const element = screen.getByTestId("login");
  const element1 = screen.getByTestId("loginBtn");
  const element2 = screen.getByTestId("signupBtn");
  const element3 = screen.getByTestId("password");
  const element4 = screen.getByTestId("email");
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
  expect(element3).toBeInTheDocument();
  expect(element4).toBeInTheDocument();
});
