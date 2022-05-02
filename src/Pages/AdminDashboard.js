import React from "react";
import Footer from "../Componenets/Footer";
import Navbar from "../Componenets/Navbar";
// import { Link } from "react-router-dom";
import AdminSidebar from "../Componenets/AdminSidebar";

const AdminDashboard = () => {
  return (
    <>
     
      <div className="row">
        <div className="col-md-3">
         <AdminSidebar/>
        </div>
        <div className="col-md-9"></div>
      </div>

    </>
  );
};

export default AdminDashboard;
