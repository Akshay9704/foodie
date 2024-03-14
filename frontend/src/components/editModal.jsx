import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import RecipeContext from "../context/RecipeContext";
import axios from "axios";
import { baseUrl } from '../urls';

const EditModal = ({ show, onHide, recipe }) => {
  const navigate = useNavigate();

  const { recipes, setRecipes } = useContext(RecipeContext);

  const [edit, setEdit] = useState({
    etitle: recipe.title,
    eingredients: recipe.ingredients,
    einstructions: recipe.instructions,
    ecreatedBy: recipe.createdBy,
  });

  const editRecipe = async () => {
    const response = await axios.put(
      `${baseUrl}/api/v1/recipes/updateRecipe/${recipe._id}`,
      {
        title: edit.etitle,
        ingredients: edit.eingredients,
        instructions: edit.einstructions,
        createdBy: edit.ecreatedBy,
      }
    );
    const newRecipe = recipes.map((res) => {
      if (res._id === recipe._id) {
        return response.data.data;
      }
      return res;
    });
    setRecipes(newRecipe);
    onHide();
    navigate("/recipes")
  };

  const handleEdit = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Recipe
        </Modal.Title>
        <h1 className="text-2xl font-medium cursor-pointer" onClick={onHide}>
          X
        </h1>
      </Modal.Header>
      <Modal.Body>
        <section className="flex flex-col gap-2 items-center justify-center">
          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="recipeName">Recipe Name</label>
            <input
              type="text"
              name="etitle"
              onChange={handleEdit}
              value={edit.etitle}
              placeholder="Enter recipe name"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">Ingredients</label>
            <input
              type="text"
              name="eingredients"
              onChange={handleEdit}
              value={edit.eingredients}
              placeholder="Enter Ingredients"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">instructions</label>
            <input
              type="text"
              name="einstructions"
              onChange={handleEdit}
              value={edit.einstructions}
              placeholder="Enter Intructions"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">Created By</label>
            <input
              type="text"
              name="ecreatedBy"
              onChange={handleEdit}
              value={edit.ecreatedBy}
              placeholder="Enter Author's name"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
        </section>
        <button
          onClick={editRecipe}
          className="mt-5 w-full font-semibold rounded-2xl px-3 py-2 text-white bg-theme"
        >
          Edit
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
