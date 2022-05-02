import React, { useState } from "react";
import Footer from "../Componenets/Footer";
import Navbar from "../Componenets/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; //here usenavigate kun page bhanera ra uselocation tai route  athawa path  dina ko lagi
import { authenticate, isAuthenticated, signin } from "../Componenets/auth"; //yo clickSubmit ma use hune ho ra import hunu parcha

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false); //yedi email ra password sucess bhyo bhane we need to go next page so redirect is used for that
  //in default redirect false ma rakhne if there is an error we would remain that same page
  const navigate = useNavigate();
  // const path = useLocation();
  const { user } = isAuthenticated(); //user ko value matra aunu paryo so curly bracket if not then token ni aucha

  const clickSubmit = (e) => {
    e.preventDefault();
    signin({ email, password })
      .then((data) => {
        //here data jun ayo abha error cha ki chaina check ko lagi//yesma data email,password ho

        if (data.error) {
          setError(data.error);
        } else {
          authenticate(data, () => setRedirect(true)); //sign in sucess bhyo bhane autheticate call garne//yo next function call gari rachyou
          //next here is call back function
          //here sucess garyo bhane redirect garne
          //role anusar page rediect hunu paryo like for admin and user
        }
      })
      .catch((error) => console.log(error));
  };

  //here error lai kasari display garne bhanera
  const showError = () => {
    //yo tai backend ko validation error haru
    if (error) {
      return <div className="alert alert-danger">{error}</div>; //yo error display garne bhyo
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div> //display none gareko yedi sucess bhyo bhane so none garnu parcha pachi ko lagi
      );
    }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  //to redirect if successfully login
  //yo tai mathi authintacte bata airacha
 //role check garne ra kata jane bataucha
  const redirectToPage = () => {
    if (redirect) {
      // console.log(user)
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      }
      if (user && user.role === 0) {
        return navigate("/");
      }
      return false;
    }
  };

  return (
    <>
     
      {showError()}
      {/* for error */}
      {redirectToPage()}
      {/* if sucess then redirect to home page */}

      <div className="container-sm w-50 mx-auto mt-5 shadow-lg p-5">
        <main className="form-signin">
          <form>
            <img
              className="mb-4"
              src="./logo192.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control az"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)} //here yedi textbox ma kei change bhyo bhane yo call huncha jasma hami event pass garchyou so hamile email naya update huncha
                //type gareko valie e.target.value huncnha
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating  mt-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} //here textbox ma kei change bhyo bhane tyo  value e.target.value ma aucha ra onchange event call huncha
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <center>
              <button
                className="btn btn-lg btn-primary"
                type="submit"
                onClick={clickSubmit}
              >
                Sign in
              </button>
            </center>
            <div className="mt-1">
              Do not have account?<Link to="/signup">Register</Link>
            </div>
            <p className="mt-5 mb-3 text-muted">&copy; 2022–2025</p>
          </form>
        </main>
      </div>
    
    </>
  );
};

export default Signin;
