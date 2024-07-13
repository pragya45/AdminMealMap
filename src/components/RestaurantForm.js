import { Box, Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RestaurantForm = ({ onSubmit, categories }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [place, setPlace] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [openingTime, setOpeningTime] = useState('');
    const [closingTime, setClosingTime] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category || !description || !rating || !place || !latitude || !longitude || !openingTime || !closingTime || !image) {
            toast.error('Please fill all fields.');
            return;
        }

        const data = {
            name,
            category,
            description,
            rating,
            isFeatured,
            place,
            latitude,
            longitude,
            opening_time: openingTime,
            closing_time: closingTime,
            image,
        };

        onSubmit(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <InputLabel id="category-label">Category</InputLabel>
            <Select labelId="category-label" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <MenuItem value="">
                    <em>Select Category</em>
                </MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required multiline rows={3} />
            <TextField label="Rating" type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <FormControlLabel control={<Checkbox checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />} label="Featured" />
            <TextField label="Place" value={place} onChange={(e) => setPlace(e.target.value)} required />
            <TextField label="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
            <TextField label="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
            <TextField label="Opening Time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} required />
            <TextField label="Closing Time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} required />
            <input type="file" onChange={handleImageUpload} required />
            {previewImage && <img src={previewImage} alt="preview" className="img-fluid rounded mt-2" style={{ maxWidth: '100px' }} />}
            <Button type="submit" variant="contained" color="primary">
                Add Restaurant
            </Button>
        </Box>
    );
};

export default RestaurantForm;
