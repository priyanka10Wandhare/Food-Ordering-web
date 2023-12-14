import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <Nav vertical>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/addFood">Add Food</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/foods">Foods</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/order-list">Orders</NavLink>
        </NavItem>
        {/* Add more sidebar links as needed */}
      </Nav>
    </div>
  );
};

export default Sidebar;
