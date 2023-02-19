import { useEffect, useState } from "react";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categorytId, setCategorytId] = useState(0);
  const [categorytData, setCategorytData] = useState([]);
  const [sub, setSub] = useState(false);
  const [properties, setProperties] = useState([]);
  const [productVariations, setProductVariations] = useState([""]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/category/allcategories`
        );
        const data = await response.json();
        setCategorytData([data.data]);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/category/byparentid/${categorytId}`
        );
        const data = await response.json();
        if (data.success) {
          categorytData.push(data.data);
          setSub(true);
        } else setSub(false);
      } catch (error) {}
    };
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/filter/${categorytId}`
        );
        const data = await response.json();
        setProperties(data.data);
      } catch (error) {}
    };
    fetchData();
    fetchProperty();
  }, [categorytId]);
  console.log(categorytId);
  return (
    <>
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Category
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              You need to select at least one Category.
            </p>
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
                <select
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  onChange={(e) =>
                    setCategorytId(e.target.selectedOptions[0].id)
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  <option id="0">Select...</option>
                  {categorytData[0]?.map((category) => {
                    return (
                      <>
                        <option id={category.id}>{category.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>

              {sub && (
                <div className="w-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sub Category
                  </label>
                  <select
                    id="subcategory"
                    name="subcategory"
                    autoComplete="category-name"
                    onChange={(e) =>
                      setCategorytId(e.target.selectedOptions[0].id)
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  >
                    <option id="sub-0">Select...</option>
                    {categorytData[1]?.map((category) => {
                      return (
                        <>
                          <option id={category.id}>{category.name}</option>
                        </>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {categorytId > 0 && (
        <form className="space-y-6 pt-6 " action="#" method="POST">
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Product
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in this information for the main product accordingly.
                </p>
              </div>
              <div className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Code
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="code"
                      autoComplete="code"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="discription"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="discription"
                      name="discription"
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Photos
                  </label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            multiple
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {productVariations.map((item, i) => {
            return (
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 ">
                {productVariations.length > 1 && <div className="flex justify-end">
                  <button
                    onClick={() =>{productVariations.splice(i, 1);
                      setProductVariations([...productVariations])}
                    }
                    type="button"
                    className=" text-white inline-flex items-center rounded-full border border-transparent p-2 shadow-sm bg-red-500 hover:bg-red-600  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <XMarkIcon class="h-6 w-6 " />
                  </button>
                </div>}
                <div
                  key={i + "productVariations"}
                  className="md:grid pt-5 md:grid-cols-3 md:gap-6 "
                >
                  <div className="md:col-span-1">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Product Variation {`(${i + 1})`}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You need to fill in at least one Product Variation.
                    </p>
                  </div>
                  <div className="mt-5 md:col-span-2 md:mt-0 ">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          id="price"
                          autoComplete="price"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="count"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Count
                        </label>
                        <input
                          type="text"
                          name="count"
                          id="count"
                          autoComplete="count"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div className="pt-6">
                      <label className="block text-sm font-medium text-gray-700">
                        Photos
                      </label>
                      <p className="mt-1 text-sm text-gray-500">
                        Product Variation you can add a custom photos or the
                        main product photos will be taken.
                      </p>
                      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                multiple
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 md:col-span-1">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Product Properties
                      </h3>
                    </div>
                    {properties?.map((property) => {
                      return (
                        <>
                          <div className="pt-6 grid grid-cols-6 gap-6">
                            <div className="col-span-2 sm:col-span-1 ">
                              <label
                                htmlFor="propertyIndex"
                                className="block text-sm font-medium text-gray-700 "
                              >
                                {property.Property.type}:
                              </label>
                            </div>
                            <div className="col-span-10 sm:col-span-5">
                              <select
                                id="propertyValue"
                                name="propertyValue"
                                autoComplete="property-value"
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>Select...</option>
                                {property.Property.PropertiesValues.map(
                                  (value) => {
                                    return (
                                      <>
                                        <option id={value.id}>
                                          {value.value}
                                        </option>
                                      </>
                                    );
                                  }
                                )}
                              </select>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center pt-5">
            <button
              onClick={() => setProductVariations([...productVariations, ""])}
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default AddProduct;
