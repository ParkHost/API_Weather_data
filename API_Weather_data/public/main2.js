const mymap = L.map("geoMap").setView([0, 0], 1);
// Making a map and tiles
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  console.log(data);

  for (item of data) {
    L.marker([item.lat, item.lon]).addTo(mymap);
  }
  console.log(data);
}
