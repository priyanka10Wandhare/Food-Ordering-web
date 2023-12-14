import React, { useState, useEffect } from 'react';
import NavHead from '../NavBar/navHead'; 
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container , Row} from "reactstrap";
import { useNavigate ,useSearchParams  } from "react-router-dom"

export default function Food(){

    const [foodList, setFoodList] = useState([]);
    const [searchParams] = useSearchParams();



    useEffect(() => {
        const getAllFoodsData = async () => {
            try {
               const response = await getAllFoods();
               setFoodList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
        getAllFoodsData();

    }, []);
    var restaurantId = searchParams.get("restaurant");
    const getAllFoods = async () => {
        
        if(restaurantId != undefined && restaurantId != null){ 
            var response =  await apiInstance.APICALL("get", `api/user/getFoodByRes/`+restaurantId,"", "header");
        }else{
            var response =  await apiInstance.APICALL("get", `api/user/getAllFoods/`,"", "header");

        }
        
           if(response.status == 200){
            //    alert("Hurray Account    Crated Successfully");
            
               return response.data;
               
           }else if(response.status == 400){
               console.log(response);
               toast.error(response.data.msg);
               // alert("Something went wrong");
           }else{
               toast.error("something went wrong");
           }
   };

   //add cart value on local storage and fetch time of checkout

   const [cart, setCart] = useState([]);
   const [products, setProducts] = useState([]);
   const userId = localStorage.getItem("userID");

   
    useEffect(() => {
        // Load cart data from local storage when the component mounts
        const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
        setCart(cartData);
    }, [userId]);

   const onAddToCart = (productId) => {
    // Check if the user is authenticated
    if (userId) {
        if (!cart.includes(productId)) {
          const updatedCart = [...cart, productId];
          localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedCart));
          localStorage.setItem("restaurant_id",restaurantId);
          setCart(updatedCart);
          updateLocalStorageCount(userId);
        }
      } else {
        // Handle unauthenticated user or redirect to login
      }
  };

  function updateLocalStorageCount(userId) {
    // Retrieve the cart data from local storage
    const cartData = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
  
    // Calculate the count (e.g., the number of items in the cart)
    const count = cartData.length;
  
    // Update the count in local storage or store it wherever you need
    localStorage.setItem(`cartCount_${userId}`, count.toString());
    // You can also use other state management solutions to store the count.
  }
  


    return(
        <>
        <NavHead />
        <Container fluid >
            <center><h5>Restaurant Menu</h5></center>
            <Row className='mx-1'>
            {foodList.length != 0 ? 
            foodList.map(item => (
                <Col md={6} sm={12} lg={3} xs={12} mt={3} className="mt-3">
                    <div className="card food-card">
                        <div className='card-body '>

                            <img className="food-placeholder-img card-img-top"src="/assets/image/home/seafood.png"></img>
                               
                                    
                                
                                    <h5 className="card-title">{item.food_name}</h5>
                                    <p className="card-text">{item.food_description}</p>
                                    <h6 className="card-title">₹{item.price}</h6>
                                <div className='card-footer'>
                                <button className="btn btn-primary" onClick={() => onAddToCart(item._id)} disabled={cart.includes(item._id)}>
                                    {cart.includes(item._id) ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                                    {/* <a href="javascript:void(0)" className="btn btn-primary" onClick={() => onAddToCart(item._id)}>Add To Cart</a> */}
                                </div>
                            </div>
                        </div>
                </Col>
                 ))
                : 
                <Col md={12} sm={12} lg={12} xs={12} mt={3} className="mt-3 mx-auto">
                    <div className='card'>
                        <div className='card-body'>
                            <center>

                                <h3>Oopss!! No food is added for this restaurant please come back after some time</h3>
                            </center>
                        </div>
                    </div>
                </Col>
                }
             
                
            </Row>
            <ToastContainer />
        </Container>
      
        </>
       
        
   
        
            
      
        
   
    )
}