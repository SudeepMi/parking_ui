// NearestParkingSpot.js

import React, { useState } from 'react';
import KdTree from './k-dTree'; // Importing the k-d tree implementation
import UserCoordinates from './userCoordinates';




function NearestParkingSpot({ userCoordinates, parkingSpots }) {
  const [nearestSpot, setNearestSpot] = useState(null);

  const handleFindNearestSpot = () => {
    const tree = new KdTree(parkingSpots);
    const nearest = tree.nearest(userCoordinates);
    setNearestSpot(nearest);
  };

  return (
    <div>
      <h2>Find Nearest Parking Spot</h2>
      <button onClick={handleFindNearestSpot}>Find Nearest Spot</button>
      {nearestSpot && (
        <div>
          <p>Nearest Spot: {nearestSpot}</p>
        </div>
      )}
    </div>
  );
}

export default NearestParkingSpot;
