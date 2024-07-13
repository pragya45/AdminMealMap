import React, { useEffect, useState } from 'react';

const RestaurantForm = ({ onSubmit, categories, restaurant }) => {
    // State variables
    const [name, setName] = useState(restaurant ? restaurant.name : '');
    const [category, setCategory] = useState(restaurant ? restaurant.category._id : '');
    const [description, setDescription] = useState(restaurant ? restaurant.description : '');
    const [rating, setRating] = useState(restaurant ? restaurant.rating : '');
    const [isFeatured, setIsFeatured] = useState(restaurant ? restaurant.isFeatured : false);
    const [place, setPlace] = useState(restaurant ? restaurant.place : '');
    const [latitude, setLatitude] = useState(restaurant ? restaurant.location.coordinates[0] : '');
    const [longitude, setLongitude] = useState(restaurant ? restaurant.location.coordinates[1] : '');
    const [openingTime, setOpeningTime] = useState(restaurant ? restaurant.opening_time : '');
    const [closingTime, setClosingTime] = useState(restaurant ? restaurant.closing_time : '');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // Function to handle image upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('rating', rating);
        formData.append('isFeatured', isFeatured);
        formData.append('place', place);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('opening_time', openingTime);
        formData.append('closing_time', closingTime);
        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData, restaurant ? restaurant._id : null);
    };

    useEffect(() => {
        if (restaurant) {
            setPreviewImage(restaurant.image_url);
        }
    }, [restaurant]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            />
            <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
            />{" "}
            Featured
            <input
                type="text"
                placeholder="Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Opening Time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Closing Time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={handleImageUpload}
            />
            {/* Preview Image */}
            {previewImage && (
                <img
                    src={previewImage}
                    alt="preview"
                    className="img-fluid rounded mt-2"
                    style={{ maxWidth: "100px" }}
                />
            )}
            <button type="submit" className="btn btn-primary">
                {restaurant ? 'Update' : 'Add'} Restaurant
            </button>
        </form>
    );
};

export default RestaurantForm;
