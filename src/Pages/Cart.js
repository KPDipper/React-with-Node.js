import React from "react";
import Footer from "../Componenets/Footer";
import Navbar from "../Componenets/Navbar";

import './Cart.css'

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="container-sm mx-auto mt-3">
        <table className="table table-striped table-hover mytable">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Product image</th>
              <th scope="col">Product detail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <th scope="row">1</th>
              <td>
                  <img src="./img1.jpg" alt="" height={'150px'} width={'170px'}/>
              </td>
              <td><h4>Macbook Air </h4>
              <p>I7 processor,8gb ram</p>
              </td>
              <td>
                  <button className="btn btn-success me-3">Update</button>
                  <button className="btn btn-warning">Remove</button>
              </td>

            </tr>


            <tr>
              <th scope="row">2</th>
              <td>
                  <img src="./img2.jpg" alt=""  height={'150px'} width={'170px'}/>
              </td>
              <td><h4>Macbook Air </h4>
              <p>I7 processor,8gb ram</p>
              </td>
              <td>
                  <button className="btn btn-success me-3">Update</button>
                  <button className="btn btn-warning">Remove</button>
              </td>
            </tr>


            <tr>
              <th scope="row">3</th>
              <td>
                  <img src="./img3.jpg" alt="" height={'150px'} width={'170px'}/>
              </td>
              <td><h4>Macbook Air </h4>
              <p>I7 processor,8gb ram</p>
              </td>
              <td>
                  <button className="btn btn-success me-3">Update</button>
                  <button className="btn btn-warning">Remove</button>
              </td>
            </tr>


          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default Cart;
