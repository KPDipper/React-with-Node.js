import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";
import RelatedProducts from "../RelatedProducts";
import { getProductDetails } from "./productAPI";

const Product_Details = () => {
  //to accessed throught object
  const params = useParams(); //params ma tai id ai racha not the whole product
  const [product, setProduct] = useState({}); //here since single product aucha so we use object instead of array


  const { user } = isAuthenticated(); //to access user that have login to the account
  console.log(user)
  

  useEffect(() => {
    getProductDetails(params.id) //here params ma ai racha id
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct(data);
          console.log(product);
        }
      })
      .catch((err) => console.log(err));
  }, [params]);

  return (
    <>
      <div className="container w-75 my-5 mx-auto shadow-lg p-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://localhost:5000/${product.product_image}`}
              style={{"height":"400px"}}
              alt={product.prouduct_name}
              className="img-fluid"
            ></img>
          </div>
          <div className="col-md-6">
            <h3>{product.product_name}</h3>
            <h4>Rs. {product.prouduct_price}</h4>
            <h5>
              Stock:
              <input
                type="text"
                className="text-muted"
                value={product.count_in_Stock}
              ></input>
            </h5>
            <p>Description:{product.product_description}</p>
            {/* {(!user || user.role===0 )&& (
              <button className="btn btn-warning">Add to Cart</button>
            )} */}
          
            {(user && user.role === 1 )? 
              <>
                <button className="btn btn-info">Edit Product</button>
                <button className="btn btn-danger">Remove Product</button>
              </>
              :
              <button className="btn btn-warning">Add to Cart</button>
            }

          </div>
        </div>
      
      </div>
      {/* {console.log(product._id)} */}
      <RelatedProducts/>
      {/* products details ma relatedProducts call garchyou */}
        {/* here yeta product ko id tai relatedProducts ma pass garne 
        relatedProducts ma tyo id use garera uta relatedProducts haru ayo */}
    </>
  );
};

export default Product_Details;
