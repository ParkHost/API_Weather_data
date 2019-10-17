const mymap = L.map("geoMap").setView([35, -20], 2.5);
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
    const marker = L.marker([item.lat, item.lon]).addTo(mymap);

    const txt = `Het weer in ${item.weerParams.plaats} is ${item.weerParams.samenv} de verwachting
    is ${item.weerParams.verw}`;

    marker.bindPopup(txt);
  }
}
