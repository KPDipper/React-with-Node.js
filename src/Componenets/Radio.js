import React from "react";
import { productPrices } from "./ProductPrice";

//yeta tai productprice ma bhako value t ai aunu paryo yeta



const Radio = ({passing_handleFilters}) => {

  const handleChange=(e)=>{

    passing_handleFilters(e.target.value,'product_price')//yo jaile backend sanga compare garna ko lagi
  }
  return (
    <>
      {
        //here map garda kheri ProductPRice ma bhayeko const value haru map huncha one by one aucha
        productPrices.map((price,i) => {
          return (
            <div class="form-check" key={i}>
              <input
                class="form-check-input mt-1 me-2"
                type="radio"
                value={price.value}
                onChange={(e) => {handleChange(e)}}//yeta bata event pass garnu paryo that evenet is whenever there is change on radio
                id={price._id}
                name="different"
              />
              <label class="form-check-label" for={price._id}>
                {price.name}
              </label>
            </div>
          );
        })
      }
    </>
  );
};

export default Radio;
