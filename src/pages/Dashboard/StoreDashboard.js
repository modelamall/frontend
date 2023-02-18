import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import React, { Suspense } from 'react'
import {
    FolderIcon,
    HomeIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
const menuItems = [
    { name: 'Dashboard', to: '/dashboard/dashboard', icon: HomeIcon },
    { name: 'Products', to: '/dashboard/products', icon: UsersIcon },
    { name: 'Orders', to: '/dashboard/orders', icon: UsersIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: FolderIcon },
]

const AddProduct = React.lazy(() => import("./AddProduct"));
const StoreDashboard = () => {
    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="addproducts" element={<Suspense><AddProduct/></Suspense>} />
                <Route path="profile" element={<>Profile</>} />
                <Route path="signout" element={<>signout</>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default StoreDashboard