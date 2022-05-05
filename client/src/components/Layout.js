import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <h1>Universities</h1>
        <Link to="/">Home</Link>
        <Link to="regist">Registration</Link>
      </nav>
      <br />
      <Outlet />
      <footer>FOOTER</footer>
    </>
  );
};

export default Layout;
