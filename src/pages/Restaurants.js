import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import RestaurantForm from '../components/RestaurantForm';
import api from '../services/api';

Modal.setAppElement('#root'); // Set the app element for react-modal

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentRestaurant, setCurrentRestaurant] = useState(null); // For edit functionality

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

  const handleAddRestaurant = async (data, id = null) => {
    const token = localStorage.getItem('token');
    try {
      id
        ? await api.put(`/restaurants/${id}`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        : await api.post('/restaurants', data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      fetchRestaurants();
      setModalIsOpen(false);
      setCurrentRestaurant(null);
      toast.success(`Restaurant ${id ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error(`Failed to ${id ? 'update' : 'add'} restaurant`, error);
      toast.error(`Failed to ${id ? 'update' : 'add'} restaurant`);
    }
  };

  const handleEditRestaurant = (restaurant) => {
    setCurrentRestaurant(restaurant);
    setModalIsOpen(true);
  };

  const handleDeleteRestaurant = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.delete(`/restaurants/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchRestaurants();
      toast.success('Restaurant deleted successfully');
    } catch (error) {
      console.error('Failed to delete restaurant', error);
      toast.error('Failed to delete restaurant');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Restaurants
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalIsOpen(true)}>
        Add Restaurant
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {
          setModalIsOpen(false);
          setCurrentRestaurant(null);
        }}
        contentLabel="Add or Edit Restaurant"
        className="modal-content"
      >
        <RestaurantForm onSubmit={handleAddRestaurant} categories={categories} restaurant={currentRestaurant} />
        <Button onClick={() => setModalIsOpen(false)} variant="contained" color="secondary">
          Close
        </Button>
      </Modal>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
                <TableCell>{restaurant.place}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditRestaurant(restaurant)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteRestaurant(restaurant._id)}
                  >
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

export default Restaurants;
