import React, { useState, useEffect } from 'react';
import NavHead from '../NavBar/navHead';
import Footer from '../Footer/footer';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container , Row} from "reactstrap";
import { useNavigate , Link } from "react-router-dom"

export default function Resturant() {

    const [restaurantList, setRestaurantList] = useState([]);
    console.log('kkk',restaurantList);

    useEffect(() => {
        const getAllRestaurantData = async () => {
            try {
               const response = await getAllRestaurant();
               setRestaurantList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
        getAllRestaurantData();

    }, []);

    const getAllRestaurant = async () => {
        let restaurantId = localStorage.getItem("userID")
        const response =  await apiInstance.APICALL("get", `api/user/getAllRestaurant/`,"", "header");
        
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


    return (
        <>
        <NavHead />
        <Container fluid>
        <center><h5>Restaurant</h5></center>
            <Row className='mx-1'>
            {restaurantList.map(item => (
                <Col md={6} sm={12} lg={3} xs={12}  className="mt-3">
                    <div className="card">
                    <img src="/assets/image/home/seafood.png" class="card-img-top" alt="..."></img>
                        <div className="card-body">
                            <h5 className="card-title">{item.first_name}</h5>
                            {/* <p className="card-text">{item.food_description}</p>
                            <h6 className="card-title">₹{item.price}</h6> */}
                            <div className='card-footer'>
                                
                            <Link to={"/food?restaurant="+item._id} className="btn btn-primary">Go to menu</Link>
                            </div>
                        </div>
                    </div>
                </Col>
                 ))}
             
                
            </Row>
            <ToastContainer />
        </Container>
       
       </>
    )
}