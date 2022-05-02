import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AdminSidebar from "../AdminSidebar";
import { getAllProducts } from "./productAPI";

const Products_in_Admin_Page = () => {
  const [products, setProducts] = useState([]);

  const [limit, setLimit] = useState(4); //HERE PRODuct limit dlehuna ko lagi

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container-fluid custom-row">
        <div className="row ">
          <div className="col-md-3">
            <AdminSidebar />
          </div>
          <div className="col-md-9">
            <h3 className="my-3 text-center">Add Product</h3>
            <hr />
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Product Image</th>
                  <th>Product Details</th>
                  <th>Count in Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* yo sab backend bata aucha */}
                {products.slice(0, limit).map((item, i) => {
                  //here yesle ekchoti ma jama 8 wota dehuacha

                  return (
                    <tr key={item._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          src={`http://localhost:5000/${item.product_image}`}
                          alt={item.product_name}
                          style={{ height: "150px" }}
                        />
                      </td>

                      <td>
                        <h3>{item.product_name}</h3>
                        <h4>{item.product_price}</h4>
                        <p>{item.description}</p>
                      </td>
                      <td>{item.count_in_Stock}</td>
                      <td>
                        <button className="btn btn-warning">
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  {
                    limit < products.length ? (
                      <td colSpan={5}>
                        <button
                          className="btn btn-warning"
                          onClick={() => setLimit(limit + 2)}
                        >
                          Load more
                        </button>
                      </td>
                    ) : (
                      <td colSpan={5}>
                        <h5>All Items Loaded</h5>
                      </td>
                    )
                    /* here abha hamile load more click garyou bhane setlimit le limit lai +4 garcha */
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products_in_Admin_Page;
