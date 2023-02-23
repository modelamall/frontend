import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import StoreDashboard from "../../components/Dashboard/StoreDashboard";
import { AuthContext } from "../../context/AuthContext";
const AdminSignIn = React.lazy(() => import("./AdminSignIn"));
const StoreSignUp = React.lazy(() => import("./StoreSignUp"));
const StoreSignIn = React.lazy(() => import("./StoreSignIn"));

const Dashboard = () => {
  const { dashboardUser } = useContext(AuthContext);
  switch (dashboardUser?.type) {
    case "Admin":
      return <AdminDashboard />;
      break;
    case "Store":
      return <StoreDashboard />;
      break;
    default:
      return (
        <Routes>
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="signin" element={<StoreSignIn />} />
          <Route path="*" element={<StoreSignUp />} />
        </Routes>
      );
  }
};

export default Dashboard;
