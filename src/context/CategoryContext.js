import { createContext, useState } from "react";
export const CategoryContext = createContext();

const CategoryManager = ({ children }) => {
  const [category, setCategory] = useState([]);
  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryManager;
