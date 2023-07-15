/**
 * The App function is the main component of a React application that sets up the routing and renders
 * different screens based on the URL path.
 * @returns The App component is being returned.
 */
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Signup from "./screens/Signup";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screens/MyOrder";
import Admin from "./screens/Admin";
import Items from "./admin/items";
import Users from "./admin/users";
import AddFood from "./admin/addFood";
import Orders from "./admin/orders";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route
              exact
              path="/admin"
              element={
                <AdminAccess>
                  <Admin />
                </AdminAccess>
              }
            />
            <Route
              exact
              path="/adminitem"
              element={
                <AdminAccess>
                  <Items />
                </AdminAccess>
              }
            />
            <Route
              exact
              path="/adminUsers"
              element={
                <AdminAccess>
                  <Users />
                </AdminAccess>
              }
            />
            <Route
              exact
              path="/adminAddFood"
              element={
                <AdminAccess>
                  <AddFood />
                </AdminAccess>
              }
            />
            <Route
              exact
              path="/adminOrders"
              element={
                <AdminAccess>
                  <Orders />
                </AdminAccess>
              }
            />
            <Route
              exact
              path="*"
              element={
                <div className="center text-danger">
                  <h1>Error 404: Page not found</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
  function AdminAccess({ children }) {
    if (localStorage.getItem("userType") === "Admin") {
      return <>{children}</>;
    } else {
      return <div>No Access</div>;
    }
  }
}

export default App;
