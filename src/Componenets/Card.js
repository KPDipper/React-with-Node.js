import React from "react";
import { Link } from "react-router-dom";

const Card = ({props}) => {//sorted order limit products ko default value yeta ayera bascha
    //here props lai object bnayera linu paryo
  return (
    <>
      <div className="col">
        <div className="card shadow-lg mb-5">
          <div className="card-image">
          {/* this is how we accessed image/file in react */}
            <img src={`http://localhost:5000/${props.product_image}`}className="card-img-top" alt="..." />
          </div>
          <div className="card-body">
            <div className="text-center">
              <h5 className="card-title">{props.product_name}</h5>
              <h6 className="card-title">Rs.{props.product_price}</h6>
              <h6 className="card-title text-truncate" style={{"height":"30px"}}>{props.product_description}</h6>

              <Link to={`/product/details/${props._id}`}>
              {/* here now abha harek product ko different differentdetail hunu paryo so props bata jun valie ayo teslai uniuie id proivde huncha  */}
              <button className="btn btn-warning">view details</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
