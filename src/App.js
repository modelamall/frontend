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
    <Routes>
      <Route path="/product" element={<Wrapper><Suspense><Home /></Suspense></Wrapper>} />
      <Route path="/product/:id" element={<Wrapper><Suspense><SingelProduct /></Suspense></Wrapper>} />
      <Route path="/navBar" element={<Wrapper><Suspense><NavBar/></Suspense></Wrapper>} />
      <Route path="/signup" element={<Wrapper><Suspense><SignUp/></Suspense></Wrapper>} />
      <Route path="/signin" element={<Wrapper><Suspense><SignIn/></Suspense></Wrapper>} />
      <Route path="/profile" element={<Wrapper><Suspense><Profile/></Suspense></Wrapper>} />
    </Routes>
  );
}

export default App;
