'use strict';

// Your MapBox access token
const accessToken = 'pk.eyJ1IjoibWNndWVuZXR0ZSIsImEiOiJjbHExOWUxeWcwNmwyMmlvMGY3NXF3bGc4In0.SXaq4QutArp0bqPMpmnkjg';

// Initialize map without tracking user location
mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', // map style
  center: [-79.7982, 43.8291], // default center (Ballentrae Drive)
  zoom: 9 // default zoom
});

// Add marker at default location (Ballentrae Drive)
new mapboxgl.Marker({
  color: "#4285F4", // Google Maps icon color
}).setLngLat([-79.7982, 43.8291]).addTo(map);

// Get user's location and center map when track button is clicked
function trackDevice() {
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });
}

function successLocation(position) {
  const { latitude, longitude } = position.coords;
  const zoomLevel = 17; // Set an appropriate zoom level
  
  map.flyTo({
    center: [longitude, latitude], // set map center to user's location
    zoom: zoomLevel, // set zoom level to zoom in to user's location
    essential: true // This animation is considered essential with respect to prefers-reduced-motion
  });

  // Add Google Maps icon at user's location
  new mapboxgl.Marker({
    color: "#4285F4", // Google Maps icon color
  }).setLngLat([longitude, latitude]).addTo(map);

  // Add pin marker at user's location
  addPinMarker([longitude, latitude]);
}

function errorLocation() {
  // Handle errors when getting user's location
  console.error('Unable to retrieve your location');
}

// Track button event listener
document.getElementById('trackButton').addEventListener('click', trackDevice);

// Function to add pin marker at a given location
function addPinMarker(location) {
  // Add pin marker at the specified location
  new mapboxgl.Marker({
    color: "#FF5733", // Pin marker color (orange)
  }).setLngLat(location).addTo(map);
}
