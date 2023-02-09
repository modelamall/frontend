import { createContext, useState } from "react";
export const ProductContext = createContext();

const ProductManager = ({ children }) => {
  const [products, setProducts] = useState([]);
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductManager;
