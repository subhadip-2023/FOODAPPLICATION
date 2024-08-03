import React, { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems, url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  });

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value= e.target.value;

    setData(prev=>({...prev, [name]:value}));
  }

  const placeOrder = async (e)=> {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:total,
    }
    try {
      let response = await axios.post(url+"/api/order/place",orderData,{ headers : {token} });
      // console.log(response.data);
      if(response.data.success){
        const {session_url} = response.data;
        // console.log(session_url);
        window.location.replace(session_url);
      }
  } catch (error) {
      alert("Error !");
      console.log(error);
    }
  }
  // console.log(data);
  const deliveryFee = ()=>{
    const netAmount = getTotalCartAmount();
    const percentage = (netAmount*3)/100;
    return percentage;
  } 
  let total  =  getTotalCartAmount() + deliveryFee();

  const navigate = useNavigate();
  
  useEffect(()=>{
    if(!token){
      navigate("/")
    }
    else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstname" onChange={onChangeHandler} value={data.firstname} type="text" placeholder="First name"  required/>
          <input name="lastname" onChange={onChangeHandler} value={data.lastname} type="text" placeholder="Last name"  required/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="email"  required/>
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="street"  required/>
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"  required/>
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"  required/>
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zip-code"  required/>
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"  required/>
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone number" required/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub-total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <strong>Total</strong>
              <strong>${total}</strong>
            </div>
          </div>
          <button type="submit">MAKE PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
