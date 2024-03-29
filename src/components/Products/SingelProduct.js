import { useEffect, useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SingelProduct = () => {
  const [responseData, setResponseData] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedProduct, setselectedProduct] = useState(0);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/product/${id}`
        );
        const json = await response.json();
        setResponseData(json);
      } catch (error) {}
    };
    fetchData();
  }, []);
  useEffect(() => {
    const parentCategory = async () => {
      if (responseData) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API}/category/parents/${responseData.data.Category.id}`
          );
          const json = await res.json();
          setCategories(json.data);
        } catch (error) {
        }
      }
    };
    parentCategory();
  }, [responseData]);

  return (
    <>
      <div className="bg-white">
        <div className="border-b border-gray-200">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4 py-4">
              <li className="text-sm">
                <a
                  href="/"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  Home
                </a>
              </li>
              {categories?.map((category) => (
                <li key={category.id}>
                  <div className="flex items-center">
                    <svg
                      viewBox="0 0 6 20"
                      aria-hidden="true"
                      className="h-5 w-auto text-gray-300"
                    >
                      <path
                        d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                        fill="currentColor"
                      />
                    </svg>
                    <a
                      href={`/product/category/${category.id}`}
                      className="ml-4 text-sm font-medium text-gray-900"
                    >
                      {category.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {!(
                    responseData?.data?.ProductVariations[selectedProduct]
                      ?.Pictures.length > 0
                  ) &&
                    responseData?.data?.Pictures.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only"> {image.alt} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={image.url}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                  {responseData?.data?.ProductVariations[selectedProduct]
                    ?.Pictures.length > 0 &&
                    responseData?.data?.ProductVariations[
                      selectedProduct
                    ].Pictures.map((image) => (
                      <Tab
                        key={image.id}
                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                          <>
                            <span className="sr-only"> {image.alt} </span>
                            <span className="absolute inset-0 overflow-hidden rounded-md">
                              <img
                                src={image.url}
                                alt=""
                                className="h-full w-full object-cover object-center"
                              />
                            </span>
                            <span
                              className={classNames(
                                selected
                                  ? "ring-indigo-500"
                                  : "ring-transparent",
                                "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                              )}
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </Tab>
                    ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
                {responseData?.data?.ProductVariations[selectedProduct]
                  ?.Pictures.length == 0 &&
                  responseData?.data?.Pictures.map((image) => (
                    <Tab.Panel key={image.id}>
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
                {responseData?.data?.ProductVariations[selectedProduct]
                  ?.Pictures.length > 0 &&
                  responseData?.data?.ProductVariations[
                    selectedProduct
                  ].Pictures.map((image) => (
                    <Tab.Panel key={image.id}>
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                  ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {responseData?.data?.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {
                    responseData?.data?.ProductVariations[selectedProduct]
                      ?.price
                  }
                  ₺
                </p>
              </div>

              {/* Reviews */}
              {/* <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-indigo-500' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{product.rating} out of 5 stars</p>
              </div>
            </div> */}

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: responseData?.data?.description,
                  }}
                />
              </div>

              <form className="mt-6">
                {/* Colors */}
                {colors.length == 0 &&
                  responseData?.data?.ProductVariations.map(
                    (productVariation) => {
                      productVariation.ProductProperties.map(
                        (productProperty) => {
                          if (productProperty.Property.type === "Color") {
                            colors.push({
                              id: responseData?.data?.ProductVariations.findIndex(
                                (ob) => ob.id == productVariation.id
                              ),
                              color: productProperty.PropertiesValue.value,
                            });
                          }
                        }
                      );
                    }
                  )}
                {colors.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-600">Color</h3>

                    <RadioGroup
                      value={selectedProduct}
                      onChange={setselectedProduct}
                      className="mt-2"
                    >
                      <RadioGroup.Label className="sr-only">
                        {" "}
                        Choose a color{" "}
                      </RadioGroup.Label>
                      <span className="flex items-center space-x-3">
                        {colors.map((color) => (
                          <RadioGroup.Option
                            key={color.id}
                            value={color.id}
                            style={{
                              backgroundColor: color.color,
                            }}
                            className={({ active, checked }) =>
                              classNames(
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {" "}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                "h-8 w-8 border border-black border-opacity-10 rounded-full"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </span>
                    </RadioGroup>
                  </div>
                )}
                {/* Sizes */}
                {sizes.length == 0 &&
                  responseData?.data?.ProductVariations.map(
                    (productVariation) => {
                      productVariation.ProductProperties.map(
                        (productProperty) => {
                          if (productProperty.Property.type === "Size") {
                            sizes.push({
                              size: productProperty.PropertiesValue.value,
                              count: productVariation.count,
                            });
                          }
                        }
                      );
                    }
                  )}
                {sizes.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">
                        Size
                      </h4>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        {" "}
                        Choose a size{" "}
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4">
                        {sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.size}
                            value={size.size}
                            disabled={size.count == 0}
                            className={({ active }) =>
                              classNames(
                                size.count > 0
                                  ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                  : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.size}
                                </RadioGroup.Label>
                                {size.count > 0 ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>

                  {/* <button
                  type="button"
                  className="ml-4 flex items-center justify-center rounded-md py-3 px-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button> */}
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              Properties
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <RadioGroup>
                            <div className="space-y-4">
                              {responseData?.data?.ProductVariations[
                                selectedProduct
                              ]?.ProductProperties.map((productProperty) => (
                                <RadioGroup.Option
                                  key={productProperty.id}
                                  className={
                                    "border-gray-300 relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                                  }
                                >
                                  <>
                                    <span className="flex items-center">
                                      <span className="flex flex-col text-sm">
                                        <RadioGroup.Label className="font-medium text-gray-900">
                                          {productProperty.Property.type}
                                        </RadioGroup.Label>
                                      </span>
                                    </span>
                                    <RadioGroup.Label className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right">
                                      <span className="font-medium text-gray-900">
                                        {productProperty.PropertiesValue.value}
                                      </span>
                                    </RadioGroup.Label>
                                    <span
                                      className={
                                        "border-2 border-transparent pointer-events-none absolute -inset-px rounded-lg"
                                      }
                                    />
                                  </>
                                </RadioGroup.Option>
                              ))}
                            </div>
                          </RadioGroup>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingelProduct;
