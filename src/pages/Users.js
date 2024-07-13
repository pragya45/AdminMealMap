import { Delete } from '@mui/icons-material';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api.js';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to fetch users', error);
      toast.error('Failed to fetch users');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await api.delete(`/user/${userId}`);
      fetchUsers();
      // toast.dismiss();  // Dismiss existing toasts before showing a new one
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user', error);
      toast.dismiss();  // Dismiss existing toasts before showing a new one
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="users-container">
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Paper className="users-list" elevation={3}>
        {users.map((user) => (
          <Grid container spacing={2} key={user._id} className="user-item">
            <Grid item xs={3} className="MuiGrid-item name-column">
              <Typography>{user.fullName}</Typography>
            </Grid>
            <Grid item xs={5} className="MuiGrid-item email-column">
              <Typography>{user.email}</Typography>
            </Grid>
            <Grid item xs={2} className="MuiGrid-item role-column">
              <Typography>{user.isAdmin ? 'Admin' : 'User'}</Typography>
            </Grid>
            <Grid item xs={2} className="MuiGrid-item actions-column actions">
              <IconButton color="secondary" onClick={() => handleDeleteUser(user._id)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </div>
  );
};

export default Users;
