import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <Menu mode="horizontal">
    <Menu.Item><Link to="/" className="menu-item">Home</Link></Menu.Item>
    <Menu.Item><Link to="/collection" className="menu-item">Collection</Link></Menu.Item>
    <Menu.Item><Link to="/new" className="menu-item">New Release</Link></Menu.Item>
    <Menu.Item><Link to="/about" className="menu-item">About</Link></Menu.Item>
    <Menu.Item><Link to="/me" className="menu-item">Account</Link></Menu.Item>
  </Menu>
);

export default NavBar;
