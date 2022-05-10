import React, { createContext } from "react";

//hooks
import { useAuth } from "./hooks/auth.hook";

//wrappers
import WrapperRoutes from "./wrappers/wrapRoute";

//function noop() {}

export const RootContext = createContext();

const App = () => {
  //
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;

  //console.log("1: App", { token, userId, login, logout, isAuthenticated });

  return (
    <RootContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <WrapperRoutes />
    </RootContext.Provider>
  );
};

export default App;
