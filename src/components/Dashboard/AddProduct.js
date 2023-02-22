import { useContext, useEffect, useRef, useState } from "react";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationCXT } from "../../context/NotiContext";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState([]);
  const [categorytData, setCategorytData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [productVariations, setProductVariations] = useState([1]);
  const { dashboardToken } = useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);

  const changeCategory = (id, indexId) => {
    const categoriesList = [...categorytData];
    categoriesList.splice(indexId + 1);
    setCategorytData(categoriesList);
    const categoryt_Id = [...categoryId];
    categoryt_Id.splice(indexId);
    if (!(id == 0 && indexId != 0)) {
      categoryt_Id.push(id);
      setCategoryId(categoryt_Id);
    } else {
      categoriesList.splice(indexId);
      setCategorytData(categoriesList);
      setCategoryId(categoryt_Id);
    }
  };
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
          `${process.env.REACT_APP_API}/category/byparentid/${
            categoryId[categoryId.length - 1]
          }`
        );
        const data = await response.json();
        if (data.success) {
          const categoriesList = [...categorytData];
          categoriesList.push(data.data);
          setCategorytData(categoriesList);
        }
      } catch (error) {}
    };
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/filter/${
            categoryId[categoryId.length - 1]
          }`
        );
        const data = await response.json();
        setProperties(data.data);
      } catch (error) {}
    };
    fetchData();
    fetchProperty();
  }, [categoryId]);
  const createProduct = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(Object.fromEntries(form.entries()));
    const res = await fetch(process.env.REACT_APP_API + `/product`, {
      method: "POST",
      body: form,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${dashboardToken}`,
      },
    });
    const json = await res.json();
    toggleOn(json?.messages, json?.success);
    if (json.success) {
      navigate("/dashboard");
    }
  };
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
                {categorytData.map((category, i) => (
                  <select
                    key={i + "-category"}
                    id="category"
                    name="categoryId"
                    autoComplete="category-name"
                    onChange={(e) => {
                      changeCategory(
                        e.target.options[e.target.selectedIndex].value,
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
      {categoryId[categoryId.length - 1] > 0 && (
        <form className="space-y-6 pt-6 " onSubmit={createProduct}>
          <input
            type="text"
            value={categoryId[categoryId.length - 1]}
            name="categoryId"
            style={{
              display: "none",
            }}
          />
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
                      name="code"
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
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
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
                          htmlFor="pictures"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="pictures"
                            name="pictures"
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
              <div
                key={item}
                className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6 "
              >
                {productVariations.length > 1 && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        productVariations.splice(i, 1);
                        setProductVariations([...productVariations]);
                      }}
                      type="button"
                      className=" text-white inline-flex items-center rounded-full border border-transparent p-2 shadow-sm bg-red-500 hover:bg-red-600  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <XMarkIcon class="h-6 w-6 " />
                    </button>
                  </div>
                )}
                <div className="md:grid pt-5 md:grid-cols-3 md:gap-6 ">
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
                          htmlFor={`price[${i}]`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          name={`price[${i}]`}
                          id={`price[${i}]`}
                          autoComplete={`price[${i}]`}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor={`count[${i}]`}
                          className="block text-sm font-medium text-gray-700"
                        >
                          Count
                        </label>
                        <input
                          type="text"
                          name={`count[${i}]`}
                          id={`count[${i}]`}
                          autoComplete={`count[${i}]`}
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
                              htmlFor={`variationPictures[${i}]`}
                              className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id={`variationPictures[${i}]`}
                                name={`variationPictures[${i}]`}
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
                    {properties?.map((property, j) => {
                      return (
                        <>
                          <div className="pt-6 grid grid-cols-6 gap-6">
                            <div className="col-span-2 sm:col-span-1 ">
                              <label
                                htmlFor={`propertyIndex[${i}][${j}]`}
                                name={`propertyIndex[${i}][${j}]`}
                                className="block text-sm font-medium text-gray-700 "
                              >
                                {property.Property.type}:
                              </label>
                              <input
                                type="text"
                                value={property.Property.id}
                                name={`propertyIndex[${i}][${j}]`}
                                style={{
                                  display: "none",
                                }}
                              />
                            </div>
                            <div className="col-span-10 sm:col-span-5">
                              <select
                                id={`propertyValue[${i}][${j}]`}
                                name={`propertyValue[${i}][${j}]`}
                                autoComplete={`propertyValue[${i}][${j}]`}
                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>Select...</option>
                                {property.Property.PropertiesValues.map(
                                  (value) => {
                                    return (
                                      <>
                                        <option id={value.id} value={value.id}>
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
              onClick={() =>
                setProductVariations([
                  ...productVariations,
                  productVariations[productVariations.length - 1] + 1,
                ])
              }
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
