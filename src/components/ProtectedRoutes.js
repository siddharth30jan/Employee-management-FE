import { Navigate, navigate,Outlet } from "react-router-dom";

const auth=()=>{

const data = JSON.parse(localStorage.getItem('employee'))

return data?.token
}


const ProtectedRoutes = () =>{
    const isAuth = auth()
    return isAuth? <Outlet data-testid="outlet" /> : <Navigate to={'/login'} />
}

export default ProtectedRoutes