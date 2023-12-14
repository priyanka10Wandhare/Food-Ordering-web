import "./signup.css";
import NavHead from '../NavBar/navHead'; 
import Footer from '../Footer/footer';
import React, { useState, useEffect } from 'react';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate , Link  } from "react-router-dom"



import { Container, Row, Col ,Input ,FormGroup , Label, Button} from 'reactstrap';

export default function Signup(){
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState('User');
    const [formValue, setFormValue] = useState({
  
        user_type: selectedOption,
        email: "",
        password: "",
        mobile_number: "",
        address: "",
        opening_time: "",
        closing_time: "",
        first_name: "",
        last_name: "",
        restaurant_name: "", 
       
        // organization_id: "",
      })
     
    //   console.log(formValue);

    const handleFormValue = e => {
        let { name, value } = e.target

        setFormValue({ ...formValue, [name]: value })

    
    }

    const [errors, setErrors] = useState({});
    const validateForm = () => {

        const newErrors = {};
    
        // Check name field
        if (formValue.password.trim() === '') {
          newErrors.password = 'passowrd is required';
        }
        if (formValue.mobile_number.trim() === '') {
          newErrors.mobile_number = 'passowrd is required';
        }
        if (formValue.address.trim() === '') {
          newErrors.address = 'passowrd is required';
        }
        if (formValue.opening_time.trim() === '') {
          newErrors.opening_time = 'passowrd is required';
        }
        if (formValue.closing_time.trim() === '') {
          newErrors.closing_time = 'passowrd is required';
        }
        if (formValue.first_name.trim() === '') {
          newErrors.first_name = 'passowrd is required';
        }
        if (formValue.restaurant_name.trim() === '') {
          newErrors.restaurant_name = 'passowrd is required';
        }
    
        // Check email field
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(formValue.email)) {
          newErrors.email = 'Invalid email address';
        }
    
        setErrors(newErrors);
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };
    const RegisterUSerDetails = e =>{
        e.preventDefault()
        if(validateForm){

            console.log("formValue", formValue)
            let formData = new FormData()
            formData.append('user_type',selectedOption)
            // formData.append("user_type", formValue.user_type)
            formData.append("email", formValue.email)
            formData.append("password", formValue.password)
            formData.append("mobile_number", formValue.mobile_number)
            formData.append("address", formValue.address)
            formData.append("opening_time", formValue.opening_time)
            formData.append("closing_time", formValue.closing_time)
            formData.append("first_name", formValue.first_name)
            formData.append("last_name", formValue.last_name)
            formData.append("restaurant_name", formValue.restaurant_name)
            // formData.append("address", formValue.address)
            // let body = {
    
            //     formData
            // }
            // ]
           
            // console.log((body),'body')
           
            try {
                const response =  RegisterUser(formData);
                
                // console.log((response.status == 200),'response')
                // if(response.status == 200){
                //     toast.success("Hurray Account Crated Successfully");
                // }else if(response.status == 400){
                //     toast.error("something went wrong");
                // }
            } catch (error) {
                toast.error("Something went wrong to create an account");
            }
        }else{
            console.log("validation failed");
        }

        // setFormValue({

        //     user_type: selectedOption,
        //     email: "",
        //     password: "",
        //     mobile_number: "",
        //     address: "",
        //     opening_time: "",
        //     closing_time: "",
        //     first_name: "",
        //     last_name: "",
        //     restaurant_name: "",
        // });
    }

    function* registerUserW(formData){
       
    }
    const RegisterUser = async (body) => {
         const response =  await apiInstance.APICALL("post", `api/authenticate/register`,body, "header");
         const delay = ms => new Promise(res => setTimeout(res, ms));
            if(response.status == 200){
                // alert("Hurray Account Crated Successfully");
                toast.success("Hurray Account Crated Successfully");
                await delay(5000);
                navigate("/login")
            }else if(response.status == 400){
                console.log(response);
                toast.error(response.data.msg);
                // alert("Something went wrong");
            }else{
                toast.error("something went wrong");
            }
    };

    return(
        <>
        <NavHead />
        <div>
             <Container fluid className="LoginDiv my-5">
                <Row>
                    <Col md={6} lg={6} sm={12} >
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"  className="img-fluid" alt="Sample image"/>
                    </Col>

                    <Col md={6} lg={6} sm={12} >
                        <div className="">
                            <p className=" mx mb-0">Welcome 👋 </p>
                            <h3 className="create-account-text">Create your account</h3>
                            <hr />
                            <p style={{"color":"#fc8019","fontWeight":"700"}}>Register as - </p>
                            
                            <Label>

                                <Input 
                                    type="radio" 
                                    name="user_type" 
                                    value="Restaurant"
                                    className=""
                                    checked={selectedOption === 'Restaurant'}
                                    onClick={handleFormValue}
                                    onChange={() => setSelectedOption('Restaurant') }
                                    >
                                
                                </Input>
                                &nbsp;Restaurant
                            </Label>
                            <Label className="ms-4">

                                <Input 
                                    type="radio" 
                                    name="user_type" 
                                    value="User"
                                    className="ms-1"
                                    checked={selectedOption === 'User'}
                                    onClick={handleFormValue}
                                    onChange={() => setSelectedOption('User')}>
                                    
                                </Input>
                                &nbsp; User
                            </Label>
                        </div>
                        {selectedOption === 'Restaurant' ? (
                            <>
                                
                            
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <Label htmlFor="restaurant_name" className="form-label">
                                    Restaurant Name
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control mb-4"
                                    id="restaurant_name"
                                    size={12}
                                    name="restaurant_name"
                                    placeholder="Kshir Sagar Hotel"
                                    onChange={handleFormValue} />
                                 {errors.restaurant_name && <span className="error">{errors.restaurant_name}</span>}
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Label htmlFor="email" className="form-label">
                                    Restaurant Owner Email
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control mb-4"
                                    id="email"
                                    size={12}
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={handleFormValue} />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Label htmlFor="mobile_number" className="form-label">
                                    Mobile Number
                                </Label>
                                <Input
                                    type="number"
                                    className="form-control mb-4"
                                    id="mobile_number"
                                    name="mobile_number"
                                    size={12}
                                    placeholder="1234567890"
                                    onChange={handleFormValue} />
                                    {errors.mobile_number && <span className="error">{errors.mobile_number}</span>}
                            </Col>
                            <Col lg={3} md={3} sm={6}>
                                <Label htmlFor="opening_time" className="form-label">
                                   Opening Time
                                </Label>
                                <Input
                                    type="time"
                                    className="form-control mb-4"
                                    id="opening_time"
                                    name="opening_time"
                                    size={12}
                                    placeholder="10:00" 
                                    onChange={handleFormValue}/>
                                    {errors.opening_time && <span className="error">{errors.opening_time}</span>}
                                    
                            </Col>
                            <Col lg={3} md={3} sm={6}>
                                <Label htmlFor="closing_time" className="form-label">
                                  Closing Time
                                </Label>
                                <Input
                                    type="time"
                                    className="form-control mb-4"
                                    id="closing_time"
                                    name="closing_time"
                                    size={12}
                                    placeholder="10:00" 
                                    onChange={handleFormValue}/>
                                    {errors.closing_time && <span className="error">{errors.closing_time}</span>}
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <Label htmlFor="first_name" className="form-label">
                                    Owner Name
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control mb-4"
                                    id="first_name"
                                    name="first_name"
                                    size={12}
                                    placeholder="Mukesh Ambani" 
                                    onChange={handleFormValue}/>
                                    {errors.first_name && <span className="error">{errors.first_name}</span>}
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <Label htmlFor="password" className="form-label">
                                    Password
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control mb-4"
                                    id="password"
                                    name="password"
                                    size={12}
                                    placeholder="name@example.com" 
                                    onChange={handleFormValue}/>
                                     {errors.password && <span className="error">{errors.password}</span>}
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <Label htmlFor="address" className="form-label">
                                    Address
                                </Label>
                                <Input
                                    type="textarea"
                                    className="form-control mb-4"
                                    id="address"
                                    name="address"
                                    size={12}
                                    placeholder="Street No:16 USA Beside pharamcy mart"
                                    onChange={handleFormValue} />
                                    {errors.address && <span className="error">{errors.address}</span>}
                            </Col>
                            

                        </Row>
                       </>
                        )
                        // user type form
                        : selectedOption === 'User' ? (
                            <>
                            <Row>
                                <Col lg={6} md={6} sm={12}>
                                    <Label htmlFor="first_name" className="form-label">
                                        First Name
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control mb-4"
                                        id="first_name"
                                        name="first_name"
                                        size={12}
                                        placeholder="John"
                                        onChange={handleFormValue} />
                                        {errors.first_name && <span className="error">{errors.first_name}</span>}
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                    <Label htmlFor="last_name" className="form-label">
                                        Last Name
                                    </Label>
                                    <Input
                                        type="text"
                                        className="form-control mb-4"
                                        id="last_name"
                                        name="last_name"
                                        size={12}
                                        placeholder="Barden" 
                                        onChange={handleFormValue}/>
                                        {errors.last_name && <span className="error">{errors.last_name}</span>}
                                </Col>

                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={12}>
                                    <Label htmlFor="email" className="form-label">
                                       Email
                                    </Label>
                                    <Input
                                        type="email"
                                        className="form-control mb-4"
                                        id="email"
                                        name="email"
                                        size={12}
                                        placeholder="John@gmail.com" 
                                        onChange={handleFormValue}/>
                                        {errors.email && <span className="error">{errors.email}</span>}
                                </Col>
                                <Col lg={6} md={6} sm={12}>
                                    <Label htmlFor="mobile_number" className="form-label">
                                        Mobile Number
                                    </Label>
                                    <Input
                                        type="number"
                                        className="form-control mb-4"
                                        id="mobile_number"
                                        name="mobile_number"
                                        size={12}
                                        placeholder="1234567890" 
                                        onChange={handleFormValue}/>
                                        {errors.mobile_number && <span className="error">{errors.mobile_number}</span>}
                                </Col>

                            </Row>
                            <Row>
                                <Col lg={6} md={6} sm={12}>
                                    <Label htmlFor="password" className="form-label">
                                       Password
                                    </Label>
                                    <Input
                                        type="password"
                                        className="form-control mb-4"
                                        name="password"
                                        id="password"
                                        size={12}
                                        placeholder="****" 
                                        onChange={handleFormValue}/>
                                        {errors.password && <span className="error">{errors.password}</span>}
                                </Col>
                                

                            </Row>
                            </>
                        ) : null}
                     
                        

                            <div className='text-center text-md-start mt-1 pt-1'>
                                <Button className="mb-0 px-5" size='lg' onClick={RegisterUSerDetails}>Register</Button>
                                <p className="small fw-bold mt-2 pt-1 mb-2">Already Have An Account? <Link to="/login" className="link-danger">Login</Link></p>
                            </div>
                            
                    </Col>

                </Row>
             </Container>
        </div>
        <Footer />
        <ToastContainer />
        </>
    )
}