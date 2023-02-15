import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"

const menuItems = [
    {
        to: '/dashboard',
        text: 'Dashboard'
    },
    {
        to: '/dashboard/products',
        text: 'Products'
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

const StoreDashboard = () => {
    return (
        <DashboardLayout menuItems={menuItems}>
            <Routes>
                <Route path="products" element={<>Products</>} />
                <Route path="profile" element={<>Profile</>} />
                <Route path="signout" element={<>signout</>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default StoreDashboard