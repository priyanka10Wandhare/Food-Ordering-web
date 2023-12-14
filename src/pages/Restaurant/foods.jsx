
import React, { useState, useEffect } from 'react';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col ,Input ,FormGroup , Label, Button ,Table ,Badge} from 'reactstrap';
import { useNavigate , Link } from "react-router-dom"
import Topbar from "../Layout/topbar";
import Sidebar from "../Layout/sidebar";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Foods(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };

    const [foodList, setFoodList] = useState([]);
    console.log('kkk',foodList);

    useEffect(() => {
        const foodData = async () => {
            try {
               const response = await addFoods();
               setFoodList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
        foodData();

    }, []);

    // useEffect(() => {
    //     let restaurantId = localStorage.getItem("userID")
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get(`api/restaurant/foods/${restaurantId}`);
    //         setFoodList(response.data);
    //       } catch (error) {
    //         console.error('Error fetching data: ', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);
    
    // to delete the food 
    const deleteFoods = async(id) => {
        const response =  await apiInstance.APICALL("delete", `api/restaurant/deleteFood/`+id,"", "header");
        if(response.status == 200){
            // alert("Hurray Account Crated Successfully");
            toast.success(response.data.msg);
            // navigate("/foods");

        }else if(response.status == 400){
            console.log(response);
            toast.error(response.data.msg);
            // alert("Something went wrong");
        }else{
            toast.error("something went wrong");
        }
    }

   


    const addFoods = async () => {
        let restaurantId = localStorage.getItem("userID")
        const response =  await apiInstance.APICALL("get", `api/restaurant/foods/${restaurantId}`,"", "header");
        
           if(response.status == 200){
            //    alert("Hurray Account    Crated Successfully");
            
               return response.data;
               await delay(5000);
           }else if(response.status == 400){
               console.log(response);
               toast.error(response.data.msg);
               // alert("Something went wrong");
           }else{
               toast.error("something went wrong");
           }
   };

   const updateFoodStockStatus = async(id) =>{


        const response  = await apiInstance.APICALL("get",`api/restaurant/updateFoodStockStatus/`+id,"","header");
        if(response.status == 200){
       
        
            return response.data;
            await delay(5000);
        }else if(response.status == 400){
            console.log(response);
            toast.error(response.data.msg);
            // alert("Something went wrong");
        }else{
            toast.error("something went wrong");
        }
   }

    return (
        <React.Fragment>
           <Topbar toggleSidebar={toggleSidebar} />
            <Container fluid>
                <Row className='my-3'>
                <Col lg={3} xl={2} className={isSidebarOpen ? '' : 'd-none'}>
                    <Sidebar isOpen={isSidebarOpen} />
                    </Col>
                    <Col md={9} xl={10}>
                        {/* <div className="main-content"> */}
                            
                        <div className="container">
                            <Table responsive striped hover bordered size="sm">
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Food Name</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Availbility</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodList.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.food_name}</td>
                                    <td>{item.placeholder}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td onClick={() => updateFoodStockStatus(item._id)}>{item.Stock == "In-Stock" ? <Badge color='primary'>{item.Stock}</Badge> : <Badge color='danger' >{item.Stock}</Badge> }</td>
                                    <td> <Link to= {"/addFood?edit="+item._id}><FontAwesomeIcon icon={faEdit } title='Edit'/> </Link > &nbsp;
                                    <FontAwesomeIcon icon={faTrash } onClick={() => deleteFoods(item._id)} title='Delete'/> </td>

                                </tr>
                                ))}
                            </tbody>
                            </Table>
                       
                         </div>    

                        {/* </div> */}
                       
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
           
        </React.Fragment>
    )
}