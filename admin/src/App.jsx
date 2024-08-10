// import React from 'react'
import { Route, Routes } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Sidebar from "./Components/Sidebar/Sidebar"
import Add from "./Pages/AddFood/Add"
import FoodList from "./Pages/FoodList/FoodList"
import Order from "./Pages/Orders/Order"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:8000";
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>} />
          <Route path='/list' element={<FoodList url={url}/>} />
          <Route path='/orders' element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
