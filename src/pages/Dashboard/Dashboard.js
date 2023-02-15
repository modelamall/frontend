import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import UserDashboard from "./UserDashboard"
import StoreDashboard from "./StoreDashboard"

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    return (
        <>
            {user?.user?.type === 'User' && <UserDashboard />}
            {user?.user?.type === 'Store' && <StoreDashboard />}
        </>
    )
}

export default Dashboard