import { createContext, useState } from "react";
export const ProductContext = createContext();

const ProductManager = ({ children }) => {
  const [product, setProduct] = useState([]);
  return (
    <ProductContext.Provider
      value={{
        product,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductManager;
