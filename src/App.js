import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import NavHead from './pages/NavBar/navHead'; 
import Home from './pages/Home/home';
import Footer from './pages/Footer/footer';
import Signup from './pages/SignUp/signup';
import Login from './pages/Login/login';
import Dashboard  from './pages/Dashboard/dashboard';
import AddFood from './pages/Restaurant/addEditFood';
import Restaurant from './pages/User/resturant';
import Orders from './pages/User/orders';
import Food from './pages/Food/food';
import Foods from './pages/Restaurant/foods';
import Checkout from './pages/Food/checkout';
import OrderList from './pages/Restaurant/ordersList';
import NotFound from "./pages/NotFound";
import { authProtectedRoutes, publicRoutes } from "./Routes";
import Authmiddleware from "./Routes/route";

import { BrowserRouter , Routes, Route } from 'react-router-dom';
function App() {
    const getAuthToken = localStorage.getItem("authUser");

    return (
    //   <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Home />}></Route>
    //     <Route path='/login' element={<Login />}></Route>
    //     <Route path='/register' element={<Signup />}></Route>
    //     {/* <Route path='/userDashboard' element={<UserDashboard />}></Route> */}
        
    //     <Route path='/dashboard' element={<Dashboard />}></Route>
    //     <Route path='/addFood' element={<AddFood />}></Route>
    //     <Route path='/restaurant' element={<Restaurant />}></Route>
    //     <Route path='/food' element={<Food />}></Route>
    //     <Route path='/foods' element={<Foods />}></Route>
    //     <Route path='/checkout' element={<Checkout />}></Route>
    //     <Route path='/orders' element={<Orders />}></Route>
    //     <Route path='/order-list' element={<OrderList />}></Route>

    //     <Route path='*' element={<NotFound />}></Route>
      

    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
        <Routes>
          {
            publicRoutes.map((route, idx) => (
              <Route
              path={route.path}
              element = {route.component}
              key={idx}
              exact={true}
              />
            ))
          }
          {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                {route.component}
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
        </Routes>
     </BrowserRouter>
    );
   
  //   </>


  
  // );
}

export default App;
