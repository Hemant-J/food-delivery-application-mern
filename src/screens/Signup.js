import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Signup() {
  let navigate = useNavigate();
  const [UserType, setUserType] = useState("User");
  const [Key, setKey] = useState({ key: "" });
  const [info, setinfo] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: info.name,
        email: info.email,
        password: info.password,
        location: info.location,
        user_type: UserType,
        admin_key: Key.key,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.done) {
      alert(`Enter valid info ${JSON.stringify(json)}`);
    } else {
      alert(`New ${UserType} created`);
      navigate("/login");
    }
  };
  const onChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };
  const onChangeKey = (event) => {
    setKey({ ...Key, [event.target.name]: event.target.value });
  };
  const activeBtn = (val) => {
    if (UserType !== val) return "btn btn-outline-primary text-body";
    else return "btn btn-outline-primary active text-body";
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
              <h2>Sign Up</h2>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <label className={activeBtn("User")} htmlFor="btnradio1">
                <input
                  type="radio"
                  className="btn-check"
                  name="UserType"
                  value="User"
                  id="btnradio1"
                  onClick={(e) => {
                    setUserType(e.target.value);
                  }}
                  autocomplete="off"
                  checked
                />
                User
              </label>

              <label className={activeBtn("Admin")} htmlFor="btnradio2">
                <input
                  type="radio"
                  className="btn-check"
                  name="UserType"
                  id="btnradio2"
                  value="Admin"
                  autocomplete="off"
                  onClick={(e) => {
                    setUserType(e.target.value);
                  }}
                />
                Admin
              </label>
            </div>
            <div className="mb-3">
              <br />
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={info.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="desc"
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
              <label htmlFor="Password1" className="form-label">
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
            {UserType === "Admin" ? (
              <div className="mb-3">
                <label htmlFor="adkey" className="form-label">
                  Admin Key
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="key"
                  value={Key.key}
                  onChange={onChangeKey}
                />
              </div>
            ) : (
              ""
            )}
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="location"
                value={info.location}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a user
            </Link>
          </form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
