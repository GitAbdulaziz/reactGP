import React, { useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbars/Navbar";
import Footer from "../Footer/Footer";

import SearchForm from "./SearchForm";
import Map from "../Map/Map";
import Results from "../Result/Results";
import { useHistory } from "react-router-dom";
import gradient from "../../assets/img/background-body-admin.png";
import { useDispatch } from "react-redux";
import { setResults, setCenter } from "../../redux/store";
import "../../styles/SearchApp.css";
import { ChakraProvider } from "@chakra-ui/react";


function SearchApp() {
  const [center, setLocalCenter] = useState({ lat: 24.7136, lng: 46.6753 });
  const [radius] = useState(3000);
  const [results, setLocalResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const history = useHistory(); 
  const dispatch = useDispatch(); 

  const handleSearch = (neighborhood, activity) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: `${neighborhood}, Riyadh` },
      (response, status) => {
        if (status === "OK") {
          const location = response[0].geometry.location;
          const newCenter = { lat: location.lat(), lng: location.lng() };
          setLocalCenter(newCenter);
          dispatch(setCenter(newCenter)); 
          fetchNearbyPlaces(location, activity);
          setShowResults(false);
        } else {
          alert(`Failed to locate neighborhood: ${status}`);
        }
      }
    );
  };

  const fetchNearbyPlaces = (location, activity) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      location,
      radius,
      keyword: activity,
    };

    service.nearbySearch(request, (places, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const enrichedPlaces = addDistancesToPlaces(places, location);
        setLocalResults(enrichedPlaces);
        dispatch(setResults(enrichedPlaces)); 
      } else {
        alert("No results found.");
      }
    });
  };

  const addDistancesToPlaces = (places, location) => {
    return places
      .map((place) => {
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          location,
          place.geometry.location
        );
        return { ...place, distance: (distance / 1000).toFixed(2) };
      })
      .sort((a, b) => a.distance - b.distance);
  };

  const dynamicStyles = {
    backgroundImage: `url(${gradient})`,
    backgroundSize: "cover",
    backgroundRepeat: "repeat-y",
    minHeight: "100vh",
  };

  return (
    <ChakraProvider>
    <div>
      <Navbar />
      <div className="search-app" style={dynamicStyles}>
        <Header />

        <SearchForm onSearch={handleSearch} />
        <Map center={center} radius={radius} results={results} />

        {/* Buttons Row */}
        {results.length > 0 && (
          <div className="buttons-container">
           

            <a className="cta" onClick={() => history.push("/admin/dashboard")}>
              <span>Go to Dashboard</span>
              <span>
                <svg
                  width="36px"
                  height="23px"
                  viewBox="0 0 66 43"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <g
                    id="arrow"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <path
                      className="one"
                      d="M40.1543933,3.89485454 L43.9763149,0.139296592..."
                      fill="#FFFFFF"
                    ></path>
                    <path
                      className="two"
                      d="M20.1543933,3.89485454 L23.9763149,0.139296592..."
                      fill="#FFFFFF"
                    ></path>
                    <path
                      className="three"
                      d="M0.154393339,3.89485454 L3.97631488,0.139296592..."
                      fill="#FFFFFF"
                    ></path>
                  </g>
                </svg>
              </span>
            </a>
          </div>
        )}

        {showResults && <Results results={results} />}
      </div>
      <Footer />
    </div>
    </ChakraProvider>
  );
}

export default SearchApp;
