import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import cartReducers from "./cartReducers";



const reducer=combineReducers({

    cart:cartReducers,

})

const initialState={
cart:{//yo tai s tate bhyo

    cart_items: localStorage.getItem('cart_items')?JSON.parse(localStorage.getItem('cart_items')):[], 
    shipping_info: localStorage.getItem('shipping_info')?JSON.parse(localStorage.getItem('shipping_info')):{}
     //initial data localstorage bata aucha chaina bahne empty nai huncha
    //euta cart ma multiple item huncha so cart tai array ma tara jamma euta shipping info matra huncha so object ma
}
   
}


const middleware=[thunk]//yesko kam tai value pass garna ko lagi ho

const store= createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))//redux ko state check garna ko lagi
//here reducer bhanyo tesko object baunu kam tai createstore 

export default store


//store create garmum yesma iinital data ra yeslai export garne
