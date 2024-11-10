import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, setPlants }) {
  return (
    <ul>
      {plants.map(plant => (
        <PlantCard 
          key={plant.id} 
          plant={plant} 
          plants={plants} 
          setPlants={setPlants}  
        />
      ))}
    </ul>
  );
}

export default PlantList;
