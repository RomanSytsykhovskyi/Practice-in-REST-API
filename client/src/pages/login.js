import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import { validateEmail } from "../functions/isValid";
import { RootContext } from "../App";

export const Login = () => {
  const { login } = useContext(RootContext);
  const { request, pending } = useHttp();

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateEmail(form.email)) {
        throw new Error("Email is incorrect");
      }
      if (form.password.length < 3 || form.password.length > 8) {
        throw new Error("Password is out of range (3-8)");
      }
      const data = await request("/login", "POST", form);
      console.log(data);

      login(data.token, data.userId);
    } catch (error) {
      alert(error.message);
    }
  };

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handlerChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={handlerChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {pending && <h3>Loading</h3>}
      <Link to="regist">Registration</Link>
    </>
  );
};
