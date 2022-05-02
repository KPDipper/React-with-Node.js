import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //useparams le url ko paraeter lincha
import Footer from "../Componenets/Footer";
import Navbar from "../Componenets/Navbar";

//localhost:3000/email/confirmation/ce701cb23127ab9172037d59771086b7 yesto route dinu parcha for verfication of email you route ma defie garnu parcha
//yo mailtrap.io bata ako habha hami register garcyou account then verify bhane click

const Confirm = () => {
  let url_parameters = useParams(); //to get parameter from the url

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/confirmation/${url_parameters.token}`, {
      //here url_parameters.token tai hami url ko token linchyou
      //backend bata tancha matra ra yeta value return huncha that means addUser ko function call huncha front end ma

      method: "POST", //user le input gareko kura haru tai backend ma patahko
    }) 
      .then(res=>res.json())//euta tai json format ma conver t garna ko laggi
      .then((data) => {
        if (data.error) {
          return setError(data.error);
        } else {
          return setSuccess(true);
        }
      })
      .catch((error) => console.log(error));
  }, [url_parameters]); //here uedi url_parameter ko kei change bhyo bhane useeffect ko code action ma jancha
  // console.log(url_parameters.token)//here abha console ma token boject ma gayera bascha ra we can token too in console.

  //here yo showerror ra showsucess tai hamile signup bata ako ho
  const showError = () => {
    //yo tai backend ko validation error haru
    if (error) {
      
      return <div className="alert alert-danger">{error}</div>; //yo error display garne bhyo
     }// else {
    //   return (
    //     <div className="alert alert-danger" style={{ display: "none" }}></div> //display none gareko yedi sucess bhyo bhane so none garnu parcha pachi ko lagi
    //   );
    // }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  // to show success/ user is added
  const showSuccess = () => {
    
    if (success) {
      return (
        <div className="alert alert-success">
          Account verified successfully.Please log in to contnue
        </div>
      );
    }
  };
  return (
    <div>
      <Navbar />
      {showError()}
      {showSuccess()}
      <Footer />
    </div>
  );
};

export default Confirm;
