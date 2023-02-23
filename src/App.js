import React, { Suspense } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Notification from "./components/Notification/Notification";

const Home = React.lazy(() => import("./pages/Home"));
const SingelProduct = React.lazy(() =>
  import("./components/Products/SingelProduct")
);
const Products = React.lazy(() => import("./components/Products/Products"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignOut = React.lazy(() => import("./pages/SignOut"));
const Profile = React.lazy(() => import("./pages/Profile"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Wrapper = React.lazy(() => import("./components/Wrapper/Wrapper"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Suspense>
                <Home />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/product/category/:id"
          element={
            <Wrapper>
              <Suspense>
                <Products />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Wrapper>
              <Suspense>
                <SingelProduct />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <Wrapper>
              <Suspense>
                <SignUp />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/signin"
          element={
            <Wrapper>
              <Suspense>
                <SignIn />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/signout"
          element={
            <Wrapper>
              <Suspense>
                <SignOut />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <Wrapper>
              <Suspense>
                <Profile />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="*"
          element={
            <Wrapper>
              <Suspense>
                <NotFound />
              </Suspense>
            </Wrapper>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <Suspense>
              <Dashboard />
            </Suspense>
          }
        ></Route>
      </Routes>

      <Notification />
    </>
  );
}

export default App;
