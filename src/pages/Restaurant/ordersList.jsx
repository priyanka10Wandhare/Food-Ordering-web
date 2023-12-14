import React, { useState, useEffect } from 'react';
import NavHead from '../NavBar/navHead';
import Footer from '../Footer/footer';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import { Col, Container , Row , Table } from "reactstrap";
import { useNavigate , Link } from "react-router-dom"
import Topbar from "../Layout/topbar";
import Sidebar from "../Layout/sidebar";

export default function Orders() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [orderList , setOrderList] = useState([]);
    const [dropdownValue, setDropdownValue] = useState(orderList.order_status);
    console.log(dropdownValue)

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    const restaurantId = localStorage.getItem('userID');
  
    // console.log(orderList,4554);
    // api call to get all past orders and current order 
    useEffect(() => {
        const  fetchOrderData = async () => {
            try {
               const response = await getAllOrders();
               setOrderList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
         fetchOrderData();

    }, []);

    const getAllOrders = async () => {
        
        const response =  await apiInstance.APICALL("get", `api/restaurant/getAllResOrder/`+restaurantId,"", "header");

    
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

   //update order status 
    const handleButtonClick = (event) => {
        const button = event.target;
        const customAttribute = button.getAttribute('order_id');
        let body = {
            order_status: dropdownValue,
        }

        updateOderStatus(customAttribute,body)
        console.log('Custom Attribute:', customAttribute);
    };

    const updateOderStatus = async (orderId, body) => {
        
        const response =  await apiInstance.APICALL("put", `api/restaurant/updateOrderStatus/`+orderId, body, "header");

    
        if(response.status == 200){
            toast.success("order status updated successfully ")
        
            // return response.data;
            
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
          <React.Fragment>
            <Topbar toggleSidebar={toggleSidebar} />
            <Container fluid>
                    <Row className='my-3'>
                    <Col lg={3} xl={2} className={isSidebarOpen ? '' : 'd-none'}>
                            <Sidebar isOpen={isSidebarOpen} />
                            </Col>
                            <Col md={9} xl={10}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>User </th>
                                    <th>Order ID</th>
                                    <th>Foods</th>
                                    <th>Price</th>
                                    <th>Status</th>

                                    <th>Date</th>
                                </tr>
                                
                            </thead>
                            {orderList.map(item => (
                                <tbody key={item._id}>
                                {item.foods.map(newItem => (
                                    <tr key={newItem._id}>
                                    <td>{++increment}. {newItem.text}</td>
                                    <td>{item.userData.first_name}</td>
                                    <td>{item._id}</td>
                                    <td>{newItem.food_name}</td>
                                    <td>{newItem.price}</td>
                                    <td style={{"display":"flex"}}><select value={dropdownValue != null && dropdownValue !== undefined ? dropdownValue : item.order_status} onChange={(e) => setDropdownValue(e.target.value)}> 
                                        <option value={"Pending"} >Pending</option>
                                        <option value={"Rejected"} >Rejected</option>
                                        <option value={"Accepted"} >Accepted</option>
                                        <option value={"Delivered"} >Delivered</option>
                                        </select>
                                        <button className='btn btn-primary ms-2' onClick={handleButtonClick} order_id = {item._id}>Update</button>
                                        {/* {item.order_status} */}
                                    </td>
                                    <td>{item.created_on}</td>
                                    
                                    
                                </tr>
                                ))}
                            </tbody>
                            ))}
                        </Table>
                        </Col>
                    </Row>
                </Container>
          </React.Fragment>
        
    </>
    )
}