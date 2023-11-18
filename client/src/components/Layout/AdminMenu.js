import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Create a styled component for the main container
const MenuContainer = styled.div`
  text-align: center;
`;

// Create a styled component for the list group
const ListGroup = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
`;

// Create a styled component for list items
const MenuItem = styled(NavLink)`
  display: block;
  padding: 8px 0;
  color: #333;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const AdminMenu = () => {
  return (
    <MenuContainer>
      <ListGroup>
        <h4 className="list-group-item list-group-item-primary">Seller Panel</h4>
        <MenuItem
          to="/dashboard/admin"
          activeClassName="active"
        >
          Profile
        </MenuItem>
        <MenuItem
          to="/dashboard/admin/create-category"
          activeClassName="active"
        >
          Create Category
        </MenuItem>
        <MenuItem
          to="/dashboard/admin/create-product"
          activeClassName="active"
        >
          Create Product
        </MenuItem>
        <MenuItem to="/dashboard/admin/products" activeClassName="active">
          Products
        </MenuItem>
        <MenuItem to="/dashboard/admin/orders" activeClassName="active">
          Orders
        </MenuItem>
        <MenuItem to="/dashboard/admin/users" activeClassName="active">
          Orders
        </MenuItem>
      </ListGroup>
    </MenuContainer>
  );
};

export default AdminMenu;
