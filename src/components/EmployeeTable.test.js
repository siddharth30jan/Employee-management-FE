import { testing, screen, cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EmployeeTable from "./EmployeeTable";

test("Should render employee table component", () => {
  render(
    <MemoryRouter>
      {" "}
      <EmployeeTable setActiveUser={() => {}} setFilteredBankData={() => {}} filteredBankData={[]} activeUser={{id: '122',role: 'HR'}}/>
    </MemoryRouter>
  );
  const element = screen.getByTestId("employeeTable");
  
  expect(element).toBeInTheDocument();
  
});
