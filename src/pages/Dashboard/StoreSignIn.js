import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { NotificationCXT } from "../../context/NotiContext";

const StoreSignIn = () => {
  const { toggleOn } = useContext(NotificationCXT);
  const { dashboardSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInStore = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_API + "/store/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      toggleOn(json?.messages, json?.success);
      if (json.success) {
        dashboardSignIn(json.data.store, json.data.token);
        setLoading(false);
        setError(null);
        navigate("/Dashboard/");
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signInStore(formData);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {
            <img
              className="mx-auto h-12 w-auto"
              src="https://lh3.googleusercontent.com/fife/AMPSemea08oIF86imTtCGOZT6-K_jNe3se4x5QtZV5gfGNb9nujF24yeCkZikUiPksp_tJSeJ-TFO3eCjMCR3mOlO1qsNZj1Hg39RntnzSUUJRj81x4UCsaXa1kmbHTuC3ZoOHytldKUI0coQ1wvxO2AlpCJguTXcmt3NCVLB3yW35T2Igg682c0Eix5Dm5Jv8X9Xu6jG5-I2ht9vOfOTOAia-HRAMBP8RfNwq4RNHS8qA5e4U6QT0raPdu_D0o5WBHGfWX_MQvmlTW0OSphOFgTBrWMt81lvczGc82TMWcCfiYoi2jRp4olbYjoYFvLtARGAnBwknjf_B87AfwxjLL9fhZMjMbqMcByO-vYP0bcTTPca2yPWFgM11aXit8QNRCU4__PvgEbNy-RFtAv9rwnZh1pNWdi3G5FS5vhDxEjlo-V-0AX7VbhOTFPs22g35f3YRUPKRLMBYbi4Mnb7HlDclIudwQOK2tjI6DmE4T75KxltN-mTE02tfJmShq9tXxePMPuIotmCyDuiFEhTXroGd3hXesAfwRvHm8LTz45wTxi6po3lPtjT8Wl_99linNuLX9CXXIBhGZjqfOlqfTpwgzat3acI08tumqH8qPHhQfF5cmbdJXaTtBV5kiwkcHir9twY6RzwwxAyDdfaJOj4OBXbVJylGEWJoWJehfFdZeAZ1ndRbGxNMmbutCRlvdbP00XdBqwyHxuD3M8Yi8A5lb5oHX6kCwRhSP73X06_ab8RlTPMtgrt-e72oaWY8_80l56q9e2EvnqTL6MauJcVj8UBs9o8ZThGpW37314ko95jk9BfuNtxpVGsGn_3WPTm6ER85mjlThHRZgN0vcmXRMkzyDBCKg2FvqpaWJ_vNPAUEYwF5W_htcOTRtj6DVHaO_HImyAC8PLqqhrNkNS2bx2XEN640e_uKu9Aez6RHjXoxWXPl9-8-aE9vySdt0sdtSsCUev0tD1dZoH0bmy6V2h8TNRXzKV5ttewvsbjT_ht7ZTEDd4ZREvQJi8OGvouJoGWVw5k_aUR-SS7m16oLTCs6egZ_Xn0U8C7Z7rUN9Y5vhC0vPC3BiCi264jvZKo6W8yjuvDo2xjywo_CZJjW2jPaCaKiT193WIaH7R6EoAt8i6EOUNkZCjar6sz_ujjT84jQu9Hx6FeTgXAF-mt8itVY_wJmh4fVdwHX0oOLOOfMaXjGTPDsJCIvlcC4DYDkP5HlH60vZgv5YVurNSpQXaCKRMnxkWpamzosuamq0o8TsWPyYFWg3wc8Ub0I3mzUbj4T93b7bR6M_mnc4z5VWwT6jcUMlqT53KbVjnr6T5MOLoTzCHTHICFCfHrIi1KGAEVp0FP5aCli91ZAQUH9Pwa_JI0je3ks9jSt17yVnWYe63qRojuNBJW6WeRwOYnZC8uAjapQwuGLBWkE9XQyXxzitpn4RYdLHzrZZowu4lzfqXkBM1yECzZD5W7AxK-9go6ACrdyiSOvZE7KKFuuvAnDFZ5irNdow2X6jmDgGUVsFT5Nd6glQaR_0f=w2312-h1504"
              alt="ModeLaMall"
            />
          }
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your Dashboard "Store"
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="account"
                  className="block text-sm font-medium text-gray-700"
                >
                  Account
                </label>
                <div className="mt-1">
                  <input
                    onChange={handleOnChange}
                    id="account"
                    placeholder="Phone number, username or email"
                    name="account"
                    type="account"
                    autoComplete="account"
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>
              <div className="relative flex justify-center mt-5 text-sm">
                <span className="bg-white px-2 text-black-500">
                  Don't have an account ?{" "}
                  <Link className="text-blue-500" to={"/dashboard"}>
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreSignIn;
