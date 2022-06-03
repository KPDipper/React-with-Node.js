import React from "react";

import "react-toastify/dist/ReactToastify.css";

import "./Cart.css";
import { useSelector } from "react-redux";
import Checkout_progress from "../Componenets/Checkout_progress";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart_items } = useSelector((state) => state.cart); //yhere reducer ma bhayeko value read garna lai
  console.log(cart_items);

  const calculate_item = () => {
    let quantity_array = cart_items.map((item) => item.quantity);
    // [3, 2, 1]
    let total_quantity = quantity_array.reduce((acc, cur) => acc + cur);
    return total_quantity;
  };

  const calculate_total_price = () => {
    let prices = cart_items.map((item) => item.quantity * item.product_price);
    let total_price = prices.reduce((acc, cur) => acc + cur);
    return total_price;
  };

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <div className="container mx-auto">
            <Checkout_progress confirmOrder className="my-3" />
            <table className="table table-striped table-hover  text-center">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Product image</th>
                  <th>Product detail</th>
                  <th>No. of Items</th>
                  <th>Prices</th>
                </tr>
              </thead>
              <tbody>
                {/* //abha jun localStorage ma add to cart ma cha athwa redux bata lida ji huncha*/}

                {cart_items.map((item, i) => (
                  <tr keey={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.product_image}`}
                        alt=""
                        height={"100px"}
                      />
                    </td>
                    <td>
                      <h4>{item.product_name} </h4>
                      <p>{item.product_description}</p>
                    </td>
                    <td>{item.quantity}</td>
                    <td>
                      {item.product_price * item.quantity}
                      {/* yo total price bhyo */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-3 p-5 ">
          <div className="m-3 shadow-lg p-3">
            <h4>
              No. of items in Cart:
              <b>
                {/* overall cart items  */}
                {calculate_item()}
              </b>
            </h4>

            <h4>
              Total Price:<b>{calculate_total_price()}</b>
            </h4>

            <hr className="my-3" />
            <Link to="/shipping">
              <button className="btn btn-warning">Proceed to Shipping</button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default Checkout;




{
  /* 
[5,6,7,8]
sum =        reduce((acc,cur)=>{return acc+curr})
acc + cur
5+6 =11
11 + 7 = 18
18 + 8 = 26

*/
}
// [{samsung, q:5, p:13000}, {iphone, q:3, p: 130000}]
