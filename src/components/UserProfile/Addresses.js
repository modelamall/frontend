import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PencilSquareIcon, TrashIcon,  } from "@heroicons/react/24/outline";


const UserAddresses = () => {
  const { user } = useContext(AuthContext);
 console.log(user.Addresses)
  return (
    <div className="max-w-6xl mx-auto pt-10 mt-10 sm:mt-0">
      <div className="mx-10 md:grid md:grid-cols-1 md:gap-0">
        <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2 bg-white">
          <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
            <h3 className="text-2xl font-small leading-6 text-gray-500">
              My addresses
            </h3>
          </div>

          
            <div className=" mb-6 px-6 md:flex md:flex-wrap">
              {user?.Addresses?.map((address) => {
                return (
                  <div key={address.id} className="max-w-xxs md:w-1/2 md:px-5 mb-8">
                    <div className="border-solid border-2 border-gray-100 overflow-hidden shadow sm:rounded-md mt-10 md:col-span-1">
                      <div className="bg-gray-50 rounded-sm shadow-lg p-4">
                        <h2 className=" border-b-2 text-lg font-semibold text-gray-600 mb-4 mt-">
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
                              {address.City?.name}
                            </span>
                          </li>
                          <li className="mb-2 ">
                            <span className="text-gray-500">
                              {address.postcode}
                            </span>
                          </li>
                        </ul>
                        <div className="flex justify-end mt-4">
                          <button className="mr-2 px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-700 border border-transparent rounded-lg active:bg-bule-900 hover:bg-blue-800 focus:outline-none focus:shadow-outline-gray">
                           <PencilSquareIcon className="h-5 w-5 text-white" />
                          </button>
                          <button className=" px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-bule-900 hover:bg-red-700 focus:outline-none focus:shadow-outline-gray">
                            <TrashIcon type="button" className="h-5 w-5 text-white"/>
                          </button>
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
