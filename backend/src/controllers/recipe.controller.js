import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Recipe } from "../models/recipes.model.js";


const createRecipe = asyncHandler(async (req, res) => {
    // get recipe details from frontend
    // validation - not empty
    // create recipe object - create entry in db
    // return response

    const { title, ingredients, instructions, createdBy } = req.body;
    try {
        if (!title || !ingredients || !instructions || !createdBy) {
            throw new ApiError(400, "All fields are required");
        }

        const recipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            createdBy,
        });

        if (!recipe) {
            throw new ApiError(500, "Something went wrong while creating the recipe");
        }

        res.status(201).json(new ApiResponse(200, recipe, "Recipe created successfully"));
    } catch (error) {

    }
});

const getRecipes = asyncHandler(async (req, res) => {
    try {
        const allRecipes = await Recipe.find();
        if (!allRecipes) {
            throw new ApiError(404, "No recipes found");
        }
        res.status(200).json(new ApiResponse(200, allRecipes, "Recipes fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Something went wrong while fetching the recipes");
    }
});

const updateRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, instructions, createdBy } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(id, { title, ingredients, instructions, createdBy })
    return res
        .status(200)
        .json(new ApiResponse(200, recipe, "Recipe updated successfully"));
});

const deleteRecipe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    return res
        .status(200)
        .json(new ApiResponse(200, recipe, "Recipe deleted successfully"));
});

export { createRecipe, getRecipes, updateRecipe, deleteRecipe }