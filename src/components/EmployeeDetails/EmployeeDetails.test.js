import { testing, screen, cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeDetails from "./EmployeeDetails";

test("Should render signup component", () => {
  render(
    <MemoryRouter>
      {" "}
      <EmployeeDetails filteredBankData={[]} setFilteredBankData={() => {}} activeUser={{id: '123123',role: 'Admin'}}/>
    </MemoryRouter>
  );
  const element = screen.getByTestId("EmployeeDetails");
   const element1 = screen.queryByTestId("loader");
//   const element2 = screen.getByTestId("signupBtn");
//   const element3 = screen.getByTestId("password");
//   const element4 = screen.getByTestId("email");
  expect(element).toBeInTheDocument();
  expect(element1).not.toBeInTheDocument();
//   expect(element2).toBeInTheDocument();
//   expect(element3).toBeInTheDocument();
//   expect(element4).not.toBeInTheDocument();
});
