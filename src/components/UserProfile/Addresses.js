import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserAddresses = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-6xl mx-auto pt-10 mt-10 sm:mt-0">
      <div className="mx-10 md:grid md:grid-cols-1 md:gap-0">
        <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2 bg-white">
          <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
            <h3 className="text-2xl font-small leading-6 text-gray-500">
              My addresses
            </h3>
          </div>

          <div className="max-w-6xl mx-auto pt-0 mt-10 sm:mt-0">
            <div className="mb-6 px-6 md:flex md:flex-wrap">
              {user?.Addresses?.map((address, index) => {
                return (
                  <div key={index} className="max-w-xxs md:w-1/2 md:px-5 mb-8">
                    <div className="border-solid border-2 border-gray-100 overflow-hidden shadow sm:rounded-md mt-10 md:col-span-1">
                      <div className="bg-gray-50 rounded-sm shadow-lg p-4">
                        <h2 className="border-b-2 text-md font-medium text-gray-700 mb-4 mt-">
                          {address.title.substring(0, 25)}
                        </h2>
                        <ul>
                          <li className="mb-2 ">
                            <span className="text-gray-500">
                              {address.address}
                            </span>
                          </li>
                          <li className="mb-2 ">
                            <span className="text-gray-500">
                              {address.cityId}
                            </span>
                          </li>
                          <li className="mb-2 ">
                            <span className="text-gray-500">
                              {address.postCode}
                            </span>
                          </li>
                        </ul>
                        <div className="flex justify-end mt-4">
                          <button className="mr-4 px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-gray-900 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">
                            Edit
                          </button>
                          <button className=" px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-400 border border-transparent rounded-lg active:bg-gray-800 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
