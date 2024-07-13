import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm = ({ fetchCategories }) => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/categories', { name });
      setName('');
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default CategoryForm;
