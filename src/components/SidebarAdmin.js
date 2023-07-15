import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [bt, setbt] = useState("");
  const activeBtn = (val) => {
    if (bt !== val) return "nav-link text-white";
    else return "nav-link active";
  };
  return (
    <div style={{ width: "280px", height: "100vh", "padding-right": "150px" }}>
      <div
        className="d-flex flex-column flex-shrink-0 px-3 text-white bg-dark min-w-210 w-300 ml-0 fixed-top"
        style={{ width: "280px", height: "100vh", "padding-right": "150px" }}
      >
        <br />
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Admin Panel</span>
        </Link>

        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li
            className="nav-item"
            onClick={(e) => {
              setbt(e.target.value);
            }}
          >
            <Link
              to="/"
              className="nav-link active"
              value="Home"
              onClick={(e) => {
                setbt(e.target.value);
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/adminUsers"
              className="nav-link text-white "
              value="Users"
              onClick={(e) => {
                setbt(e.target.value);
              }}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/adminOrders"
              className="nav-link text-white"
              value="Orders"
              onClick={(e) => {
                setbt(e.target.value);
              }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/adminitem"
              className={activeBtn("FoodItems")}
              value="FoodItems"
              onClick={(e) => {
                setbt(e.target.value);
              }}
            >
              Food Items
            </Link>
          </li>
          <li>
            <Link
              to="/adminAddFood"
              className={activeBtn("Add")}
              value="Add"
              onClick={(e) => {
                setbt(e.target.value);
              }}
            >
              Add Food Item
            </Link>
          </li>
          <li>{bt}</li>
        </ul>
        <hr />
      </div>
    </div>
  );
}
