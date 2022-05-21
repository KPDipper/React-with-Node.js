import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import { isAuthenticated } from "../auth";
import { getProductDetails, updateProduct } from "./productAPI";

const ProductUpdate = () => {
  // const params = useParams()

  const params = useParams();

  const [newProduct, setNewProduct] = useState("");
  const [oldproduct, setOldProduct] = useState({});//here euta euta matra update garnu parcha so not in array but in object ma stored garnu parcha

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails(params._id)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setOldProduct(data); //to show old product name
       
        }
      })
      .catch((err) => console.log(err));
  }, [success]);

  const update = (e) => {
    e.preventDefault();
    const product_name = newProduct;
    updateProduct(params._id, { product_name }).then((data) => {
      if (data.errro) {
        setError(data.error);
      } else {
        setSuccess(true);
      }
    });
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
      return <div className="alert alert-success">Product Updated Updated.</div>;
    }
  };
  //here yeta samma register matra hunch abut nor verfication
  //*
  return <>
  <div className="container-fluid">
  <div className="row">
    <div className="col-md-3">
      <AdminSidebar/>
    </div>
    <div className="col-md-9">

    </div>
  </div>

  </div>


  </>;
};

export default ProductUpdate;
