"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";

const recipeSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.number().min(1, "Category is required"),
  image: z.any(),
});

const AddRecipeModal = ({ open, handleClose, handleSubmit }) => {
  const categories = useSelector((state) => state.cateogory.cateogories);
  const {
    control,
    register,
    handleSubmit: validateForm,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(recipeSchema),
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    handleSubmit(data);
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Recipe
        </Typography>

        <form onSubmit={validateForm(onSubmit)}>
          <TextField
            fullWidth
            label="Recipe Name"
            {...register("name")}
            error={errors.name}
            helperText={errors.name?.message}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            error={errors.description}
            helperText={errors.description?.message}
            margin="dense"
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            select
            label="Category"
            {...register("category")}
            error={errors.category}
            helperText={errors.category?.message}
            margin="dense"
          >
            {categories.map((category) => (
              <MenuItem control={control} key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <Box variant="contained" component="label" sx={{ my: 2 }}>
            <input type="file" onChange={handleImageUpload} />
          </Box>
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddRecipeModal;
