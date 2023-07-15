import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/SidebarAdmin";

export default function Items() {
  // const [foodCat, setfoodCat] = useState([]);
  const [foodItem, setfoodItem] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      fetch("http://localhost:3001/api/delItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => response.json())
        .then(() => {
          //console.log(response);
          loadData();
        });
    } else {
    }
  };

  const loadData = async () => {
    fetch("http://localhost:3001/api/allFoodData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setfoodItem(res);
        console.log("load data called", res);
      });

    //setfoodCat(response[1]);
  };
  //console.log(foodItem);
  //console.log(foodCat);

  useEffect(() => {
    loadData();
  }, []);
  // const size = Object.keys(foodItem.options);
  const size = [];
  foodItem.forEach((data, index) => {
    Array(data.options).forEach((item) => {
      item.forEach((e) => {
        //size.push(Object.entries(e));
        size.push(
          Object.entries(e).map(([key, val]) => {
            return `${key} : ${val} `;
          })
        );
      });
    });
  });

  //console.log(size);
  return (
    <div className="row">
      <div className="col-auto">
        <Sidebar />
      </div>
      <div className="col">
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <h1>Food Gallery</h1>
          <hr></hr>
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th scope="col">#</th>
                <th scope="col">Img</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Prices</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {foodItem.map((data, index) => {
                // console.log(data);
                return (
                  <tr class="table-active">
                    <th scope="row">{index + 1} </th>
                    <td>
                      {
                        <img
                          src={data.img}
                          alt="Img"
                          style={{
                            height: "100px",
                            width: "180px",
                            objectFit: "cover",
                          }}
                        />
                      }
                    </td>
                    <td>{data.name}</td>
                    <td>{data.CategoryName}</td>
                    {/* <td>{size[index]}</td> */}
                    <td>
                      {/* <tr class="table-active">
                      <td>{size[index][0]}</td>
                    </tr>
                    <tr class="table-active">
                      <td>{size[index][1]}</td>
                    </tr>
                    <tr class="table-active">
                      <td>{size[index][2]}</td>
                    </tr> */}
                      {size[index].map((item) => {
                        return (
                          <tr key={item}>
                            <td key={item}>{item}</td>
                          </tr>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger p-0"
                        onClick={() => {
                          handleDelete(data._id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div></div>
        </div>
      </div>
    </div>
  );
}
