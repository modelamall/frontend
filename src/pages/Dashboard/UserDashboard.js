import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import {
    Bars3Icon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
const menuItems = [
    { name: 'Dashboard', to: '/dashboard/dashboard', icon: HomeIcon },
    { name: 'Orders', to: '/dashboard/orders', icon: UsersIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: FolderIcon },
]

const UserDashboard = () => {
    return (
        <DashboardLayout navigation={menuItems}>
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