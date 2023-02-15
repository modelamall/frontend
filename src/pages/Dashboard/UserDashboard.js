import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"

const menuItems = [
    {
        to: '/dashboard',
        text: 'Dashboard'
    },
    {
        to: '/dashboard/profile',
        text: 'Profile'
    },
    {
        to: '/dashboard/signout',
        text: 'Sign Out'
    },
]

const UserDashboard = () => {
    return (
        <DashboardLayout menuItems={menuItems}>
            <Routes>
                <Route path="orders" element={<>Orders</>} />
                <Route path="profile" element={<>Profile</>} />
                <Route path="signout" element={<>sign out</>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default UserDashboard