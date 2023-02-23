import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { NavLink, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "../../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({ navigation = [], children }) {
  const { dashboardUser } = useContext(AuthContext);

  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                        className="h-8 w-auto"
                        src="https://lh3.googleusercontent.com/fife/AMPSemea08oIF86imTtCGOZT6-K_jNe3se4x5QtZV5gfGNb9nujF24yeCkZikUiPksp_tJSeJ-TFO3eCjMCR3mOlO1qsNZj1Hg39RntnzSUUJRj81x4UCsaXa1kmbHTuC3ZoOHytldKUI0coQ1wvxO2AlpCJguTXcmt3NCVLB3yW35T2Igg682c0Eix5Dm5Jv8X9Xu6jG5-I2ht9vOfOTOAia-HRAMBP8RfNwq4RNHS8qA5e4U6QT0raPdu_D0o5WBHGfWX_MQvmlTW0OSphOFgTBrWMt81lvczGc82TMWcCfiYoi2jRp4olbYjoYFvLtARGAnBwknjf_B87AfwxjLL9fhZMjMbqMcByO-vYP0bcTTPca2yPWFgM11aXit8QNRCU4__PvgEbNy-RFtAv9rwnZh1pNWdi3G5FS5vhDxEjlo-V-0AX7VbhOTFPs22g35f3YRUPKRLMBYbi4Mnb7HlDclIudwQOK2tjI6DmE4T75KxltN-mTE02tfJmShq9tXxePMPuIotmCyDuiFEhTXroGd3hXesAfwRvHm8LTz45wTxi6po3lPtjT8Wl_99linNuLX9CXXIBhGZjqfOlqfTpwgzat3acI08tumqH8qPHhQfF5cmbdJXaTtBV5kiwkcHir9twY6RzwwxAyDdfaJOj4OBXbVJylGEWJoWJehfFdZeAZ1ndRbGxNMmbutCRlvdbP00XdBqwyHxuD3M8Yi8A5lb5oHX6kCwRhSP73X06_ab8RlTPMtgrt-e72oaWY8_80l56q9e2EvnqTL6MauJcVj8UBs9o8ZThGpW37314ko95jk9BfuNtxpVGsGn_3WPTm6ER85mjlThHRZgN0vcmXRMkzyDBCKg2FvqpaWJ_vNPAUEYwF5W_htcOTRtj6DVHaO_HImyAC8PLqqhrNkNS2bx2XEN640e_uKu9Aez6RHjXoxWXPl9-8-aE9vySdt0sdtSsCUev0tD1dZoH0bmy6V2h8TNRXzKV5ttewvsbjT_ht7ZTEDd4ZREvQJi8OGvouJoGWVw5k_aUR-SS7m16oLTCs6egZ_Xn0U8C7Z7rUN9Y5vhC0vPC3BiCi264jvZKo6W8yjuvDo2xjywo_CZJjW2jPaCaKiT193WIaH7R6EoAt8i6EOUNkZCjar6sz_ujjT84jQu9Hx6FeTgXAF-mt8itVY_wJmh4fVdwHX0oOLOOfMaXjGTPDsJCIvlcC4DYDkP5HlH60vZgv5YVurNSpQXaCKRMnxkWpamzosuamq0o8TsWPyYFWg3wc8Ub0I3mzUbj4T93b7bR6M_mnc4z5VWwT6jcUMlqT53KbVjnr6T5MOLoTzCHTHICFCfHrIi1KGAEVp0FP5aCli91ZAQUH9Pwa_JI0je3ks9jSt17yVnWYe63qRojuNBJW6WeRwOYnZC8uAjapQwuGLBWkE9XQyXxzitpn4RYdLHzrZZowu4lzfqXkBM1yECzZD5W7AxK-9go6ACrdyiSOvZE7KKFuuvAnDFZ5irNdow2X6jmDgGUVsFT5Nd6glQaR_0f=w2312-h1504"
                        alt="ModeLaMall"
                      />
                    </div>
                    <nav className="mt-5 space-y-1 px-2">
                      {navigation.map((item, i) => (
                        <NavLink
                          key={i}
                          to={item.to}
                          className={({ isActive }) => {
                            return classNames(
                              isActive
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            );
                          }}
                        >
                          <item.icon
                            className={classNames(
                              location.pathname === item.to
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      ))}
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 bg-gray-700 p-4">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={
                            (dashboardUser?.avatar || dashboardUser?.logo)
                            .split("/")
                            .findIndex((link) => link == "null") == -1
                            ? dashboardUser.avatar || dashboardUser.logo
                            : "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                        }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-white">
                          {dashboardUser?.name}
                        </p>
                        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
                          {dashboardUser?.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  className="h-8 w-auto"
                  src="https://lh3.googleusercontent.com/fife/AMPSemea08oIF86imTtCGOZT6-K_jNe3se4x5QtZV5gfGNb9nujF24yeCkZikUiPksp_tJSeJ-TFO3eCjMCR3mOlO1qsNZj1Hg39RntnzSUUJRj81x4UCsaXa1kmbHTuC3ZoOHytldKUI0coQ1wvxO2AlpCJguTXcmt3NCVLB3yW35T2Igg682c0Eix5Dm5Jv8X9Xu6jG5-I2ht9vOfOTOAia-HRAMBP8RfNwq4RNHS8qA5e4U6QT0raPdu_D0o5WBHGfWX_MQvmlTW0OSphOFgTBrWMt81lvczGc82TMWcCfiYoi2jRp4olbYjoYFvLtARGAnBwknjf_B87AfwxjLL9fhZMjMbqMcByO-vYP0bcTTPca2yPWFgM11aXit8QNRCU4__PvgEbNy-RFtAv9rwnZh1pNWdi3G5FS5vhDxEjlo-V-0AX7VbhOTFPs22g35f3YRUPKRLMBYbi4Mnb7HlDclIudwQOK2tjI6DmE4T75KxltN-mTE02tfJmShq9tXxePMPuIotmCyDuiFEhTXroGd3hXesAfwRvHm8LTz45wTxi6po3lPtjT8Wl_99linNuLX9CXXIBhGZjqfOlqfTpwgzat3acI08tumqH8qPHhQfF5cmbdJXaTtBV5kiwkcHir9twY6RzwwxAyDdfaJOj4OBXbVJylGEWJoWJehfFdZeAZ1ndRbGxNMmbutCRlvdbP00XdBqwyHxuD3M8Yi8A5lb5oHX6kCwRhSP73X06_ab8RlTPMtgrt-e72oaWY8_80l56q9e2EvnqTL6MauJcVj8UBs9o8ZThGpW37314ko95jk9BfuNtxpVGsGn_3WPTm6ER85mjlThHRZgN0vcmXRMkzyDBCKg2FvqpaWJ_vNPAUEYwF5W_htcOTRtj6DVHaO_HImyAC8PLqqhrNkNS2bx2XEN640e_uKu9Aez6RHjXoxWXPl9-8-aE9vySdt0sdtSsCUev0tD1dZoH0bmy6V2h8TNRXzKV5ttewvsbjT_ht7ZTEDd4ZREvQJi8OGvouJoGWVw5k_aUR-SS7m16oLTCs6egZ_Xn0U8C7Z7rUN9Y5vhC0vPC3BiCi264jvZKo6W8yjuvDo2xjywo_CZJjW2jPaCaKiT193WIaH7R6EoAt8i6EOUNkZCjar6sz_ujjT84jQu9Hx6FeTgXAF-mt8itVY_wJmh4fVdwHX0oOLOOfMaXjGTPDsJCIvlcC4DYDkP5HlH60vZgv5YVurNSpQXaCKRMnxkWpamzosuamq0o8TsWPyYFWg3wc8Ub0I3mzUbj4T93b7bR6M_mnc4z5VWwT6jcUMlqT53KbVjnr6T5MOLoTzCHTHICFCfHrIi1KGAEVp0FP5aCli91ZAQUH9Pwa_JI0je3ks9jSt17yVnWYe63qRojuNBJW6WeRwOYnZC8uAjapQwuGLBWkE9XQyXxzitpn4RYdLHzrZZowu4lzfqXkBM1yECzZD5W7AxK-9go6ACrdyiSOvZE7KKFuuvAnDFZ5irNdow2X6jmDgGUVsFT5Nd6glQaR_0f=w2312-h1504"
                  alt="ModeLaMall"
                />
              </div>
              <nav className="mt-5 flex-1 space-y-1 px-2">
                {navigation.map((item, i) => (
                  <NavLink
                    key={i}
                    to={item.to}
                    className={({ isActive }) => {
                      return classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      );
                    }}
                  >
                    <item.icon
                      className={classNames(
                        location.pathname === item.to
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex flex-shrink-0 bg-gray-700 p-4">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={
                        (dashboardUser?.avatar || dashboardUser?.logo)
                        .split("/")
                        .findIndex((link) => link == "null") == -1
                        ? dashboardUser.avatar || dashboardUser.logo
                        : "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                    }
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {dashboardUser?.name}
                  </p>
                  <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
                    {dashboardUser?.username}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-4"></h1>
              </div>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
