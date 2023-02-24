import React, { useEffect } from "react";
import useFetch from "../../hooks/UseFetch";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Link } from "react-router-dom";

function CategorySection() {
  const { category, setCategory } = useContext(CategoryContext);
  const { data, loading, error } = useFetch("category/allcategories");
  useEffect(() => {
    if (!loading) {
      setCategory(data?.data);
    }
  }, [data]);

  return (
    <>
      <div className="bg-white">
        <div className="py-16 sm:py-24 xl:mx-auto xl:max-w-7xl xl:px-8">
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Shop by Category
            </h2>
          </div>

          <div className="mt-4 flow-root">
            <div className="-my-2">
              <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
                <div className="min-w-screen-xl absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
                  {category.map((item, i) => (
                    <div key={item.id + "main"}>
                      {i < 5 && (
                        <Link
                          key={item.id}
                          to={`/product/category/${item.id}`}
                          className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                        >
                          <span aria-hidden="true" className="absolute inset-0 ">
                            <img
                              src={
                                item?.icon
                                  ? item?.icon
                                  : "https://tailwindui.com/img/beams-basic-transparent.png"
                              }
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                          />
                          <span className="relative mt-auto text-center text-xl font-bold text-white">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategorySection;
