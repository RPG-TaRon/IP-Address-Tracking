const form = document.querySelector("#ip-form");
const input = document.querySelector("#ip-input");
const ipAddressText = document.querySelector("#ip-address"); //Lines 1-6 is storing HTML elements for JS to work with
const locationText = document.querySelector("#location");
const timezoneText = document.querySelector("#timezone");
const ispText = document.querySelector("#isp");

let map; // creating my map variables. which will hold the leaflet map and marker.
let marker;

// Below is the map setup from the official Leaflet.js quick start guide. It shows a simple way to create a map and add a marker. This gave me a solid starting point instead of having the same code as others. After that I trimmed it down and adjusted it to my needs. I didn't need the circle, polygons, or popups.

function initializeMap(lat, lng) { //wrapping the map and added logic to prevent the map from recreating.
  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  marker = L.marker([lat, lng]).addTo(map); // adding the marker
}

// The function below updates the map and marker position.
function updateMap(lat, lng) {
  if (!map) {
    initializeMap(lat, lng);  //If the map hasn't been initialized, initialize it
    return;
  }

  map.setView([lat, lng], 13);     //Sets the map view to the new coordinates
  marker.setLatLng([lat, lng]);    //Sets the marker to the new coordinates
}
// The function below takes the API response and pushes that data into the page. It updates the text fields first, then updates the map so the visual location matches the information shown.
function updateUi(data) {
  ipAddressText.textContent = data.ip;
  locationText.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezoneText.textContent = `UTC ${data.location.timezone}`;
  ispText.textContent = data.isp;

  updateMap(data.location.lat, data.location.lng);
}
// The function below fetches data from the API and updates the page
async function getIpData(ipValue = "") {
  try {
    // Checking if the input looks like an IP address
    const isIp = /^[0-9.]+$/.test(ipValue);

    // URL for the API
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Rhx0Z4KzhMp3WvaLZ3MP0bQzl4kAY`;

    if (ipValue) {
      if (isIp) {
        // If it's an IP address
        url += `&ipAddress=${encodeURIComponent(ipValue)}`;
      } else {
        // If it's a domain
        url += `&domain=${encodeURIComponent(ipValue)}`;
      }
    }

    // Fetching data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Checking API errors
    if (!response.ok) {
      console.error("API error:", data);
      return;
    }

    // Update the UI with the data
    updateUi(data);

  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
// Event listener for the form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const ipValue = input.value.trim();

  if (!ipValue) {
    return;
  }

  getIpData(ipValue);
});

/*
  PRESENTATION MODE:
  For this presentation, we'll use a static IP address for security reasons.
*/
getIpData("192.212.174.101");

/*
  REAL AUTO-DETECT MODE:
  Comment out the line above and uncomment this when needed.
*/
// getIpData();
