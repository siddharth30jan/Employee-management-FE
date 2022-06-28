import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './EmployeeTable.css'
import { Loader } from 'rsuite';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const EmployeeTable = ({ activeUser, setActiveUser, filteredBankData, setFilteredBankData }) => {


    const [search, setSearch] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const notify = () => toast("Something went wrong..");



    useEffect(()=>{
        fetch('http://localhost:3001/',{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('employee'))?.token}`
          }})
        .then(res => res.json())
        .then(data => {
         if(data){
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
         }
        })
      
      },[])

    const roleOptions = [
        'All Employess','Admin','HR','User'
    ];
   
    const columns = [
        {
            name: 'Employee Name',
            selector: row => row?.employeeName,
            sortable: true
        },
        {
            name: 'ID',
            selector: row => row?.id,
            sortable: true
        },
        {
            name: 'Role',
            selector: row => row?.role,
            sortable: true
        },
        {
            name: 'Age',
            selector: row => row?.age
        },
        {
            name: 'Designation',
            selector: row => row?.designation
        },
        {
            name: 'Team Name',
            selector: row => row?.teamName
        },
        {
            name: 'Address',
            selector: row => row?.address
        },
    ]
  
        const getUpdatedState = () =>{
            return filteredBankData.filter(employee => {
                if(search === '') return employee
                return employee.employeeName.toLowerCase().includes(search?.toLowerCase())
            }).filter(employee => {
                if(!selectedRole || selectedRole === 'All Employess') return employee
                return employee.role === selectedRole
            })
        }


    return (
        <body className="outer">
            {
                <div data-testid="employeeTable">
                    <DataTable
                        title="Employees"
                        columns={columns}
                        progressPending={isLoading}
                        progressComponent={<Loader backdrop content="Loading..." vertical />}
                        data={getUpdatedState()}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight="450px"
                        highlightOnHover
                        subHeader
                        subHeaderComponent={
                            <div className="filterOptions">
                              <Dropdown
                                    name="role"
                                    className="categoryDropdown"
                                    options={roleOptions}
                                    onChange={(role) => setSelectedRole(role?.value)}
                                    value={selectedRole}
                                    placeholder="Filter on Role"
                                    disabled={isLoading}
                                />
                                <input
                                    name="searchInput"
                                    className="inputSearch"
                                    type="text"
                                    // disabled={!selectedRole || isLoading}
                                    placeholder="Search by username , id"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{marginLeft: '10px'}}
                                />
                                {
                                    
                                    activeUser.role === 'HR' && (
                                        <button style={{marginLeft: '25px'}} onClick={() =>  navigate('/add/')}>Add Employee</button>
                                    )
                                   
                                }
                               
                            </div>
                        }
                        onRowClicked={(row) => {
                            navigate(`/employee-details/${row?.id}`)
                        }}

                    />
                    <ToastContainer />
                </div>
            }

        </body>
    )
}

export default EmployeeTable