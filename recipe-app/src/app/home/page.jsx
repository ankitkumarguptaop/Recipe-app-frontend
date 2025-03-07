"use client";

import Navbar from "@/components/navbar/navbar";
import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Select,
  InputLabel,
  Stack,
  Chip,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import style from "./home.module.css";
import AddRecipeModal from "@/components/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe, listRecipe } from "@/features/recipe/recipe.action";
import { listCateogory } from "@/features/cateogory/cateogory.action";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

const Home = () => {
  const dispatch = useDispatch();

  const recipes = useSelector((state) => state.recipe.recipes);
  const categories = useSelector((state) => state.cateogory.cateogories);
  const [selectedCateogories, setSelectedCateogories] = useState([]);
console.log('✌️selectedCateogories --->', selectedCateogories);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (recipe) => {
    let formdata = new FormData();
    formdata.append("name", recipe.name);
    formdata.append("description", recipe.description);
    formdata.append("category", recipe.category);
    formdata.append("image", recipe.image);
    dispatch(createRecipe(formdata));
    dispatch(listRecipe({ page: page, limit: 4 }));
    handleClose();
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(
      listRecipe({
        page: page,
        limit: 4,
        search: search,
        cateogory_id: category,
      })
    );
  }, [search, page, category]);

  useEffect(() => {
    dispatch(listCateogory());
  }, []);

  return (
    <>
      <Navbar />

      <Box className={style.searchContainer}>
        <TextField
          label="Search Recipe"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className={style.searchInput}
        />
        {/* <TextField
            select
            label="Category"
            variant="outlined"
            size="small"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className={style.categorySelect}
          >
            {categories?.map((category) => (
              <MenuItem
                key={category.id}
                value={category.id}
                className={style.menuItem}
              >
                {category.name}
              </MenuItem>
            ))}
          </TextField> */}
        <FormControl>
          <InputLabel>Multiple Select</InputLabel>
          <Select
            size="small"
            sx={{ minWidth: "200px" }}
            multiple
            value={selectedCateogories}
            onChange={(e) => {
              setPage(1);
              setSelectedCateogories(e.target.value);
            }}
            input={<OutlinedInput label="Multiple Select" />}
            renderValue={(selected) => (
              <Stack gap={1} direction="row" flexWrap="wrap">
                {selected.map((value) => (
                  <Chip
                    key={value.id}
                    label={value.name}
                    onDelete={() => {
                      setPage(1);
                      setSelectedCateogories(
                        selectedCateogories.filter((item) => item !== value)
                      );
                    }}
                    deleteIcon={
                      <CancelIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                  />
                ))}
              </Stack>
            )}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category}
                sx={{ justifyContent: "space-between" }}
              >
                {category.name}
                {selectedCateogories.includes(category.name) ? (
                  <CheckIcon color="info" />
                ) : null}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          className={style.createButton}
          onClick={handleOpen}
        >
          Create Recipe
        </Button>
      </Box>
      <Box className={style.recipeContainer}>
        {recipes &&
          recipes?.recipe?.rows?.map((recipe, index) => (
            <Card key={recipe.id} className={style.recipeCard}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:8080/${recipe.attachment.file_link}`}
                alt={recipe.name}
              />
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.description}
                </Typography>
                <Typography variant="caption" display="block" mt={1}>
                  Category: {recipe.cateogory.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
      {recipes && recipes?.recipe?.count!=0 && (
        <Box display="flex" justifyContent="center" p={2}>
          <Pagination
            count={Math.ceil(recipes?.recipe?.count / 4)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      )}
      <AddRecipeModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Home;
