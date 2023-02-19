import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


const DashboardSignOut = () => {
    const {dashboardSignOut} = useContext(AuthContext)
    const nav = useNavigate()
    useEffect(()=>{
        dashboardSignOut()
        nav('/')
    },[])
    return(
        <></>
        )
};

export default DashboardSignOut;
