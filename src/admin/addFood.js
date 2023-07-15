import React from "react";
import { useState } from "react";
import Sidebar from "../components/SidebarAdmin";

export default function AddFood() {
  const [data, setdata] = useState([{ size: "", price: "" }]);
  const [info, setinfo] = useState({
    name: "",
    CategoryName: "",
    img: "",
    description: "",
  });
  const handleClick = () => {
    setdata([...data, { size: "", price: "" }]);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const onChangeVal = [...data];
    onChangeVal[i][name] = value;
    setdata(onChangeVal);
  };
  const handleDelete = (i) => {
    const DeleteVal = [...data];
    DeleteVal.splice(i, 1);
    setdata(DeleteVal);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [];
    data.forEach((item) => {
      let b = Object.values(item);
      console.log(b);
      const obj = {};
      let key = b[0];
      obj[key] = b[1];
      arr.push(obj);
    });
    console.log(arr);
    let ans = {};
    arr.forEach((x) => {
      ans = { ...ans, ...x };
    });
    ans = Array(ans);
    console.log(ans);

    const response = await fetch("http://localhost:3001/api/addFoodItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CategoryName: info.CategoryName,
        name: info.name,
        img: info.img,
        options: ans,
        description: info.description,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert(`Enter valid info ${JSON.stringify(json)}`);
    } else {
      alert("Data Entry Done");
    }
  };
  const onChange = (event) => {
    setinfo({ ...info, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div
          className="col"
          style={{
            backgroundImage: `url("https://source.unsplash.com/random/1000x700/?burger")`,
            height: "100vh",
            backgroundSize: "cover",
          }}
        >
          <form
            className="w-50 m-auto mt-5 border bg-dark border-primary rounded p-4"
            onSubmit={handleSubmit}
          >
            <div className="text-center text-body-secondary">
              <h2>Add Food Item</h2>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={onChange}
                value={info.name}
                placeholder="Name"
              />
            </div>
            <br />
            <label htmlFor="Category">Category</label>
            <select
              className="form-control"
              name="CategoryName"
              onChange={onChange}
              value={info.CategoryName}
            >
              <option>Select</option>
              <option>Starter</option>
              <option>Biryani/Rice</option>
              <option>Pizza</option>
            </select>
            <br />
            <div className="form-group">
              <label htmlFor="ImageSource">Image Source</label>
              <input
                type="text"
                name="img"
                onChange={onChange}
                value={info.img}
                className="form-control"
                placeholder="Image Source"
              />
            </div>
            <br />
            {data.map((val, i) => {
              return (
                <div className="row">
                  <div className="col">
                    Size:
                    <input
                      type="text"
                      name="size"
                      value={val.size}
                      onChange={(e) => handleChange(e, i)}
                      className="form-control"
                      placeholder="First name"
                    />
                  </div>
                  <div className="col">
                    Price:
                    <input
                      type="text"
                      name="price"
                      value={val.price}
                      onChange={(e) => handleChange(e, i)}
                      className="form-control"
                      placeholder="Last name"
                    />
                  </div>

                  <div className="col">
                    <br />
                    {data.length !== 1 && (
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(i)}
                      >
                        -
                      </button>
                    )}
                    {data.length - 1 === i && (
                      <button className="btn btn-primary" onClick={handleClick}>
                        +
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <br />
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Description</label>
              <input
                type="text"
                name="description"
                value={info.description}
                onChange={onChange}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Example input"
              />
            </div>
            <div className="text-center m-3 ">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              {/* <p>{JSON.stringify(data)}</p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
