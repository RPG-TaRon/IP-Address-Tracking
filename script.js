const form = document.querySelector("#ip-form");
const input = document.querySelector("#ip-input");
const ipAddressText = document.querySelector("#ip-address");
const locationText = document.querySelector("#location");
const timezoneText = document.querySelector("#timezone");
const ispText = document.querySelector("#isp");

let map;
let marker;

function initializeMap(lat, lng) {
  map = L.map("map").setView([lat, lng], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([lat, lng]).addTo(map);
}

function updateMap(lat, lng) {
  if (!map) {
    initializeMap(lat, lng);
    return;
  }

  map.setView([lat, lng], 13);
  marker.setLatLng([lat, lng]);
}

function updateUi(data) {
  ipAddressText.textContent = data.ip;
  locationText.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
  timezoneText.textContent = `UTC ${data.location.timezone}`;
  ispText.textContent = data.isp;

  updateMap(data.location.lat, data.location.lng);
}

async function getIpData(ipValue = "") {
  try {
    const url = ipValue
      ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_Rhx0Z4KzhMp3WvaLZ3MP0bQzl4kAY&ipAddress=${encodeURIComponent(ipValue)}`
      : `https://geo.ipify.org/api/v2/country,city?apiKey=at_Rhx0Z4KzhMp3WvaLZ3MP0bQzl4kAY`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error("API error:", data);
      return;
    }

    updateUi(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

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