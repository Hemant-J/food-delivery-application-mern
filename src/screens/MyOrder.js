import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
export default function MyOrder() {
  const [orderData, setorderData] = useState("");
  const fetchMyData = async () => {
    let response = await fetch("http://localhost:3001/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
    });

    response = await response.json();
    console.log("Data fetched:", response);
    setorderData(response);
  };
  useEffect(() => {
    fetchMyData();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {orderData !== {} ? (
            Array(orderData).map((data) => {
              console.log("data", data);
              return data.orderData ? (
                data.orderData.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    return item.map((arrayData) => {
                      return (
                        <div>
                          {arrayData.Order_date ? (
                            <div className="m-auto mt-5">
                              {(data = arrayData.Order_date)}
                              <hr />
                            </div>
                          ) : (
                            <div
                              className="card text-white bg-primary mb-3"
                              style={{ "max-width": "320px" }}
                            >
                              <div className="card-header">
                                <h4>{arrayData.name}</h4>
                              </div>
                              <div className="card-body">
                                <p className="card-text">
                                  {arrayData.qty} X {arrayData.size}{" "}
                                  {arrayData.name}
                                </p>
                                <p className="card-text">
                                  Rs.{arrayData.price}/-
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })
              ) : (
                <div>
                  <h1>
                    <center>No History</center>
                  </h1>
                </div>
              );
            })
          ) : (
            <div>
              <h1>No History</h1>
            </div>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
