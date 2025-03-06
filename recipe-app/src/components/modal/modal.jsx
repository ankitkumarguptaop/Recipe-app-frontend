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

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];


const recipeSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    category: z.string().min(1, "Category is required"),
    image: z.any()
});

const AddRecipeModal = ({ open, handleClose, handleSubmit }) => {
    const {
        register,
        handleSubmit: validateForm,
        setValue,
        formState: { errors },
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
        console.log("data:", data);
        handleSubmit(data);
        handleClose();
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
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        margin="dense"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        {...register("description")}
                        error={!!errors.description}
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
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        margin="dense"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box variant="contained" component="label" fullWidth sx={{ my: 2 }}>

                        <input type="file" onChange={handleImageUpload} />
                    </Box>
                    {errors.image && <Typography color="error">{errors.image.message}</Typography>}

                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button variant="outlined" onClick={handleClose}>
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
