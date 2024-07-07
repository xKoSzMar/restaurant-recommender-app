import { useState, useContext } from "react";
import { MyContext } from "../App";

function NavigationBar() {
  const { setData, setPageFirstLoad } = useContext(MyContext);
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("all");
  const [rating, setRating] = useState(1);
  const [price, setPrice] = useState("all");
  const [distance, setDistance] = useState(100);
  const [numberOfRestaurants, setNumberOfRestaurants] = useState(1);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };
  const handleNumberOfRestaurantsChange = (e) => {
    setNumberOfRestaurants(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPageFirstLoad(false);

    const requestData = {
      location: location,
      cuisine: cuisine,
      rating: rating,
      price: price,
      distance: distance,
      numberOfRestaurants: numberOfRestaurants,
    };

    const url = "http://localhost:5000/process_data";
    console.log(requestData)
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.businesses);
      })
      .catch((error) => {
        console.error("Error: ", error);
        setData([]);
      });
  };

  return (
    <div className="bg-amber-700 bg-opacity-90 shadow-2xl border-2 border-amber-500 p-5 text-lg">
      <form className="flex justify-evenly flex-wrap" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center m-4">
          <label className="mr-1 font-bold">Location:</label>
          <input
            className="w-64 p-1 rounded-md bg-amber-600 hover:bg-amber-500 focus:bg-amber-500 outline-none transition ease duration-450"
            type="text"
            value={location}
            onChange={handleLocationChange}
            required
          />
        </div>
        <div className="flex items-center justify-center m-4">
          <label className="mr-1 font-bold">Cuisine:</label>
          <select
            className="bg-amber-600 hover:bg-amber-500 focus:bg-amber-500 rounded-md outline-none"
            value={cuisine}
            onChange={handleCuisineChange}
          >
            <option value="all">All</option>
            <option value="polish">Polish</option>
            <option value="italian">Italian</option>
            <option value="pizza">Pizza</option>
            <option value="kebab">Kebab</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="thai">Thai</option>
            <option value="american">American</option>
          </select>
        </div>
        <div className="flex items-center justify-center m-4">
          <label className="font-bold">Rating:</label>
          <input
            className="w-20 mx-1"
            type="range"
            value={rating}
            min="1"
            max="5"
            onChange={handleRatingChange}
          />
          <p className="font-bold">{rating}</p>
        </div>
        <div className="flex items-center justify-center m-4">
          <label className="mr-1 font-bold">Price:</label>
          <select
            className="bg-amber-600 hover:bg-amber-500 focus:bg-amber-500 rounded-md outline-none"
            value={price}
            onChange={handlePriceChange}
          >
            <option value="all">All</option>
            <option value="$">$</option>
            <option value="$$">$$</option>
            <option value="$$$">$$$</option>
          </select>
        </div>
        <div className="flex items-center justify-center m-4">
          <label className="font-bold">Distance:</label>
          <input
            className="w-20 mx-1"
            type="range"
            value={distance}
            step="100"
            min="100"
            max="5000"
            onChange={handleDistanceChange}
          />
          <p className="font-bold">{distance}m</p>
        </div>
        <div className="flex items-center justify-center m-4">
          <label className="mr-1 font-bold">Restaurants:</label>
          <input
            className="w-10 bg-amber-600 hover:bg-amber-500 focus:bg-amber-500 rounded-md outline-none"
            type="number"
            value={numberOfRestaurants}
            min="1"
            max="20"
            onChange={handleNumberOfRestaurantsChange}
          />
        </div>
        <div className="flex items-center justify-center bg-amber-600 hover:bg-amber-500 active:bg-amber-400 active:text-amber-800 px-2 rounded-lg font-bold border-2 border-amber-500 m-4">
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>
  );
}

export default NavigationBar;
