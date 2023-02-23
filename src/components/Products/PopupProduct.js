import { Fragment, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useFetch from "../../hooks/UseFetch";
import { useNavigate } from "react-router-dom";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  reviewCount: 117,
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  colors: [
    { name: "White", calssName: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", calssName: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", calssName: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: true },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
    { name: "XXXL", inStock: false },
  ],
};

function classes(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PopupProduct = ({ productId, setSingel }) => {
  const { data, loading, error } = useFetch(`product/${productId}`);
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedProduct, setselectedProduct] = useState(0);
  const [activeImg, setActiveImg] = useState(
    data?.data?.ProductVariations[selectedProduct]?.Pictures.length > 0
      ? data?.data?.ProductVariations[selectedProduct]?.Pictures[0].url
      : data?.data?.Pictures[0]?.url
  );
  const navigate = useNavigate();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div style={{height: "650px"}} className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => {
                      setSingel(false);
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      
                        {!(
                          data?.data?.ProductVariations[selectedProduct]
                            ?.Pictures.length > 0
                        ) && (
                          <img
                            src={
                              !activeImg
                                ? data?.data?.Pictures[0]?.url
                                : activeImg
                            }
                            alt={data?.data?.title}
                            className="object-cover object-center"
                          />
                        )}
                        {data?.data?.ProductVariations[selectedProduct]
                          ?.Pictures.length > 0 && (
                          <img
                            src={
                              !activeImg
                                ? data?.data?.ProductVariations[selectedProduct]
                                    ?.Pictures[0]?.url
                                : activeImg
                            }
                            alt={data?.data?.title}
                            className="object-cover object-center"
                          />
                        )}
                      {/* <div className="flex flex-row w-full h-1/3 flex-wrap">
                        {!(
                          data?.data?.ProductVariations[selectedProduct]
                            ?.Pictures.length > 0
                        ) &&
                          data?.data?.Pictures.map((picture) => {
                            return (
                              <img
                                src={picture.url}
                                alt={data?.data?.title}
                                className=" h-1/3 w-1/4"
                                onClick={() => setActiveImg(picture.url)}
                              />
                            );
                          })}
                        {data?.data?.ProductVariations[selectedProduct]
                          ?.Pictures.length > 0 &&
                          data?.data?.ProductVariations[
                            selectedProduct
                          ]?.Pictures.map((picture) => {
                            return (
                              <img
                                src={picture.url}
                                alt={data?.data?.title}
                                className="h-1/2 w-1/3"
                                onClick={() => setActiveImg(picture.url)}
                              />
                            );
                          })}
                      </div> */}
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                        {data?.data?.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">
                          {data?.data?.ProductVariations[selectedProduct].price}₺
                        </p>
                        <div className="mt-6">
                          <p>{data?.data?.description}</p>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-10"
                      >
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          {colors.length == 0 &&
                            data?.data?.ProductVariations.map(
                              (productVariation) => {
                                productVariation.ProductProperties.map(
                                  (productProperty) => {
                                    if (
                                      productProperty.Property.type === "Color"
                                    ) {
                                      colors.push({
                                        id: data?.data?.ProductVariations.findIndex(
                                          (ob) => ob.id == productVariation.id
                                        ),
                                        color:
                                          productProperty.PropertiesValue.value,
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
                                        classes(
                                          active && checked
                                            ? "ring ring-offset-1"
                                            : "",
                                          !active && checked ? "ring-2" : "",
                                          "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                        )
                                      }
                                    >
                                      <RadioGroup.Label
                                        as="span"
                                        className="sr-only"
                                      >
                                        {" "}
                                      </RadioGroup.Label>
                                      <span
                                        aria-hidden="true"
                                        className={classes(
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
                            data?.data?.ProductVariations.map(
                              (productVariation) => {
                                productVariation.ProductProperties.map(
                                  (productProperty) => {
                                    if (
                                      productProperty.Property.type === "Size"
                                    ) {
                                      sizes.push({
                                        size: productProperty.PropertiesValue
                                          .value,
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
                                        classes(
                                          size.count > 0
                                            ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                            : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                          active
                                            ? "ring-2 ring-indigo-500"
                                            : "",
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
                                              className={classes(
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
                          <button
                            type="button"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() =>
                              navigate(`/product/${data?.data?.id}`)
                            }
                          >
                            View Product Details
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PopupProduct;
