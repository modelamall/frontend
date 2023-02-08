import { ProductContext } from "../../context/ProductContext";
import { useContext } from "react";
import useFetch from "../../hooks/UseFetch";
import { useEffect } from "react";

const Products = () => {
    const { data, loading, error } = useFetch("product/all");
    const { product, setProduct } = useContext(ProductContext);
    if (!loading) {
        setProduct(data.data);
        console.log(product);
      }
  useEffect(() => {
    
  }, []);
  return (
    <>
    
    {product?.map((item)=>{
        return <h1>{item.title}</h1>

    })}</>
    

  )
};
export default Products;
