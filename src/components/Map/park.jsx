import React, { useState } from 'react';
import ParkingSpotsFetcher from './ParkingSpotFetcher';// Adjust the path as per your project structure
import Map from './NearestParkingMap'; // Assuming you have a Map component to display the parking spots

const App = () => {
  const [parkingSpots, setParkingSpots] = useState([]);

  const handleDataFetched = (data) => {
    setParkingSpots(data);
  };

  return (
    <div>
      <h1>My Parking App</h1>
      <ParkingSpotsFetcher onDataFetched={handleDataFetched} />
      <Map parkingSpots={parkingSpots} />
    </div>
  );
};

export default App;
