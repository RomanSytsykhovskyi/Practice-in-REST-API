import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { RootContext } from "../App";

//components
import { Login } from "../pages/login";
import { Regist } from "../pages/regist";
import Layout from "../components/Layout";
import Main from "../components/Main";
import Universities from "../components/Universities";
import DetailUniversity from "../components/DetailUniversity";

const WrapperRoutes = () => {
  //
  const { isAuthenticated } = useContext(RootContext);

  //console.log("2: Use Wrap Route", isAuthenticated);

  if (isAuthenticated) {
    //console.log("2: End wrap Route");
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
        <Route path="authorised" element={<Layout />}>
          <Route index element={<Navigate to="universities" />} />
          <Route path="universities" element={<Universities />} />
          <Route path="university/:id" element={<DetailUniversity />} />
          <Route path="*" element={<Navigate to="universities" />} />
        </Route>
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="regist" element={<Regist />} />
        <Route path="universities" element={<Universities />}></Route>
        <Route path="universities/:id" element={<DetailUniversity />}></Route>
        <Route path="*" element={<Navigate to="login" />} />
      </Route>
    </Routes>
  );
};

export default WrapperRoutes;
