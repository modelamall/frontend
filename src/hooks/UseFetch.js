import { useState, useEffect } from "react";

const useFetch =  (url, options = {}) => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/${url}`, options);
        const responseData = await response.json();
        setResponseData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { responseData, loading, error };
};

export default useFetch;
