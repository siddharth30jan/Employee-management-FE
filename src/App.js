import React, { useState, useEffect } from "react";
import EmployeeTable from "./components/EmployeeTable.js";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";
import AddEmployee from "./components/AddEmployee/AddEmployee.js";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import ProtectedRoutes from "./components/ProtectedRoutes.js";

function App() {
  const [bankData, setBankData] = useState([]);
  const [filteredBankData, setFilteredBankData] = useState([]);
  const [activeUser, setActiveUser] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("employee"))?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        if (data) {
          const currentUser = JSON.parse(localStorage.getItem("employee"));
          setActiveUser(currentUser?.user);

          if (currentUser?.user?.role === "HR") {
            setFilteredBankData(
              data
                .map((entry) => entry[0])
                .filter((entry) => entry.role !== null)
                .filter((entry) => entry.role !== "Admin")
            );
          }else if(currentUser?.user?.role === "User"){
            debugger
            setFilteredBankData(
              data
                .map((entry) => entry[0])
                .filter((entry) => entry.role !== null)
                .filter((entry) => entry.role === "User")
            );
          }else{
            setFilteredBankData(
              data
                .map((entry) => entry[0])
                .filter((entry) => entry.role !== null)
            );
          }
        }
      });
  }, []);
  const [favouriteBanks, setFavouriteBanks] = useState([]);
  const [selectedCity, setSelectedCity] = useState("MUMBAI");
  const [allData, setAllData] = useState({});

  console.log(activeUser, "activeUser");
  return (
    <Router>
      <div className="App" data-testid="app">
        <Routes>
          <Route
            path="/login"
            element={<Login setActiveUser={setActiveUser} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/add" element={<><Navbar filteredBankData={filteredBankData} /> <AddEmployee /></>} />
            <Route
              path="/employee-list"
              element={
                <>
                  <Navbar filteredBankData={filteredBankData} />
                  <EmployeeTable
                    bankData={bankData}
                    setBankData={setBankData}
                    filteredBankData={filteredBankData}
                    setFilteredBankData={setFilteredBankData}
                    favouriteBanks={favouriteBanks}
                    setFavouriteBanks={setFavouriteBanks}
                    selectedCity={selectedCity}
                    setSelectedCity={setSelectedCity}
                    allData={allData}
                    setAllData={setAllData}
                    activeUser={activeUser}
                    setActiveUser={setActiveUser}
                  />
                </>
              }
            />
            <Route
              path="/employee-details/:id"
              element={
                <>
                  <Navbar
                    filteredBankData={filteredBankData}
                    activeUser={activeUser}
                  />
                  <EmployeeDetails
                    setFilteredBankData={setFilteredBankData}
                    filteredBankData={filteredBankData}
                    activeUser={activeUser}
                  />
                </>
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
