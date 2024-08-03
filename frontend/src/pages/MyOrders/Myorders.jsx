import React, { useContext, useEffect, useState } from 'react'
import {StoreContext} from "../../context/StoreContext";
import {assets} from "../../assets/assets.js";
import './Myorders.css';
import axios from 'axios';

const Myorders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const userOrders = async ()=>{
        const response = await axios.get(url+"/api/order/myOrders",{headers:{token}},{});
        // console.log(response);
        if(response.data.success){
            setData(response.data.data);
            // console.log(response.data.data);
        }
    }
    useEffect(()=>{
        if (token) {
            userOrders();
        }
    },[token]);
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                 return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index === order.items.length-1){
                                return item.name + "x" + item.quantity;
                            }
                            else{
                                return item.name + "x" + item.quantity + ", "
                            }
                        })}</p>
                        <p>${order.amount}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={userOrders}>Track Order</button>
                    </div>
                 )   
                })
            }
        </div>
    </div>
  )
}

export default Myorders