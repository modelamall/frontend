import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TrashIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Alert from "../Notification/Alert";
import { NotificationCXT } from "../../context/NotiContext";
import AddProperty from "./AddProperty";

const Properties = () => {
  const { dashboardToken } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const [properties, setProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [selectPropertyId, setSelectPropertyId] = useState(0);
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  useEffect(() => {
    const getAllProperty = async () => {
      if (!addPropertyOpen) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/property/allproperties`,
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
          setProperties(json.data);
        } catch (error) {}
      }
    };
    getAllProperty();
  }, [addPropertyOpen]);
  useEffect(() => {
    if (conformDelete) {
      const deleteProperty = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/property/${selectPropertyId}`,
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
            const getAllProperty = async () => {
              if (!addPropertyOpen) {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_API}/property/allproperties`,
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
                  setProperties(json.data);
                } catch (error) {}
              }
            };
            getAllProperty();
          }
        } catch (error) {}
      };
      deleteProperty();
    }
  }, [conformDelete]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Properties</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setAddPropertyOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Property
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
                        Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Value Count
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Filter Count
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
                    {properties?.map((property) => (
                      <tr key={property.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900 ml-4">
                              {property.type}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {property.propertiesValueCount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {property.filterCount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              property.deletedAt
                                ? "text-red-800 bg-red-100"
                                : "text-green-800 bg-green-100"
                            } `}
                          >
                            {property.deletedAt && "Pasif"}
                            {!property.deletedAt && "Active"}
                          </span>
                        </td>
                        <td className=" cursor-pointer relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {!property.deletedAt && (
                            <TrashIcon
                              onClick={() => {
                                setOpen(true);
                                setSelectPropertyId(property.id);
                              }}
                              className="text-red-500 hover:text-red-700 w-6"
                            />
                          )}
                          {property.deletedAt && (
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
      {addPropertyOpen && (
        <AddProperty
          addPropertyOpen={addPropertyOpen}
          setAddPropertyOpen={setAddPropertyOpen}
        />
      )}
    </>
  );
};

export default Properties;
