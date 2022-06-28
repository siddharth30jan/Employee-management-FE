import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ filteredBankData }) => {
  const navigate = useNavigate();
  return (
    <div className="outerNav" data-testid="navbar">
      <h1>Employee Management System</h1>
      <div className="inner">
        <NavLink className="link" to="/employee-list">
          Employess
        </NavLink>
        <SelectSearch
        data-testid="dropdown"
          onBlur={function noRefCheck() {}}
          onChange={function noRefCheck() {}}
          onFocus={function noRefCheck() {}}
          closeOnSelect={true}
          options={[]}
          search
          getOptions={(query) => {
            return new Promise((resolve, reject) => {
              if (query.length === 0) resolve([]);
              const search = query;
              const arr = search.split(",");

              if (arr.length === 1) {
                let temp = filteredBankData.filter((ele) =>
                  ele.employeeName.toLowerCase().includes(arr[0].toLowerCase())
                );
                console.log(temp, "temp");

                if (temp.length > 0) {
                  //ok
                  resolve(
                    temp.map((entry) => {
                      return { name: entry.employeeName, value: entry.id };
                    })
                  );
                } else {
                  temp = filteredBankData.filter((ele) =>
                    ele.id.includes(arr[0].toLowerCase())
                  );
                  // temp = filteredBankData.filter(ele => ele.employeeName == arr[0]);
                  // ok
                  console.log(temp, " - temp");
                  resolve(
                    temp.map((entry) => {
                      return { name: entry.employeeName, value: entry.id };
                    })
                  );
                }
              } else {
                let temp = filteredBankData
                  .filter((ele) =>
                    ele.employeeName
                      .toLowerCase()
                      .includes(arr[0].toLowerCase())
                  )
                  .filter((ele) => ele.id.includes(arr[1]));
                console.log(temp, "temp");
                resolve(
                  temp.map((entry) => {
                    return { name: entry.employeeName, value: entry.id };
                  })
                );
                // ok
              }

              // return searchResult
            });
          }}
          emptyMessage={() => "Search..."}
          placeholder="Search name,id"
          onChange={(e) => navigate(`/employee-details/${e}`)}
        />
        
      </div>
      <button
          style={{ marginTop: '15px', marginLeft: "25px", padding: "5px",fontSize:'20px', width: "122px",cursor: 'pointer' }}
          onClick={() => {
            localStorage.removeItem("employee");
            navigate("/login/");
          }}
        >
          Log out
        </button>
    </div>
  );
};

export default Navbar;
