import React, {useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import {StoreContext} from '../../context/StoreContext.jsx';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler = (e) =>{

      const name = e.target.name;
      const value = e.target.value;

      setData(prev=>({...prev, [name]:value}));
    }

    const onLogin = async (e) =>{

      e.preventDefault();

      let newUrl = url;

      if(currState === 'Login'){
        newUrl += '/api/user/login';
      }
      else{
        newUrl += '/api/user/register';
      }
      try{
        const response = await axios.post(newUrl,data);
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        }
        else{
          alert(response.data.message)
        }
      }catch(error){
        console.log(error);
      }
    }
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState === "Login" ?<></> :<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Johndoe@gmail.com' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
        ? <p>Create an account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
