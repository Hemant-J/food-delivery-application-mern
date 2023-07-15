import React, { useEffect, useState } from "react";
import Sidebar from "../components/SidebarAdmin";
export default function Orders() {
  const [data, setdata] = useState([]);
  const [Pdata, setPdata] = useState([]);
  const getAllOrder = async () => {
    fetch("http://localhost:3001/api/adminOrderData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setdata(res);
        console.log("fetched:", res);
      });
  };
  const pendingOrder = async () => {
    fetch("http://localhost:3001/api/adminOrder", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setPdata(res);
        console.log("fetched p:", res);
      });
  };
  const handleClick = async (id) => {
    fetch("http://localhost:3001/api/adminOrderDel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      //.then((response) => response.json())
      .then(() => {
        //console.log(response);
        alert("Order Delivered");
        pendingOrder();
      });
  };
  useEffect(() => {
    pendingOrder();
    getAllOrder();
  }, []);
  return (
    <div className="row">
      <div className="col-auto">
        <Sidebar />
      </div>
      <div className="col">
        <div className="m-auto mt-2 fs-4">Pending Orders</div>
        <hr></hr>
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr className="table-primary">
                <th scope="col">#</th>
                <th scope="col">Order-Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Email</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Pdata === {} ? (
                <div>
                  <h1>
                    <center>No Pending Orders</center>
                  </h1>
                </div>
              ) : (
                ""
              )}
              {Pdata !== {} ? (
                Array(Pdata).map((item, index) => {
                  return item.map((e) => {
                    return e.order_data.map((order) => {
                      let a = 0;
                      index = index + 1;
                      return order ? (
                        <tr>
                          <th>{index}</th>
                          <td>{order[0].order_id}</td>
                          <td>{order[0].Order_date}</td>
                          <td>{e.email}</td>
                          {order.forEach((e, i) => {
                            if (i !== 0) {
                              a = a + e.price;
                            }
                          })}
                          <td>{a}</td>
                          <td>
                            <p
                              className="text-warning"
                              onClick={() => {
                                handleClick(e._id);
                              }}
                            >
                              Pending
                            </p>
                          </td>
                        </tr>
                      ) : (
                        <div>
                          <h1>
                            <center>No Pending Orders</center>
                          </h1>
                        </div>
                      );
                    });
                  });
                })
              ) : (
                <div>
                  <h1>
                    <center>No Pending Orders</center>
                  </h1>
                </div>
              )}
            </tbody>
          </table>
          <div></div>
        </div>
        <div className="m-auto mt-2 fs-4">All Orders</div>
        <hr></hr>
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <table className="table table-hover">
            <thead>
              <tr className="table-primary">
                <th scope="col">#</th>
                <th scope="col">Order-Id</th>
                <th scope="col">Order Date</th>
                <th scope="col">Email</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array(data).map((item, index) => {
                return item.map((e) => {
                  return e.order_data.map((order) => {
                    let a = 0;
                    index = index + 1;
                    return (
                      <tr>
                        <th>{index}</th>
                        <td>{order[0].order_id}</td>
                        <td>{order[0].Order_date}</td>
                        <td>{e.email}</td>
                        {order.forEach((e, i) => {
                          if (i !== 0) {
                            a = a + e.price;
                          }
                        })}
                        <td>{a}</td>
                        {/* {order[0].status === "pending" ? (
                          <td>
                            <p className="text-success">Pending</p>
                          </td>
                        ) : (
                          <td>
                            <p className="text-success">Delivered</p>
                          </td>
                        )} */}
                        <td>
                          <p className="text-success">Delivered</p>
                        </td>
                      </tr>
                    );
                  });
                });
              })}
            </tbody>
          </table>
          <div></div>
        </div>
      </div>
    </div>
  );
}
