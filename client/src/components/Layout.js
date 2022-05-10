import React, { useContext } from "react";
import { NavLink, k, Outlet } from "react-router-dom";
import { RootContext } from "../App";

const Layout = () => {
  const { logout, isAuthenticated } = useContext(RootContext);

  //console.log("3: Layout", isAuthenticated);

  return (
    <>
      <nav>
        <div className="wrapper">
          <h1 className="logo">
            <NavLink to="/">Universities</NavLink>
          </h1>
          <ul className="navigation">
            <li>
              <NavLink
                to={
                  isAuthenticated ? "/authorised/universities" : "universities"
                }
              >
                Universities
              </NavLink>
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={logout}>logout</button>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="regist">Registration</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className="wrapper">
        <Outlet />
      </div>

      <footer>
        <div className="wrapper">FOOTER</div>
      </footer>
    </>
  );
};

export default Layout;
