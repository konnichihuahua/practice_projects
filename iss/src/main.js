import './style.css';
import html from './index.html';
import icon from './assets/myIcon.png';
// Create Map
let firstLoad = true;
let ISSCoords = [];
let myCoords = [];
const map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);

const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [38, 38],
});

function drawLine() {
  const line = L.polyline([ISSCoords, myCoords]).addTo(map);
  console.log(ISSCoords);
  ISSCoords = [];
  console.log(ISSCoords);
}

function getISS() {
  fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then((response) => response.json())
    .then((data) => {
      const { latitude, longitude } = data;
      ISSCoords.push(latitude);
      ISSCoords.push(longitude);
      map.setView([latitude, longitude], 2);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap',
      }).addTo(map);
      const marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(
        map
      );
      drawLine();
    });
}

function getmyLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    myCoords.push(latitude);
    myCoords.push(longitude);
    const marker = L.marker([latitude, longitude]).addTo(map);
  });
}

function getDistFromISS() {
  if (firstLoad === true) {
    getmyLocation();
    getISS();
    firstLoad = false;
  } else {
    getISS();
  }
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(myLat, myLon, ISSLat, ISSLon) {
  let R = 6371; // km
  let dLat = toRad(ISSLat - myLat);
  let dLon = toRad(ISSLon - myLon);
  let lat1 = toRad(myLat);
  let lat2 = toRad(myLon);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

document.getElementById('getbtn').addEventListener('click', getDistFromISS);
