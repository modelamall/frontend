import { useContext, useRef, useState } from "react";
import {
  Bars3Icon,
  CalendarIcon,
  CogIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
  MapIcon,
  MegaphoneIcon,
  SquaresPlusIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../../context/AuthContext";
import { NotificationCXT } from "../../context/NotiContext";

const StoreInfo = () => {
  const { dashboardToken, dashboardUser, setDashboardUser } =
    useContext(AuthContext);
  const { toggleOn } = useContext(NotificationCXT);

  const imgRef = useRef();
  const banner = useRef();


  const [formData, setFormData] = useState({
    name: dashboardUser.name,
    username: dashboardUser.username,
    email: dashboardUser.email,
    phone: dashboardUser.phone,
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
    logo: dashboardUser.logo,
    banner: dashboardUser.banner,
  });

  const updateUserProfile = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    if (!form.get(`logo`)) {
      form.set("logo", formData.logo);
    }
    if (!form.get(`banner`)) {
      form.set("banner", formData.banner);
    }
    const res = await fetch(process.env.REACT_APP_API + `/store/update`, {
      method: "PUT",
      body: form,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${dashboardToken}`,
      },
    });
    const json = await res.json();
    localStorage.setItem("dashboardUser", JSON.stringify(json.data));
    toggleOn(json?.messages, json?.success);
    if (json.success) {
      setFormData({
        ...json.data,
        currentPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      });
      setDashboardUser(json.data);
      const dashboardToken = localStorage.getItem(dashboardToken);
      localStorage.setItem("dashboardUser", JSON.stringify(json.data));
    }
  };

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full object-cover rounded-lg lg:h-48 "
                      onClick={() => banner.current.click()}
                      src={
                        dashboardUser.banner
                          ?.split("/")
                          .findIndex((link) => link == "null") != -1
                          ? "https://static.vecteezy.com/system/resources/previews/005/169/172/large_2x/banner-abstract-geometric-white-and-gray-color-background-illustration-free-vector.jpg"
                          : dashboardUser.banner
                      }
                      alt=""
                    />
                  </div>
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 hover:pointer-events-auto	"
                          onClick={() => imgRef.current.click()}
                          src={dashboardUser.logo}
                          alt=""
                        />
                      </div>
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 className="truncate text-2xl font-bold text-gray-900">
                            {dashboardUser.name}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900">
                        {dashboardUser.name}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-2 2xl:mt-5 border-b border-gray-200"></div>
                {/* Description list */}
                <form
                  onSubmit={updateUserProfile}
                  action="/upload"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <div className=" px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type={"file"}
                          ref={imgRef}
                          name="logo"
                          style={{
                            display: "none",
                          }}
                        />
                        <input
                          type={"file"}
                          ref={banner}
                          name="banner"
                          style={{
                            display: "none",
                          }}
                        />
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          value={formData.name}
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          value={formData.username}
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          value={formData.email}
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone number
                        </label>
                        <input
                          value={formData.phone}
                          type="text"
                          name="phone"
                          id="phone"
                          autoComplete="phone"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current password
                        </label>
                        <input
                          value={formData.currentPassword}
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          autoComplete="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              currentPassword: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 border-b border-gray-200"></div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New password
                        </label>
                        <input
                          value={formData.newPassword}
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          autoComplete="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              newPassword: e.target.value,
                            });
                          }}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="passwordConfirmation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Confirm new password
                        </label>
                        <input
                          value={formData.passwordConfirmation}
                          type="password"
                          name="passwordConfirmation"
                          id="passwordConfirmation"
                          autoComplete="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              passwordConfirmation: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};
export default StoreInfo;
