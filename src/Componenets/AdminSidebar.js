import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
import { isAuthenticated } from "../Componenets/auth";
import { signout } from "./auth";
//yo tai hamile auth bata calla gareko which is used from back end

const AdminSidebar = () => {
  const { user } = isAuthenticated();
  //euta token aucha ra euta user aucha ra user matra lina ko lagi destrcturing aucha

  return (
    <div>
      <div
        class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark custom-sidebar"
        style={{ width: "280px" }}
      >
        <Link
          to="/"
          class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span class="fs-4">Sidebar</span>
        </Link>
        <hr />
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <Link to="/" class="nav-link active" aria-current="page">
              Home
            </Link>
          </li>
          <li>
            <Link to="/admin/category" class="nav-link text-white">
              Category
            </Link>
          </li>
          <li>
            <Link to="/admin/products" class="nav-link text-white">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/product/add" class="nav-link text-white">
             Add Product
            </Link>
          </li>

          <li>
            <Link to="#" class="nav-link text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link to="#" class="nav-link text-white">
              Users
            </Link>
          </li>
        </ul>
        <hr />
        <div class="dropdown">
          <Link
            to="#"
            class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              class="rounded-circle me-2"
            />
            <strong>{user.email}</strong>
            {/* here jun value ayo user ko destructuring garera abha hami le loalstorage ma jun save garya chau email tesalai dsiplay garna milcha  */}
            {/* abha user ko baki information we have access through user */}
          </Link>
          <ul
            class="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <Link class="dropdown-item" to="#">
                New project...
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="#">
                Settings
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="#">
                Profile
              </Link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <Link
                class="dropdown-item"
                to="/"
                onClick={() => {
                  signout()
                    .then((data) => {
                      if (data.error) {
                        console.log(data.error);
                      } else {
                        return;
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
