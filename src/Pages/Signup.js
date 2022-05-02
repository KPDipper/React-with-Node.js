import { Link } from "react-router-dom";

import React, { useState } from "react";
import Navbar from "../Componenets/Navbar";
import Footer from "../Componenets/Footer";
import { Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {signup} from '../Componenets/auth'

// here error message ko lagi tai formik and formlik le tai form lai tai enclose garinu

const Signup = () => {
  //jun value enter garoyum tyo value every timeupdate  hunu paryo j hos name stored tai use state ma gayera basnu paryo
  // variabl store bhyeko value usestate ma save huunu paryo
  //form ma value eneter garyoum ra kai gayera save hunu paryo so yo tala ko code kam lagcha variable store garnu parcha jo usestate
  //state bhaneko ko variable ho here first_name is variable
  //to store values for sending in addUser in backend
  //jaba yo success huncha yeslai hami usercontroller ko addUser function ma send garne
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  // destructuring garne tala abha

  const {
    first_name,
    last_name,
    date_of_birth,
    gender,
    email,
    password,
    error,
    success,
  } = values;

  //handelchange function to store values  in userState

  //
  const handleChange = (name) => (event) => {
    //first name ra last name name ma aucha ra kk change huncha tyo ai event ma aucha
    //first name matra change hhunu paryo not other filed//so if i change first name only then no other field will chnage except for first_name
    //same goes for all the fields
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  //*

  // submit form
  //event pass garnu pass garyo submit button bata
  //
  const handleSubmit = (event) => {
    event.preventDefault();//desubmit garda kheri yo tala code kam garnu parcha not default
    setValues({ ...values, error: "false" });//eroro ma false rkahyo aru tai sab change garne purano valu  j cha tei rakhcha ...value
    signup({ first_name, last_name, date_of_birth, gender, email, password })//index ma bhako call gareko
      .then((data) => {//kam bhyo bhane .then ma aucha//yo data ma error like email already exist cha athawa filed complete error haru sabai backend ko error eta aucha
        if (data.error) {
          // console.log(data.error)
          setValues({ ...values, error: data.error, success: false });
          console.log(error);
        } else {
          setValues({//submit bhayepchi empty hunu parcha
            ...values,
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: ",",
            email: "",
            password: "",
            error: "",
            success: true,//yo tai yedi sabai right bhyo bhane sucess true cha
          });
        }
      })
      .catch((error) => console.log("database error"));//database ma ayena bhane .catch ma aucha
  };

  // display:  error?'block':'none'
  // error? if there is error
  // if condition is true, display:'block'
  // if condition is false, display: 'none'

  // to show error
  const showError = () => {//yo tai backend ko validation error haru
    if (error) {
      return <div className="alert alert-danger">{error}</div>;//yo error display garne bhyo
    } else {
      return (
        <div className="alert alert-danger" style={{ display: "none" }}></div>//display none gareko yedi sucess bhyo bhane so none garnu parcha pachi ko lagi
      );
    }
    // return <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>{error}</div>
  };

  // to show success/ user is added
  const showSuccess = () => {//
    if (success) {
      return (
        <div className="alert alert-success">
          New user added. Please verify your account.
        </div>
      );
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*

  return (
    <>
      <Navbar />
      {showError()}
      {showSuccess()}
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          cpassword: "",
        }}
        //here initial value is jaba hami signup ma chirchyou ra kunai ni value hunna as we only pass empty value
        validationSchema={Yup.object({
          first_name: Yup.string() //yo tai compare gareko jasle check garcha ku yedi first_name tai string hunu parcha s
            .required("First name is required") //yo tai k janucha bhane firstname ma tai empty string pass garna pauna
            .min(3, "First name be atleast 3 characters")
            .max(30, "First name must not be more than 30 characters."),

          last_name: Yup.string() //yo tai compare gareko jasle check garcha ku yedi first_name tai string hunu parcha s
            .required("Last name is required") //yo tai k janucha bhane firstname ma tai empty string pass garna pauna
            .min(3, "Last name be atleast 3 characters")
            .max(30, "Last name must not be more than 30 characters."),

          email: Yup.string()
            .required("Email is required")
            .email("Invalid is Email format.Example : Example@gmail.com"), //yesle tai email format ma cha ki chaina check garcha

          password: Yup.string()
            .required("Password is required")
            .matches(
              /([?=.*a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_])/,
              "Password must contain  atleast one lowerCase, one UpperCase,one Number and one Special character."
            )
            .min(8, "and must be 8 characters")
            .max(30, "and must be most 30 characters"),

          cpassword: Yup.string()
            .required("Confirmation password is required")
            .oneOf(
              [Yup.ref("password")],
              "Password and Confrim password doesn't match"
            ),
          //  yo tai mathi ko password ra cpassword lai yedi match garna ko lagi use huncha.ref tai password ko reference deko ho.
        })}
      >
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
              <h1 className="h3 mb-3 fw-normal">REGISTER</h1>

              <div className="form-floating ">
                <input
                  type="text"
                  className="form-control "
                  id="floatingfirstname"
                  placeholder="Firstname"
                  name="first_name"
                  onChange={handleChange("first_name")}
                  value={first_name}

                  // here now we are passing form yup to first name so that yup will now check input filed of firstname
                />
                <label htmlFor="floatingfirstname">First Name</label>
                <ErrorMessage name="first_name">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
                {/* here jaba error auch form bharda keri tesko error mesg tai yeta grera aucha */}
              </div>

              <div className="form-floating mt-2">
                <input
                  type="text"
                  className="form-control "
                  id="floatinglastname"
                  placeholder="Lastname"
                  name="last_name"
                  onChange={handleChange("last_name")}
                  value={last_name}
                />
                <label htmlFor="floatinglastname">Last Name</label>
                <ErrorMessage name="last_name">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-floating mt-2">
                <input
                  type="date"
                  className="form-control "
                  id="floatingdate"
                  placeholder="Date"
                  onChange={handleChange("date_of_birth")}
                  value={date_of_birth}
                />
                <label htmlFor="floatingdate">Date of birth</label>
              </div>

              <label className="form-control">
                Gender:
                <div className="d-flex">
                  <div className="form-check ms-5 ">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1 "
                      onChange={handleChange("gender")}
                      value="Male"
                    />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      onChange={handleChange("gender")}
                      value="Female"
                    />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input mt-1"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      onChange={handleChange("gender")}
                      value="Others"
                    />
                    <label className="form-check-label" for="flexRadioDefault3">
                      Others
                    </label>
                  </div>
                </div>
              </label>

              <div className="form-floating mt-2">
                <input
                  type="email"
                  className="form-control "
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  onChange={handleChange("email")}
                  value={email}
                />

                <label htmlFor="floatingInput">Email address</label>
                <ErrorMessage name="email">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-floating  mt-2">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange("password")}
                  value={password}
                />
                <label htmlFor="floatingPassword">Password</label>

                <ErrorMessage name="password">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="form-floating  mt-2">
                <input
                  type="password"
                  className="form-control"
                  id="floatingCPassword"
                  placeholder="Confirm Password"
                  name="cpassword"
                />
                <label htmlFor="floatingCPassword">Confirm Password</label>

                <ErrorMessage name="cpassword">
                  {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="checkbox mb-3">
                <label>
                  <input type="checkbox" value="remember-me" /> I accepted the
                  terms & conditions.
                </label>
              </div>
              <center>
                <button className="btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>
                  Sign up
                </button>
              </center>
              <div className="mt-1">
                Already have account? <Link to="/signin">Signin</Link> here.
              </div>
              <p className="mt-5 mb-3 text-muted">&copy; 2022–2025</p>
            </form>
          </main>
        </div>
      </Formik>
      <Footer />
    </>
  );
};

export default Signup;
