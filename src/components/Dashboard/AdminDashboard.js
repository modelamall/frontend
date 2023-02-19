import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import {
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import PersonalInfo from "../../pages/Dashboard/AdminProfile"
const menuItems = [
    { name: 'Dashboard', to: '/dashboard/dashboard', icon: HomeIcon },
    { name: 'Orders', to: '/dashboard/orders', icon: UsersIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: FolderIcon },
    { name: 'Sign Out', to: '/dashboard/signout', icon: ArrowLeftOnRectangleIcon },

]

const AdminDashboard = () => {
    const DashboardSignOut = React.lazy(() => import("./DashboardSignOut"));

    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="orders" element={<>Orders</>} />
                <Route path="profile" element={<PersonalInfo/>} />
                <Route path="signout" element={<Suspense><DashboardSignOut/></Suspense>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default AdminDashboard