import { Router } from "express";
import { createRecipe, getRecipes, updateRecipe, deleteRecipe } from "../controllers/recipe.controller.js";

const router = Router();

router.route("/createRecipe").post(createRecipe)

router.route("/getRecipe").get(getRecipes)

router.route("/updateRecipe/:id").put(updateRecipe)

router.route("/deleteRecipe/:id").delete(deleteRecipe)

export default router;