import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

//components
import { Login } from "../pages/login";
import { Regist } from "../pages/regist";
import Layout from "../components/Layout";

export const useWrapRoutes = (isAuthenticated = false) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="regist" element={<Regist />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Login />} />
          <Route path="regist" element={<Regist />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    );
  }
};
