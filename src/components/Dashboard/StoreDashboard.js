import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import React, { Suspense } from 'react'
import {
    FolderIcon,
    HomeIcon,
    UsersIcon,
    SquaresPlusIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
const menuItems = [
    { name: 'Home', to: '/dashboard/', icon: HomeIcon },
    { name: 'Products', to: '/dashboard/products', icon: UsersIcon },
    { name: 'Add New Products', to: '/dashboard/addproducts', icon: SquaresPlusIcon },
    { name: 'Profile', to: '/dashboard/profile', icon: FolderIcon },
    { name: 'Sign Out', to: '/dashboard/signout', icon: ArrowLeftOnRectangleIcon },

]

const AddProduct = React.lazy(() => import("./AddProduct"));
const DashboardSignOut = React.lazy(() => import("./DashboardSignOut"));


const StoreDashboard = () => {
    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="addproducts" element={<Suspense><AddProduct/></Suspense>} />
                <Route path="profile" element={<>Profile</>} />
                <Route path="signout" element={<Suspense><DashboardSignOut/></Suspense>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default StoreDashboard