import { useContext } from "react";
import { NotificationCXT } from "../../context/NotiContext";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

const EditAddressPop = ({ open, setOpen, address }) => {
  const { toggleOn } = useContext(NotificationCXT);
  const { dashboardToken ,dashboardUser} = useContext(AuthContext);

  const updateAddress = async (form) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_API + `/address/${address.id}`,
        {
          method: "PUT",
          body: form,
          headers: {
            Authorization: `Bearer ${dashboardToken}`,
          },
        }
      );

      const json = await res.json();
      toggleOn(json?.messages, json?.success);
      if (json?.success) {
        
        localStorage.setItem(dashboardUser, JSON.stringify(newUser));
        setOpen(false);
      }
    } catch (error) {}
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await updateAddress(form);
  };
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen()}>
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
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className=" max-w-6xl mx-auto py-5 mt-10 sm:mt-0 ">
                    <div className="mx-12 md:grid md:grid-cols-1 md:gap-6">
                      <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2">
                        <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
                          <h3 className="text-2xl font-small leading-6 text-gray-500">
                            Address information
                          </h3>
                        </div>

                        <form onSubmit={handleSubmit} action="#" method="POST">
                          <div className="">
                            <div className="bg-white px-4 py-5 sm:p-6">
                              <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                  <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Address name
                                  </label>
                                  <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    autoComplete="title"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                  <label
                                    htmlFor="Province"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    City
                                  </label>
                                  <select
                                    type="number"
                                    name="province"
                                    id="Province"
                                    onChange={(e) =>
                                      setProvinceId(e.target.value)
                                    }
                                    autoComplete="address-level1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  >
                                    <option value=""></option>
                                    {provinces.map((province) => (
                                      <option
                                        key={province.id}
                                        value={province.id}
                                      >
                                        {province.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                  <label
                                    htmlFor="cityId"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Province
                                  </label>
                                  <select
                                    type="number"
                                    name="cityId"
                                    id="cityId"
                                    autoComplete="address-level1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  >
                                    <option value=""></option>
                                    {cities?.map((city) => (
                                      <option key={city.id} value={city.id}>
                                        {city.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                  <label
                                    htmlFor="postCode"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Postal code
                                  </label>
                                  <input
                                    type="number"
                                    name="postCode"
                                    id="postCode"
                                    autoComplete="postalCode"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                                  <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    autoComplete="address"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                              <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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

export default EditAddressPop;
