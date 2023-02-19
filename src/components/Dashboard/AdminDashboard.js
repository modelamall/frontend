import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import {
    FolderIcon,
    HomeIcon,
    UsersIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import React, { Suspense } from "react"
const menuItems = [
    { name: 'Dashboard', to: '/dashboard/dashboard', icon: HomeIcon },
    { name: 'Orders', to: '/dashboard/orders', icon: UsersIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: FolderIcon },
    { name: 'Sign Out', to: '/dashboard/signout', icon: ArrowLeftOnRectangleIcon },

]
const DashboardSignOut = React.lazy(() => import("./DashboardSignOut"));
const PersonalInfo = React.lazy(() => import("../../pages/Dashboard/AdminProfile"));
const AdminDashboard = () => {
    

    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="orders" element={<>Orders</>} />
                <Route path="profile" element={<Suspense><PersonalInfo/></Suspense>} />
                <Route path="signout" element={<Suspense><DashboardSignOut/></Suspense>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default AdminDashboard