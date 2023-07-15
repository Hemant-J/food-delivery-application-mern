import React, { useEffect, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useRef } from "react";
export default function Card(props) {
  let data = useCart();
  let dispatch = useDispatchCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOption = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddtocart = async () => {
    for (const item of data) {
      if (item.id === props.foodItems._id && item.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItems.img}
            className="card-img-top"
            alt="..."
            style={{ height: "174px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItems.name}</h5>
            {/*<p className="card-text">{props.foodItems.desc}</p>*/}
            <div className="container w-100">
              <select
                name="m-2 h-100 bg-primary rounded "
                onChange={(e) => setQty(e.target.value)}
                style={{ margin: "3px" }}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}{" "}
                    </option>
                  );
                })}
              </select>
              <select
                name="m-2 h-100 bg-primary rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOption.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline m-2 fs-5">Rs.{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddtocart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
