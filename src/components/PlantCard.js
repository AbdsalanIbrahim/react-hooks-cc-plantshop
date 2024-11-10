import React, { useState, useEffect } from "react";

function PlantCard({ plant, plants, setPlants }) {
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price); 

  useEffect(() => {
    setIsSoldOut(plant.soldOut || false);
  }, [plant.soldOut]);

  function handleSoldOut() {
    const updatedSoldOutStatus = !isSoldOut;
    setIsSoldOut(updatedSoldOutStatus);

    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ soldOut: updatedSoldOutStatus }),
    })
      .then(response => response.json())
      .then(updatedPlant => {
        console.log("Plant updated:", updatedPlant);
      })
      .catch(error => {
        console.error("Error updating plant:", error);
      });
  }

  function handlePriceUpdate() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then(response => response.json())
      .then(updatedPlant => {
        const updatedPlants = plants.map(p =>
          p.id === updatedPlant.id ? updatedPlant : p
        );
        setPlants(updatedPlants);  
      })
      .catch(error => {
        console.error("Error updating price:", error);
      });
  }

  const cardClass = isSoldOut ? "card sold-out" : "card";

  return (
    <li className={cardClass} data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {/* Editable price input */}
      <p>
        Price: 
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
        />
      </p>
      <button onClick={handlePriceUpdate}>Update Price</button>
      <button onClick={handleSoldOut} className="primary">
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;


