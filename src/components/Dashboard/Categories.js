import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TrashIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import Alert from "../Notification/Alert";
import { NotificationCXT } from "../../context/NotiContext";
import AddCategory from "./AddCategory";

const Categories = () => {
  const { dashboardToken } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [conformDelete, setConformDelete] = useState(false);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  useEffect(() => {
    const getAllCategory = async () => {
      if (!addCategoryOpen) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/category/all`,
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
          setCategories(json.data);
        } catch (error) {}
      }
    };
    getAllCategory();
  }, [addCategoryOpen]);
  useEffect(() => {
    if (conformDelete) {
      const deleteCategory = async () => {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API}/category/${selectCategoryId}`,
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
            const getAllCategory = async () => {
              if (!addCategoryOpen) {
                try {
                  const response = await fetch(
                    `${process.env.REACT_APP_API}/category/all`,
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
                  setCategories(json.data);
                } catch (error) {}
              }
            };
            getAllCategory();
          }
        } catch (error) {}
      };
      deleteCategory();
    }
  }, [conformDelete]);
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setAddCategoryOpen(true)}
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Add Category
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
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Parent Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Product Count
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
                    {categories?.map((category) => (
                      <tr key={category.id}>
                        <td className="whitespace-nowrap py-4 pr-3 text-sm sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={
                                  category.icon
                                    .split("/")
                                    .findIndex((link) => link == "null") == -1
                                    ? category.icon
                                    : "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="font-medium text-gray-900 ml-4">
                              {category.name}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">
                            {category?.parent ? category?.parent.name : "----"}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              category.deletedAt
                                ? "text-red-800 bg-red-100"
                                : "text-green-800 bg-green-100"
                            } `}
                          >
                            {category.deletedAt && "Pasif"}
                            {!category.deletedAt && "Active"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {category.productCount}
                        </td>
                        <td className=" cursor-pointer relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {!category.deletedAt && (
                            <TrashIcon
                              onClick={() => {
                                setOpen(true);
                                setSelectCategoryId(category.id);
                              }}
                              className="text-red-500 hover:text-red-700 w-6"
                            />
                          )}
                          {category.deletedAt && (
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
      {addCategoryOpen && (
        <AddCategory
          addCategoryOpen={addCategoryOpen}
          setAddCategoryOpen={setAddCategoryOpen}
        />
      )}
    </>
  );
};

export default Categories;
