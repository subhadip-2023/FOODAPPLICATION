import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { food_list, cartItems, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const deliveryFee = (getTotalCartAmount()*3)/100;
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <>
                <div key={index} className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${cartItems[item._id] * item.price}</p>
                  <img
                    className="rmv-icon"
                    onClick={() => removeFromCart(item._id)}
                    src={assets.remove_icon_red}
                    alt=""
                  />
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>${deliveryFee}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <strong>Total</strong>
              <strong>${getTotalCartAmount()+deliveryFee}</strong>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECK OUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Enter promocode here to get discount % on your order</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo-code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
