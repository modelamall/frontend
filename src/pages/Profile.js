import Address from "../components/Address/Address";
import UserAddresses from "../components/UserProfile/Addresses";
import ProfileInformation from "../components/UserProfile/ProfileInfo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const PersonalInfo = () => {
  const { token, setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, [token]);
  return (
    <>
      {token ? (
        <div>
          <div>
            <ProfileInformation  />
          </div>
          <div>
            <Address  storage={"user"} user={ user } setUser={setUser} token={token} />
          </div>
          <div>
            <UserAddresses  />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default PersonalInfo;
