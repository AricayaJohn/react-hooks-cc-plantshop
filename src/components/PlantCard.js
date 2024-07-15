import React, { useState } from "react";

function PlantCard({plant, onToggleSoldOut, onUpdatePrice, onDeletePlant}) {
  const [isSoldOut, setIsSoldOut] = useState(plant.isSoldOut)
  //Advanced deliverable
  const [newPrice, setNewPrice] = useState(plant.price.toString())

  const handleSoldOutToggle = () => {
    setIsSoldOut((prevIsSoldOut) => !prevIsSoldOut)
    onToggleSoldOut(plant.id, !isSoldOut)
  }
  const handlePriceChange = (e) => {
    setNewPrice(e.target.value);
  }

  const handlePriceUpdate = () => {
    const updatedPrice = parseFloat(newPrice)
    onUpdatePrice(plant.id, updatedPrice)
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <input 
        type = "number"
        value = {newPrice}
        onChange = {handlePriceChange}
        placeholder= "Update Price"
        >
        </input>
      <button onClick = {handlePriceUpdate}>Update Price</button>
        <button onClick = {handleSoldOutToggle}>
          {isSoldOut ? "Out of Stock" : "In Stock" }
        </button>
        <button onClick={() => onDeletePlant(plant.id)}> Delete Plant</button>
    </li>
  );
}

export default PlantCard;
