import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import {
    HomeIcon,
    UsersIcon,
    ArrowLeftOnRectangleIcon,
    UserIcon,
    SwatchIcon,
    BuildingStorefrontIcon,
    TagIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'
import React, { Suspense} from "react"
const menuItems = [
    { name: 'Home', to: '/dashboard/home', icon: HomeIcon },
    { name: 'Admins', to: '/dashboard/admins', icon: UserGroupIcon },
    { name: 'Stores', to: '/dashboard/stores', icon: BuildingStorefrontIcon },
    { name: 'Users', to: '/dashboard/users', icon: UsersIcon },
    { name: 'Categories', to: '/dashboard/categories', icon: TagIcon },
    { name: 'Properties', to: '/dashboard/properties', icon: SwatchIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: UserIcon },
    { name: 'Sign Out', to: '/dashboard/signout', icon: ArrowLeftOnRectangleIcon },

]
const DashboardSignOut = React.lazy(() => import("./DashboardSignOut"));
const PersonalInfo = React.lazy(() => import("../../pages/Dashboard/AdminProfile"));
const Admins = React.lazy(() => import("./Admins"));
const Stores = React.lazy(() => import("./Stores"));
const Users = React.lazy(() => import("./Users"));
const NotFound = React.lazy(() => import("./NotFound"));
const Categories = React.lazy(() => import("./Categories"));
const AdminDashboard = () => {

    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="home" element={<>Home</>} />
                <Route path="admins" element={<Suspense><Admins/></Suspense>} />
                <Route path="stores" element={<Suspense><Stores/></Suspense>} />
                <Route path="users" element={<Suspense><Users/></Suspense>} />
                <Route path="categories" element={<Suspense><Categories/></Suspense>} />
                <Route path="properties" element={<>Properties</>} />
                <Route path="profile" element={<Suspense><PersonalInfo/></Suspense>} />
                <Route path="signout" element={<Suspense><DashboardSignOut/></Suspense>} />
                <Route path="*" element={<Suspense><NotFound/></Suspense>} />
            </Routes>
        </DashboardLayout>
    )
}

export default AdminDashboard