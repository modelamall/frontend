import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import useFetch from "../../hooks/UseFetch";

const ProductHomeSection = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { data, loading } = useFetch("product/all");
  if (!loading) setProducts(data.data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Newest products
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {products?.map((item, i) => (
            <div key={item.id + 'main'}>
              {i < 6 && (
                <Link
                  key={item.id}
                  to={`product/${item?.id}`}
                  className="group text-sm"
                >
                  <div
                    className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                  >
                    <img
                      src={item?.Pictures[0]}
                      alt={item?.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3
                    className="mt-4 font-medium text-gray-900"
                  >
                    {item?.title}
                  </h3>
                  <p
                    className="italic text-gray-500 line-clamp-2"
                  >
                    {item?.discription}
                  </p>
                  <p
                    className="mt-2 font-medium text-gray-900"
                  >
                    {item?.ProductVariations[0]?.price}₺
                  </p>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHomeSection;
