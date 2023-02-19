import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../components/Dashboard/AdminDashboard";
import StoreDashboard from "../../components/Dashboard/StoreDashboard";
import { AuthContext } from "../../context/AuthContext";
<<<<<<< HEAD
import StoreSignIn from "./StoreSignIn";
=======
const AdminSignIn = React.lazy(() => import("./AdminSignIn"));
>>>>>>> 4c7bd9c6e5e2487aa5fd7081bb4521f33143124a

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
          <Route path="*" element={<StoreSignIn/>} />
          <Route path="/admin" element={<AdminSignIn />} />
        </Routes>
      )}
    </>
  );
};

export default Dashboard;
