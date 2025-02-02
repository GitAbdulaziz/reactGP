import React, { useState } from "react";
import { setSelectedNeighborhood, setDashboardData } from "../../redux/store"; // Redux actions
import { useDispatch } from "react-redux";
import "../../styles/SearchForm.css"; 
import { neighborhoods as allNeighborhoods } from "../Neighborhoods/Neighborhoods"; // Import the full list of neighborhoods
import axios from "axios";
import { auth, db } from "../../firebase/firebaseConfig"; // Firebase imports
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore utilities
const API_URL = "https://api.businessmap-me.live/"

// Scraping Function (background execution without waiting for response)
const scrapeData = (neighborhoodName, dateRange = "365") => {
  fetch("https://businessmap-me.live/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ neighborhoodName, dateRange }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(`Scraping completed for ${neighborhoodName}:`, data);
    })
    .catch((error) => {
      console.error("Error fetching data in background:", error.message);
    });
};

function SearchForm({ onSearch }) {
  const [neighborhood, setNeighborhood] = useState("");
  const [activity, setActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false); // State to check if the input is Arabic
  const [loading, setLoading] = useState(false); // State for loading status
  const dispatch = useDispatch();
  // Predefined 10 neighborhoods
  const existingNeighborhoods = [
    "المحمدية",
    "العقيق",
    "الخزامى",
    "الصحافة",
    "الملقا",
    "النخيل",
    "حطين",
    "عرقة",
    "السفارات"
  ];

  // Compute "Coming Soon" neighborhoods
  const comingSoonNeighborhoods = allNeighborhoods.filter(
    (name) => !existingNeighborhoods.includes(name)
  );

  // Handle neighborhood selection and trigger background scraping
  const handleNeighborhoodSelect = (selectedNeighborhood) => {
    setNeighborhood(selectedNeighborhood); // Update state
    dispatch(setSelectedNeighborhood(selectedNeighborhood)); // Update Redux store

    // console.log(`Triggering scraping for ${selectedNeighborhood}...`);
    scrapeData(selectedNeighborhood);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!neighborhood || !activity) {
      alert("Please select a neighborhood and enter an activity.");
      return;
    }

    setLoading(true); 

    try {
      // Fetch data from the server with activity as a parameter
      const response = await axios.get(
        `${API_URL}neighborhood/${encodeURIComponent(
          neighborhood
        )}`,
        {
          params: { activity },
        }
      );
      // console.log("Search Response:", response.data);

      if (onSearch) {
        onSearch(neighborhood, activity);
      }

      // Update Redux store
      dispatch(setSelectedNeighborhood(neighborhood));
      dispatch(setDashboardData(response.data));
      
      // Save search data to Firestore if the user is logged in
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userSearchRef = collection(db, "users", userId, "searchHistory");

        await addDoc(userSearchRef, {
          neighborhood,
          activity,
          timestamp: Timestamp.now(),
        });
        // console.log("Search data saved to Firestore.");
      }
    } catch (err) {
      console.error("Error fetching data from server:", err.message);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setActivity(value);

    // Check if the input contains Arabic text
    const arabicRegex = /[\u0600-\u06FF]/; // Regex to detect Arabic characters
    setIsArabic(arabicRegex.test(value));
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      {/* Dropdown for Neighborhood Selection */}
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <div className="neighborhood-text">
            {neighborhood || "Select Neighborhood"}
          </div>
          <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9660;</div>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {existingNeighborhoods.map((name) => (
              <li
                key={name}
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  handleNeighborhoodSelect(name); // Trigger background scraping
                }}
              >
                {name} (Available)
              </li>
            ))}
            {comingSoonNeighborhoods.map((name) => (
              <li
                key={name}
                className="dropdown-item"
                onClick={() => {
                  setIsOpen(false);
                  handleNeighborhoodSelect(name); // Trigger background scraping
                }}
              >
                {name} (Coming Soon)
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input for Activity */}
      <div className="activity-container">
        <input
          type="text"
          list="search"
          className={`activity-input ${isArabic ? "arabic" : ""}`}
          value={activity}
          onChange={handleInputChange}
          placeholder="Enter activity (e.g., restaurant)"
        />
        <datalist id="search">
          <option value="شقق" />
          <option value="شاورما" />
          <option value="بقالة" />
          <option value="فندق" />
        </datalist>
      </div>

      {/* Search Button */}
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? "Search" : "Search"}
      </button>
    </form>
  );
}

export default SearchForm;
