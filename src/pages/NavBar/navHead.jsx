import "./nav.css"
import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link ,useNavigate } from "react-router-dom";
export default function NavHead(args){
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let user_id = localStorage.getItem("userID")
  function getCartCount(userId) {
    // Retrieve the count from local storage or state
    return localStorage.getItem(`cartCount_${userId}`) || '0';
  }
  // alert(getCartCount(user_id))

  const itemCount = getCartCount(user_id);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
    return(
      <div>
      <Navbar className="navbar-strip"  expand="md">
      <NavbarBrand href="/"><img src='https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/97c43f8974e6c876.svg' /></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar className='navbar-responsive'>
        <Nav className="ml-auto" navbar>
          {/* <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/services">Services</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/contact">Contact</NavLink>
          </NavItem> */}
        </Nav>
          {  user_id != null && user_id != undefined ? 
          <div className='cart-icon'>
             <Nav className="ml-auto" navbar>
             <NavItem>
              <NavLink href="/restaurant">Restaurant</NavLink>
            </NavItem> 
             <NavItem>
              <NavLink href="/orders">Orders</NavLink>
            </NavItem> 
             <NavItem>
              <NavLink href="javascript:void(0)" onClick={logout} >Logout</NavLink>
            </NavItem> 
            </Nav>
            {/* <FontAwesomeIcon icon={faUser} style={{"margin-right":"5px","font-size":"20px" }}></FontAwesomeIcon> */}
            <Link to="/checkout"><FontAwesomeIcon icon={faShoppingCart } style={{"font-size":"20px" }}></FontAwesomeIcon> </Link>
            <span className="item-count">{itemCount}</span>
          </div>
          : 
          <div className=''>
            
              <Link to="/register" className='ms-1 btn btn-primary nav-btn'>Register</Link>
              <Link to="/login" className='ms-1 btn btn-primary nav-btn'>Login</Link>
             
          </div>
          }
      </Collapse>
    </Navbar>
    </div>
   )
}