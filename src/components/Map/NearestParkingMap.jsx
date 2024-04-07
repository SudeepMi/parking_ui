import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import icon from "../../Images/icon.png"
import L from "leaflet";

// Define a class for the k-d tree
class KDTreeNode {
  constructor(point, left, right) {
    this.point = point;
    this.left = left;
    this.right = right;
  }
}

class KDTree {
  constructor(points) {
    this.root = this.buildTree(points, 0);
  }

  // Method to build the k-d tree recursively
  buildTree(points, depth) {
    if (points.length === 0) return null;

    const axis = depth % 2; // Assuming 2D space (latitude and longitude)

    points.sort((a, b) => a[axis] - b[axis]);

    const medianIndex = Math.floor(points.length / 2);
    const median = points[medianIndex];

    return new KDTreeNode(
      median,
      this.buildTree(points.slice(0, medianIndex), depth + 1),
      this.buildTree(points.slice(medianIndex + 1), depth + 1)
    );
  }

  // Method to find the nearest neighbors using k-d tree
  findNearestNeighbors(target, k) {
    const result = [];
    this._findNearestNeighbors(this.root, target, 0, k, result);
    return result;
  }

  _findNearestNeighbors(node, target, depth, k, result) {
    if (!node) return;

    const axis = depth % 2; // Assuming 2D space (latitude and longitude)

    let nextBranch = null;
    let oppositeBranch = null;

    if (target[axis] < node.point[axis]) {
      nextBranch = node.left;
      oppositeBranch = node.right;
    } else {
      nextBranch = node.right;
      oppositeBranch = node.left;
    }

    this._findNearestNeighbors(nextBranch, target, depth + 1, k, result);

    if (result.length < k || this.distance(target, node.point) < this.distance(target, result[result.length - 1])) {
      if (result.length === k) {
        result.pop();
      }
      result.push(node.point);
    }

    if (result.length < k || Math.abs(target[axis] - node.point[axis]) < this.distance(target, result[result.length - 1])) {
      this._findNearestNeighbors(oppositeBranch, target, depth + 1, k, result);
    }
  }

  // Method to calculate the distance between two points
  distance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
  }
}

// Modify the Map component to use the k-d tree to find the nearest parking spots
export default function Map({ parkingSpots, userLocation }) {
  const [nearestParkingSpots, setNearestParkingSpots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!parkingSpots || parkingSpots.length === 0) {
      setError("No parking spots data available.");
      setIsLoading(false);
      return;
    }

    if (!userLocation) {
      setError("User location data is missing.");
      setIsLoading(false);
      return;
    }

    try {
      const tree = new KDTree(parkingSpots.map(spot => [spot.latitude, spot.longitude]));
      const nearest = tree.findNearestNeighbors([userLocation.latitude, userLocation.longitude], 5);
      setNearestParkingSpots(nearest);
      setIsLoading(false);
    } catch (error) {
      setError("Error occurred while processing data.");
      setIsLoading(false);
    }
  }, [parkingSpots, userLocation]);

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([userLocation.latitude, userLocation.longitude], map.getZoom());

    return null;
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <MapContainer
          className="map"
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={12}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
            contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {nearestParkingSpots.map((spot, index) => (
            <Marker key={index} icon={customIcon} position={[spot[0], spot[1]]}>
              <Popup>{`Nearest Parking Spot ${index + 1}`}</Popup>
            </Marker>
          ))}
          <MapView />
        </MapContainer>
      )}
    </div>
  );
}
