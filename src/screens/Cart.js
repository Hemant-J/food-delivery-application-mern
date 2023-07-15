import React from "react";
import { v4 as uuid } from "uuid";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let userEmail = localStorage.getItem("userEmail");

  let data = useCart();
  const should_have = JSON.stringify({
    order_data: data,
    email: userEmail,
    order_date: new Date().toDateString(),
    order_id: uuid(),
  });

  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    //console.log(uuid());
    let response = await fetch("http://localhost:3001/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: should_have,
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr class="table-active">
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" class="btn btn-danger p-0">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Linearicons_trash.svg/2048px-Linearicons_trash.svg.png"
                      alt="Delete"
                      style={{
                        height: "10px",
                        margin: "2px",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">
            Total Price:
            {totalPrice}/-
          </h1>
        </div>
        <div>
          <button
            type="button"
            class="btn btn-success"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
