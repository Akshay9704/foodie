import React from "react";
import { RouterProvider } from "react-router-dom";
import RecipeContextProvider from "./context/RecipeContextProvider";
import router from "./routes";

function App() {
  return (
    <RecipeContextProvider>
      <RouterProvider router={router} />
    </RecipeContextProvider>
  );
}

export default App;
