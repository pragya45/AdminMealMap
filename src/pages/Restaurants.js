import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import RestaurantForm from '../components/RestaurantForm';
import api from '../services/api';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurants();
    fetchCategories();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get('/restaurants');
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error('Failed to fetch restaurants', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleAddRestaurant = async (data) => {
    const token = localStorage.getItem('token');
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      await api.post('/restaurants', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchRestaurants();
      setModalIsOpen(false);
      toast.success('Restaurant added successfully');
    } catch (error) {
      console.error('Failed to add restaurant', error);
      toast.error('Failed to add restaurant');
    }
  };

  const handleEditRestaurant = async (id) => {
    setCurrentRestaurant(id);
    setModalIsOpen(true);
  };

  const handleDeleteRestaurant = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/restaurants/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchRestaurants();
      toast.success('Restaurant deleted successfully');
    } catch (error) {
      console.error('Failed to delete restaurant', error);
      toast.error('Failed to delete restaurant');
    }
  };

  const handleSubmit = (data) => {
    if (currentRestaurant) {
      // Call update restaurant function
    } else {
      handleAddRestaurant(data);
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Restaurants
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
        Add Restaurant
      </Button>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)} aria-labelledby="add-restaurant-modal" aria-describedby="add-restaurant-form">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="add-restaurant-modal" variant="h6" component="h2">
            {currentRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
          </Typography>
          <RestaurantForm onSubmit={handleSubmit} categories={categories} />
          <Button onClick={() => setModalIsOpen(false)}>Close</Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant._id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.category.name}</TableCell>
                <TableCell>{restaurant.location ? `${restaurant.location.coordinates.join(', ')}` : 'No Location'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => handleEditRestaurant(restaurant._id)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteRestaurant(restaurant._id)} sx={{ marginLeft: '10px' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Restaurant;