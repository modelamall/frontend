import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Address = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinceId, setProvinceId] = useState(0);

  useEffect(() => {
    const allProvinces = async () => {
      const res = await fetch(
        process.env.REACT_APP_API + "/province/allprovinces"
      );
      const json = await res.json();
      if (json.success) {
        setProvinces(json.data);
      }
    };
    allProvinces();
  }, []);

  useEffect(() => {
    const citiesByProvince = async (provinceId) => {
      const res = await fetch(
        process.env.REACT_APP_API + `/city/allbyprovince/${provinceId}`
      );
      const json = await res.json();
      if (json.success) {
        setCities(json.data);
      }
    };
    citiesByProvince(provinceId);
  }, [provinceId]);


  const addAddress = async (data) => {
    try {
      const formDataObj = {};
      data.forEach((value, key) => (formDataObj[key] = value));
      const res = await fetch(process.env.REACT_APP_API + "/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataObj),
      });

      const json = await res.json();
      window.alert(json.messages);
      if (json.success) {
        const newUser = {...user}
        newUser.Addresses.push(json.data);
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   await addAddress(new FormData(e.target));
  };
  return (
    <>
      <div className=" max-w-6xl mx-auto py-5 mt-10 sm:mt-0 ">
        <div className="mx-12 md:grid md:grid-cols-1 md:gap-6">
          <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2">
            <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
              <h3 className="text-2xl font-small leading-6 text-gray-500">
                Address information
              </h3>
            </div>

            <form onSubmit={handleSubmit} action="#" method="POST">
              <div className="">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address name
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <label
                        htmlFor="Province"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <select
                        type="text"
                        name="province"
                        id="Province"
                        onChange={(e) => setProvinceId(e.target.value)}
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value=""></option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="cityId"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Province
                      </label>
                      <select
                        type="number"
                        name="cityId"
                        id="cityId"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value=""></option>
                        {cities?.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="postCode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <input
                        type="number"
                        name="postCode"
                        id="postCode"
                        autoComplete="postalCode"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        autoComplete="address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add
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

export default Address;
