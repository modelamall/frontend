import { useContext, useEffect, useState } from "react";
import { NotificationCXT } from "../../context/NotiContext";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

const AddPropertyValue = ({
  addPropertyValueOpen,
  setAddPropertyValueOpen,
}) => {
  const [value, setValue] = useState("");
  const [propertyId, setPropertyId] = useState("a");
  const [properties, setProperties] = useState([]);
  const { toggleOn } = useContext(NotificationCXT);
  const { dashboardToken } = useContext(AuthContext);

  const createPropertyValue = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_API + "/propertyvalue", {
        method: "POST",
        body: JSON.stringify({ value, propertyId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dashboardToken}`,
        },
      });

      const json = await res.json();
      toggleOn(json?.messages, json?.success);
      if (json?.success) setAddPropertyValueOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/property/allproperties`,
          {
            headers: {
              Authorization: `Bearer ${dashboardToken}`,
            },
          }
        );
        const data = await response.json();
        setProperties(data.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <>
      <Transition.Root show={addPropertyValueOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setAddPropertyValueOpen()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setAddPropertyValueOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create New Property Value
                      </h2>
                    </div>
                    <div className="mt-5">
                      <select
                        id="property"
                        name="propertyId"
                        autoComplete="property-name"
                        onChange={(e) => {
                          setPropertyId(
                            e.target.options[e.target.selectedIndex].value
                          );
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="0">Select...</option>
                        {properties?.map((property) => (
                          <option key={property.id} value={property.id}>{property?.type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h3 className="block mt-5 text-sm font-medium text-gray-700">
                        Property Value
                      </h3>
                      <input
                        type={"text"}
                        id="value"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        required
                        className="block w-full mt-3 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={createPropertyValue}
                        className="mt-10 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Create
                      </button>
                    </div>
                    <div></div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AddPropertyValue;
