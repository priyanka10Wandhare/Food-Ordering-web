import React from "react"
import { useNavigate } from "react-router-dom"

import Dashboard from "../pages/Dashboard/dashboard"
import NavHead from '../pages/NavBar/navHead'; 
import Home from '../pages/Home/home';
import Footer from '../pages/Footer/footer';
import Signup from '../pages/SignUp/signup';
import Login from '../pages/Login/login';

import AddFood from '../pages/Restaurant/addEditFood';
import Restaurant from '../pages/User/resturant';
import Orders from '../pages/User/orders';
import Food from '../pages/Food/food';
import Foods from '../pages/Restaurant/foods';
import Checkout from '../pages/Food/checkout';
import OrderList from '../pages/Restaurant/ordersList';
import NotFound from "../pages/NotFound";

const authProtectedRoutes = [
    { path: "/dashboard", component: <Dashboard/> },
    { path: '/dashboard' ,component : <Dashboard /> },
    { path: '/addFood', component : <AddFood /> },
    { path: '/restaurant', component : <Restaurant /> },
    { path: '/food', component : <Food /> },
    { path: '/foods', component : <Foods /> },
    { path: '/checkout', component : <Checkout /> },
    { path: '/orders', component : <Orders /> },
    { path: '/order-list', component : <OrderList /> },
   
  

     {
      path: "/",
      exact: true,
    //   component: < Navigate to="/dashboard" />,
    },
  ]
  
  const publicRoutes = [
    { path: "/register", component: <Signup /> },
    { path: "/login", component: <Login /> },
    { path: "/" , component: <Home /> },
  
     { path: "*", component: <NotFound /> },
  
  ]
  
  export { authProtectedRoutes, publicRoutes }