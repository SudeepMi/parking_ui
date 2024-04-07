import React, { useState } from 'react';

function UserCoordinates() {
  const [coordinates, setCoordinates] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const showPosition = (position) => {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  return (
    <div>
      <h2>Get User Coordinates</h2>
      <button onClick={getLocation}>Get My Coordinates</button>
      {coordinates && (
        <div>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default UserCoordinates;
