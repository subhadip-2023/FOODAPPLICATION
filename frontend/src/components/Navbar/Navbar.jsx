// import React from 'react'
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
const Navbar = ({ setShowLogin }) => {
  const [list, setlist] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const logout = () =>{
    localStorage.removeItem("token");
    navigate('/');
    setToken("");
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="nav-menu">
        <Link
          to="/"
          onClick={() => setlist("home")}
          className={list === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#menu"
          onClick={() => setlist("menu")}
          className={list === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setlist("About-Us")}
          className={list === "About-Us" ? "active" : ""}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setlist("Conatact Us")}
          className={list === "Conatact Us" ? "active" : ""}
        >
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </div>
        {
          !token? <button onClick={() => setShowLogin(true)}>Sign In</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={()=>navigate("/myOrders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
