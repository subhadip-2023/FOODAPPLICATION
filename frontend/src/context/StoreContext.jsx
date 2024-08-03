import { useEffect, createContext, useState } from "react";
import axios from 'axios';
export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = 'https://foodapplication-1d40.onrender.com';

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId]:1}))
        }
        else{
            setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
        if(token){
            await axios.patch(url+"/api/cart/remove",{itemId}, {headers:{token}});
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for(const item in cartItems){
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product)=> product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () =>{

        const response = await axios.get(url+"/api/food/list");

        setFoodList(response.data.data);
    }

    const loadCartData = async (token)=> {
        // console.log(token);
        const response = await axios.get(url+"/api/cart/cartItems",{headers:{token}},{});
        // console.log(response.data);
        setCartItems(response.data.cartData);
        // console.log(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider >
    )
}
