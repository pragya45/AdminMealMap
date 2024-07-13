import { Category, Dashboard, Group, RateReview, Restaurant } from '@mui/icons-material';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const SidebarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '95vh',
  width: '250px',
  backgroundColor: '#2c3e50',
  padding: '20px',
  boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  color: '#ffffff',
}));

const NavItem = styled(ListItem)(({ theme }) => ({
  margin: '10px 0',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  '& a': {
    textDecoration: 'none',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background 0.3s, color 0.3s',
    width: '100%',
  },
  '& a:hover, & a.active': {
    backgroundColor: '#4a90e2',
    color: '#ffffff',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  fontFamily: 'Inika, serif',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#c0392b',
    transform: 'scale(1.05)',
  },
}));

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Typography variant="h6" className="sidebar-header">
        MealMap
      </Typography>
      <List>
        <NavItem button>
          <NavLink to="/dashboard" activeClassName="active">
            <ListItemIcon>
              <Dashboard style={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </NavLink>
        </NavItem>
        <NavItem button>
          <NavLink to="/users" activeClassName="active">
            <ListItemIcon>
              <Group style={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </NavLink>
        </NavItem>
        <NavItem button>
          <NavLink to="/categories" activeClassName="active">
            <ListItemIcon>
              <Category style={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </NavLink>
        </NavItem>
        <NavItem button>
          <NavLink to="/restaurants" activeClassName="active">
            <ListItemIcon>
              <Restaurant style={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Restaurants" />
          </NavLink>
        </NavItem>
        <NavItem button>
          <NavLink to="/reviews" activeClassName="active">
            <ListItemIcon>
              <RateReview style={{ color: '#ffffff' }} />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </NavLink>
        </NavItem>
      </List>
      <div className="logout-container">
        <LogoutButton
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          Logout
        </LogoutButton>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
