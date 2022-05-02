import React, { useState, useEffect } from "react";
import AdminSidebar from "../AdminSidebar";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { findCategory, updateCategory } from "./categoryAPI";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { userNavigate } from "react-router-dom";

const CategoryUpdate = () => {
  const params = useParams();
  const { token } = isAuthenticated();
  const [old_category, setOLDCategory] = useState("");
  const [new_category, setNEWCategory] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(params.id)
    findCategory(params.id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOLDCategory(data.category_name); //setcategory le tai update garnu agadi oldcategory ko value dekahuna parcha so yesle tai category_name ma bhayeko value setold category ma rakhcja ra old category ma pathcuha
        }
      })
      .catch((error) => console.log(error));
  }, [success]);
  //find category le update garne ho so success huda kheri useefect le updatecategory ko naya value dekhaucha 

  const update = (e) => {
    e.preventDefault();
    setSuccess(false); //
    const category_name = new_category;
    updateCategory(params.id, { category_name }, token) //hamile yetai bata object banyera pathaune API lai
      .then((data) => {
        if (data.error) {
          setSuccess("");
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };
  // to show error
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

  // to show success/ user is added
  const showSuccess = () => {
    //
    if (success) {
      return <div className="alert alert-success">Category Updated.</div>;
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*

  return (
    <div>
      <Navbar />
      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Categories</h3>
            <div className="container">
              {showError()}
              {showSuccess()}
              <div className="form-floating">
                <input
                  type={"text"}
                  className="form-control"
                  value={old_category}
                  readOnly
                />
                <label>Previous Category Name</label>
              </div>
              {success ? (
                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/admin/category")}
                >
                  Go back
                </button>
              ) : (
                <>
                  <div className="form-floating">
                    <input
                      type={"text"}
                      className="form-control"
                      placeholder="enter category_name"
                      
                      onChange={(e) => setNEWCategory(e.target.value)}
                    />
                    <label>New Category Name</label>
                  </div>
                  <button
                    className="btn btn-warning"
                    onClick={(e) => update(e)}
                  >
                    UPDATE
                  </button>
                </>
              )}

              {/* <div className="form-floating">
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="enter category_name"
                  onChange={(e)=>setNEWCategory(e.target.value)}
                />
                <label>New Category Name</label>
              </div>



              <button className="btn btn-outline-success" onClick={(e)=>update(e)}>UPDATE</button>
              here e bhaneko naya value ko jo abha hami ypdate unction ma pathauchyoum ra tei value onclick event le garda update huncha */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
