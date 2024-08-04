// import React from 'react'
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import React, {Suspense, useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import Myorders from "./pages/MyOrders/Myorders";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = React.lazy(()=> import("./pages/Home/Home"));
const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin ?  <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Suspense><Home /></Suspense>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>} />
          <Route path="/myOrders" element={<Myorders/>} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
};

export default App;
