import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "./auth";

const Navbar = () => {
  const { user } = isAuthenticated();

  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    signout()
      .then((data) => {
        if (data.error) {
          return console.log(data.error);
        } else {
          setRedirect(true);
        }
      })
      .catch((error) => console.log(error));
    // signout(() => setRedirect(true))
  };

  const redirectToPage = () => {
    if (redirect) {
      return navigate("/");
    }
  };
  return (
    <div>
      {redirectToPage()}
      <div className="row py-2 bg-light">
        <div className="col-md-3">
          <center>
            {" "}
            <Link
              className="navbar-brand pt-3"
              style={{
                color: "green",
                textAlign: "centre",
                fontSize: "25px",
                fontFamily: "cursive",
              }}
              to="/"
            >
              MY STORE
            </Link>
          </center>
        </div>
        <div className="col-md-6">
          <form className="d-flex">
            <input
              className=" me-2 form-control rounded"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-warning" type="submit">
              Search
            </button>
          </form>
        </div>
        <div className="col-md-3 d-flex  justify-content-evenly">
          {!user && ( //yo login na huda ko lagi
            <>
              <Link to="/signup">
                <i className="bi bi-person-plus-fill fs-3 text-warning"></i>
              </Link>
              <Link to="/signin">
                <i className="bi bi-box-arrow-in-right fs-3 text-warning"></i>
              </Link>
              <Link to="/cart">
                <i className="bi bi-cart fs-3 text-warning"></i>
              </Link>
            </>
          )}

          {user &&
            user.role === 1 && ( //yo admin login huda kheri
              <>
                <Link to="/admin/dashboard">
                  <i className="bi bi-border fs-3 text-warning"></i>
                </Link>
                <Link to="/" onClick={signOut}>
                  <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
                </Link>
              </>
            )}

          {user &&
            user.role === 0 && ( //yo tai normal user ko lagi
              <>
                <Link to="/user/profile">
                  <i className="bi bi-person-circle fs-3 text-warning"></i>
                </Link>
                <Link to="/" onClick={signOut}>
                  <i className="bi bi-box-arrow-left fs-3 text-warning"></i>
                </Link>
                <Link to="/cart">
                  <i className="bi bi-cart fs-3 text-warning"></i>
                </Link>
              </>
            )}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-secondary ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-4">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link " to="#">
                  Deals
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link" to="#">
                  Customer Service
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link className="nav-link" to="#">
                  Contact
                </Link>
              </li>
              {/* <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to="#">Action</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled to="#">Disabled</Link>
        </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
