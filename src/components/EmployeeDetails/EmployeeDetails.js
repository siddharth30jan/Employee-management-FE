import React, { useEffect } from "react";
import "react-dropdown/style.css";
import "./EmployeeDetails.css";
import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";

const EmployeeDetails = ({
  filteredBankData,
  setFilteredBankData,
  activeUser,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const bank = filteredBankData.filter((bank) => bank?.id == params?.id)[0];

  const [employeeName, setEmployeeName] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [teamName, setTeamName] = useState("");
  const [role, setRole] = useState("");
  const [onEditMode, setEditMode] = useState(false);

  useEffect(() => {
    if (bank) {
      setEmployeeName(bank.employeeName);
      setAddress(bank.address);
      setDesignation(bank.designation);
      setTeamName(bank.teamName);
      setRole(bank.role);
    }
  }, [bank]);

  const roleOptions = ["Admin", "HR", "User"];

  const isDisable = (payload) => {
    if (activeUser.role === "Admin") {
      return false;
    } else if (activeUser.role === "HR") {
      if (bank.role == "HR") {
        if (payload === "employeeName" || payload === "address") {
          return params?.id !== activeUser.id;
        }
        return true;
      } else {
        return false;
      }
    } else {
      if (payload === "employeeName" || payload === "address") {
        return params?.id !== activeUser.id;
      }
      return true;
    }
  };

  return (
    <div className="parent">
      {activeUser ? (
        <div data-testid="EmployeeDetails">
          <h1>Employee Details </h1>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "880px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "300px" }}>
                  <label style={{ width: "90px", fontSize: "20px" }}>
                    Employee Name:
                  </label>
                  <input
                    name="name"
                    style={{ fontSize: "20px" }}
                    type="text"
                    value={employeeName}
                    disabled={!onEditMode || isDisable("employeeName")}
                    onChange={(e) => setEmployeeName(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: "60px", width: "300px" }}>
                  <label style={{ width: "90px", fontSize: "20px" }}>
                    Address:
                  </label>
                  <input
                    name="address"
                    style={{ fontSize: "20px" }}
                    type="text"
                    value={address}
                    disabled={!onEditMode || isDisable("address")}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "25px",
                }}
              >
                <div style={{ width: "300px" }}>
                  <label style={{ width: "90px", fontSize: "20px" }}>
                    Designation:
                  </label>
                  <input
                    name="designation"
                    type="text"
                    value={designation}
                    style={{ fontSize: "20px" }}
                    disabled={!onEditMode || isDisable("designation")}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: "60px", width: "300px" }}>
                  <label style={{ width: "90px", fontSize: "20px" }}>
                    Team Name:
                  </label>
                  <input
                    name="teamName"
                    type="text"
                    style={{ fontSize: "20px" }}
                    value={teamName}
                    disabled={!onEditMode || isDisable("teamName")}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{marginTop: '25px'}}>
            <label style={{ width: "90px", fontSize: "20px" }}>Role:</label>
            <Dropdown
              name="role"
              className="categoryDropdown"
              options={roleOptions}
              onChange={(role) => setRole(role?.value)}
              value={role}
              disabled={!onEditMode || isDisable("role")}
            />
          </div>
          <div style={{ marginTop: "25px" }}>
            <button
              onClick={() => {
                if (onEditMode) {
                  fetch(`http://localhost:3001/${params?.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("employee"))?.token
                      }`,
                    },
                    body: JSON.stringify({
                      employeeName,
                      designation,
                      teamName,
                      age: bank.age,
                      role,
                      address,
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data) {
                        setFilteredBankData(data.map((entry) => entry[0]));
                      }
                    });
                }
                setEditMode(!onEditMode);
              }}
              style={{fontSize: '20px',padding: '8px',marginRight: '20px',cursor: 'pointer'}}
            >
              {onEditMode ? "Save" : "Edit"}
            </button>
            {activeUser.role !== "User" && (
              <button
                onClick={() => {
                  fetch(`http://localhost:3001/${params?.id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${
                        JSON.parse(localStorage.getItem("employee"))?.token
                      }`,
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data) {
                        setFilteredBankData(data.map((entry) => entry[0]));
                        setFilteredBankData(
                          filteredBankData.filter(
                            (bank) => bank?.id != params?.id
                          )
                        );
                        navigate(`/employee-list`);
                      }
                    });
                }}
                style={{fontSize: '20px',padding: '8px',background: 'red',color: 'white',cursor: 'pointer'}}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <h1 data-testid="loader">Loading...</h1>
      )}
    </div>
  );
};

export default EmployeeDetails;
