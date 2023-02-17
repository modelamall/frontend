import Address from "../components/Address/Address";
import UserAddresses from "../components/UserProfile/Addresses";
import ProfileInformation from "../components/UserProfile/ProfileInfo";

const PersonalInfo = () => {
  return (
    <>
      <div>
        <ProfileInformation />
      </div>
      <div>
        <Address />
      </div>
      <div>
        <UserAddresses />
      </div>
    </>
  );
};
export default PersonalInfo;
