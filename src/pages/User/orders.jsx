import React, { useState, useEffect } from 'react';
import NavHead from '../NavBar/navHead';
import Footer from '../Footer/footer';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container , Row , Table} from "reactstrap";
import { useNavigate , Link } from "react-router-dom"

export default function Orders() {
    const userId = localStorage.getItem('userID');
    const [orderList , setOrderList] = useState([]);
    // api call to get all past orders and current order 
    useEffect(() => {
        const  fetchOrderData = async () => {
            try {
               const response = await getAllPastOrder();
               setOrderList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
         fetchOrderData();

    }, []);

    const getAllPastOrder = async () => {
        
        const response =  await apiInstance.APICALL("get", `api/user/getAllOrders/`+userId,"", "header");

    
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

   let increment = 0

    return(

    <>
    <NavHead />
        <Container fluid>
            <Row className='mx-5 mt-3'>
                <Table>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Order ID</th>
                            <th>Foods</th>
                            <th>Restaurant</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                        
                    </thead>
                    {orderList.map(item => (
                        <tbody key={item._id}>
                         {item.orders.items.foodItems.map(newItem => (
                            <tr key={newItem._id}>
                            <td>{++increment}. {newItem.text}</td>
                            <td>{item.orders._id}</td>
                            <td>{newItem.food_name}</td>
                            <td>{newItem.restaurant}</td>
                            <td>{newItem.price}</td>
                            <td>{item.orders.order_status}</td>
                            <td>{item.orders.created_on}</td>
                            
                            
                        </tr>
                        ))}
                    </tbody>
                      ))}
                </Table>
            </Row>
        </Container>
    </>
    )
}