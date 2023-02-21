import DashboardLayout from "./DashboardLayout"
import { Routes, Route } from "react-router-dom"
import React, { Suspense } from 'react'
import {
    HomeIcon,
    SquaresPlusIcon,
    ArrowLeftOnRectangleIcon,
    Squares2X2Icon,
    UserIcon
} from '@heroicons/react/24/outline'
const menuItems = [
    { name: 'Home', to: '/dashboard/', icon: HomeIcon },
    { name: 'Your Products', to: '/dashboard/myproducts', icon: Squares2X2Icon },
    { name: 'Add New Products', to: '/dashboard/addproducts', icon: SquaresPlusIcon },
    { name: 'Your Profile', to: '/dashboard/profile', icon: UserIcon },
    { name: 'Sign Out', to: '/dashboard/signout', icon: ArrowLeftOnRectangleIcon },

]
const StoreGetProducts = React.lazy(() => import("./StoreGetProducts"));
const AddProduct = React.lazy(() => import("./AddProduct"));
const DashboardSignOut = React.lazy(() => import("./DashboardSignOut"));
const StoreInfo = React.lazy(() => import("./StoreProfileInfo"));



const StoreDashboard = () => {
    return (
        <DashboardLayout navigation={menuItems}>
            <Routes>
                <Route path="myproducts" element={<Suspense><StoreGetProducts/></Suspense>} />
                <Route path="addproducts" element={<Suspense><AddProduct/></Suspense>} />
                <Route path="profile" element={<Suspense><StoreInfo/></Suspense>} />
                <Route path="signout" element={<Suspense><DashboardSignOut/></Suspense>} />
                <Route path="*" element={<>...</>} />
            </Routes>
        </DashboardLayout>
    )
}

export default StoreDashboard