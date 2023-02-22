import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const UserAddresses = () => {
  const { user, token, setUser } = useContext(AuthContext);
  const [formAddress, setFormAddress] = useState({});
  const [isEditing, setIsEditing] = useState(0);

  const handleInputChange = (e) => {
    setFormAddress({ ...formAddress, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormAddress({});
    setIsEditing(0);
  };

  const handleEdit = (id) => {
    setIsEditing(id);
    setFormAddress(user.Addresses.find(address=> address.id == id))
  };

  const handleDelete = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const res = await fetch(
          process.env.REACT_APP_API + `/address/${addressId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        window.alert(json.messages);
        if (json.success) {
          const newUser = {
            ...user,
            Addresses: user.Addresses.filter(
              (address) => address.id != addressId
            ),
          }
          
          setUser(newUser);
          localStorage.setItem("user", JSON.stringify(newUser));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateAddress = async (e, addressid) => {
    e.preventDefault();
    console.log(`hello`)
    try {
      const res = await fetch(
        process.env.REACT_APP_API + `/address/${addressid}`,
        {
          method: "PUT",
          body: JSON.stringify(formAddress),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      if (!json.success) {
        window.alert(json.messages)}
      if (json.success)  {
        window.alert(json.messages)
        setFormAddress(json.date);
        setUser((prev =>{
          const newUserData = {...prev}
          const index = newUserData.Addresses.findIndex(address => address.id == addressid)
          newUserData.Addresses[index] = json.data
          return (newUserData)
        }));
        localStorage.setItem("user", JSON.stringify(user));

        setIsEditing(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mb-24 pt-10 mt-10 sm:mt-0">
      <div className="mx-10 md:grid md:grid-cols-1 md:gap-0">
        <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2 bg-white">
          <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
            <h3 className="text-2xl font-small leading-6 text-gray-500">
              My addresses
            </h3>
          </div>

          <div className=" mb-6 px-6 md:flex md:flex-wrap">
          {user && user.Addresses && user.Addresses.map((address) => {
              return (
                <div
                  key={address.id}
                  className="max-w-xxs md:w-1/2 md:px-5 mb-8"
                >
                  <div className="border-solid border-2 border-gray-100 overflow-hidden shadow sm:rounded-md mt-10 md:col-span-1">
                    <div className="bg-gray-50 rounded-sm shadow-lg p-4">
                        <h2 className="capitalize border-b-2 text-lg font-semibold text-gray-600 mb-4 mt-">
                          {isEditing == address.id ? (
                            <input
                              type="text"
                              name="title"
                              value={formAddress.title}
                              onChange={handleInputChange}
                              className="mb-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          ) : (
                            address.title.substring(0, 25)
                          )}
                        </h2>

                        <ul>
                          <li className="line-clamp-1 hover:line-clamp-none mb-2 ">
                            <span className="text-gray-500">
                              {isEditing == address.id  ? (
                                <input
                                  type="text"
                                  name="address"
                                  value={formAddress.address}
                                  onChange={handleInputChange}
                                  className="mb-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              ) : (
                                address.address
                              )}
                            </span>
                          </li>

                          <li className="mb-2 ">
                            <span className="text-gray-500">
                              {isEditing == address.id  ? (
                                <input
                                  type="text"
                                  name="cityId"
                                  value={formAddress.cityId}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              ) : (
                                address.City?.name
                              )}
                            </span>
                          </li>

                          <li className="mb-2 ">
                            <span className="text-gray-500">Postal code :</span>
                            <span className="text-gray-500">
                              {isEditing == address.id ? (
                                <input
                                  type="text"
                                  name="postcode"
                                  value={formAddress.postcode}
                                  onChange={handleInputChange}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              ) : (
                                address.postcode
                              )}
                            </span>
                          </li>
                        </ul>

                        <div className="flex justify-end mt-4">
                          {isEditing == address.id ? (
                            <div className="edit-delete-buttons">
                              <button
                                onClick={updateAddress}
                                className="update-button mr-2 px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-700 border border-transparent rounded-lg active:bg-blue-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
                              >
                                Update
                              </button>
                              <button
                                className="cancel-button px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-600 border border-transparent rounded-lg active:bg-gray-900 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="edit-delete-buttons">
                              <button
                                className="edit-button mr-2 px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-700 border border-transparent rounded-lg active:bg-blue-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray"
                                onClick={()=>handleEdit(address.id)}
                              >
                                <PencilSquareIcon
                                  type="button"
                                  className="h-5 w-5 text-white"
                                />
                              </button>
                              <button
                                className="delete-button px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-900 hover:bg-red-700 focus:outline-none focus:shadow-outline-gray"
                                onClick={()=> handleDelete(address.id)}
                              >
                                <TrashIcon
                                  type="button"
                                  className="h-5 w-5 text-white"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                    </div>
                  </div>
                </div>
              );
            }).reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
