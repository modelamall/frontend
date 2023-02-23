import useFetch from "../../hooks/UseFetch";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { AuthContext } from "../../context/AuthContext";

import { Link, NavLink } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

const NavBar = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const { user, token } = useContext(AuthContext);

  const { data, loading } = useFetch("category/allcategories");

  useEffect(() => {
    if (!loading) {
      setCategory(data?.data);
    }
  }, [data]);

  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white  shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <Link to={"/"}>
                <img
                  className="block h-8 w-auto"
                  src="https://lh3.googleusercontent.com/fife/AMPSemea08oIF86imTtCGOZT6-K_jNe3se4x5QtZV5gfGNb9nujF24yeCkZikUiPksp_tJSeJ-TFO3eCjMCR3mOlO1qsNZj1Hg39RntnzSUUJRj81x4UCsaXa1kmbHTuC3ZoOHytldKUI0coQ1wvxO2AlpCJguTXcmt3NCVLB3yW35T2Igg682c0Eix5Dm5Jv8X9Xu6jG5-I2ht9vOfOTOAia-HRAMBP8RfNwq4RNHS8qA5e4U6QT0raPdu_D0o5WBHGfWX_MQvmlTW0OSphOFgTBrWMt81lvczGc82TMWcCfiYoi2jRp4olbYjoYFvLtARGAnBwknjf_B87AfwxjLL9fhZMjMbqMcByO-vYP0bcTTPca2yPWFgM11aXit8QNRCU4__PvgEbNy-RFtAv9rwnZh1pNWdi3G5FS5vhDxEjlo-V-0AX7VbhOTFPs22g35f3YRUPKRLMBYbi4Mnb7HlDclIudwQOK2tjI6DmE4T75KxltN-mTE02tfJmShq9tXxePMPuIotmCyDuiFEhTXroGd3hXesAfwRvHm8LTz45wTxi6po3lPtjT8Wl_99linNuLX9CXXIBhGZjqfOlqfTpwgzat3acI08tumqH8qPHhQfF5cmbdJXaTtBV5kiwkcHir9twY6RzwwxAyDdfaJOj4OBXbVJylGEWJoWJehfFdZeAZ1ndRbGxNMmbutCRlvdbP00XdBqwyHxuD3M8Yi8A5lb5oHX6kCwRhSP73X06_ab8RlTPMtgrt-e72oaWY8_80l56q9e2EvnqTL6MauJcVj8UBs9o8ZThGpW37314ko95jk9BfuNtxpVGsGn_3WPTm6ER85mjlThHRZgN0vcmXRMkzyDBCKg2FvqpaWJ_vNPAUEYwF5W_htcOTRtj6DVHaO_HImyAC8PLqqhrNkNS2bx2XEN640e_uKu9Aez6RHjXoxWXPl9-8-aE9vySdt0sdtSsCUev0tD1dZoH0bmy6V2h8TNRXzKV5ttewvsbjT_ht7ZTEDd4ZREvQJi8OGvouJoGWVw5k_aUR-SS7m16oLTCs6egZ_Xn0U8C7Z7rUN9Y5vhC0vPC3BiCi264jvZKo6W8yjuvDo2xjywo_CZJjW2jPaCaKiT193WIaH7R6EoAt8i6EOUNkZCjar6sz_ujjT84jQu9Hx6FeTgXAF-mt8itVY_wJmh4fVdwHX0oOLOOfMaXjGTPDsJCIvlcC4DYDkP5HlH60vZgv5YVurNSpQXaCKRMnxkWpamzosuamq0o8TsWPyYFWg3wc8Ub0I3mzUbj4T93b7bR6M_mnc4z5VWwT6jcUMlqT53KbVjnr6T5MOLoTzCHTHICFCfHrIi1KGAEVp0FP5aCli91ZAQUH9Pwa_JI0je3ks9jSt17yVnWYe63qRojuNBJW6WeRwOYnZC8uAjapQwuGLBWkE9XQyXxzitpn4RYdLHzrZZowu4lzfqXkBM1yECzZD5W7AxK-9go6ACrdyiSOvZE7KKFuuvAnDFZ5irNdow2X6jmDgGUVsFT5Nd6glQaR_0f=w2312-h1504"
                  alt="ModeLaMall"
                />
              </Link>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
            <div className="w-full sm:max-w-lg">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Open menu</span>

              {open ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {token && (
            <div
              className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center"
              onMouseLeave={() => setOpen(!open)}
            >
              <div className="relative ml-4 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onMouseEnter={() => setOpen(!open)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={
                        user.avatar
                          .split("/")
                          .findIndex((link) => link == "null") == -1
                          ? user.avatar
                          : "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                      }
                      alt=""
                    />
                  </button>
                </div>

                {open && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      className="block py-2 px-4 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      to={"/profile"}
                    >
                      Your Profile
                    </Link>
                    <Link
                      className="block py-2 px-4 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      to={"/signout"}
                    >
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {!token && (
            <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
              <div className="relative ml-4 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Link to={"/signin"}>Sign In</Link>
                  </button>
                  <Link
                    className=" py-2 px-4 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    to={"/signup"}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
        <nav
          className="hidden lg:flex lg:space-x-8 lg:py-2"
          aria-label="Global"
        >
          {category.map((item) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-100 text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                    : "text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                }
                to={`/product/category/${item.id}`}
                key={item.id}
              >
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {open && (
        <nav className="lg:hidden" aria-label="Global" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {category.map((item) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
                  }
                  to={`/product/category/${item.id}`}
                  key={item.id}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
          {token && (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      user?.avatar
                        ? user?.avatar
                        : "https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg"
                    }
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/profile"}
                >
                  Your Profile
                </Link>
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/signout"}
                >
                  Sign Out
                </Link>
              </div>
            </div>
          )}
          {!token && (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4"></div>
              <div className="mt-3 space-y-1 px-2">
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/signin"}
                >
                  Sign In
                </Link>
                <Link
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  to={"/signup"}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </nav>
      )}
    </header>
  );
};
export default NavBar;
