import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  
  const APP_ID = "6e75efe9";
  const API_KEY = "197d97274f9567d26c6bbd7349b45d2b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    getIngredients();
  }, [query])

  const getIngredients = async () => {
    const response = await fetch
    ('http://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}');
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getRecipe = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="searchForm" onSubmit={getRecipe} >
        <label for="searchInput" className="sr-only">Search</label>
        <input className="searchBar" id="searchInput" type="search" value={search}
        onChange={updateSearch} />
        <button className="bearchButton" type="submit" >
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.image}
          ingredients={recipe.recipe.ingredients}
        />

        ))}
      </div>
    </div>
  );
}


export default App;
