import './style.css';
import html from './index.html';
import icon from './assets/myIcon.png';
// Create Map
let firstLoad = true;
let ISSCoords = [];
let myCoords = [];

const map = L.map('map').setView([0, 0], 1);
const dist = document.getElementById('dist');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);

const myIcon = L.icon({
  iconUrl: icon,
  iconSize: [38, 38],
});

function drawLine() {
  const pLine = L.polyline([ISSCoords, myCoords]).addTo(map);
  ISSCoords = [];
}

function getISS() {
  fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then((response) => response.json())
    .then((data) => {
      const { latitude, longitude } = data;
      ISSCoords.push(parseFloat(latitude));
      ISSCoords.push(parseFloat(longitude));
      const marker = L.marker([latitude, longitude], { icon: myIcon }).addTo(
        map
      );
      writeDistance();
      drawLine();
    });
}

function getmyLocation() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;
    myCoords.push(parseFloat(latitude));
    myCoords.push(parseFloat(longitude));
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
function removeLayer() {
  map.eachLayer((layer) => {
    if (layer._leaflet_id != 27) {
      map.removeLayer(layer);
    }
  });
}

function writeDistance() {
  let distance = calcCrow(myCoords[0], myCoords[1], ISSCoords[0], ISSCoords[1]);
  console.log(distance);
  console.log(myCoords[0]);
  console.log(myCoords[1]);
  console.log(ISSCoords[0]);
  console.log(ISSCoords[1]);
  dist.innerText = calcCrow(
    myCoords[0],
    myCoords[1],
    ISSCoords[0],
    ISSCoords[1]
  ).toFixed(1);
}
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(myLat, myLon, ISSLat, ISSLon) {
  let R = 6371; // km
  let dLat = toRad(ISSLat - myLat);
  let dLon = toRad(ISSLon - myLon);
  let lat1 = toRad(myLat);
  let lat2 = toRad(ISSLat);

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
