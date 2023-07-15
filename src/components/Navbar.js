import React, { useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
export default function Navbar() {
  let data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-3 fst-italic"
            to="/"
            style={{
              fontFamily: "Special Elite",
            }}
          >
            FoodyHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              {localStorage.getItem("userType") === "Admin" ? (
                <li className="nav-item d-flex">
                  <Link className="nav-link" to="/admin">
                    Admin
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-item d-flex">
                  <Link className="nav-link" to="/">
                    <AiOutlineHome className="m-1" />
                    Home
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
              )}
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn btn-outline-light mx-1" to="/login">
                  Login
                </Link>

                <Link className="btn btn-outline-info mx-1" to="/createuser">
                  Signup
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link
                  className="btn btn-outline-warning mx-1"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  MyCart <AiOutlineShoppingCart className="m-1" />
                  {/* <Badge pill bg="danger mx-2">
                    2
                  </Badge> */}
                  <span class="badge rounded-pill bg-danger">
                    {data.length}
                  </span>
                </Link>
                {cartView ? (
                  <Modal
                    onClose={() => {
                      setCartView(false);
                    }}
                  >
                    <Cart></Cart>
                  </Modal>
                ) : null}

                <Link
                  className="btn btn-outline-danger mx-1"
                  style={{ fontWeight: "bold" }}
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
