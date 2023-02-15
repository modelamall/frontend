import "./App.css";
import React, { Suspense } from 'react'
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";

const Home = React.lazy(() => import("./pages/Home"));
const SingelProduct = React.lazy(() => import("./components/Products/SingelProduct"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Profile = React.lazy(() => import("./pages/Profile"));
const CategorySection = React.lazy(() => import("./components/CategorySection/CategorySection"));
const Wrapper = React.lazy(() => import("./components/Wrapper/Wrapper"));



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Wrapper><Suspense><Home /></Suspense></Wrapper>} />
      <Route path="/product/:id" element={<Wrapper><Suspense><SingelProduct /></Suspense></Wrapper>} />
      <Route path="/signup" element={<Wrapper><Suspense><SignUp/></Suspense></Wrapper>} />
      <Route path="/signin" element={<Wrapper><Suspense><SignIn/></Suspense></Wrapper>} />
      <Route path="/profile" element={<Suspense><Profile/></Suspense>} />
      <Route path="/c" element={<Suspense><CategorySection/></Suspense>} />
      <Route path="dashboard/*" element={<Suspense><Dashboard/></Suspense>}>

      </Route>
    </Routes>
    </>
  );
}

export default App;
