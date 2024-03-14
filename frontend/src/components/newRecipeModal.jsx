import React from "react";
import Modal from "react-bootstrap/Modal";

const NewRecipeModal = ({ show, onHide }) => {
  const [newRecipe, setNewRecipe] = React.useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    createdBy: "",
  });

  const handleNewRecipe = (e) => {
    const { name, value } = e.target;
    setNewRecipe({
      ...newRecipe,
      [name]: value,
    });
  };

  const addRecipe = async () => {
    const { title, ingredients, instructions, createdBy } = newRecipe;
    if (!title || !ingredients || !instructions  || !createdBy) {
      return alert("Please fill in all the fields");
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/recipes/createRecipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
          body: JSON.stringify(newRecipe),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        if (data.error) {
          return alert("Failed to add recipe");
        }
      }
      alert("Recipe added Successfully");
      window.location.reload();
      onHide();
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Fetch Error fecth: " + error.message);
    }
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
          Add a New Recipe
        </Modal.Title>
        <h1 className="text-2xl font-medium cursor-pointer" onClick={onHide}>
          X
        </h1>
      </Modal.Header>
      <Modal.Body>
        <section className="flex flex-col gap-2 items-center justify-center">
          {/* <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="recipeImage" />
            <button className="bg-light-theme py-2 px-3 rounded-xl" type="submit">Upload</button>
          </form> */}
          <div className="flex items-center gap-2 mt-2">
            <label htmlFor="recipeName">Recipe Name</label>
            <input
              type="text"
              onChange={handleNewRecipe}
              name="title"
              value={newRecipe.title}
              placeholder="Enter recipe name"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">Ingredients</label>
            <input
              type="text"
              onChange={handleNewRecipe}
              name="ingredients"
              value={newRecipe.ingredients}
              placeholder="Enter Ingredients"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">Instructions</label>
            <input
              type="text"
              onChange={handleNewRecipe}
              name="instructions"
              value={newRecipe.instructions}
              placeholder="Enter Intructions"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <label htmlFor="recipeName">Created By</label>
            <input
              type="text"
              onChange={handleNewRecipe}
              name="createdBy"
              value={newRecipe.createdBy}
              placeholder="Enter Author's name"
              className="border p-2 rounded-lg outline-none"
            />
          </div>
          <button onClick={addRecipe} className="bg-theme text-white p-3 mt-3 rounded-lg">
            Add Recipe
          </button>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export default NewRecipeModal;
