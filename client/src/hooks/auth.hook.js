import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  //console.log(localStorage.getItem(storageName));
  const data = JSON.parse(localStorage.getItem(storageName));
  const [token, setToken] = useState(data?.token || null);
  const [userId, setUserId] = useState(data?.userId || null);

  const login = useCallback((jwtToken, id) => {
    //console.log("login");
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    //console.log("REQUEST");
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
