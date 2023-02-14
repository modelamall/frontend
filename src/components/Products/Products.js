import { ProductContext } from "../../context/ProductContext";
import { useContext, useState } from "react";
import useFetch from "../../hooks/UseFetch";
import PopupProduct from "./PopupProduct"

const Products = () => {
  const { data, loading, error } = useFetch("product/all");
  const { products, setProducts } = useContext(ProductContext);
  const [singel, setSingel] = useState(false)
  const [productId, setProductId] = useState()
  if (!loading) {
    setProducts(data.data);
  }
  return (
    <>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Customers also bought
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
              <div key={product.id} onClick={()=>{setProductId(product.id) 
              setSingel(true)}}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.Pictures[0]?.url}
                      alt={product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.discription}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      ${product.ProductVariations[0].price}
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
          ))}
        </div>
      </div>
    </div>
    {singel && <PopupProduct productId = {productId} setSingel = {setSingel}/>}
    </>
  );
};
export default Products ;
