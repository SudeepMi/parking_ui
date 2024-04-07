import React, { useState, useEffect } from "react";
import axios from "axios";

const ParkingSpotsFetcher = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Define the Overpass query to fetch parking spots
        const overpassQuery = `
          [out:json];
          (
            node["amenity"="parking"];
            way["amenity"="parking"];
            relation["amenity"="parking"];
          );
          out body;
          >;
          out skel qt;
        `;

        // Make the HTTP request to Overpass API
        const response = await axios.post("https://overpass-api.de/api/interpreter", overpassQuery);

        // Extract parking spots data from the response
        const parkingSpots = response.data.elements.map(element => ({
          id: element.id,
          latitude: element.lat,
          longitude: element.lon,
          // You can add more properties as needed
        }));

        // Pass the fetched data to the parent component
        onDataFetched(parkingSpots);
      } catch (error) {
        console.error("Error fetching parking spots:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [onDataFetched]);

  return null; // No need to render anything in this component
};

export default ParkingSpotsFetcher;
