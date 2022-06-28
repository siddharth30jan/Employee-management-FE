import Dropdown from 'react-dropdown';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Signup(){
    const [email,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [passwordNext,setPasswordNext] = useState('')
 
    const navigate = useNavigate();
    const notify = (data) => toast(data);
  
    const roleOptions = [
        'Admin','HR','User'
    ];
    const signup_ = () =>{
        if(password !== passwordNext) {
            //errror
            notify('Passwords dont match!')
            return
        }
        //call API
        const payload = {
            email,
            password
        }
        console.log(payload)
        fetch('http://localhost:3001/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data == 'Success'){
                //success
                navigate(`/login/`)
            }else{
                // render error screen
                notify(data || 'Some issue,plz try again')
            }
        })
    }
    return (
        <div data-testid="signup" style={{width: '800px',margin: '50px auto',border: '1px solid grey',padding: '25px',display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
            <h1>Sign up</h1>
            <label style={{fontSize: '20px'}}>Email</label>
            <input type='email' value={email} onChange={(e) => setUserName(e.target.value)} style={{marginTop: '10px',fontSize: '20px'}}/>
            <label style={{marginLeft: '15px',fontSize: '20px',marginTop: '15px'}}>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{marginTop: '10px',fontSize: '20px'}}/>
            <label style={{marginLeft: '15px',fontSize: '20px',marginTop: '15px'}}>Re-enter Password</label>
            <input type='password' value={passwordNext} onChange={(e) => setPasswordNext(e.target.value)} style={{marginTop: '10px',fontSize: '20px'}}/>

            <button onClick={signup_}  style={{padding: '8px',marginTop: '30px',fontSize: '20px'}}>Sign up</button>
            <ToastContainer />
        </div>
    )
}