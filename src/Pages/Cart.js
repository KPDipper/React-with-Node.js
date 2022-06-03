import React from "react";
import Footer from "../Componenets/Footer";
import Navbar from "../Componenets/Navbar";
import { API } from "../config";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import "./Cart.css";
import { useSelector ,useDispatch} from "react-redux";
import { removeItemFromCart,addItemsToCart} from "../Reducer/cartActions";
import { Link } from "react-router-dom";




const Cart = () => {
  const { cart_items } = useSelector((state) => state.cart); //yhere reducer ma bhayeko value read garna lai
  console.log(cart_items)

  console.log(cart_items);


  const dispatch = useDispatch()//reducer ma action perform garna paryo bhane dispatch chaincha

  //yo cart ma cha yo user le cart ma rakhaya cha so yo tai reducer bata delete garnu parne not delete from database

  const removeFromCart=(id,name)=>{//id tai function ko lagi name tai toast ko lagi
  
    dispatch(removeItemFromCart(id))//here dipatch le action perform garch which comes from cartAction call garyoum
    //here particular product from cart ma remove hgarnu paryo bhane id pass garne of that product save in cart
    //here database ma garyo bhane params._id chaincha in reducer not needed
    toast.success(`${name} has been removed from the card`)

  }
  const increaseInCart = (id, quantity, count_in_Stock)=>{
    const new_quantity = quantity+1
    if(new_quantity>count_in_Stock){
        return;
    }
    dispatch(addItemsToCart(id, new_quantity))
    toast.success(`count has been updated`)
}

const reduceFromCart = (id, quantity) => {
  const new_quantity = quantity - 1
  if(new_quantity == 0){
      return;
  }
  dispatch(addItemsToCart(id, new_quantity))
  toast.success(`count has been decreased`)
}

  return (
    <>
      <ToastContainer/>
      <div className="container-sm mx-auto mt-3">
      {/* <checkout_progress  confirmOrder={'confirmOrder'} /> */}
        <table className="table table-striped table-hover mytable text-center">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Product image</th>
              <th scope="col">Product detail</th>
              <th scope="col" colSpan={2}>Action</th>
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
                  <h4>{item.product_price} </h4>
                  <p>{item.product_description}</p>
                </td>
                <td>
                  <div className="row w-50 mx-auto">
                    <button className="col btn btn-danger" onClick={()=>reduceFromCart(item.product,item.quantity)}>-</button>
                    <input
                      type={"text"}
                      value={item.quantity}
                      className="col text-center"
                    />
                    <button className="col btn btn-success" onClick={()=>increaseInCart(item.product,item.quantity,item.count_in_Stock)}>+</button>
                  </div>
                </td>
                <td>
                <button className='btn btn-warning' onClick={()=>removeFromCart(item.product, item.product_name)}>Remove</button>
                  {/* yeita tai function ma pass garna ko lagi arko tai toast ko lagi
                  product tai reducer ko lagi bhyo
                  name tai toast ko lagi */}
                </td>
              </tr>
            ))}

           <tr>
            <td><Link to='/checkout'><button>Proceed to Checkout</button></Link></td>
            </tr>
            
          </tbody>
        </table>
      </div>

      
    </>
  );
};

export default Cart;
