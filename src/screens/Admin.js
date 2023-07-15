import React from "react";

import Sidebar from "../components/SidebarAdmin";

export default function Admin() {
  return (
    <div className="row">
      <div className="col-auto">
        <Sidebar />
      </div>
      <div className="col text-center m-2">
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </div>
  );
}
