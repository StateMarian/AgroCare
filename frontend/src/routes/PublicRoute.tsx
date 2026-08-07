import { useAuth } from "../context/AuthContext";
import { Navigate , Outlet } from "react-router-dom";

function PublicRoute(){
    const {user, loading} = useAuth();

    if(loading){
        return <p>Loading...</p>;
    }

    if(user){
        return <Navigate to = "/dashboard" replace />
    }

    return <Outlet/>
}

export default PublicRoute;