import "./App.css";
import React, { Suspense } from 'react'
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const SingelProduct = React.lazy(() => import("./components/Products/SingelProduct"));
const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense><Home /></Suspense>} />
      <Route path="/product/:id" element={<Suspense><SingelProduct /></Suspense>} />
      <Route path="/navBar" element={<Suspense><NavBar/></Suspense>} />
      <Route path="/signup" element={<Suspense><SignUp/></Suspense>} />
      <Route path="/signin" element={<Suspense><SignIn/></Suspense>} />
    </Routes>
  );
}

export default App;
