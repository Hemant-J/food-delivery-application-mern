import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Sidebar from "../components/SidebarAdmin";

export default function Users() {
  const [user, setuser] = useState([]);
  const getUsers = async () => {
    fetch("http://localhost:3001/api/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setuser(res);
        console.log("load data called", res);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      fetch("http://localhost:3001/api/delUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      })
        .then((response) => response.json())
        .then(() => {
          //console.log(response);
          getUsers();
        });
    } else {
    }
  };

  return (
    <div className="row">
      <div className="col-auto">
        <Sidebar />
      </div>
      <div className="col">
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
          <h1>User Details</h1>
          <hr></hr>
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">E-mail</th>
                <th scope="col">Type</th>
                <th scope="col">Date</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {user.map((entry, index) => {
                return (
                  <tr class="table-active">
                    <th scope="row">{index + 1} </th>
                    <td>{entry.name}</td>
                    <td>{entry.location}</td>
                    <td>{entry.email}</td>
                    <td>{entry.user_type}</td>
                    <td>{entry.date.toString().slice(0, 10)}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger p-0"
                        onClick={() => {
                          handleDelete(entry._id, entry.name);
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
