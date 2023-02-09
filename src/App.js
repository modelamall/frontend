import "./App.css";
import React, { Suspense } from 'react'
import { Route, Routes } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const NavBar = React.lazy(() => import("./components/NavBar/NavBar"));


function App() {
  return (
    <Routes>
      <Route path="/" element={<Suspense><Home /></Suspense>} />
      <Route path="/navBar" element={<Suspense><NavBar/></Suspense>} />
    </Routes>
  );
}

export default App;
