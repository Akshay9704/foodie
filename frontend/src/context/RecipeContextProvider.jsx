import React from "react";
import RecipeContext from "./RecipeContext";

const RecipeContextProvider = ({ children }) => {
  const [recipes, setRecipes] = React.useState([]);
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
   
  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, user, setUser }}>
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeContextProvider;
