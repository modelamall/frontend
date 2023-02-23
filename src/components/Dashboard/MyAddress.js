import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NotificationCXT } from "../../context/NotiContext";
import Alert from "../Notification/Alert";

const MyAddress = () => {
  const { dashboardUser, dashboardToken, setDashboardUser } =
    useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const address = dashboardUser.Address;
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [addressId, setAddressId] = useState();

  useEffect(() => {
    const deleteAddress = async () => {
      if (conformDelete) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API}/address/${addressId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${dashboardToken}`,
              },
            }
          );
          const json = await res.json();
          toggleOn(json?.messages, json?.success);
          setConformDelete(false);
          if (json?.success) {
            const newUser = {
              ...dashboardUser,
              Address: null,
            };

            setDashboardUser(newUser);
            localStorage.setItem("dashboardUser", JSON.stringify(newUser));
          }
        } catch (error) {}
      }
    };

    deleteAddress();
  }, [conformDelete]);

  return (
    <>
      <h3 className="text-2xl font-small leading-6 text-gray-500 px-10">
        My Address
      </h3>
      <ul role="list" className=" px-10 py-10">
        <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">
                  {address?.title}
                </h3>
              </div>
              <p className="mt-1 truncate text-sm text-gray-500">
                Address: {address?.address}
              </p>
              <p className="mt-1 truncate text-sm text-gray-500">
                Post Code: {address?.postcode}
              </p>
              <p className="mt-1 truncate text-sm text-gray-500">
                {address?.City.Province.name} / {address?.City.name}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <button className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <PencilSquareIcon
                    className="h-5 w-5 text-blue-800"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Edit</span>
                </button>
              </div>
              <div
                onClick={() => {
                  setOpen(true);
                  setAddressId(address.id);
                }}
                className="-ml-px flex w-0 flex-1"
              >
                <button className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
                  <XMarkIcon
                    className="h-5 w-5 text-red-400"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Delete</span>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
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

export default MyAddress;
