import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "6e75efe9";
  const API_KEY = "197d97274f9567d26c6bbd7349b45d2b";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("broccoli");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() !== "") {
      getIngredients();
    }
  }, [query]);

  const getIngredients = async () => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRecipes(data.hits);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("An error occurred while fetching data. Please try again later.");
      setRecipes([]); // Clear recipes on error
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getRecipe = (e) => {
    e.preventDefault();
    const trimmedQuery = search.trim();

    if (trimmedQuery === "") {
      setError("Please enter a valid search query.");
    } else if (/^[a-zA-Z0-9\s]+$/.test(trimmedQuery)) {
      // Check for special characters
      setQuery(trimmedQuery);
      setError(null);
    } else {
      setError("Special characters are not allowed in the search query.");
    }
  };

  return (
    <div className="app">
      <div className="wrapper">
        <h1 className="appTitle">Ingredient Genius</h1>        
        <form className="inputForm" onSubmit={getRecipe}>
          <label htmlFor="searchInput" className="sr-only">
            Search
          </label>
          <input
            className="searchInput"
            id="searchInput"
            type="search"
            value={search}
            onChange={updateSearch}
          />
          <button className="searchBtn" type="submit">
            Search
          </button>
        </form>
        <h2 className="formTitle">Unleash your inner chef!</h2>
        {error && <p className="error">{error}</p>}
        <div className="recipes">
          {recipes.map((recipe) => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
      <footer className="footer">
        <p>Created by Sammy | at Juno College</p>
      </footer>
    </div>
  );
};

export default App;