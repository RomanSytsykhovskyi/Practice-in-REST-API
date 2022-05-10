import { useState, useCallback } from "react";

export const useHttp = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        //console.log("REQUEST");
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        //console.log(body);
        setPending(true);
        setError(null);

        const response = await fetch(url, { method, body, headers });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something has gone wrong!");
        }

        setPending(false);
        return data;
      } catch (e) {
        setPending(false);
        setError(e.message);
        console.log(e.message);
      }
    },
    []
  );
  return { request, pending, error, setPending, setError };
};
