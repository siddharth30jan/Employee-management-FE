import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login({setActiveUser}){
    const [email,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    const notify = () => toast("Invalid creds!");



    const login_ = () =>{
        //call API
        fetch('http://localhost:3001/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body:JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        }).then(res => res.json())
        .then(data => {
            if(data.token){
                //success
                localStorage.setItem('employee',JSON.stringify({token: data.token,user: data.user}));
                setActiveUser(data.user)
                navigate(`/employee-list/`)
            }else{
                // render error screen
                notify()
            }
        })
    }
    return (
        <div data-testid="login" style={{width: '800px',margin: '50px auto',border: '1px solid grey',padding: '25px',display: 'flex',flexDirection: 'column'}}>
            <h1>Login</h1>
            <label style={{fontSize: '20px'}}>Email</label>
            <input data-testid="email" type='eamil' value={email} onChange={(e) => setUserName(e.target.value)} style={{width: '250px',marginLeft: '5px',fontSize: '20px'}}/>
            <label style={{ marginTop: '15px',fontSize: '20px'}}>Password</label>
            <input data-testid="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '250px',marginLeft: '5px',fontSize: '20px'}}/>
            <div style={{display: 'flex'}}>
            <button data-testid="loginBtn" onClick={login_}  style={{padding: '5px',marginTop: '30px',fontSize: '20px',width: '100px',cursor: 'pointer',marginRight: '15px'}}>Login</button>
            <button data-testid="signupBtn" onClick={() => navigate('/signup/')}  style={{padding: '5px',marginTop: '30px',fontSize: '20px',width: '100px',cursor: 'pointer'}}>Signup</button>

            </div>
            <ToastContainer />
        </div>
    )
}