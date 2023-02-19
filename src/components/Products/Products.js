import { Fragment, useState, useContext } from "react";
import {
  Dialog,
  Disclosure,
  Popover,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ProductContext } from "../../context/ProductContext";
import useFetch from "../../hooks/UseFetch";
import PopupProduct from "./PopupProduct";
import "./style.css";
import { useParams } from "react-router-dom";

const breadcrumbs = [{ id: 1, name: "Men", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products, setProducts } = useContext(ProductContext);
  const [singel, setSingel] = useState(false);
  const [productId, setProductId] = useState();
  const { id } = useParams();
  const [categorytId, setCategorytId] = useState(id);
  const { data, loading, error } = useFetch("product/filter", {
    method: "post",
    body: JSON.stringify({
      categorytId: categorytId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const {
    data: filtersData,
    loading: filtersLoading,
    error: filtersError,
  } = useFetch(`filter/${categorytId}`);
  if (!loading) setProducts(data.data);

  const activeFilter = (event) => {
    event.preventDefault();
    const jsonData = JSON.stringify(
      Object.fromEntries(new FormData(event.target).entries())
    );
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form onSubmit={activeFilter} className="mt-4">
                    <Disclosure
                      as="div"
                      className="border-t border-gray-200 pt-4 pb-4"
                    >
                      {({ open }) => (
                        <fieldset>
                          <legend className="w-full px-2">
                            <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                              <span className="text-sm font-medium text-gray-900">
                                Price
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                <ChevronDownIcon
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-5 w-5 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </legend>
                          <Disclosure.Panel className="px-4 pt-4 pb-2">
                            <div className="flex items-center">
                              <label
                                htmlFor={`minPrice`}
                                className="ml-3 w-1/3 text-sm text-gray-600"
                              >
                                Min Price
                              </label>
                              <input
                                name={`minPrice`}
                                type="text"
                                className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                htmlFor={`maxPrice`}
                                className="ml-3 w-1/3 text-sm text-gray-600"
                              >
                                Max Price
                              </label>
                              <input
                                name={`maxPrice`}
                                type="text"
                                className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </Disclosure.Panel>
                        </fieldset>
                      )}
                    </Disclosure>
                    {filtersData?.data.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 pt-4 pb-4"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">
                                  {section.Property.type}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "-rotate-180" : "rotate-0",
                                      "h-5 w-5 transform"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pt-4 pb-2">
                              <div className="space-y-6">
                                {section.Property.PropertiesValues.map(
                                  (option) => (
                                    <div
                                      key={option.id}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`${option.id}`}
                                        name={`${section.id}-op-${option.id}`}
                                        defaultValue={option.id}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${option.id}`}
                                        className="ml-3 text-sm text-gray-500"
                                      >
                                        {option.value}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                    <div className="m-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        Filter
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="border-b border-gray-200">
          <nav
            aria-label="Breadcrumb"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <ol role="list" className="flex items-center space-x-4 py-4">
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a
                      href={breadcrumb.href}
                      className="mr-4 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
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
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  New Arrivals
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <main className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                className="inline-flex items-center lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              </button>

              <div className="hidden lg:block">
                <form className="space-y-10 divide-y divide-gray-200">
                  <div className={"pt-10"}>
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        Price
                      </legend>
                      <div className="space-y-3 pt-6">
                        <div className="flex items-center">
                          <label
                            htmlFor={`minPrice`}
                            className="ml-3 w-1/3 text-sm text-gray-600"
                          >
                            Min Price
                          </label>
                          <input
                            name={`minPrice`}
                            type="text"
                            className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <label
                            htmlFor={`maxPrice`}
                            className="ml-3 w-1/3 text-sm text-gray-600"
                          >
                            Max Price
                          </label>
                          <input
                            name={`maxPrice`}
                            type="text"
                            className="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  {filtersData?.data.map((section) => (
                    <div key={section.id} className={"pt-10"}>
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">
                          {section.Property.type}
                        </legend>
                        <div className="space-y-3 pt-6">
                          {section.Property.PropertiesValues.map((option) => (
                            <div key={option.id} className="flex items-center">
                              <input
                                id={`${option.id}`}
                                name={`op-${option.id}`}
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`${section.id}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.value}
                              </label>
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  ))}

                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Filter
                    </button>
                  </div>
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {products.map((product) => (
                  <>
                    <div
                      key={product.productId}
                      onClick={() => {
                        setProductId(product.productId);
                        setSingel(true);
                      }}
                    >
                      <div className="relative">
                        <div className="relative h-72 w-full overflow-hidden rounded-lg">
                          <img
                            src={product.url}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="relative mt-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.title}
                          </h3>
                          <p className="discriptionStyle mt-1 text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                          <p className="relative text-lg font-semibold text-white">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6">
                        {/* <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >
                  Add to bag<span className="sr-only">, {product.title}</span>
                </a> */}
                      </div>
                    </div>
                  </>
                ))}
                {singel && (
                  <PopupProduct productId={productId} setSingel={setSingel} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Products;
