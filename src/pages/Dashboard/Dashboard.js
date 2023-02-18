import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import UserDashboard from "./UserDashboard"
import StoreDashboard from "./StoreDashboard"
import AdminDashboard from "./AdminDashboard"

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            {user?.admin?.type === 'Admin' && <AdminDashboard />}
            {user?.store?.type === 'Store' && <StoreDashboard />}
        </>
    )
}

export default Dashboard