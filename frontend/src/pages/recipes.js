import { useNavigate } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/header';
import Card from '../components/cards';
import NewRecipeModal from '../components/newRecipeModal';
import axios from 'axios';
import { baseUrl } from '../urls';

const Recipes = () => {
    const navigate = useNavigate();

    const { recipes, setRecipes } = useContext(RecipeContext);

    const [newRecipeModalShow, setNewRecipeModalShow] = useState(false);
    const [search, setSearch] = React.useState("");

    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleRecipeClick = (Recipeid) => {
        navigate('/recipeDetails', { state: { Recipeid } });
    };

    const handleNewRecipeClick = () => {
        setNewRecipeModalShow(true);
    }

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/recipes/getRecipe`)
            .then((response) => {
                setRecipes(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div style={{ height: "100vh" }} className='bg-page-theme'>
            <Header />
            <div className='mt-20'>
                <h1 className='text-center font-bold text-4xl'>
                    WELCOME {localStorage.getItem("username") && localStorage.getItem("username").toUpperCase()}
                </h1>
            </div>
            <div className='flex justify-center'>
                <button onClick={handleNewRecipeClick} className='bg-theme text-white p-2 mt-3 rounded-lg'>Add a new recipe</button>
            </div>
            <div className='flex justify-center'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type='search' className='border outline-none w-1/2 mx-auto mt-3 p-3 rounded-lg' placeholder='Search for recipes...' />
            </div>
            <div className='flex justify-center mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredRecipes.map((recipe, index) => (
                        <div key={index} className='cursor-pointer hover:opacity-80' onClick={() => {
                            handleRecipeClick(recipe._id);
                        }}>
                            <Card recipe={recipe} />
                        </div>
                    ))}
                </div>
            </div>
            <NewRecipeModal show={newRecipeModalShow} onHide={() => setNewRecipeModalShow(false)} />
        </div>
    )
}

export default Recipes;
