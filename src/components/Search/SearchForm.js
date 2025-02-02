import React, { useState } from "react";
import { setSelectedNeighborhood, setDashboardData ,setSelectedActivity} from "../../redux/store"; // Redux actions
import { useDispatch } from "react-redux";
import "../../styles/SearchForm.css"; 
import { neighborhoods as allNeighborhoods } from "../Neighborhoods/Neighborhoods"; // Import all neighborhoods
import axios from "axios";
import { auth, db } from "../../firebase/firebaseConfig"; // Firebase imports
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Firestore utilities
import { Spinner } from "@chakra-ui/react"; // Import Spinner from Chakra UI
const API_URL = "https://api.businessmap-me.live/"

// Scraping Function (background execution)
const scrapeData = (neighborhoodName, activity, dateRange = "365") => {
  fetch("https://businessmap-me.live/scrape", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ neighborhoodName, activity, dateRange }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data in background:", error.message);
    });
};

function SearchForm({ onSearch }) {
  const [neighborhood, setNeighborhood] = useState("");
  const [activity, setActivity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();

  // Predefined neighborhoods
  const existingNeighborhoods = [
    "المحمدية", "العقيق", "الخزامى", "الصحافة", "الملقا", "النخيل", "حطين", "عرقة", "السفارات"
  ];

  const comingSoonNeighborhoods = allNeighborhoods.filter(
    (name) => !existingNeighborhoods.includes(name)
  );

  // Predefined activity options
  const activityOptions = ["شقق", "شاورما", "مستوصف", "حديقة", "بقالة", "فندق", "مقهى", "مطعم", "صيدلية"];

  // Handle neighborhood selection and trigger scraping
  const handleNeighborhoodSelect = (selectedNeighborhood) => {
    setNeighborhood(selectedNeighborhood); 
    dispatch(setSelectedNeighborhood(selectedNeighborhood)); 
    scrapeData(selectedNeighborhood, activity);
  };

// Handle activity selection
const handleActivitySelect = (selectedActivity) => {
  setActivity(selectedActivity);
  dispatch(setSelectedActivity(selectedActivity)); // Dispatch action to Redux store
  setIsArabic(/[\u0600-\u06FF]/.test(selectedActivity));
};


  // Search logic
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!neighborhood || !activity) {
      alert("Please select a neighborhood and enter an activity.");
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.get(
        `${API_URL}neighborhood/${encodeURIComponent(
          neighborhood
        )}`,
        {
          params: { activity },
      });

      if (onSearch) {
        onSearch(neighborhood, activity);
      }

      dispatch(setSelectedNeighborhood(neighborhood));
      dispatch(setDashboardData(response.data));

      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userSearchRef = collection(db, "users", userId, "searchHistory");

        await addDoc(userSearchRef, {
          neighborhood,
          activity,
          timestamp: Timestamp.now(),
        });
      }
    } catch (err) {
      console.error("Error fetching data from server:", err.message);
      alert("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      {/* Neighborhood Dropdown */}
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          <div className="neighborhood-text">{neighborhood || "Select Neighborhood"}</div>
          <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9660;</div>
        </div>
        {isOpen && (
          <ul className="dropdown-list">
            {existingNeighborhoods.map((name) => (
              <li key={name} className="dropdown-item" onClick={() => { setIsOpen(false); handleNeighborhoodSelect(name); }}>
                {name} (Available)
              </li>
            ))}
            {comingSoonNeighborhoods.map((name) => (
              <li key={name} className="dropdown-item" onClick={() => { setIsOpen(false); handleNeighborhoodSelect(name); }}>
                {name} (Coming Soon)
              </li>
            ))}
          </ul>
        )}
      </div>


      {/* Manual Activity Input */}
      <div className="activity-container">
        <input
          type="text"
          list="search"
          className={`activity-input ${isArabic ? "arabic" : ""}`}
          value={activity}
          onChange={(e) => handleActivitySelect(e.target.value)}
          placeholder="Enter or Select Activity"
        />
        <datalist id="search">
          {activityOptions.map((act) => (
            <option key={act} value={act} />
          ))}
        </datalist>
      </div>

      {/* Search Button */}
      <button type="submit" className="search-button" disabled={loading}>
  {loading ? <Spinner size="sm" color="white" /> : "Search"}
</button>
    </form>
  );
}

export default SearchForm;
