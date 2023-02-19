import { useEffect, useState } from "react";

const Address = () => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const allProvinces = async () => {
      const res = await fetch(
        process.env.REACT_APP_API + "/province/allprovinces",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        setProvinces(json.data);
      }
    };
    allProvinces();
  }, []);

  const citiesByProvince = async (provinceId) => {
    if (selectedProvince !== provinceId) {
      const res = await fetch(
        process.env.REACT_APP_API + `/city/allbyprovince/${provinceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await res.json();
      if (json.success) {
        setCities(json.data);
        setSelectedProvince(provinceId);
      }
    }
  };
  return (
    <div className=" max-w-6xl mx-auto py-5 mt-10 sm:mt-0 ">
      <div className="mx-12 md:grid md:grid-cols-1 md:gap-6">
        <div className="overflow-hidden shadow sm:rounded-md mt-10 md:col-span-2">
          <div className="bg-gray-50 px-5 py-5 sm:px-6 ">
            <h3 className="text-2xl font-small leading-6 text-gray-500">
              Address information
            </h3>
          </div>

          <form action="#" method="POST">
            <div className="">
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      htmlFor="Province"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Province
                    </label>
                    <select
                      onChange={(e) => citiesByProvince(e.target.value)}
                      type="text"
                      name="Province"
                      id="Province"
                      autoComplete="address-level1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>select a city</option>
                      {provinces.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="City"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <select
                      onChange={(e) => setCities(e.target.value)}
                      type="text"
                      name="City"
                      id="City"
                      autoComplete="address-level1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>select a province</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      autoComplete="street-address"
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
  );
};

export default Address;
