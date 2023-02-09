import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserManager from "./context/AuthContext";
import ProductManager from "./context/ProductContext";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CategoryManager from "./context/CategoryContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserManager>
      <ProductManager>
        <CategoryManager>
          <App />
        </CategoryManager>
      </ProductManager>
    </UserManager>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
