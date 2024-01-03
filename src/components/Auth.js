import { Navigate, Outlet } from 'react-router-dom';
import checkAuth from '../auth/CheckAuth';

const Auth= () =>{
    return (checkAuth()) ? <Outlet/> : <Navigate to="login"/>
}

export default Auth; 