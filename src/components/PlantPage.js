import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then(response => response.json())
      .then(data => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then(response => response.json())
      .then(addedPlant => setPlants([...plants, addedPlant])); 
  }

  function handleSearch(newSearchTerm) {
    setSearchTerm(newSearchTerm);
  }

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm handleAddPlant={handleAddPlant} /> 
      <Search onSearch={handleSearch} />  
      <PlantList 
        plants={filteredPlants} 
        setPlants={setPlants}  
      /> 
    </main>
  );
}

export default PlantPage;


