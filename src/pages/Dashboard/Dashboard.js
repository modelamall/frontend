import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import StoreDashboard from "../../components/Dashboard/StoreDashboard";
import { AuthContext } from "../../context/AuthContext";
const AdminSignIn = React.lazy(() => import("./AdminSignIn"));
const StoreSignIn = React.lazy(() => import("./StoreSignIn"));


const Dashboard = () => {
  const { dashboardUser, dashboardToken } = useContext(AuthContext);
  return (
    <>
      {dashboardToken && (
        <Routes>
          <Route
            path="*"
            element={
              <>
                {dashboardUser?.type === "Admin" && <AdminDashboard />}
                {dashboardUser?.type === "Store" && <StoreDashboard />}
              </>
            }
          />
        </Routes>
      )}
      {!dashboardToken && (
        <Routes>
          <Route path="/admin" element={<AdminSignIn />} />
          <Route path="*" element={<StoreSignIn/>} />

        </Routes>
      )}
    </>
  );
};

export default Dashboard;
