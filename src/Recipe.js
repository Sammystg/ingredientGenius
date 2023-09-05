import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, calories, image, ingredients }) => {
  const roundedCalories = Math.floor(calories);

  // Log the image URL
  console.log('Image URL:', image);

  return (
    <div className={style.recipe}>
      <h3>{title}</h3>
      <img className={style.image} src={image} alt={title} />
      <ul>
        {ingredients.map((ingredient) => (
          <li>{ingredient.text}</li>
        ))}
        <li>
          <p>
            Calories: <span>{roundedCalories}</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Recipe;