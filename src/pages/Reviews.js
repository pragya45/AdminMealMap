import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Reviews.css';

const Reviews = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchReviews(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get('/restaurants');
      setRestaurants(response.data.restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchReviews = async (restaurantId) => {
    try {
      const response = await api.get(`/reviews/${restaurantId}`);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await api.post('/reviews', {
        restaurantId: selectedRestaurant,
        rating,
        comment,
      });
      fetchReviews(selectedRestaurant);
      setRating('');
      setComment('');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      fetchReviews(selectedRestaurant);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box className="review-container">
        <Typography variant="h4" component="h1" gutterBottom>
          Reviews
        </Typography>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Select a Restaurant</InputLabel>
          <Select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            label="Select a Restaurant"
          >
            <MenuItem value="">
              <em>Select a restaurant</em>
            </MenuItem>
            {restaurants.map((restaurant) => (
              <MenuItem key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <List>
          {reviews.map((review) => (
            <ListItem key={review._id} className="review-card">
              <Card variant="outlined" fullWidth>
                <CardContent>
                  <div className="review-header">
                    <Typography variant="h6" component="div">
                      {review.user ? review.user.fullName : 'Anonymous'}
                    </Typography>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Typography variant="body2">
                    {review.comment} (Rating: {review.rating})
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="add-review-form">
        <Typography variant="h4" component="h2" gutterBottom>
          Add a Review
        </Typography>
        <form onSubmit={handleAddReview}>
          <TextField
            label="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            margin="normal"
            fullWidth
            required
            inputProps={{ min: 1, max: 5 }}
          />
          <TextField
            label="Comment"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Add Review
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Reviews;
