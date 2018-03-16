import React from 'react';
import { Link } from 'react-router-dom'

const NavBar = ({}) => (
  <React.Fragment>
    <Link to="/" className="menu-item">Home</Link>
    <Link to="/me" className="menu-item">Account</Link>
    <Link to="/new" className="menu-item">New Release</Link>
  </React.Fragment>
);

export default NavBar;
