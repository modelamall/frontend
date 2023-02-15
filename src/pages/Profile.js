import Address from "../components/Address/Address";
import UserAddresses from "../components/UserProfile/Addresses";
import ProfileInformation from "../components/UserProfile/ProfileInfo";


const PersonalInfo = () => {
  return (
    <>
    <ProfileInformation/>
      <Address/>
      <UserAddresses/>

    </>
  );
};
export default PersonalInfo;
