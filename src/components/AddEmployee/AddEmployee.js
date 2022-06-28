import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddEmployee.css'

export default function AddEmployee(){
    const [email,setUserName] = useState('')
    const [name,setName] = useState('')
    const [designation,setDesignation] = useState('')
    const [teamName,setTeamName] = useState('')
    const [age,setAge] = useState('')
    const [selectedRole,setSelectedRole] = useState('')
    const [address,setAddress] = useState('')
    const navigate = useNavigate();
    const notify = (data) => toast(data);
    const roleOptions = [
        'Admin','HR','User'
    ];
    const addEmployee_ = () =>{
        //call API
        const payload = {
            email,
            employeeName: name,
            designation,
            teamName,
            age,
            role: selectedRole,
            address
        }
        if(!email || !name || !designation || !teamName || !age || !selectedRole || !address){
            notify(`Please enter all values`)
            return
        }  

        fetch('http://localhost:3001/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('employee'))?.token}`
            },
            body:JSON.stringify(payload)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data == 'Success'){
                //success
                navigate(`/employee-list/`)
            }else{
                // render error screen
                notify(data)
            }
        })
    }
    return (
        <div data-testid="AddEmployee" style={{background: 'floralwhite', width: '800px',margin: '50px auto',border: '1px solid grey',padding: '25px',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
            <h1>Add Employee</h1>
            <label className='fontSize'>Email</label>
            <input  className='fontSize' type='email' value={email} onChange={(e) => setUserName(e.target.value)} style={{marginTop: '10px'}}/>
            <label  className='fontSize'>Name</label>
            <input  className='fontSize' type='text' value={name} onChange={(e) => setName(e.target.value)} style={{marginTop: '10px'}}/>
            <label  className='fontSize'>Designation</label>
            <input  className='fontSize' type='text' value={designation} onChange={(e) => setDesignation(e.target.value)} style={{marginTop: '10px'}}/>
            <label className='fontSize' >Team name</label>
            <input  className='fontSize' type='text' value={teamName} onChange={(e) => setTeamName(e.target.value)} style={{marginTop: '10px'}}/>
            <label className='fontSize' >Age</label>
            <input  className='fontSize' type='number' value={age} onChange={(e) => setAge(e.target.value)} style={{marginTop: '10px'}}/>
            <label className='fontSize' >Address</label>
            <input className='fontSize'  type='text' value={address} onChange={(e) => setAddress(e.target.value)} style={{marginTop: '10px'}}/>
            <label className='fontSize' >Role</label>
            <Dropdown
                name="role"
                className="categoryDropdown"
                options={roleOptions}
                onChange={(role) => setSelectedRole(role?.value)}
                value={selectedRole}
                placeholder="Select Role"
             />

            <button onClick={addEmployee_}  style={{padding: '8px',marginTop: '30px',fontSize: '20px',cursor: 'pointer',background: 'antiquewhite'}}>Add Employee</button>
            <ToastContainer />
        </div>
    )
}