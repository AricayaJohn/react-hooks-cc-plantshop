import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
// import { setFiles } from "@testing-library/user-event/dist/cjs/utils/index.js";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch('http://localhost:6001/plants')
    .then ((r) => r.json())
    .then(setPlants)
  }, [])

  const handleAddPlant = (newPlant) => {
    setPlants((plants) => [...plants, newPlant])
  }

  function handleUpdatePrice( id, newPrice) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        console.log(updatedPlant)
        const updatedPlants = plants.map((plant) => 
          plant.id === id ? {...plant, price: updatedPlant.price } : plant
      )
        setPlants(updatedPlants)
      })
  }

  const handleToggleSoldOut = (id, isSoldOut) => {
    fetch (`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isSoldOut: !isSoldOut }),
    })
    .then((r) => r.json())
    .then((updatedPlant) => {
      const updatedPlants = plants.map((plant) => 
        plant.id === id ? {...plant, isSoldOut: updatedPlant.isSoldOut} : plant 
      )
        setPlants(updatedPlants)
    })
  }
//Advanced Deliverable
  const handleDeletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedPlants = plants.filter((plant) => plant.id !== id)
        setPlants(updatedPlants)
      })
  }

  const displayedPlants = plants.filter((plant) => 
    plant.name ? plant.name.toLowerCase().includes(search.toLowerCase()) : false
)

  return (
    <main>
      <NewPlantForm onAddPlant = {handleAddPlant}/>
      <Search  setSearch = {setSearch} />
      <PlantList 
        plants = {displayedPlants} 
        onToggleSoldOut={handleToggleSoldOut}
        onUpdatePrice = {handleUpdatePrice}
        onDeletePlant = {handleDeletePlant}/>
    </main>
  );
}

export default PlantPage;
