import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TrashIcon } from "@heroicons/react/24/outline";
import Alert from "../Notification/Alert";
import { NotificationCXT } from "../../context/NotiContext";

const Stores = () => {
  const { dashboardToken } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const [stores, setStores] = useState([]);
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [selectStoreId, setSelectStoreId] = useState(0);
  useEffect(() => {
    const getAllStore = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/store/all`, {
          headers: {
            Authorization: `Bearer ${dashboardToken}`,
          },
        });
        const json = await response.json();
        if (!json?.success) {
          toggleOn(json?.messages, json?.success);
        }
        setStores(json.data);
      } catch (error) {}
    };
    getAllStore();
  }, []);
  useEffect(() => {
    if (conformDelete) {
      const deleteStore = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/store/${selectStoreId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${dashboardToken}`,
              },
            }
          );
          const json = await response.json();
          toggleOn(json?.messages, json?.success);
          setConformDelete(false);
          if (json?.success) {
            let newData = [...stores];
            newData = newData.filter((i) => i.id != selectStoreId);
            setStores(newData);
          }
        } catch (error) {}
      };
      deleteStore();
    }
  }, [conformDelete]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Stores</h1>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        User Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Delate</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {stores?.map((store) => (
                      <tr key={store.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  store.logo
                                    .split("/")
                                    .findIndex((link) => link == "null") == -1
                                    ? store.logo
                                    : "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">
                                {store.name}
                              </div>
                              <div className="text-gray-500">{store.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{store.phone}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{store.username}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {store?.Address?.City
                              ? store?.Address.City.Province.name +
                                "/" +
                                store?.Address.City.name
                              : "Null"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className=" cursor-pointer relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <TrashIcon
                            onClick={() => {
                              setOpen(true);
                              setSelectStoreId(store.id);
                            }}
                            className="text-red-500 hover:text-red-700 w-6"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <Alert
          setConformDelete={setConformDelete}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

export default Stores;
