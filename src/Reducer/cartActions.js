import { API } from "../config"
import axios from 'axios'
import {ADD_TO_CART, REMOVE_TO_CART} from './cartConstants'


//button le yo function call garcha
export const addItemsToCart= (id,quantity)=> async(dispatch,getState)=>{//kuna tai reducers bata ako ho thaouna ko lagi  getState use garne
 //dispatch bhaye pachi tai reducer ma event tai pass garnu paryo like add to cart or delete cart
const {data} = await axios.get(`${API}/findproduct/${id}`)//here single product fetch huncha yeta and it goes to data where we destructure it

dispatch({
    type:ADD_TO_CART,
    payload:{//here yesma k value pathune add to cart garda payload  kam huncha
        //payload data pass garna ko lagi kam lagcha

        product:id,//here kk field cart ma storred garne matra leko
        product_name:data.product_name,//yo pachadi tai backend bata ako ho
        product_price:data.product_price,
        product_image:data.product_image,
        count_in_Stock:data.count_in_Stock,
        product_description:data.product_description,
        quantity:quantity

    }
})
localStorage.setItem('cart_items',JSON.stringify(getState().cart.cart_items))//yo cart item localstorage ma garna ko lagi//here abha sabai nai uane bhyo
}//j baki cha teslai localstorage ma save garnu paryo


//reducer ma tei function call garnu paryo bhane hareko time dispatch call garnu parcha
export const removeItemFromCart = (id)=> async(dispatch,getState)=>{

    const {data} = await axios.get(`${API}/findproduct/${id}`)//yo backend bata fetch gareko 
    dispatch({//dispatch ma jaile object banyera pathunu paryo
        type:REMOVE_TO_CART,
        payload:{//payload ma ni object banyera pathune//euta matra object remove huncha tesaile objectma
            product:data._id//yo backend bata ako pachadi
 

        }
    })
    localStorage.setItem('cart_items',JSON.stringify(getState().cart.cart_items))//j baki cha teslai localstorage ma save garnu paryo
}//here baki value localstroage ma set gareko