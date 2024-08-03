import React, { useContext} from "react";
import { assets } from "../../assets/assets";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, img, price, description }) => {
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-image-container">
        <img className="food-item-image" src={url+"/images/"+img} alt="" />
        {!cartItems[id]
            ?<img className="add-food" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" /> :<div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
