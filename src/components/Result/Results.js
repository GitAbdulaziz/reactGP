import React from 'react';
import '../../styles/Results.css';

function Results({ results }) {
  return (
    <div className="results-container">
      {results.map((place, index) => (
        <div key={index} className="result-item">
          <h3>{place.name}</h3>
          <p>Distance: {place.distance} km</p>
          {place.photos && place.photos.length > 0 && (
            <img
              src={place.photos[0].getUrl({ maxWidth: 400 })}
              alt={place.name}
              className="result-image"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Results;


