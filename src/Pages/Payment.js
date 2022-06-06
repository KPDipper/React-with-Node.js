import React from "react";
import { useSelector } from "react-redux";
import Checkout_progress from "../Componenets/Checkout_progress";
import { Link, useNavigate } from "react-router-dom";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
} from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import { isAuthenticated } from "../Componenets/auth";
import { toast,ToastContainer  } from 'react-toastify'
import { API } from '../config'
import axios from 'axios'


//use navigate garda ni huncha ki return navigate
// const navigate= useNavigate()
const Payment = () => {

  //here only user can do itisAuthenticated()
const {user,token} = isAuthenticated()//sigin in hunu paryo ra user hunu paryo check garcha

//stripe ra element ni eta chaincha to load card
const stripe=useStripe()
const elements= useElements()
const navigate=useNavigate()

//styling gareko
  let options = {
    style:{
      base:{
        fontSize:"16px"
      },
      invalid:{
        color:"#ff0000"
      }
    }
  };

  let orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));//session storage ma bhayeko orderinfo (shipping garda)
console.log(orderInfo)
  const { cart_items, shipping_info } = useSelector((state) => state.cart);//yo tai reducers leoo cart_items ra shipping_info
 
  const shipping = shipping_info.shipping_info;
  const calculate_total_price = () => {
    let prices = cart_items.map((item) => item.quantity * item.product_price);
    let total_price = prices.reduce((acc, cur) => acc + cur);
    return total_price;
  };

  //yo shipping address ko lagi

  const order= {
    orderItems:cart_items,
    shippingAddress1: shipping_info.shippingAddress1,
    shippingAddress2: shipping_info.shippingAddress2,
    city:shipping_info.city,
    zip:shipping_info.zip,
    country:shipping_info.country,
    phone:shipping_info.phone,
    user: user._id
}


const paymentData = { amount : orderInfo*100    }


  const paymentHandle = async (e) => {
    e.preventDefault()//default acting rokhnu paryo
    document.querySelector('#pay_btn').disabled = true //selecting the button, disable
    let res
    try{                                               // to attempt payment
        const config= {                                // to connect with backend
            headers: {
                'Content-Type':"application/json",
                // Authorization: "Bearer ${token}"
            }
        }
        res = await axios.post(`${API}/processpayment`,paymentData, config)//yo backend bata feth gareko ho
        const client_secret = res.data.client_secret//payment success bhyo bhane backend bata client secret//ra sucess ni return huncha/res ma data aucha data ma client secret aucha

        if(!stripe || !elements){
            return
        }
        // make payment, 
        const result = await stripe.confirmCardPayment(`${client_secret}`,{//stripe ko mayent ko confirm ko lagi client secret pass garnu paryo ra payment method ho
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details:{
                    name: user.name,
                    email: user.email
                }
            }
        })//yedi methid ma error ayo
        if(result.error){//card haru ko number milena bhane atawa expire bhyo bhane kolagi
            toast.error(result.error.message)//error ayo bhane toast ma dekhaunu paryo
            document.querySelector('#pay_btn').disabled = false//yedi error ayo bhane buttom abled garne so feri payment garna ko lagi
        }
        else{//yedi error ayena bhane status check garnu paryo
            if(result.paymentIntent.status==='succeeded'){
                order.paymentInfo ={//yedi payment success bhyo bhane
                    id: result.paymentIntent.id,//result bitra aucha payment intend
                    status: result.paymentIntent.status
                }
                // dispatchEvent(createOrder(order))
                localStorage.removeItem('cart_items')//sucess bhaye pachi localstorage hatune
                // return <Navigate to='/payment_success'/>
                navigate('/paymentsucccess')
            }
            else{
                toast.error('error while processing')
            }
        }
        
    }
    catch(error){
        toast.error(error.message)
        document.querySelector('#pay_btn').disabled = false
    }
}

  return (
    <>
            <ToastContainer theme='colored'/>
      <div className="row">
        <div className="col-md-9 p-5">
          <Checkout_progress confirmOrder Shipping Payment />

          <h3>Order Information</h3>
          <div className="container mx-auto">
            <table className="table table-striped table-hover mytable text-center">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Product Image</th>
                  <th scope="col">Product Details</th>
                  <th scope="col">No. of items</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cart_items.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={`http://localhost:5000/${item.product_image}`}
                        alt=""
                        height={"100px"}
                      />
                    </td>
                    <td>
                      <h4>{item.product_name}</h4>
                      <h5>{item.product_price}</h5>
                      <p>{item.product_description}</p>
                    </td>
                    <td>
                      <h4>{item.quantity}</h4>
                    </td>
                    <td>
                      <h5>Rs. {item.quantity * item.product_price}</h5>
                    </td>
                  </tr>
                ))}
                <tr className="text-end">
                  <td colSpan={5}>
                    <h4>Total Amount: Rs. {calculate_total_price()}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="container mx-auto my-3 p-5">
            <h3>Shipping Information:</h3>
            <label className="h4 mt-3">
              <u>Address1</u>
            </label>
            <br />
            <label htmlFor="street1">Shipping Address :</label>
            <span className="h4">{shipping.street1}</span>
            <br />
            <label htmlFor="street2">Shipping Address 2:</label>
            <span className="h4">{shipping.street2}</span>
            <br />

            <label htmlFor="city">City:</label>
            <span className="h4">{shipping.city}</span>
            <br />

            <label htmlFor="country">Country:</label>
            <span className="h4">{shipping.country}</span>
            <br />

            <label htmlFor="phone">Phone Number:</label>
            <span className="h4">{shipping.phone}</span>
            <br />
          </div>
        </div>
        <div className="col-md-3 p-5">
          <div className=" m-3 shadow-lg p-3">
            <h3>Card Information:</h3>
            <div>
              <label htmlFor="card-number">Card Number</label>
              <CardNumberElement
                type="text"
                className="form-control"
                id="card-number"
                options={options}
              />
            </div>
            <div>
              <label htmlFor="card-expirty">Card Expiry</label>
              <CardExpiryElement
                type="text"
                className="form-control"
                id="card-expiry"
                options={options}
              />
            </div>
            <div>
              <label htmlFor="card-cvc">CVC</label>
              <CardCvcElement
                type="text"
                className="form-control"
                id="card-cvc"
                options={options}
              />
            </div>

            <button onClick={paymentHandle} className="btn btn-warning form-control" id="pay_btn">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
