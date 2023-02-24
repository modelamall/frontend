import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [data, setData] = useState();

  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
          <Link to={"/"}>
                <img
                  className="block h-8 w-auto"
                  src="https://lh3.googleusercontent.com/fife/AMPSemea08oIF86imTtCGOZT6-K_jNe3se4x5QtZV5gfGNb9nujF24yeCkZikUiPksp_tJSeJ-TFO3eCjMCR3mOlO1qsNZj1Hg39RntnzSUUJRj81x4UCsaXa1kmbHTuC3ZoOHytldKUI0coQ1wvxO2AlpCJguTXcmt3NCVLB3yW35T2Igg682c0Eix5Dm5Jv8X9Xu6jG5-I2ht9vOfOTOAia-HRAMBP8RfNwq4RNHS8qA5e4U6QT0raPdu_D0o5WBHGfWX_MQvmlTW0OSphOFgTBrWMt81lvczGc82TMWcCfiYoi2jRp4olbYjoYFvLtARGAnBwknjf_B87AfwxjLL9fhZMjMbqMcByO-vYP0bcTTPca2yPWFgM11aXit8QNRCU4__PvgEbNy-RFtAv9rwnZh1pNWdi3G5FS5vhDxEjlo-V-0AX7VbhOTFPs22g35f3YRUPKRLMBYbi4Mnb7HlDclIudwQOK2tjI6DmE4T75KxltN-mTE02tfJmShq9tXxePMPuIotmCyDuiFEhTXroGd3hXesAfwRvHm8LTz45wTxi6po3lPtjT8Wl_99linNuLX9CXXIBhGZjqfOlqfTpwgzat3acI08tumqH8qPHhQfF5cmbdJXaTtBV5kiwkcHir9twY6RzwwxAyDdfaJOj4OBXbVJylGEWJoWJehfFdZeAZ1ndRbGxNMmbutCRlvdbP00XdBqwyHxuD3M8Yi8A5lb5oHX6kCwRhSP73X06_ab8RlTPMtgrt-e72oaWY8_80l56q9e2EvnqTL6MauJcVj8UBs9o8ZThGpW37314ko95jk9BfuNtxpVGsGn_3WPTm6ER85mjlThHRZgN0vcmXRMkzyDBCKg2FvqpaWJ_vNPAUEYwF5W_htcOTRtj6DVHaO_HImyAC8PLqqhrNkNS2bx2XEN640e_uKu9Aez6RHjXoxWXPl9-8-aE9vySdt0sdtSsCUev0tD1dZoH0bmy6V2h8TNRXzKV5ttewvsbjT_ht7ZTEDd4ZREvQJi8OGvouJoGWVw5k_aUR-SS7m16oLTCs6egZ_Xn0U8C7Z7rUN9Y5vhC0vPC3BiCi264jvZKo6W8yjuvDo2xjywo_CZJjW2jPaCaKiT193WIaH7R6EoAt8i6EOUNkZCjar6sz_ujjT84jQu9Hx6FeTgXAF-mt8itVY_wJmh4fVdwHX0oOLOOfMaXjGTPDsJCIvlcC4DYDkP5HlH60vZgv5YVurNSpQXaCKRMnxkWpamzosuamq0o8TsWPyYFWg3wc8Ub0I3mzUbj4T93b7bR6M_mnc4z5VWwT6jcUMlqT53KbVjnr6T5MOLoTzCHTHICFCfHrIi1KGAEVp0FP5aCli91ZAQUH9Pwa_JI0je3ks9jSt17yVnWYe63qRojuNBJW6WeRwOYnZC8uAjapQwuGLBWkE9XQyXxzitpn4RYdLHzrZZowu4lzfqXkBM1yECzZD5W7AxK-9go6ACrdyiSOvZE7KKFuuvAnDFZ5irNdow2X6jmDgGUVsFT5Nd6glQaR_0f=w2312-h1504"
                  alt="ModeLaMall"
                />
              </Link>
          </div>
          <div className="mt-8 xl:mt-0">
            <h3 className="text-base font-medium text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {data?.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; 2023 Mode La Mall, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
