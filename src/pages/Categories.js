import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories', error);
            toast.error('Failed to fetch categories');
        }
    };

    const handleAddCategory = async () => {
        if (!categoryName.trim()) {
            toast.error('Category name cannot be empty');
            return;
        }

        try {
            const response = editingCategory
                ? await api.put(`/categories/${editingCategory._id}`, { name: categoryName })
                : await api.post('/categories', { name: categoryName });

            setCategoryName('');
            setEditingCategory(null);
            fetchCategories();
            toast.success(`Category ${editingCategory ? 'updated' : 'added'} successfully`);
        } catch (error) {
            console.error('Failed to add/update category', error.response || error);
            toast.error('Failed to add/update category');
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await api.delete(`/categories/${categoryId}`);
            fetchCategories();
            toast.success('Category deleted successfully');
        } catch (error) {
            console.error('Failed to delete category', error);
            toast.error('Failed to delete category');
        }
    };

    const handleEditCategory = (category) => {
        setCategoryName(category.name);
        setEditingCategory(category);
    };

    return (
        <Box className="categories-container">
            <h2>Categories</h2>
            <Paper component="form" className="add-category-form">
                <InputBase
                    className="input-base"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                    {editingCategory ? 'Update Category' : 'Add Category'}
                </Button>
            </Paper>
            <Paper className="categories-list">
                <List>
                    {categories.map((category) => (
                        <ListItem key={category._id} className="category-item">
                            <ListItemText primary={category.name} />
                            <ListItemSecondaryAction className="actions">
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditCategory(category)} style={{ color: 'green' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category._id)} style={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default Categories;
