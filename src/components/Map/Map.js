import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Circle,
  InfoWindow,
  Polygon,
  TrafficLayer 
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../../redux/store";
import NeighborhoodsBoundary from "../Neighborhoods/NeighborhoodsBoundary"; 

const Map = ({ center, results }) => {
  const dispatch = useDispatch();
  const API = process.env.REACT_APP_API_KEY;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [distanceBetweenMarkers, setDistanceBetweenMarkers] = useState(null);

  // Get the selected neighborhood from Redux
  const selectedNeighborhood = useSelector(
    (state) => state.app.selectedNeighborhood
  );

  // Get the polygon path for the selected neighborhood
  const neighborhoodPolygonPath = React.useMemo(() => {
    if (!selectedNeighborhood) return null;

    // Find the neighborhood GeoJSON based on the selected neighborhood name
    const neighborhood = NeighborhoodsBoundary.find(
      (n) => n.name === selectedNeighborhood
    );

    if (!neighborhood) return null;

    // Convert GeoJSON coordinates to LatLng literal format for Polygon
    return neighborhood.geoJson.features[0].geometry.coordinates[0].map(
      ([lng, lat]) => ({ lat, lng })
    );
  }, [selectedNeighborhood]);

  // Filter results to include only those within the selected neighborhood
  const filteredResults = React.useMemo(() => {
    if (!neighborhoodPolygonPath) return results;

    const polygon = new window.google.maps.Polygon({
      paths: neighborhoodPolygonPath,
    });

    return results.filter((place) => {
      const location = new window.google.maps.LatLng(
        place.geometry.location.lat(),
        place.geometry.location.lng()
      );

      return window.google.maps.geometry.poly.containsLocation(
        location,
        polygon
      );
    });
  }, [neighborhoodPolygonPath, results]);

  useEffect(() => {
    // Dispatch the number of results to the Redux store
    dispatch(setResults(filteredResults));
  }, [filteredResults, dispatch]);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);

    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      placeId: place.place_id,
      fields: ["name", "formatted_address", "geometry"],
    };

    service.getDetails(request, (details, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaceDetails(details);
      } else {
        console.error("Failed to fetch place details:", status);
      }
    });

    if (selectedMarkers.length < 2) {
      setSelectedMarkers([...selectedMarkers, place]);
    } else {
      setSelectedMarkers([place]);
    }

    if (selectedMarkers.length === 1) {
      const {
        geometry: { location: location1 },
      } = selectedMarkers[0];
      const {
        geometry: { location: location2 },
      } = place;

      const distance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(location1.lat(), location1.lng()),
          new window.google.maps.LatLng(location2.lat(), location2.lng())
        );

      setDistanceBetweenMarkers((distance / 1000).toFixed(2)); // Convert to kilometers
    }
  };

  return (
    <LoadScriptNext
      googleMapsApiKey= {API}
      libraries={["places", "geometry"]}
    >
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "800px",
          borderRadius: "10px",
          marginTop: "50px",
        }}
        center={center}
        zoom={13}
      >
        <TrafficLayer /> {/* Add TrafficLayer */}
        
        {/* Draw the neighborhood boundary as a polygon */}
        {neighborhoodPolygonPath && (
          <Polygon
            paths={neighborhoodPolygonPath}
            options={{
              fillColor: "#5500ff",
              fillOpacity: 0.2,
              strokeColor: "#5500ff",
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        )}

        {/* Markers */}
        {filteredResults.map((place, index) => (
          <Marker
            key={index}
            position={place.geometry.location}
            title={place.name}
            onClick={() => handleMarkerClick(place)} // Handle marker click
          />
        ))}

        {/* InfoWindow for selected place */}
        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.geometry.location}
            onCloseClick={() => {
              setSelectedPlace(null);
              setPlaceDetails(null);
            }}
          >
            <div style={{ color: "black" }}>
              <h3>{placeDetails?.name || selectedPlace.name}</h3>
              <p>
                Address:{" "}
                {placeDetails?.formatted_address || selectedPlace.vicinity}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.geometry.location.lat()},${selectedPlace.geometry.location.lng()}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#0066cc",
                  fontWeight: "bold",
                }}
              >
                Open in Google Maps
              </a>
            </div>
          </InfoWindow>
        )}

        {/* Distance between selected markers */}
        {distanceBetweenMarkers && selectedMarkers.length === 2 && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            }}
          >
            <p>
              Distance between <strong>{selectedMarkers[0].name}</strong> and{" "}
              <strong>{selectedMarkers[1].name}</strong>:<p> {distanceBetweenMarkers} km</p>
            </p>
          </div>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
