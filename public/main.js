const button = document.querySelector("#button1");
const mymap = L.map("geoMap").setView([0, 0], 13);

button.addEventListener("click", () => {
  getGeo();
});

// Making a map and tiles
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });

tiles.addTo(mymap);

let marker = L.marker([0, 0]).addTo(mymap);

function getGeo() {
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const userInput = document.querySelector("input").value;
      mymap.setView([lat, lon]);
      marker.setLatLng([lat, lon]);
      document.querySelector("#latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;

      const data = { lat, lon, userInput };
      const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      };

      const response = await fetch("/api", options);
      const json = await response.json();
      console.log(json);
    });
  } else {
    console.log("geolocation is not available");
  }
}
getGeo();
