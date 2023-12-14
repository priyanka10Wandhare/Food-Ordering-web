
import React, { useState, useEffect } from 'react';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col ,Input ,FormGroup , Label, Button} from 'reactstrap';
import { useNavigate ,useSearchParams  } from "react-router-dom"
import Topbar from "../Layout/topbar";
import Sidebar from "../Layout/sidebar";

export default function AddFood(){
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchParams] = useSearchParams();
    const editPath = searchParams.get('edit');
    
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
    const navigate = useNavigate();

  
    

    // add foods code 
    const [formValue, setFormValue] = useState({
  
        
        food_name: "",
        price: "",
        quantity: "",
        description: "",
        restaurant_id:"",
        
      })

    const [placeholderr, setPlaceholder] = useState(null)
    const handleUploadFile = (e)=>{
        const selectedFile = e.target.files[0];
        // if (selectedFile && selectedFile.type === "image/png") {
            setPlaceholder(e.target.files[0]);
        // }
      }
    console.log("file", placeholderr)

    const handleFormValue = e => {
        let { name, value } = e.target

        setFormValue({ ...formValue, [name]: value })

    
    }

    const addFood = e =>{
        // alert("Please enter")
        e.preventDefault()
        console.log("formValue", formValue)
        let formData = new FormData()
        let restaurantId = localStorage.getItem("userID")
        formData.append("food_name", formValue.food_name)
        formData.append("price", formValue.price)
        formData.append("quantity", formValue.quantity)
        formData.append("description", formValue.description)
        formData.append("placeholder", placeholderr)
        formData.append("restaurant_id", restaurantId)
        // formData.append("placeholder", formValue.placeholder)
        
        // let body = {

        //     formData
        // }
        // ]
       
        // console.log((body),'body')
       
        try {
            if(editPath != undefined && editPath != null){

                const response =  updateFoods(editPath,formData);
            }else{
                
                const response =  addFoods(formData);
            }
            
            
        } catch (error) {
            toast.error("Something went wrong to update the food");
        }



       
    }

    const addFoods = async (body) => {
        const response =  await apiInstance.APICALL("post", `api/restaurant/addFood`,body, "header");
           if(response.status == 200){
               // alert("Hurray Account Crated Successfully");
               toast.success(response.data.msg);
               navigate("/foods");

           }else if(response.status == 400){
               console.log(response);
               toast.error(response.data.msg);
               // alert("Something went wrong");
           }else{
               toast.error("something went wrong");
           }
    };

    // update food code

   
    
    useEffect(() => {
        if(editPath != undefined && editPath != null){
            const fetchSinglefoodDataAPI = async () => {
                try {
                    const response = await fetchSingleFoodData(editPath);
                    console.log(response)
                    setFormValue(response.data)
                }catch(e){
                    console.log(e.message);
                }
            }
            
            fetchSinglefoodDataAPI();
        }

    }, []);


    //to fetch single food data 



    const fetchSingleFoodData = async(id) => {
        const response =  await apiInstance.APICALL("get", `api/restaurant/fetchSingleFoodData/`+id,"", "header");

        if(response.status == 200){
            return response;
        }else if(response.status == 400){
            console.log(response);
            toast.error(response.data.msg);
        }else{
            toast.error("something went wrong");
        }
    }

    // to update the food data

    const updateFoods = async (id, data) => {
        const response =  await apiInstance.APICALL("put", `api/restaurant/updateFood/`+id,data, "header");
        if(response.status == 200){
            // alert("Hurray Account Crated Successfully");
            toast.success(response.data.msg);
            navigate("/foods");

        }else if(response.status == 400){
            console.log(response);
            toast.error(response.data.msg);
            // alert("Something went wrong");
        }else{
            toast.error("something went wrong");
        }
    }

    // }

 

  
    //update food stock status code

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
                            <Row className='card'>
                                <div className="card-header">
                                    <h1>Add Food</h1>
                                </div>
                                <div className="card-body row">
                                    <Col lg={4} sm={12} xs={12} md={4}>
                                    <Label htmlFor="food_name" className="form-label">
                                        Food Name
                                    </Label>
                                        <Input
                                            type="text"
                                            className="form-control mb-4"
                                            id="food_name"
                                            size={12}
                                            name="food_name"
                                            placeholder="Pizza"
                                            value={formValue.food_name}
                                            onChange={handleFormValue} 
                                        />
                                    </Col>
                                    <Col lg={4} sm={12} xs={12} md={4}>
                                    <Label htmlFor="price" className="form-label">
                                        Price
                                    </Label>
                                        <Input
                                            type="text"
                                            className="form-control mb-4"
                                            id="price"
                                            size={12}
                                            name="price"
                                            placeholder="Rs 200"
                                            value={formValue.price}
                                            onChange={handleFormValue}  
                                        />
                                    </Col>
                                    <Col lg={4} sm={12} xs={12} md={4}>
                                    <Label htmlFor="quantity" className="form-label">
                                        Quantity
                                    </Label>
                                        <Input
                                            type="text"
                                            className="form-control mb-4"
                                            id="quantity"
                                            size={12}
                                            name="quantity"
                                            placeholder="100"
                                            value={formValue.quantity}
                                            onChange={handleFormValue} 
                                        />
                                    </Col>
                                    <Col lg={4} sm={12} xs={12} md={4}>
                                    <Label htmlFor="description" className="form-label">
                                        Description
                                    </Label>
                                        <Input
                                            type="text"
                                            className="form-control mb-4"
                                            id="description"
                                            size={12}
                                            name="description"
                                            placeholder="100"
                                            value={formValue.description}
                                            onChange={handleFormValue} 
                                        />
                                    </Col>
                                    <Col lg={4} sm={12} xs={12} md={4}>
                                    <Label htmlFor="placeholder" className="form-label">
                                        Image
                                    </Label>
                                        <Input
                                            type="file"
                                            className="form-control mb-4"
                                            id="placeholder"
                                            size={12}
                                            name="placeholder"
                                            placeholder="100"
                                            onChange={handleUploadFile} 
                                        />
                                    </Col>
                                </div>
                                <div className='text-center text-md-start mt-1 pt-1'>
                                <Button className="mb-0 px-5" size='lg' onClick={addFood}>Register</Button>
                                {/* <p className="small fw-bold mt-2 pt-1 mb-2">Already Have An Account? <a href="#!" className="link-danger">Login</a></p> */}
                            </div>
                            </Row>
                       
                            </div>    

                        {/* </div> */}
                       
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
           
        </React.Fragment>
    )
}