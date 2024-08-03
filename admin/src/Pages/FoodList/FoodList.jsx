// import React from 'react';
import { useEffect, useState } from "react";
import "./FoodList.css";
import { toast } from "react-toastify";
import axios from "axios";
const FoodList = ({url}) => {
  const [list, setList] = useState([]);

  const fetchFoodList = async () => {
    // console.log(response.data);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if(response.data.data && response){
        setList(response.data.data)
      }
      else{
        toast.error("Failed to get list of food");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to get list of food");
    }
  };
  const removeFood = async (foodId) => {
      // console.log(foodId)
      const response = await axios.delete(`${url}/api/food/remove`,{data:{id:foodId}});
      await fetchFoodList();
      if(response.data.success){
        toast.success("Food removed successfully");
      }
    else{
      toast.error("Error removing")
      console.log("Error");
    }
  }

  useEffect(() => {
    fetchFoodList();
  },[]);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <strong>Image</strong>
          <strong>Name</strong>
          <strong>Category</strong>
          <strong>Price</strong>
          <strong>Action</strong>
        </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+ item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className="cursor"> X </p>
              </div>
            );
          })}
        </div>
      </div>
  );
};

export default FoodList;
