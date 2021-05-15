import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { dataStore } from "../../data-store";

import "./index.scss";

export default function DrinkDetails() {
  const [drinksDetails, setDrinksDetails] = useState({});
  const [inputValue, setInputValue] = useState("");
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await dataStore.findById(id);
    setDrinksDetails(data);
    setInputValue(data.strIngredient1);
  };

  const updateData = () => {
    const updatedDdata = { ...drinksDetails };
    updatedDdata.strIngredient1 = inputValue;
    dataStore.updateCacheItem(updatedDdata);
    history.goBack();
  };

  return (
    <div>
      {drinksDetails ? (
        <div className="details-content">
          <img
            className="details-image"
            src={drinksDetails.strDrinkThumb}
            alt="drink"
          />
          <div className="details">
            <div className="drink-name">Drink: {drinksDetails.idDrink}</div>
            <div className="catagory-id">
              Category: {drinksDetails.strCategory}
            </div>
            <div className="catagory-id">Id: {drinksDetails.idDrink}</div>
            <div className="add-ing">
              <input
                value={inputValue}
                onChange={({ target: { value } }) => {
                  setInputValue(value);
                }}
                className="ingredient"
                placeholder="Replace first ingredient"
              />
              <button className="add" onClick={() => updateData()}>
                Update the ingredient and go back
              </button>
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
