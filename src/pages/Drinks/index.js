import React, { useEffect, useState } from "react";
import "./index.scss";
import Card from "../../components/Card";
import { dataStore } from "../../data-store";
import { Link } from "react-router-dom";

export default function Drinks() {
  const [drinkDetails, setDrinkDetails] = useState([]);

  const fetchInputSuggestion = async (value = "") => {
    //dataStore caches the data, even if getDrinks get called multiple time
    // dataStore won't make an api call untill the cache is expired
    const drinks = await dataStore.getDrinks(value);
    setDrinkDetails(drinks || []);

    const scrollLocation = window.sessionStorage.getItem(
      "scrollLocation",
      window.pageYOffset
    );
    if (scrollLocation) {
      window.scrollTo("0", parseInt(scrollLocation));
      window.sessionStorage.removeItem("scrollLocation");
    }
  };

  useEffect(() => fetchInputSuggestion(), []);

  //save the current pageYOffset to restore the scroll position
  const onDetailsOpen = () => {
    window.sessionStorage.setItem("scrollLocation", window.pageYOffset);
  };

  //Show ingredients on the cards
  const getIngredient = (drinkDetails) => {
    let i = 1,
      ingredients = "";
    while (i <= 3) {
      const ingredient = drinkDetails[`strIngredient${i}`];
      if (ingredient) {
        ingredients += `${i === 1 ? "" : ","} ${
          drinkDetails[`strIngredient${i}`]
        }`;
      }
      i++;
    }
    return ingredients;
  };

  return (
    <div className="drinks-wrapper">
      <header>Drinks</header>
      <div className="card-wrapper">
        {drinkDetails.map((eachCard) => {
          return (
            <Link
              to={`/drink-details/${eachCard.idDrink}`}
              onClick={(id) => onDetailsOpen(id)}
              key={eachCard.idDrink}
              className="card-section"
            >
              <Card
                catagory={eachCard.strCategory}
                imageUrl={eachCard.strDrinkThumb}
                name={eachCard.strDrink}
                id={eachCard.idDrink}
                ingredients={getIngredient(eachCard)}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
