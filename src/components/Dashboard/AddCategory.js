import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { NotificationCXT } from "../../context/NotiContext";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AddCategory = ({ addCategoryOpen, setAddCategoryOpen }) => {
  const [categoryId, setCategoryId] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [defaultProperties, setDefaultProperties] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const { toggleOn } = useContext(NotificationCXT);
  const { dashboardToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const changeCategory = (id, indexId) => {
    const categoriesList = [...categoryData];
    categoriesList.splice(indexId + 1);
    setCategoryData(categoriesList);
    const categoryt_Id = [...categoryId];
    categoryt_Id.splice(indexId);
    if (!(id == 0 && indexId != 0)) {
      categoryt_Id.push(id);
      setCategoryId(categoryt_Id);
    } else {
      categoriesList.splice(indexId);
      setCategoryData(categoriesList);
      setCategoryId(categoryt_Id);
    }
  };
  const AddProperty = (id) => {
    const selectedPropertiesList = [...selectedProperties];
    let propertiesList = [...properties];
    const property = properties.filter((e) => e.id == id);
    propertiesList = properties.filter((e) => e.id != id);
    selectedPropertiesList.push(...property);
    setSelectedProperties(selectedPropertiesList);
    setProperties(propertiesList);
  };
  const handlPropertyDelete = (id) => {
    let selectedPropertiesList = [...selectedProperties];
    const propertiesList = [...properties];
    const property = selectedPropertiesList.filter((e) => e.id == id);
    selectedPropertiesList = selectedPropertiesList.filter((e) => e.id != id);
    setSelectedProperties(selectedPropertiesList);
    propertiesList.push(...property);
    setProperties(propertiesList);
  };
  const createCategory = async (form) => {
    try {
      const res = await fetch(process.env.REACT_APP_API + "/category", {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${dashboardToken}`,
        },
      });

      const json = await res.json();
      toggleOn(json?.messages, json?.success);
      if (json?.success) setAddCategoryOpen(false);
    } catch (error) {}
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await createCategory(form);
  };
  const handleFileDelete = () => {
    setSelectedFile(null);
    fileInputRef.current.value = "";
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/category/allcategories`
        );
        const data = await response.json();
        setCategoryData([data.data]);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    setSelectedProperties([]);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/category/byparentid/${
            categoryId[categoryId.length - 1]
          }`
        );
        const data = await response.json();
        if (data.success) {
          const categoriesList = [...categoryData];
          categoriesList.push(data.data);
          setCategoryData(categoriesList);
        }
      } catch (error) {}
    };
    const fetchDefaultProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/filter/${
            categoryId[categoryId.length - 1]
          }`
        );
        const data = await response.json();
        setDefaultProperties(data.data);
      } catch (error) {}
    };
    fetchData();
    fetchDefaultProperty();
  }, [categoryId]);
  useEffect(() => {
    const defaultPropertiesId = defaultProperties.map(
      (defaultProperty) => defaultProperty.propertyId
    );
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/property/all`,
          {
            method: "POST",
            body: JSON.stringify({ ids: [...defaultPropertiesId] }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${dashboardToken}`,
            },
          }
        );
        const data = await response.json();
        setProperties(data.data);
      } catch (error) {}
    };
    fetchProperty();
  }, [defaultProperties]);
  return (
    <>
      <Transition.Root show={addCategoryOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setAddCategoryOpen()}
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
                      onClick={() => setAddCategoryOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create New Category
                      </h2>
                    </div>

                    <div className="bg-white mt-5 px-4 py-5 shadow sm:rounded-lg sm:p-6">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Parent Category
                          </h3>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                          <div className="grid gap-6">
                            <div className="w-full">
                              <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Category
                              </label>
                              {categoryData.map((category, i) => (
                                <select
                                  key={i + "-category"}
                                  id="category"
                                  name="categoryId"
                                  autoComplete="category-name"
                                  onChange={(e) => {
                                    changeCategory(
                                      e.target.options[e.target.selectedIndex]
                                        .value,
                                      i
                                    );
                                  }}
                                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                >
                                  <option value="0">Select...</option>
                                  {category?.map((subCategory) => {
                                    return (
                                      <>
                                        <option value={subCategory.id}>
                                          {subCategory.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white mt-5 px-4 py-5 shadow sm:rounded-lg sm:p-6">
                      <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-1">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Property
                          </h3>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                          <div className="grid gap-6">
                            <div className="w-full">
                              <select
                                id="category"
                                name="categoryId"
                                autoComplete="category-name"
                                value={"0"}
                                onChange={(e) => {
                                  AddProperty(
                                    e.target.options[e.target.selectedIndex]
                                      .value
                                  );
                                }}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="0">Select...</option>
                                {properties?.map((property) => {
                                  return (
                                    <>
                                      <option value={property.id}>
                                        {property.type}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {defaultProperties.map((defaultProperty) => (
                      <Link className=" flex pt-2 text-sm font-medium px-3 text-gray-700">
                        {defaultProperty.Property.type}
                      </Link>
                    ))}
                    {selectedProperties.map((selectedProperty) => (
                      <Link
                        onClick={() => handlPropertyDelete(selectedProperty.id)}
                        className=" flex pt-2 text-sm font-medium px-3 text-gray-700 hover:text-red-500"
                      >
                        {selectedProperty.type}
                        <XMarkIcon className=" h-5 w-5" />
                      </Link>
                    ))}
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      action="#"
                      method="POST"
                    >
                      <div>
                        <input
                          type="text"
                          value={categoryId[categoryId.length - 1]}
                          name="parentId"
                          style={{
                            display: "none",
                          }}
                        />
                        {selectedProperties.map((selectedProperty) => (
                          <input
                            type="text"
                            value={selectedProperty.id}
                            name="filter[]"
                            style={{
                              display: "none",
                            }}
                          />
                        ))}
                        {defaultProperties.map((defaultProperty) => (
                          <input
                            type="text"
                            value={defaultProperty.id}
                            name="filter[]"
                            style={{
                              display: "none",
                            }}
                          />
                        ))}
                      </div>
                      <div>
                        <label
                          htmlFor="name"
                          className="block mt-5 text-sm font-medium text-gray-700"
                        >
                          Category Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="name"
                            required
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="icon"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Icon
                        </label>
                        <div className="mt-1 flex flex-row">
                          <input
                            ref={fileInputRef}
                            onChange={(e) => {
                              setSelectedFile(e.target.files[0]);
                            }}
                            id="icon"
                            name="icon"
                            type="file"
                            style={{ display: "none" }}
                          />
                          <button
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Upload icon
                          </button>
                          <Link
                            onClick={handleFileDelete}
                            className=" flex pt-2 text-sm font-medium px-3 text-gray-700 hover:text-red-500"
                          >
                            {selectedFile ? selectedFile.name : ""}
                            {selectedFile?.name && (
                              <XMarkIcon className=" h-5 w-5" />
                            )}
                          </Link>
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Create
                        </button>
                      </div>
                    </form>
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

export default AddCategory;
