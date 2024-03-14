import { useNavigate } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom';
import EditModal from '../components/editModal';
import Empty from "../assets/empty.jpg";
import { baseUrl } from '../urls';

const RecipeDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { Recipeid } = location.state;
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const { recipes, setRecipes } = useContext(RecipeContext);

    const recipe = recipes.find((recipe) => recipe._id === Recipeid);


    const handleEditClick = (recipe) => {
        setSelectedRecipe(recipe);
        setEditModalShow(true);
    }

    const deleteRecipe = async (id) => {
        const response = await fetch(
            `${baseUrl}/api/v1/recipes/deleteRecipe/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmDelete) {
            const newRecipe = recipes.filter((res) => {
                if (res.id !== id) {
                    return res;
                }
            });
            setRecipes(newRecipe);
            navigate('/recipes');
        }
    }

    return (
        <div style={{ height: "100vh" }} className='flex flex-col justify-center items-center'>
            {recipe && (
                <>
                    <div>
                        <img src={Empty} alt='empty' className='w-96 h-80 object-cover rounded-xl' />
                    </div>
                    <div className='w-full md:w-1/2 lg-w-1/2 mt-4 md:mt-0 lg:mt-0'>
                        <h1 className='font-bold text-3xl'>{recipe.title}</h1>
                        <p className='text-md font-light my-2'>{`Ingredients: \n ${recipe.ingredients}`}</p>
                        <p className='text-md font-light'>{`Instructions: \n ${recipe.instructions}`}</p>
                        <p className='text-md font-bold'>{`Created by: ${recipe.createdBy}`}</p>
                        <div className='flex gap-2 mt-6'>
                            <button onClick={() => handleEditClick(recipe)} className="mt-2 w-full font-semibold rounded-2xl px-3 py-2 text-white bg-theme">
                                Edit
                            </button>
                            <button onClick={() => deleteRecipe(recipe._id)} className="mt-2 w-full font-semibold rounded-2xl px-2 py-2 text-black bg-light-theme">
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
            {selectedRecipe && <EditModal show={editModalShow} onHide={() => setEditModalShow(false)} recipe={selectedRecipe} />}
        </div>
    )    
}

export default RecipeDetails