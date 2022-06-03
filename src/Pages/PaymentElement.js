import React, { useState, useEffect } from "react";
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "../config";

const PaymentElement = () => {
  //backend ma key aucha tyo read garne
  //
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    return (
      fetch(`${API}/stripeapi`, {
        method: "GET",
      })
        .then((res) => res.json())

        //jun data aucha ra tesma stripeapikey value huncha jaslai hami setStripeApikey ma set garchyou ra use state
        .then((data) => setStripeApiKey(data.stripeAPIKey))
       
        // setStripeApiKey(data.stripeAPIKey)
        .catch((err) => console.log(err))
    );

  });
  console.log(stripeApiKey)
  return (
    <>

      {stripeApiKey && 
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Payment />
        </Elements>
      }
      
    </>
  );
};

export default PaymentElement;
