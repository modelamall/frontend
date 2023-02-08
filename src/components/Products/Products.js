import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";
import useFetch from "../../hooks/UseFetch";
import { useEffect } from "react";

const Products = () => {
  const { product, setProduct } = useContext(ProductContext);
  const response = useFetch("product/all");
  useEffect(() => {
    if (response.data) {
      setProduct(response.data.data);

      console.log(product);
    }
  }, [response]);
};
export default Products;
