import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const token = localStorage.getItem('token');

    if (token) {
        //token = ''sgsgxkhnlñ
        return <Outlet/>
    }else{
        // token null
        return <Navigate to='/login'/>
    }
}

export default ProtectedRoutes
