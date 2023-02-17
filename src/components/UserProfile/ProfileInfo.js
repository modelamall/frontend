import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProfileInformation = () => {
  const { token, setUser, user } = useContext(AuthContext);
  const imgRef = useRef()

  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    gender: user.gender,
    currentPassword: "",
    newPassword: "",
    passwordConfirmation: "",
    avatar: user.avatar,
  });

  const updateUserProfile = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log(form.get('avatar'))
    if(!form.get(`avatar`)){
      form.set('avatar', formData.avatar)
    }
    const res = await fetch(process.env.REACT_APP_API + `/user/update`, {
      method: "PUT",
      body: form,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    localStorage.setItem("user", JSON.stringify(json.data));
    if (json.success) {
      alert(json.messages);

      setFormData({
        ...json.data,
        currentPassword: "",
        newPassword: "",
        passwordConfirmation: "",
      });
      setUser(json.data)
      const token = localStorage.getItem(token) 
      localStorage.setItem('user', JSON.stringify(json.data))
    }
  }


  console.log(formData)
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
            <form
              onSubmit={updateUserProfile}
              action="/upload"
              method="post"
              enctype="multipart/form-data"
            >
              <div>
                <div className="mx-6 mt-6 flex items-center ">
                <label htmlFor="avatar">
             
                  <img
                  className="inline-block h-16 w-16 overflow-hidden rounded-full bg-gray-100"
                    onClick={()=> imgRef.current.click()}
                    src={
                      formData?.avatar?.split('/').findIndex(link => link == 'null') != -1
                        ? "https://cdn.lyft.com/riderweb/_next/static/media/default-avatar.27830b47.png"
                        : formData.avatar
                    }
                  />

                </label>
                </div>
              </div>
            </form>

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
                      <input type={'file'} ref={imgRef} 
              name='avatar' 
              style={{
                display: 'none'
              }}/>
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
