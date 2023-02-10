import { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState ({
    name: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    passwordConfirmation: "",
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const createUser = async (formData) => {
    setLoading(true)
    try {
    const res = await fetch(process.env.REACT_APP_API + "/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const json = await res.json();
    window.alert(json.messages)
    if (json.success)
    navigate('/signin')
    setLoading(false);
    setError(null);
  }catch (error) {
    setError(error)
    setLoading(false)

  }
  }
 
  
  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
    console.log(formData);
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createUser(formData)}





  return (
    <>
      {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    */}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up to your account
          </h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="name"
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="phone"
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                  onChange={handleOnChange}
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="passwordConfirmation"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
      <label className="block text-sm font-medium text-gray-700">Gender</label>
      <fieldset className="mt-4">
        <div className="  mb-3 space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          
            <div key="" className="flex items-center">
              <input
              onChange={handleOnChange}
                id="male"
                name= "gender"
                type="radio"
                value={1}
                defaultChecked=""
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="" className="ml-3 block text-sm font-medium text-gray-700">
                Male
              </label>
              
            </div>
            <div key="" className="flex items-center">
              <input
              onChange={handleOnChange}
                id="female"
                name= "gender"
                type="radio"
                value={0}
                defaultChecked=""
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="" className="ml-3 block text-sm font-medium text-gray-700">
                Female
              </label>
              
            </div>
     
        </div>
      </fieldset>
    </div>


              <div>
                <button
                 type="submit"
                 className= "flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Or
                  </span>
                </div>
              </div>
              <div className="relative flex justify-center mt-5 text-sm">
                  <span className="bg-white px-2 text-black-500">
                  Already have an account ? <a>Sign in</a>
                </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp