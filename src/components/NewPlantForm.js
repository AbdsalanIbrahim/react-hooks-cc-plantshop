import React, { useState } from "react";

function NewPlantForm({ handleAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPlant = {
      ...formData,
      price: parseFloat(formData.price) 
    };
    handleAddPlant(newPlant);
    setFormData({ name: "", image: "", price: "" }); 
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder="Plant name"
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        placeholder="Image URL"
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        placeholder="Price"
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default NewPlantForm;



