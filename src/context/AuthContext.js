import { createContext, useState } from "react";
export const AuthContext = createContext();

const UserManager = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [dashboardUser, setDashboardUser] = useState(
    JSON.parse(localStorage.getItem("dashboardUser") || "{}")
  );

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [dashboardToken, setDashboardToken] = useState(
    localStorage.getItem("dashboardToken") || ""
  );

  const signIn = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };
  const dashboardSignIn = (userData, userToken) => {
    setDashboardUser(userData);
    setDashboardToken(userToken);
    localStorage.setItem("dashboardUser", JSON.stringify(userData));
    localStorage.setItem("dashboardToken", userToken);
  };
  const signOut = () => {
    setUser({});
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  const dashboardSignOut = () => {
    setDashboardUser({});
    setDashboardToken("");
    localStorage.removeItem("dashboardUser");
    localStorage.removeItem("dashboardToken");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        signIn,
        signOut,
        dashboardToken,
        dashboardUser,
        setDashboardUser,
        dashboardSignIn,
        dashboardSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserManager;
