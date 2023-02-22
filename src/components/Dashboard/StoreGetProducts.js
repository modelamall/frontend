import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/UseFetch";
import NoDataAlert from "../Notification/NoDataAlert";

const StoreGetProducts = () => {
    const { dashboardToken } = useContext(AuthContext);
  const { data, loading } = useFetch("product/storeproducts",{
    headers: {
      Authorization: `Bearer ${dashboardToken}`,
    },
  });


  return (
    <>
    {data?.length > 0 && <div>
      <div className="mx-5 py-5 px-4 sm:py-24 sm:px-6 lg:px-0">
        <h1 className="text-left text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Your Products
        </h1>

        <form className="mt-12">
          <section aria-labelledby="cart-heading">
            <ul role="list">
              {data?.data?.map((product) => (
                <li
                  key={product?.id}
                  className="flex py-6 bg-white sm:rounded-lg my-6 mx-6"
                >
                  <div className="flex-shrink-0 py-6 px-6">
                    <img
                      src={product?.Pictures[0]}
                      alt={product?.title}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col sm:ml-6 py-6 px-6">
                    <div>
                      <div className="flex justify-between">
                        <h4 className="text-sm">
                        <p className="font-medium text-gray-700 py-3">
                           Name: {product?.title}
                          </p>
                          <p className="font-medium text-gray-700 line-clamp-3 hover:line-clamp-none">
                          Description: {product?.description}
                          </p>
                          <p className="font-medium text-gray-700  pt-2 pb-2">
                          Price: {product?.ProductVariations[0]?.price}$
                        </p>
                        <p className="font-medium text-gray-700 pt-2 pb-2">
                        Variations: {product?.ProductVariations.length}
                        </p>
                        </h4>
                       
                      </div>
                    </div>

                    <div className="mt-4 flex flex-1 items-end justify-between">
                      
                      <div className="ml-4 ">
                        <button
                          type="button"
                          className="text-sm font-medium p-2"
                        >
                          <PencilSquareIcon className="h-6 w-6 text-blue-500" />
                        </button>
                        <button
                          type="button"
                          className="text-sm font-medium p-2"
                        >
                          <TrashIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </div>
    </div>}
    {!(data?.length > 0) && 
    <NoDataAlert/>
    }
    </>
  );
};

export default StoreGetProducts;
