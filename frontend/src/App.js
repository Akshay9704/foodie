import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeContextProvider from "./context/RecipeContextProvider";
import Home from "./pages/home";
import Recipes from "./pages/recipes";
import RecipeDetails from './pages/recipeDetails';

function App() {
  return (
    <Router>
      <RecipeContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipeDetails" element={<RecipeDetails />} />
        </Routes>
      </RecipeContextProvider>
    </Router>
  );
}

export default App;
