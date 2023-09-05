import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ calories, image, ingredients, title }) => {
  const roundedCalories = Math.floor(calories);

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