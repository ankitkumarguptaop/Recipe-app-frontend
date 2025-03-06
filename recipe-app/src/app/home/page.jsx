'use client'

import Navbar from '@/components/navbar/navbar';
import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Card, CardContent, CardMedia, Typography, Pagination } from '@mui/material';
import style from './home.module.css';
import AddRecipeModal from '@/components/modal/modal';

const Home = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (recipe) => {
    console.log("Recipe Submitted:", recipe);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const recipes = [
    {
      name: 'Pasta',
      description: 'Delicious homemade pasta with tomato sauce.',
      category: 'veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Chicken Curry',
      description: 'Spicy and flavorful chicken curry.',
      category: 'non-veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Salad',
      description: 'Healthy and fresh vegetable salad.',
      category: 'veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Ice Cream',
      description: 'Sweet and cold dessert.',
      category: 'dessert',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Salad',
      description: 'Healthy and fresh vegetable salad.',
      category: 'veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Ice Cream',
      description: 'Sweet and cold dessert.',
      category: 'dessert',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Salad',
      description: 'Healthy and fresh vegetable salad.',
      category: 'veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Ice Cream',
      description: 'Sweet and cold dessert.',
      category: 'dessert',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Salad',
      description: 'Healthy and fresh vegetable salad.',
      category: 'veg',
      image: 'https://via.placeholder.com/150'
    },
    {
      name: 'Ice Cream',
      description: 'Sweet and cold dessert.',
      category: 'dessert',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const paginatedRecipes = recipes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'veg', label: 'Veg' },
    { value: 'non-veg', label: 'Non-Veg' },
    { value: 'dessert', label: 'Dessert' }
  ];



  return (
    <>
      <Navbar />
      <Box className={style.searchContainer}>
        <TextField 
          label="Search Recipe" 
          variant="outlined" 
          size="small" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className={style.searchInput}
        />
        <TextField 
          select 
          label="Category" 
          variant="outlined" 
          size="small" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className={style.categorySelect}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value} className={style.menuItem}>
              {cat.label}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" color="primary" className={style.createButton} onClick={handleOpen}>Create Recipe</Button>
      </Box>
      <Box className={style.recipeContainer}>
        {paginatedRecipes.map((recipe, index) => (
          <Card key={index} className={style.recipeCard}>
            <CardMedia component="img" height="140" image={recipe.image} alt={recipe.name} />
            <CardContent>
              <Typography variant="h6">{recipe.name}</Typography>
              <Typography variant="body2" color="text.secondary">{recipe.description}</Typography>
              <Typography variant="caption" display="block" mt={1}>Category: {recipe.category}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box display="flex" justifyContent="center" p={2}>
        <Pagination 
          count={Math.ceil(recipes.length / itemsPerPage)} 
          page={page} 
          onChange={handleChangePage} 
          color="primary"
        />
      </Box>
      <AddRecipeModal open={open} handleClose={handleClose} handleSubmit={handleSubmit} />
    </>
  );
};

export default Home;
