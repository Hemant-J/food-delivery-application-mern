import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  let navigate = useNavigate();
  const [info, setinfo] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: info.email,
        password: info.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.login === true) {
      navigate("/");
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", info.email);
      localStorage.setItem("userType", json.userType);
      console.log(localStorage.getItem("authToken"));
    } else {
      alert("Enter valid info");
    }
  };
  const onChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        backgroundImage: `url("https://source.unsplash.com/random/1000x700/?burger")`,
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div>
        <div className="container">
          <form
            className="w-50 m-auto mt-5 border bg-dark border-primary rounded p-4"
            onSubmit={handleSubmit}
          >
            <div className="text-center text-body-secondary">
              <h2>Login</h2>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={info.email}
                onChange={onChange}
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
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={info.password}
                onChange={onChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">
              Create new Account
            </Link>
          </form>
        </div>
      </div>
      <div
        className="m0"
        style={{ position: "absolute", bottom: "0px", width: "100%" }}
      >
        <Footer />
      </div>
    </div>
  );
}
