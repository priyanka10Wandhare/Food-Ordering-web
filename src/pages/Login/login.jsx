import "./login.css";
import React, { useState, useEffect } from 'react';
import NavHead from '../NavBar/navHead'; 
import Footer from '../Footer/footer';
import apiInstance from "../../common/ApiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col ,Input ,FormGroup , Label, Button} from 'reactstrap';
import { useNavigate , Link  } from "react-router-dom"

export default function Login(){
    const navigate = useNavigate()

    
    const [formValue, setFormValue] = useState({
  
       
        email: "",
        password: "",
       
        // organization_id: "",
    })
    // console.log(formValue)
    //form validation 
    const [errors, setErrors] = useState({});
    const validateForm = () => {

        const newErrors = {};
    
        // Check name field
        if (formValue.password.trim() === '') {
          newErrors.password = 'passowrd is required';
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

    const handleFormValue = e => {
        let { name, value } = e.target

        setFormValue({ ...formValue, [name]: value })

    
    }

    const LoginUser = e => {
        e.preventDefault()
        if (validateForm()) {
            console.log("formValue", formValue)
            let formData = new FormData()
        
            formData.append("email", formValue.email)
            formData.append("password", formValue.password)

            try {
                const response =  loginAPICall(formData);
                
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
            console.log("validation failed")
        }

    }

    const loginAPICall = async (body) => {
        const response =  await apiInstance.APICALL("post", `api/authenticate/login`, body, "formdata");
        const delay = ms => new Promise(res => setTimeout(res, ms));
        if(response.status == 200){
            localStorage.setItem("authUser", JSON.stringify(response.data.res.token));
            localStorage.setItem("userType", response.data.res.validEmail.user_type);
            localStorage.setItem("userID", response.data.res.validEmail._id);
            toast.success(response.data.msg)
            await delay(5000);
            if(response.data.res.validEmail.user_type == "Restaurant"){

                navigate("/dashboard");
            }else{
                navigate("/restaurant");
            }
            // console.log(response.data.res.validEmail.user_type);
            // if( response.data.res.validEmail.user_type == "Restaurant"){
              
            //     toast.success(response.data.res.msg);
            //     navigate("/dashboard");
            // }else if(response.data.res.validEmail.user_type == "user"){
               
            //     toast.success(response.data.res.msg);
            //     navigate("/userDashboard");
            // }else{
              
            // }

        }else if(response.status == 400){
            toast.error(response.data.msg);
        }else{
            toast.error("oops! something went wrong");
        }
    };


    return(
        <>
        <NavHead />
        <div>
             <Container fluid className="LoginDiv my-5">
                <Row>
                    <Col md={6} lg={7} sm={12} >
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"  className="img-fluid" alt="Sample image"/>
                    </Col>

                    <Col md={6} lg={4} sm={12} >
                    <div className="divider d-flex align-items-center my-4">
                        <h3 className="text-center fw-bold mx mb-0">Welcome Back 👋 </h3>
                    </div>
                        <Label htmlFor="email" className="form-label">
                            Email Address
                        </Label>
                        <Input
                            type="email"
                            className="form-control mb-4"
                            id="email"
                            name="email"
                            size={12}
                            placeholder="name@example.com" 
                            onChange={handleFormValue} />
                            {errors.email && <span className="error">{errors.email}</span>}
                            {/* <br /> */}
                        <Label htmlFor="password" className="form-label">
                            Password Address
                        </Label>
                        <Input
                            type="password"
                            className="form-control mb-4"
                            id="password"
                            name="password"
                            size={12}
                            placeholder="Please enter your password"
                            onChange={handleFormValue} />
                            {errors.password && <span className="error">{errors.password}</span>}
                        <FormGroup check className="mt-2">
                            <Input type="checkbox" />
                            {' '}
                            <Label check
                            className="me-5">
                            Remember Me
                            </Label>
                            
                        </FormGroup>

                        <div className='text-center text-md-start mt-4 pt-2'>
                            <Button className="mb-0 px-5" size='lg' onClick={LoginUser}>Login</Button>
                            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
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