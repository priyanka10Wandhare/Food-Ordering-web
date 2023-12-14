import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';

const Topbar = ({ toggleSidebar }) => {
  return (
    <Navbar color="dark" dark expand="md">
      <Button onClick={toggleSidebar} color="info" className="navbar-toggler">
      <span class="navbar-toggler-icon"></span>
      </Button>
      <NavbarBrand href="/">Dashboard</NavbarBrand>
      <Nav className="ml-auto" navbar>
        {/* <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem> */}
      
      </Nav>
    </Navbar>
  );
};

export default Topbar;
