import { createBrowserRouter } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import RecipeDetails from "./pages/recipeDetails";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/recipeDetails",
        element: <RecipeDetails />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
