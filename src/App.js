import "./App.css";
import React, { Suspense } from 'react'
import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper/Wrapper";

const Home = React.lazy(() => import("./pages/Home"));
const SingelProduct = React.lazy(() => import("./components/Products/SingelProduct"));
const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Profile = React.lazy(() => import("./pages/Profile"));


function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/product" element={<Suspense><Home /></Suspense>} />
      <Route path="/product/:id" element={<Suspense><SingelProduct /></Suspense>} />
      <Route path="/signup" element={<Suspense><SignUp/></Suspense>} />
      <Route path="/signin" element={<Suspense><SignIn/></Suspense>} />
      <Route path="/profile" element={<Suspense><Profile/></Suspense>} />
      <Route path="dashboard/*">

      </Route>
    </Routes>
    </>
  );
}

export default App;
