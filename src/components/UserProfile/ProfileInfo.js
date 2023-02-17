import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileInformation = () => {
  const { token, setUser, user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user.user.name,
    username: user.user.username,
    email: user.user.email,
    phone: user.user.phone,
    gender: user.user.gender,
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const updateUserProfile = async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const res = await fetch(process.env.REACT_APP_API + `/user/update`, {
        method: "PUT",
        body: form,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      localStorage.setItem("the_user", JSON.stringify(json.data));
      if (json.success) {
        alert(json.messages);
        setFormData(json.data)
      }

  };

  return (
    <>
      <div className=" max-w-6xl mx-auto py-5 mt-10 sm:mt-0 ">
        <div className=" mx-12 md:grid md:grid-cols-1 md:gap-6">
          <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2 bg-white">
            <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
              <h3 className="text-2xl font-small leading-6 text-gray-500">
                Profile information
              </h3>
            </div>
            <div>
              <div className="mx-6 mt-6 flex items-center">
                <span className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              </div>
            </div>

            <form onSubmit={updateUserProfile} action="#" method="POST">
              <div className="">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
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

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        autoComplete="new-password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
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

                    <div className="mx-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <fieldset className="mt-4">
                        <div className="  mb-3 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          <div key="" className="flex items-center">
                            <input
                              id="male"
                              name="gender"
                              type="radio"
                              value={1}
                              checked={formData.gender == 1}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  gender: e.target.value,
                                });
                              }}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="gender"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Male
                            </label>
                          </div>
                          <div key="" className="flex items-center">
                            <input
                              id="female"
                              name="gender"
                              type="radio"
                              value={0}
                              checked={formData.gender == 0}
                              onChange={(e) =>
                                setFormData({ ...formData, gender: 0 })
                              }
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="gender"
                              className="ml-3 block text-sm font-medium text-gray-700"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileInformation;
