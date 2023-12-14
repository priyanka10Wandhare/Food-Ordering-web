import React, { useState, useEffect } from 'react';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import "./food.css"
import NavHead from '../NavBar/navHead';
import { Col, Container , Row ,Input, Button} from "reactstrap";
import { Link , useNavigate } from "react-router-dom";

export default function Checkout() {
    const userId = localStorage.getItem('userID');
    const restaurant_id = localStorage.getItem("restaurant_id");
    const productId = JSON.parse(localStorage.getItem("cart_"+userId));

    const [foodList, setFoodList] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    console.log(total,"kkk");

    useEffect(() => {
        const  fetchCartsFoodsData = async () => {
            try {
               const response = await fetchCartsFoodsDetails();
               setFoodList(response)
            }catch(e){
                console.log(e.message);
            }
        }
         
         fetchCartsFoodsData();

    }, []);

    useEffect(() => {
        // Calculate the total price whenever data changes
        let totalPrice = 0;
        for (const key in foodList) {
            console.log(foodList[key].price);
          totalPrice += parseFloat(foodList[key].price);
        }
        setTotal(totalPrice);
      }, [foodList]);
    

    const fetchCartsFoodsDetails = async () => {
        const response =  await apiInstance.APICALL("get", `api/user/cartFoodsData?foodIds=${productId.join(',')} `,"", "header");
           if(response.status == 200){
            return response.data;
            //    alert("Hurray Account Crated Successfully");
            //    toast.success(response.data.msg);
             

           }else if(response.status == 400){
               console.log(response);
               toast.error(response.data.msg);
               // alert("Something went wrong");
           }else{
               toast.error("something went wrong");
           }
    };

    // pleace order code

    const placeOrder = async () => {
        const items = foodList.map(( foodItem) => ({
            foodItemId: foodItem._id,
            
        }));
        
        

        let body = {
            
            items: items,
            restaurant_id: restaurant_id,
            userId: userId,
            total: total
        }
       
        placeOrderApiCall(body)
    }

    const placeOrderApiCall = async (body) => {
        const response =  await apiInstance.APICALL("post", `api/user/order`,body, "header");
           if(response.status == 200){
               // alert("Hurray Account Crated Successfully");
               localStorage.removeItem("cart_"+userId);
               localStorage.removeItem(restaurant_id);
               localStorage.removeItem("cartCount_"+userId);
               toast.success(response.data.msg);
               navigate("/orders");

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
            <Row className="mx-5 mt-3">
                <Col  lg={8} sm={12}>
                    <div className="title">
                        <div className="col"><h4><b>Shopping Cart</b></h4></div>
                        <div className="col align-self-center text-right text-muted">3 items</div>
                    </div>
                    { foodList.length != 0 ?
                    foodList.map(item => (
                            <div className="row border-top border-bottom">
                        
                              <div className="row main align-items-center">
                                  <div className="col-2"><img className="img-fluid" src="/assets/image/home/seafood.png"></img></div>
                                  <div className="col">
                                      {/* <div className="row text-muted">Salad</div> */}
                                      <div className="row">{item.food_name}</div>
                                  </div>
                                  <div className="col">
                                      
                                  </div>
                                  <div className="col">₹ {item.price} <span className="close"></span></div>
                              </div>
                            </div>
                            ))
                            :

                            <Col md={12} sm={12} lg={12} xs={12} mt={3} className="mt-3 mx-auto">
                                <div className='card'>
                                    <div className='card-body'>
                                        <center>
            
                                            <h3>Oopss!! your cart is empty</h3>
                                        </center>
                                    </div>
                                </div>
                            </Col>
                            }
                      
                        <div className="back-to-shop">
                            <button className="btn btn-primary">Back</button>
                        </div>
                </Col>
                <div className="col-md-4 summary">
                        <div><h5><b>Summary</b></h5></div>
                        <hr></hr>
                        <div className="row">
                            <div className="col">ITEMS {foodList.length}</div>
                            <div className="col text-right">₹ {total}</div>
                        </div>
                        <hr />
                       
                        <div className="row">
                            <div className="col text-righ">TOTAL PRICE</div>
                            <div className="col text-right">₹ {total}</div>
                        </div>
                        <hr />
                        <Button className="btn btn-primary" onClick={placeOrder}>Place Order</Button>
                    </div>

            </Row>
        </Container>
        </>
        // <div>
        //     <div className="card">
        //         <div className="row">
        //             <div className="col-md-8 cart">
        //                 <div className="title">
        //                     <div className="row">
        //                         <div className="col"><h4><b>Shopping Cart</b></h4></div>
        //                         <div className="col align-self-center text-right text-muted">3 items</div>
        //                     </div>
        //                 </div>
        //                 <div className="row border-top border-bottom">
        //                     <div className="row main align-items-center">
        //                         <div className="col-2"><img className="img-fluid" src="/assets/image/home/seafood.png"></img></div>
        //                         <div className="col">
        //                             <div className="row text-muted">Salad</div>
        //                             <div className="row">Salad</div>
        //                         </div>
        //                         <div className="col">
        //                             <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
        //                         </div>
        //                         <div className="col">&euro; 450.00 <span className="close">&#10005;</span></div>
        //                     </div>
        //                 </div>
        //                 <div className="row">
        //                     <div className="row main align-items-center">
        //                         <div className="col-2"><img className="img-fluid" src="/assets/image/home/seafood.png"></img></div>
        //                         <div className="col">
        //                             <div className="row text-muted">Salad</div>
        //                             <div className="row">Salad</div>
        //                         </div>
        //                         <div className="col">
        //                             <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
        //                         </div>
        //                         <div className="col">&euro; 450.00 <span className="close">&#10005;</span></div>
        //                     </div>
        //                 </div>
        //                 <div className="row border-top border-bottom">
        //                     <div className="row main align-items-center">
        //                         <div className="col-2"><img className="img-fluid" src="/assets/image/home/seafood.png"></img></div>
        //                         <div className="col">
        //                             <div className="row text-muted">Salad</div>
        //                             <div className="row">Salad</div>
        //                         </div>
        //                         <div className="col">
        //                             <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
        //                         </div>
        //                         <div className="col">&euro; 450.00 <span className="close">&#10005;</span></div>
        //                     </div>
        //                 </div>
        //                 <div className="back-to-shop">
        //                     <button className="btn">Back</button>
        //                 </div>
        //             </div>
        //             <div className="col-md-4 summary">
        //                 <div><h5><b>Summary</b></h5></div>
        //                 <hr></hr>
        //                 <div className="row">
        //                     <div className="col">ITEMS 3</div>
        //                     <div className="col text-right">&euro; 132.00</div>
        //                 </div>
        //                 <form>
        //                     <p>SHIPPING</p>
        //                     <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
        //                     <p>GIVE CODE</p>
        //                     <Input id="code" placeholder="Enter your code"></Input>
        //                 </form>
        //                 <div className="row">
        //                     <div className="col">TOTAL PRICE</div>
        //                     <div className="col text-right">&euro; 137.00</div>
        //                 </div>
        //                 <button className="btn">CHECKOUT</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}