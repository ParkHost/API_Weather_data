// const button = document.querySelector("#button1");

// button.addEventListener("click", () => {
//   getGeo();
// });

function getGeo() {
  if ("geolocation" in navigator) {
    console.log("geolocation is available");
    navigator.geolocation.getCurrentPosition(async position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.querySelector("#latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;

      const api_url = `weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      console.log(json);
      const weerParams = json.weather.liveweer["0"];
      const air = json.air_quality.meta.found;
      console.log(weerParams);

      const weerDisplay = document.createElement("p");
      const airDisplay = document.createElement("p");

      weerDisplay.textContent = `Plaats: ${weerParams.plaats}, Temp: ${weerParams.temp}, Text: ${weerParams.samenv}`;
      airDisplay.textContent = `Air Quality Found : ${air}`;

      document.body.append(weerDisplay);
      document.body.append(airDisplay);

      const data = { lat, lon, weerParams, air };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };

      const db_response = await fetch("/api", options);
      const db_json = await db_response.json();
      console.log(db_json);
    });
  } else {
    console.log("geolocation is not available");
  }
}

getGeo();
