import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TrashIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Alert from "../Notification/Alert";
import { NotificationCXT } from "../../context/NotiContext";
import AddPropertyValue from "./AddPropertyValue";

const PropertyValues = () => {
  const { dashboardToken } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const [propertyValues, setPropertyValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [selectPropertyValueId, setSelectPropertyValueId] = useState(0);
  const [addPropertyValueOpen, setAddPropertyValueOpen] = useState(false);
  useEffect(() => {
    const getAllPropertyValue = async () => {
      if (!addPropertyValueOpen) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/propertyvalue/all`,
            {
              headers: {
                Authorization: `Bearer ${dashboardToken}`,
              },
            }
          );
          const json = await response.json();
          if (!json?.success) {
            toggleOn(json?.messages, json?.success);
          }
          setPropertyValues(json.data);
        } catch (error) {}
      }
    };
    getAllPropertyValue();
  }, [addPropertyValueOpen]);
  useEffect(() => {
    if (conformDelete) {
      const deletePropertyValue = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/propertyvalue/${selectPropertyValueId}`,
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
            const getAllPropertyValue = async () => {
              if (!addPropertyValueOpen) {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_API}/propertyvalue/all`,
                    {
                      headers: {
                        Authorization: `Bearer ${dashboardToken}`,
                      },
                    }
                  );
                  const json = await response.json();
                  if (!json?.success) {
                    toggleOn(json?.messages, json?.success);
                  }
                  setPropertyValues(json.data);
                } catch (error) {}
              }
            };
            getAllPropertyValue();
          }
        } catch (error) {}
      };
      deletePropertyValue();
    }
  }, [conformDelete]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Property Values</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setAddPropertyValueOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Value
            </button>
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
                        Value
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Type
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
                    {propertyValues?.map((propertyValue) => (
                      <tr key={propertyValue.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900 ml-4">
                              {propertyValue.value}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {propertyValue.Property?.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              propertyValue.deletedAt
                                ? "text-red-800 bg-red-100"
                                : "text-green-800 bg-green-100"
                            } `}
                          >
                            {propertyValue.deletedAt && "Pasif"}
                            {!propertyValue.deletedAt && "Active"}
                          </span>
                        </td>
                        <td className=" cursor-pointer relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {!propertyValue.deletedAt && (
                            <TrashIcon
                              onClick={() => {
                                setOpen(true);
                                setSelectPropertyValueId(propertyValue.id);
                              }}
                              className="text-red-500 hover:text-red-700 w-6"
                            />
                          )}
                          {propertyValue.deletedAt && (
                            <NoSymbolIcon className="text-gray-500 w-6" />
                          )}
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
      {addPropertyValueOpen && (
        <AddPropertyValue
          addPropertyValueOpen={addPropertyValueOpen}
          setAddPropertyValueOpen={setAddPropertyValueOpen}
        />
      )}
    </>
  );
};

export default PropertyValues;
