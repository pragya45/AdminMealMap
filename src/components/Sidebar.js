import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <div className="nav-item">
          <NavLink to="/dashboard" activeclassname="active">Dashboard</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/users" activeclassname="active">Users</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/categories" activeclassname="active">Categories</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/restaurants" activeclassname="active">Restaurants</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/reviews" activeclassname="active">Reviews</NavLink>
        </div>
      </div>
      <button className="logout" onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }}>Logout</button>
    </div>
  );
};

export default Sidebar;
