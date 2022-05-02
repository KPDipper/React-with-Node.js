import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

// import App from './App'
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Data from "./hooks/Data";
import Fetchdata from "./hooks/Fetchdata";
import Main from "./hooks/Main";
import Confirm from "./Pages/Confirm";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminRoute from "./Componenets/Routes/AdminRoute";
import PrivateRoute from "./Componenets/Routes/PrivateRoute";
import UserDashboard from "./Pages/UserDashboard";
import Category from "./Componenets/category/Category";
import CategoryUpdate from "./Componenets/category/CategoryUpdate";
import Addproduct from "./Componenets/product/Addproduct";
import Products_in_Admin_Page from "./Componenets/product/Products_in_Admin_Page";
import Navbar from "./Componenets/Navbar";
import Footer from "./Componenets/Footer";
import Product_Details from "./Componenets/product/Product_Details";

const MyRoutes = () => {
  return (
    <>
   
    <BrowserRouter>
    <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email/confirmation/:token" element={<Confirm />} />
        {/* yo route hamile sendemail ko url bata lyako from backend */}
        <Route path='/product/details/:id' element={<Product_Details/>}/>

       {/* here yo tai admin le matra acces garna paucha after he is login  */}
        <Route path="/" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/category" element={<Category/>}/>
          {/* yo admin le matra herna paucha user le tai mildena herna */}

          <Route path='/admin/categoryupdate/:id' element={<CategoryUpdate/>}/>
          {/* only admin can update category */}
          <Route path='/admin/product/add' element={<Addproduct/>}/>
          <Route path='/admin/products' element={<Products_in_Admin_Page/>}/>


        </Route>

              {/* here yo tai user le matra acces garna paucha after he is login  */}

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/user/profile" element={<UserDashboard />} />
          <Route path="/cart" element={<Cart />} />
          {/* now if user is not login and try to access the cart pages then it will redirect to sign in pages */}
          {/* jasto cart ma click garyo tara login hunu paryo login cha bhane cart mai jancha outlet bhakeo tyo ho
            login chaina bhane sign in ma lagidine */}

        </Route>
        
        

       
        <Route path="/showdata" element={<Data />} />
        <Route path="/fetchdata" element={<Fetchdata />} />
        <Route path="/text" element={<Main />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  
    </>
  );
};

export default MyRoutes;
